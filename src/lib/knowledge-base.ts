// 基础知识库数据
export const knowledgeBase = [
  {
    id: '1',
    content: '数据结构是计算机科学中一种存储和组织数据的方式，以便能够高效地访问和修改数据。常见的数据结构包括数组、链表、栈、队列、树、图等。',
    category: '数据结构',
    keywords: ['数据结构', '数组', '链表', '栈', '队列', '树', '图'],
    course: '数据结构'
  },
  {
    id: '2', 
    content: '算法的时间复杂度用大O记号表示，描述算法执行时间随输入规模增长的变化率。常见的时间复杂度有O(1)、O(log n)、O(n)、O(n log n)、O(n²)等。',
    category: '算法分析',
    keywords: ['时间复杂度', '大O记号', '算法分析', '效率'],
    course: '算法设计'
  },
  {
    id: '3',
    content: '软件工程是一门研究用工程化方法构建和维护有效的、实用的和高质量的软件的学科。它涉及软件需求分析、设计、编码、测试、维护等过程。',
    category: '软件工程',
    keywords: ['软件工程', '需求分析', '软件设计', '测试', '维护'],
    course: '软件工程'
  },
  {
    id: '4',
    content: '面向对象编程的三大特性是封装、继承和多态。封装是将数据和方法组合在一起；继承是子类可以使用父类的属性和方法；多态是同一个方法在不同对象上有不同的实现。',
    category: '面向对象',
    keywords: ['面向对象', '封装', '继承', '多态', 'OOP'],
    course: '程序设计'
  },
  {
    id: '5',
    content: 'JavaScript是一种动态类型的解释型编程语言，主要用于网页开发。它支持面向对象、函数式和事件驱动的编程范式。',
    category: 'JavaScript',
    keywords: ['JavaScript', 'JS', '前端开发', '编程语言'],
    course: 'Web开发'
  },
  {
    id: '6',
    content: 'React是一个用于构建用户界面的JavaScript库。它采用组件化的开发模式，使用虚拟DOM来提高性能，支持单向数据流。',
    category: 'React',
    keywords: ['React', '组件', '虚拟DOM', '前端框架'],
    course: 'Web开发'
  },
  {
    id: '7',
    content: '数据库设计的三大范式：第一范式要求每个属性都是原子性的；第二范式要求非主键属性完全依赖于主键；第三范式要求非主键属性不传递依赖于主键。',
    category: '数据库',
    keywords: ['数据库', '范式', '第一范式', '第二范式', '第三范式'],
    course: '数据库原理'
  },
  {
    id: '8',
    content: 'Git是一个分布式版本控制系统，用于跟踪文件的变化。常用命令包括git add（添加到暂存区）、git commit（提交）、git push（推送）、git pull（拉取）等。',
    category: '版本控制',
    keywords: ['Git', '版本控制', 'git add', 'git commit', 'git push', 'git pull'],
    course: '软件工程'
  }
]

// 简单的关键词匹配算法
export function searchKnowledge(query: string): typeof knowledgeBase {
  const searchTerms = query.toLowerCase().split(' ')
  
  return knowledgeBase.filter(item => {
    const content = item.content.toLowerCase()
    const keywords = item.keywords.map(k => k.toLowerCase())
    const category = item.category.toLowerCase()
    
    return searchTerms.some(term => 
      content.includes(term) || 
      keywords.some(keyword => keyword.includes(term)) ||
      category.includes(term)
    )
  }).slice(0, 3) // 限制返回3个最相关的结果
}

// 获取随机学习建议
export function getRandomLearningTip(): string {
  const tips = [
    '建议使用番茄工作法：25分钟专注学习，5分钟休息。',
    '复习时可以使用费曼学习法：用简单的语言解释复杂概念。',
    '编程时要多写注释，这样以后回看代码会更容易理解。',
    '学习新知识时，尝试与已有知识建立联系。',
    '定期总结和复习，防止遗忘。',
    '多做练习题，理论与实践相结合。'
  ]
  
  return tips[Math.floor(Math.random() * tips.length)]
}