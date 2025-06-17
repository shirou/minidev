export const dataSizeZhCN = {
  tools: {
    dataSize: {
      title: "数据大小转换器",
      description: "在字节、千字节、兆字节、吉字节等单位之间转换",
      
      dataSizeValue: "数据大小值",
      placeholder: "输入数据大小...",
      fromUnit: "从单位",
      showBinaryUnits: "显示二进制单位（KiB、MiB、GiB 等）",
      
      groups: {
        basic: "基本",
        decimal: "十进制", 
        binary: "二进制"
      },
      
      units: {
        bit: "位",
        byte: "字节 (B)",
        kb: "千字节 (KB)",
        mb: "兆字节 (MB)",
        gb: "吉字节 (GB)", 
        tb: "太字节 (TB)",
        pb: "拍字节 (PB)",
        kib: "千比字节 (KiB)",
        mib: "兆比字节 (MiB)",
        gib: "吉比字节 (GiB)",
        tib: "太比字节 (TiB)",
        pib: "拍比字节 (PiB)"
      },
      
      commonExamples: "常见数据大小示例",
      enterDataSizePrompt: "在上方输入数据大小值以查看转换",
      
      understandingUnits: "理解数据大小单位",
      decimalUnits: "十进制（SI）单位",
      binaryUnits: "二进制（IEC）单位",
      
      unitInfo: {
        kb: "KB = 1,000 字节",
        mb: "MB = 1,000 KB = 1,000,000 字节",
        gb: "GB = 1,000 MB = 1,000,000,000 字节",
        tb: "TB = 1,000 GB",
        kib: "KiB = 1,024 字节",
        mib: "MiB = 1,024 KiB = 1,048,576 字节",
        gib: "GiB = 1,024 MiB = 1,073,741,824 字节",
        tib: "TiB = 1,024 GiB"
      },
      
      note: "注意",
      noteContent: "存储制造商通常使用十进制单位（GB、TB），而操作系统通常使用二进制单位（GiB、TiB）。",
      
      empty: "（空）",
      
      examples: {
        textcharacter: "文本字符",
        tweet: "推文",
        smallphoto: "小照片",
        songmp3: "歌曲（MP3）",
        ebook: "电子书",
        hdmovie: "高清电影",
        "4kmovie": "4K 电影",
        dvd: "DVD",
        bluray: "蓝光",
        moderngame: "现代游戏",
        ssddrive: "SSD 硬盘",
        harddrive: "硬盘"
      },
      
      exampleDescriptions: {
        textcharacter: "单个 ASCII 字符",
        tweet: "推文最大长度",
        smallphoto: "压缩的 JPEG 图像",
        songmp3: "3-4 分钟的歌曲",
        ebook: "平均小说长度",
        hdmovie: "2 小时 1080p 电影",
        "4kmovie": "2 小时 4K 电影",
        dvd: "单层 DVD 容量",
        bluray: "单层蓝光容量",
        moderngame: "3A 级视频游戏",
        ssddrive: "消费级 SSD 容量",
        harddrive: "消费级硬盘容量"
      },
      
      errors: {
        invalidNumber: "请输入有效数字",
        invalidDataSize: "无效的数据大小", 
        someConversionsFailed: "部分转换失败：{{failures}}",
        unknownError: "未知错误",
        conversionFailed: "转换失败"
      }
    }
  }
}