export const sqlFormatterZhCN = {
  tools: {
    sqlFormatter: {
      title: "SQL 格式化工具",
      description: "使用可自定义选项格式化和美化 SQL 查询",
      inputLabel: "SQL 输入",
      outputLabel: "格式化的 SQL",
      formatButton: "格式化 SQL",
      minifyButton: "压缩 SQL",
      placeholder: "在此粘贴您的 SQL 查询...",
      options: "格式化选项",
      indentSize: "缩进大小",
      keywordCase: "关键字大小写",
      upper: "大写",
      lower: "小写",
      preserve: "保持原样",
      breakBeforeKeywords: "关键字前换行",
      breakAfterComma: "逗号后换行",
      maxLineLength: "最大行长度",
      example: 'SELECT u.id, u.name, p.title, c.name as category FROM users u INNER JOIN posts p ON u.id = p.user_id LEFT JOIN categories c ON p.category_id = c.id WHERE u.active = 1 AND p.published = 1 ORDER BY p.created_at DESC LIMIT 10;'
    }
  }
}