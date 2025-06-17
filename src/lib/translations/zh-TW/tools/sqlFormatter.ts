export const sqlFormatterZhTW = {
  tools: {
    sqlFormatter: {
      title: "SQL 格式化工具",
      description: "使用可自訂選項格式化和美化 SQL 查詢",
      inputLabel: "SQL 輸入",
      outputLabel: "格式化的 SQL",
      formatButton: "格式化 SQL",
      minifyButton: "縮小 SQL",
      placeholder: "在此貼上您的 SQL 查詢...",
      options: "格式化選項",
      indentSize: "縮排大小",
      keywordCase: "關鍵字大小寫",
      upper: "大寫",
      lower: "小寫",
      preserve: "保持原樣",
      breakBeforeKeywords: "關鍵字前換行",
      breakAfterComma: "逗號後換行",
      maxLineLength: "最大行長度",
      example: 'SELECT u.id, u.name, p.title, c.name as category FROM users u INNER JOIN posts p ON u.id = p.user_id LEFT JOIN categories c ON p.category_id = c.id WHERE u.active = 1 AND p.published = 1 ORDER BY p.created_at DESC LIMIT 10;'
    }
  }
}