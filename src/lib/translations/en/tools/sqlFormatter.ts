export const sqlFormatterEn = {
  tools: {
    sqlFormatter: {
      title: "SQL Formatter",
      description: "Format and beautify SQL queries with customizable options",
      inputLabel: "SQL Input",
      outputLabel: "Formatted SQL",
      formatButton: "Format SQL",
      minifyButton: "Minify SQL",
      placeholder: "Paste your SQL query here...",
      options: "Formatting Options",
      indentSize: "Indent Size",
      keywordCase: "Keyword Case",
      upper: "UPPERCASE",
      lower: "lowercase",
      preserve: "Preserve Original",
      breakBeforeKeywords: "Break Before Keywords",
      breakAfterComma: "Break After Comma",
      maxLineLength: "Max Line Length",
      example: 'SELECT u.id, u.name, p.title, c.name as category FROM users u INNER JOIN posts p ON u.id = p.user_id LEFT JOIN categories c ON p.category_id = c.id WHERE u.active = 1 AND p.published = 1 ORDER BY p.created_at DESC LIMIT 10;'
    }
  }
}