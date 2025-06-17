export const wordCounterId = {
  tools: {
    wordCounter: {
      title: "Penghitung Kata",
      description: "Analisis statistik teks termasuk jumlah kata, jumlah karakter, dan keterbacaan",
      
      // Input section
      textInput: "Input Teks",
      uploadFile: "Unggah Berkas",
      placeholder: "Ketik atau tempel teks Anda di sini untuk dianalisis...",
      fileTypeError: "Silakan pilih berkas teks (.txt, .md, dll.)",
      
      // Statistics
      characters: "Karakter",
      charactersNoSpaces: "Karakter (tanpa spasi)",
      words: "Kata",
      sentences: "Kalimat",
      paragraphs: "Paragraf",
      lines: "Baris",
      readingTime: "Waktu Baca",
      speakingTime: "Waktu Bicara",
      readability: "Keterbacaan",
      
      // Analysis
      mostFrequentWords: "Kata Paling Sering",
      readabilityAnalysis: "Analisis Keterbacaan",
      readingLevel: "Tingkat Bacaan",
      noSignificantWords: "Tidak ada kata signifikan ditemukan",
      
      // Export
      exportStatistics: "Ekspor Statistik",
      copySummary: "Salin Ringkasan",
      textStatistics: "Statistik Teks",
      
      // Help
      enterTextPrompt: "Masukkan teks di atas untuk melihat analisis terperinci",
      howItWorks: "Cara kerja:",
      realTimeAnalysisLabel: "Analisis waktu nyata:",
      realTimeDescription: "Statistik diperbarui saat Anda mengetik",
      readingTimeLabel: "Waktu baca:",
      readingTimeDescription: "Berdasarkan kecepatan baca rata-rata 200 kata/menit",
      speakingTimeLabel: "Waktu bicara:",
      speakingTimeDescription: "Berdasarkan kecepatan bicara rata-rata 150 kata/menit",
      readabilityScoreLabel: "Skor keterbacaan:",
      readabilityScoreDescription: "Menggunakan rumus Flesch Reading Ease",
      wordFrequencyLabel: "Frekuensi kata:",
      wordFrequencyDescription: "Tidak termasuk kata umum (dan, yang, di, dll.)",
      
      // Stats with parameters
      withoutSpaces: "{{count}} tanpa spasi",
      longest: "Terpanjang: \"{{word}}\"",
      wordsPerSentence: "{{avg}} kata/kalimat",
      sentencesPerParagraph: "{{avg}} kalimat/paragraf",
      bytes: "{{count}} byte",
      readingSpeed: "~200 kata/menit",
      speakingSpeed: "~150 kata/menit",
      scoreValue: "{{score}} skor",
      scoreOutOf100: "Skor: {{score}}/100",
      averageWordsPerSentenceValue: "Rata-rata kata per kalimat: {{avg}}",
      averageSentencesPerParagraphValue: "Rata-rata kalimat per paragraf: {{avg}}",
      shortestWordValue: "Kata terpendek: \"{{word}}\""
    }
  }
}