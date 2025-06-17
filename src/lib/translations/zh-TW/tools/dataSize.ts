export const dataSizeZhTW = {
  tools: {
    dataSize: {
      title: "資料大小轉換器",
      description: "在位元組、千位元組、百萬位元組、吉位元組等之間轉換",
      
      dataSizeValue: "資料大小值",
      placeholder: "輸入資料大小...",
      fromUnit: "來源單位",
      showBinaryUnits: "顯示二進制單位（KiB、MiB、GiB 等）",
      
      groups: {
        basic: "基本",
        decimal: "十進制", 
        binary: "二進制"
      },
      
      units: {
        bit: "位元",
        byte: "位元組 (B)",
        kb: "千位元組 (KB)",
        mb: "百萬位元組 (MB)",
        gb: "吉位元組 (GB)", 
        tb: "兆位元組 (TB)",
        pb: "拍位元組 (PB)",
        kib: "千位元組 (KiB)",
        mib: "百萬位元組 (MiB)",
        gib: "吉位元組 (GiB)",
        tib: "兆位元組 (TiB)",
        pib: "拍位元組 (PiB)"
      },
      
      commonExamples: "常見資料大小範例",
      enterDataSizePrompt: "在上方輸入資料大小值以查看轉換",
      
      understandingUnits: "了解資料大小單位",
      decimalUnits: "十進制（SI）單位",
      binaryUnits: "二進制（IEC）單位",
      
      unitInfo: {
        kb: "KB = 1,000 位元組",
        mb: "MB = 1,000 KB = 1,000,000 位元組",
        gb: "GB = 1,000 MB = 1,000,000,000 位元組",
        tb: "TB = 1,000 GB",
        kib: "KiB = 1,024 位元組",
        mib: "MiB = 1,024 KiB = 1,048,576 位元組",
        gib: "GiB = 1,024 MiB = 1,073,741,824 位元組",
        tib: "TiB = 1,024 GiB"
      },
      
      note: "注意",
      noteContent: "儲存裝置製造商通常使用十進制單位（GB、TB），而作業系統經常使用二進制單位（GiB、TiB）。",
      
      empty: "(空白)",
      
      examples: {
        textcharacter: "文字字元",
        tweet: "推文",
        smallphoto: "小照片",
        songmp3: "歌曲 (MP3)",
        ebook: "電子書",
        hdmovie: "高清電影",
        "4kmovie": "4K 電影",
        dvd: "DVD",
        bluray: "藍光光碟",
        moderngame: "現代遊戲",
        ssddrive: "SSD 硬碟",
        harddrive: "硬碟"
      },
      
      exampleDescriptions: {
        textcharacter: "單個 ASCII 字元",
        tweet: "最大推文長度",
        smallphoto: "壓縮的 JPEG 圖片",
        songmp3: "3-4 分鐘的歌曲",
        ebook: "平均小說長度",
        hdmovie: "2 小時 1080p 電影",
        "4kmovie": "2 小時 4K 電影",
        dvd: "單層 DVD 容量",
        bluray: "單層藍光光碟",
        moderngame: "AAA 級電子遊戲",
        ssddrive: "消費級 SSD 容量",
        harddrive: "消費級硬碟容量"
      },
      
      errors: {
        invalidNumber: "請輸入有效的數字",
        invalidDataSize: "無效的資料大小", 
        someConversionsFailed: "部分轉換失敗：{{failures}}",
        unknownError: "未知錯誤",
        conversionFailed: "轉換失敗"
      }
    }
  }
}