export const dataSizeJa = {
  tools: {
    dataSize: {
      title: "データサイズ変換",
      description: "バイト、キロバイト、メガバイト、ギガバイトなどの間でデータサイズを変換",
      
      dataSizeValue: "データサイズ値",
      placeholder: "データサイズを入力...",
      fromUnit: "変換元の単位",
      showBinaryUnits: "バイナリ単位を表示（KiB、MiB、GiB等）",
      
      groups: {
        basic: "基本",
        decimal: "10進数",
        binary: "2進数"
      },
      
      units: {
        bit: "ビット",
        byte: "バイト（B）",
        kb: "キロバイト（KB）",
        mb: "メガバイト（MB）",
        gb: "ギガバイト（GB）",
        tb: "テラバイト（TB）",
        pb: "ペタバイト（PB）",
        kib: "キビバイト（KiB）",
        mib: "メビバイト（MiB）",
        gib: "ギビバイト（GiB）",
        tib: "テビバイト（TiB）",
        pib: "ペビバイト（PiB）"
      },
      
      commonExamples: "一般的なデータサイズ例",
      enterDataSizePrompt: "上記にデータサイズ値を入力するとすべての変換が表示されます",
      
      understandingUnits: "データサイズ単位の理解",
      decimalUnits: "10進数（SI）単位",
      binaryUnits: "2進数（IEC）単位",
      
      unitInfo: {
        kb: "KB = 1,000 バイト",
        mb: "MB = 1,000 KB = 1,000,000 バイト",
        gb: "GB = 1,000 MB = 1,000,000,000 バイト",
        tb: "TB = 1,000 GB",
        kib: "KiB = 1,024 バイト",
        mib: "MiB = 1,024 KiB = 1,048,576 バイト",
        gib: "GiB = 1,024 MiB = 1,073,741,824 バイト",
        tib: "TiB = 1,024 GiB"
      },
      
      note: "注意",
      noteContent: "ストレージメーカーは通常10進単位（GB、TB）を使用しますが、オペレーティングシステムは2進単位（GiB、TiB）を使用することがよくあります。",
      
      empty: "（空）",
      
      examples: {
        textcharacter: "テキスト文字",
        tweet: "ツイート",
        smallphoto: "小さな写真",
        songmp3: "楽曲（MP3）",
        ebook: "電子書籍",
        hdmovie: "HD動画",
        "4kmovie": "4K動画",
        dvd: "DVD",
        bluray: "Blu-ray",
        moderngame: "現代のゲーム",
        ssddrive: "SSDドライブ",
        harddrive: "ハードディスク"
      },
      
      exampleDescriptions: {
        textcharacter: "単一ASCII文字",
        tweet: "最大ツイート長",
        smallphoto: "圧縮JPEG画像",
        songmp3: "3-4分の楽曲",
        ebook: "平均的な小説の長さ",
        hdmovie: "2時間1080p動画",
        "4kmovie": "2時間4K動画",
        dvd: "単層DVD容量",
        bluray: "単層Blu-ray",
        moderngame: "AAAビデオゲーム",
        ssddrive: "コンシューマーSSD容量",
        harddrive: "コンシューマーHDD容量"
      },
      
      errors: {
        invalidNumber: "有効な数値を入力してください",
        invalidDataSize: "無効なデータサイズ",
        someConversionsFailed: "一部の変換が失敗しました: {{failures}}",
        unknownError: "不明なエラー",
        conversionFailed: "変換に失敗しました"
      }
    }
  }
}
