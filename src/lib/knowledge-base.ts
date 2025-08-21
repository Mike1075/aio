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
  },
  {
    id: '9',
    content: 'Python是一种高级编程语言，语法简洁易读。支持面向对象、函数式编程。常用于数据分析、Web开发、人工智能等领域。',
    category: 'Python编程',
    keywords: ['Python', 'python编程', '编程语言', '数据分析', 'AI'],
    course: '程序设计'
  },
  {
    id: '10',
    content: 'HTTP是超文本传输协议，是Web通信的基础。常见状态码：200成功、404未找到、500服务器错误。支持GET、POST、PUT、DELETE等方法。',
    category: 'Web协议',
    keywords: ['HTTP', 'web', '协议', 'GET', 'POST', '状态码'],
    course: 'Web开发'
  },
  {
    id: '11',
    content: '线性表是最基本的数据结构，元素间具有一对一的关系。可以用数组或链表实现。数组支持随机访问，链表便于插入删除。',
    category: '线性表',
    keywords: ['线性表', '数组', '链表', '数据结构基础'],
    course: '数据结构'
  },
  {
    id: '12',
    content: '二叉树是每个节点最多有两个子节点的树结构。遍历方式有前序、中序、后序。二叉搜索树支持高效的查找、插入、删除操作。',
    category: '树结构',
    keywords: ['二叉树', '树', '遍历', '二叉搜索树', 'BST'],
    course: '数据结构'
  },
  {
    id: '13',
    content: 'CSS是层叠样式表，用于描述网页的外观和格式。支持选择器、盒模型、布局、动画等。Flexbox和Grid是现代布局的重要技术。',
    category: 'CSS样式',
    keywords: ['CSS', '样式', 'flexbox', 'grid', '布局', '前端'],
    course: 'Web开发'
  },
  {
    id: '14',
    content: '递归是函数调用自身的编程技巧。必须有基础情况和递推关系。经典应用包括阶乘、斐波那契数列、树的遍历等。',
    category: '递归算法',
    keywords: ['递归', '算法', '阶乘', '斐波那契', '树遍历'],
    course: '算法设计'
  },
  {
    id: '15',
    content: '单元测试是软件测试的基础，测试单个函数或方法。应该遵循AAA模式：Arrange（准备）、Act（执行）、Assert（断言）。',
    category: '软件测试',
    keywords: ['单元测试', '测试', 'AAA模式', 'junit', 'pytest'],
    course: '软件工程'
  }
]

// 智能关键词匹配算法
export function searchKnowledge(query: string): typeof knowledgeBase {
  const searchTerms = query.toLowerCase().split(/[\s,，、。？！]+/).filter(term => term.length > 0)
  
  // 计算相关性得分
  const scoredResults = knowledgeBase.map(item => {
    let score = 0
    const content = item.content.toLowerCase()
    const keywords = item.keywords.map(k => k.toLowerCase())
    const category = item.category.toLowerCase()
    
    searchTerms.forEach(term => {
      // 关键词完全匹配得分更高
      if (keywords.some(keyword => keyword === term)) {
        score += 10
      }
      // 关键词包含匹配
      else if (keywords.some(keyword => keyword.includes(term))) {
        score += 5
      }
      // 分类匹配
      if (category.includes(term)) {
        score += 8
      }
      // 内容匹配
      if (content.includes(term)) {
        score += 3
      }
    })
    
    return { ...item, score }
  })
  
  // 按得分排序并返回前3个有得分的结果
  return scoredResults
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(({ ...item }) => item) // 移除score字段
}

// 获取随机学习建议
export function getRandomLearningTip(): string {
  const tips = [
    '建议使用番茄工作法：25分钟专注学习，5分钟休息。',
    '复习时可以使用费曼学习法：用简单的语言解释复杂概念。',
    '编程时要多写注释，这样以后回看代码会更容易理解。',
    '学习新知识时，尝试与已有知识建立联系。',
    '定期总结和复习，防止遗忘。',
    '多做练习题，理论与实践相结合。',
    '学习编程时，先理解原理再动手编码。',
    '遇到困难时，尝试画图或写伪代码来理清思路。',
    '利用调试工具step by step跟踪程序执行过程。',
    '阅读优秀的开源代码可以提高编程水平。',
    '学习数据结构时，要理解每种结构的适用场景。',
    '算法学习要注重时间和空间复杂度分析。',
    'Web开发要关注用户体验和页面性能。',
    '软件工程强调规范和团队协作。',
    '数据库设计要考虑数据一致性和查询效率。'
  ]
  
  return tips[Math.floor(Math.random() * tips.length)]
}