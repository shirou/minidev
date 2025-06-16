export const sqlFormatterJa = {
  tools: {
    sqlFormatter: {
      title: "SQLフォーマッター",
      description: "カスタマイズ可能なオプションでSQLクエリを整形・美化",
      inputLabel: "SQL入力",
      outputLabel: "整形されたSQL",
      formatButton: "SQLを整形",
      minifyButton: "SQLを圧縮",
      placeholder: "SQLクエリをここに貼り付けてください...",
      options: "整形オプション",
      indentSize: "インデントサイズ",
      keywordCase: "キーワードの大文字小文字",
      upper: "大文字",
      lower: "小文字",
      preserve: "元のまま保持",
      breakBeforeKeywords: "キーワード前で改行",
      breakAfterComma: "カンマ後で改行",
      maxLineLength: "最大行長",
      example: 'SELECT u.id, u.name, p.title, c.name as category FROM users u INNER JOIN posts p ON u.id = p.user_id LEFT JOIN categories c ON p.category_id = c.id WHERE u.active = 1 AND p.published = 1 ORDER BY p.created_at DESC LIMIT 10;'
    }
  }
}