export const dataSizeId = {
  tools: {
    dataSize: {
      title: "Konverter Ukuran Data",
      description: "Konversi antara byte, kilobyte, megabyte, gigabyte, dan lainnya",
      
      dataSizeValue: "Nilai Ukuran Data",
      placeholder: "Masukkan ukuran data...",
      fromUnit: "Dari Satuan",
      showBinaryUnits: "Tampilkan satuan biner (KiB, MiB, GiB, dll.)",
      
      groups: {
        basic: "Dasar",
        decimal: "Desimal", 
        binary: "Biner"
      },
      
      units: {
        bit: "Bit",
        byte: "Byte (B)",
        kb: "Kilobyte (KB)",
        mb: "Megabyte (MB)",
        gb: "Gigabyte (GB)", 
        tb: "Terabyte (TB)",
        pb: "Petabyte (PB)",
        kib: "Kibibyte (KiB)",
        mib: "Mebibyte (MiB)",
        gib: "Gibibyte (GiB)",
        tib: "Tebibyte (TiB)",
        pib: "Pebibyte (PiB)"
      },
      
      commonExamples: "Contoh Ukuran Data Umum",
      enterDataSizePrompt: "Masukkan nilai ukuran data di atas untuk melihat konversi",
      
      understandingUnits: "Memahami Satuan Ukuran Data",
      decimalUnits: "Satuan Desimal (SI)",
      binaryUnits: "Satuan Biner (IEC)",
      
      unitInfo: {
        kb: "KB = 1.000 byte",
        mb: "MB = 1.000 KB = 1.000.000 byte",
        gb: "GB = 1.000 MB = 1.000.000.000 byte",
        tb: "TB = 1.000 GB",
        kib: "KiB = 1.024 byte",
        mib: "MiB = 1.024 KiB = 1.048.576 byte",
        gib: "GiB = 1.024 MiB = 1.073.741.824 byte",
        tib: "TiB = 1.024 GiB"
      },
      
      note: "Catatan",
      noteContent: "Produsen penyimpanan biasanya menggunakan satuan desimal (GB, TB), sementara sistem operasi sering menggunakan satuan biner (GiB, TiB).",
      
      empty: "(kosong)",
      
      examples: {
        textcharacter: "Karakter Teks",
        tweet: "Tweet",
        smallphoto: "Foto Kecil",
        songmp3: "Lagu (MP3)",
        ebook: "eBook",
        hdmovie: "Film HD",
        "4kmovie": "Film 4K",
        dvd: "DVD",
        bluray: "Blu-ray",
        moderngame: "Game Modern",
        ssddrive: "Drive SSD",
        harddrive: "Hard Drive"
      },
      
      exampleDescriptions: {
        textcharacter: "Satu karakter ASCII",
        tweet: "Panjang tweet maksimum",
        smallphoto: "Gambar JPEG terkompresi",
        songmp3: "Lagu 3-4 menit",
        ebook: "Panjang novel rata-rata",
        hdmovie: "Film 1080p 2 jam",
        "4kmovie": "Film 4K 2 jam",
        dvd: "Kapasitas DVD lapis tunggal",
        bluray: "Blu-ray lapis tunggal",
        moderngame: "Video game AAA",
        ssddrive: "Kapasitas SSD konsumen",
        harddrive: "Kapasitas HDD konsumen"
      },
      
      errors: {
        invalidNumber: "Harap masukkan angka yang valid",
        invalidDataSize: "Ukuran data tidak valid", 
        someConversionsFailed: "Beberapa konversi gagal: {{failures}}",
        unknownError: "Kesalahan tidak diketahui",
        conversionFailed: "Konversi gagal"
      }
    }
  }
}