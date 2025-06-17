export const sqlFormatterId = {
  tools: {
    sqlFormatter: {
      title: "Pemformat SQL",
      description: "Format dan percantik kueri SQL dengan opsi yang dapat disesuaikan",
      inputLabel: "Input SQL",
      outputLabel: "SQL Terformat",
      formatButton: "Format SQL",
      minifyButton: "Minifikasi SQL",
      placeholder: "Tempel kueri SQL Anda di sini...",
      options: "Opsi Pemformatan",
      indentSize: "Ukuran Indentasi",
      keywordCase: "Huruf Kata Kunci",
      upper: "HURUF BESAR",
      lower: "huruf kecil",
      preserve: "Pertahankan Asli",
      breakBeforeKeywords: "Putus Sebelum Kata Kunci",
      breakAfterComma: "Putus Setelah Koma",
      maxLineLength: "Panjang Baris Maksimal",
      example: 'SELECT u.id, u.name, p.title, c.name as category FROM users u INNER JOIN posts p ON u.id = p.user_id LEFT JOIN categories c ON p.category_id = c.id WHERE u.active = 1 AND p.published = 1 ORDER BY p.created_at DESC LIMIT 10;'
    }
  }
}