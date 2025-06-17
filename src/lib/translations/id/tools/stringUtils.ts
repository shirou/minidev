export const stringUtilsId = {
  tools: {
    stringUtils: {
      title: "Utilitas String",
      description: "Berbagai alat dan utilitas manipulasi string",
      
      operation: "Operasi",
      swapIO: "Tukar I/O",
      
      operations: {
        trim: "Pangkas Spasi Putih",
        removeWhitespace: "Hapus Spasi Putih Berlebih", 
        replace: "Cari & Ganti",
        split: "Pisah Teks",
        join: "Gabung Baris",
        removeDuplicates: "Hapus Baris Duplikat",
        sort: "Urutkan Baris",
        lineNumbers: "Tambah Nomor Baris",
        prefixSuffix: "Tambah Awalan/Akhiran",
        extractColumns: "Ekstrak Kolom"
      },
      
      // Trim operation
      trimType: "Tipe Pemangkasan",
      trimOptions: {
        both: "Kedua ujung",
        start: "Awal saja",
        end: "Akhir saja"
      },
      
      // Replace operation
      find: "Cari",
      findPlaceholder: "Teks untuk dicari...",
      replaceWith: "Ganti dengan",
      replacePlaceholder: "Teks pengganti...",
      caseSensitive: "Peka huruf besar-kecil",
      wholeWordsOnly: "Kata utuh saja",
      useRegex: "Gunakan regex",
      replaceAll: "Ganti semua",
      
      // Split operation
      delimiter: "Pembatas",
      delimiterPlaceholder: "Pembatas (misal: koma, spasi, tab)...",
      removeEmpty: "Hapus kosong",
      trimResults: "Pangkas hasil",
      
      // Join operation
      joinDelimiter: "Pembatas Gabungan",
      joinDelimiterPlaceholder: "Pembatas untuk menggabung...",
      
      // Remove duplicates
      caseSensitiveComparison: "Perbandingan peka huruf besar-kecil",
      
      // Sort operation
      direction: "Arah",
      ascending: "Menaik",
      descending: "Menurun",
      numericSort: "Urutan numerik",
      removeEmptyLines: "Hapus baris kosong",
      
      // Line numbers operation
      startFrom: "Mulai dari",
      separator: "Pemisah",
      padWithZeros: "Isi dengan nol",
      
      // Prefix/Suffix operation
      prefix: "Awalan",
      prefixPlaceholder: "Teks untuk ditambahkan di awal setiap baris...",
      suffix: "Akhiran",
      suffixPlaceholder: "Teks untuk ditambahkan di akhir setiap baris...",
      
      // Extract columns operation
      columnDelimiter: "Pembatas Kolom",
      columnDelimiterPlaceholder: "Pembatas (misal: koma, tab)...",
      columnNumbers: "Nomor Kolom",
      columnNumbersPlaceholder: "misal: 1,3,5",
      
      // Input/Output
      inputText: "Teks Input",
      inputPlaceholder: "Masukkan teks untuk diproses...",
      outputText: "Teks Output",
      outputPlaceholder: "Output terproses akan muncul di sini...",
      
      // Stats
      inputStats: "Input: {{chars}} karakter, {{lines}} baris",
      outputStats: "Output: {{chars}} karakter, {{lines}} baris",
      emptyLinesCount: "Baris kosong: {{count}}",
      longestLine: "Baris terpanjang: {{length}} karakter",
      
      // Messages
      enterTextPrompt: "Masukkan teks di atas untuk diproses dengan utilitas string",
      processingError: "Kesalahan Pemrosesan",
      
      // Errors
      errors: {
        invalidOperation: "Operasi tidak valid",
        processingFailed: "Pemrosesan gagal",
        unknownError: "Kesalahan tidak diketahui"
      }
    }
  }
}