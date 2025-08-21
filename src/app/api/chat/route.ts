import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextRequest, NextResponse } from 'next/server'
import { searchKnowledge, getRandomLearningTip } from '@/lib/knowledge-base'

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY!)

export async function POST(req: NextRequest) {
  try {
    console.log('API Key available:', !!process.env.GOOGLE_AI_API_KEY)
    
    const { message } = await req.json()
    console.log('Received message:', message)

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    // 搜索知识库中的相关内容
    const relevantKnowledge = searchKnowledge(message)
    const learningTip = getRandomLearningTip()

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

    // 构建包含知识库信息的提示词
    let knowledgeContext = ''
    if (relevantKnowledge.length > 0) {
      knowledgeContext = `\n\n相关知识库内容：\n${relevantKnowledge.map(item => 
        `- ${item.category}: ${item.content}`
      ).join('\n')}`
    }

    const prompt = `你是河北师范大学软件学院的AI学习助手，名字叫"启明星"。你的任务是帮助学生学习和答疑。请用友好、鼓励的语气回答问题，并尽可能提供具体的学习建议。

学生问题: ${message}${knowledgeContext}

学习小贴士: ${learningTip}

请以中文回答，保持简洁但有用。如果是编程问题，可以提供代码示例。如果是学习方法问题，提供具体可行的建议。优先使用知识库中的相关内容来回答问题，如果知识库中没有相关内容，则基于你的知识来回答。`

    // 尝试使用Google Gemini AI
    try {
      if (process.env.GOOGLE_AI_API_KEY) {
        const result = await model.generateContent(prompt)
        const response = await result.response
        const text = response.text()

        return NextResponse.json({ 
          response: text,
          knowledgeUsed: relevantKnowledge.length > 0
        })
      }
    } catch (aiError) {
      console.error('Gemini AI error:', aiError)
      // AI调用失败，回退到知识库模式
    }

    // 回退到知识库模式
    let fallbackResponse = '我是启明星AI学习助手！虽然当前处于知识库模式，但我仍然可以帮助您学习。'
    
    if (relevantKnowledge.length > 0) {
      fallbackResponse = `根据我们的知识库，我找到了与"${message}"相关的信息：\n\n${relevantKnowledge.map(item => 
        `🔹 **${item.category}**\n${item.content}`
      ).join('\n\n')}\n\n💡 **学习小贴士**: ${learningTip}\n\n如需更详细的解答，请尝试提问具体的概念或技术名词。`
    } else {
      // 如果没有匹配的知识，提供通用建议
      const suggestions = [
        '可以试试问"什么是数据结构？"',
        '或者问"如何学习算法？"',
        '也可以询问"Python基础语法"',
        '还可以了解"Git使用方法"'
      ]
      fallbackResponse = `我理解您的问题"${message}"。\n\n虽然知识库中暂时没有直接相关的内容，但我建议您可以：\n\n${suggestions.map(s => `• ${s}`).join('\n')}\n\n💡 **学习小贴士**: ${learningTip}`
    }
    
    return NextResponse.json({ 
      response: fallbackResponse,
      knowledgeUsed: relevantKnowledge.length > 0,
      fallbackMode: true
    })
  } catch (error) {
    console.error('Error in chat API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}