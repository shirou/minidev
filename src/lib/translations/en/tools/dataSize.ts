export const dataSizeEn = {
  tools: {
    dataSize: {
      title: "Data Size Converter",
      description: "Convert between bytes, kilobytes, megabytes, gigabytes, and more",
      
      dataSizeValue: "Data Size Value",
      placeholder: "Enter data size...",
      fromUnit: "From Unit",
      showBinaryUnits: "Show binary units (KiB, MiB, GiB, etc.)",
      
      groups: {
        basic: "Basic",
        decimal: "Decimal", 
        binary: "Binary"
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
      
      commonExamples: "Common Data Size Examples",
      enterDataSizePrompt: "Enter a data size value above to see conversions",
      
      understandingUnits: "Understanding Data Size Units",
      decimalUnits: "Decimal (SI) Units",
      binaryUnits: "Binary (IEC) Units",
      
      unitInfo: {
        kb: "KB = 1,000 bytes",
        mb: "MB = 1,000 KB = 1,000,000 bytes",
        gb: "GB = 1,000 MB = 1,000,000,000 bytes",
        tb: "TB = 1,000 GB",
        kib: "KiB = 1,024 bytes",
        mib: "MiB = 1,024 KiB = 1,048,576 bytes",
        gib: "GiB = 1,024 MiB = 1,073,741,824 bytes",
        tib: "TiB = 1,024 GiB"
      },
      
      note: "Note",
      noteContent: "Storage manufacturers typically use decimal units (GB, TB), while operating systems often use binary units (GiB, TiB).",
      
      empty: "(empty)",
      
      examples: {
        textcharacter: "Text Character",
        tweet: "Tweet",
        smallphoto: "Small Photo",
        songmp3: "Song (MP3)",
        ebook: "eBook",
        hdmovie: "HD Movie",
        "4kmovie": "4K Movie",
        dvd: "DVD",
        bluray: "Blu-ray",
        moderngame: "Modern Game",
        ssddrive: "SSD Drive",
        harddrive: "Hard Drive"
      },
      
      exampleDescriptions: {
        textcharacter: "Single ASCII character",
        tweet: "Maximum tweet length",
        smallphoto: "Compressed JPEG image",
        songmp3: "3-4 minute song",
        ebook: "Average novel length",
        hdmovie: "2-hour 1080p movie",
        "4kmovie": "2-hour 4K movie",
        dvd: "Single layer DVD capacity",
        bluray: "Single layer Blu-ray",
        moderngame: "AAA video game",
        ssddrive: "Consumer SSD capacity",
        harddrive: "Consumer HDD capacity"
      },
      
      errors: {
        invalidNumber: "Please enter a valid number",
        invalidDataSize: "Invalid data size", 
        someConversionsFailed: "Some conversions failed: {{failures}}",
        unknownError: "Unknown error",
        conversionFailed: "Conversion failed"
      }
    }
  }
}
