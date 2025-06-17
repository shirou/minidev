export const numberBaseZhCN = {
  tools: {
    numberBase: {
      title: "进制转换器",
      description: "在不同进制之间转换数字（二进制、八进制、十进制、十六进制）",
      
      inputNumber: "输入数字",
      placeholder: "输入要转换的数字...",
      fromBase: "从进制",
      baseLabel: "进制",
      showPrefixes: "显示前缀（0x、0b、0o）",
      
      bases: {
        binary: "二进制",
        octal: "八进制", 
        decimal: "十进制",
        hexadecimal: "十六进制"
      },
      
      descriptions: {
        binary: "使用数字 0-1",
        octal: "使用数字 0-7",
        decimal: "使用数字 0-9",
        hexadecimal: "使用数字 0-9、A-F"
      },
      
      tryExamples: "试试这些示例：",
      examples: {
        decimal: "十进制",
        hexWithPrefix: "带前缀的十六进制",
        binary: "二进制",
        octalWithPrefix: "带前缀的八进制",
        commonDecimal: "常见十进制"
      },
      
      lengthDigits: "长度：{{length}} 位",
      enterNumberPrompt: "在上方输入数字以查看所有进制的转换",
      
      information: "信息",
      info: {
        binary: "二进制（基数 2）：仅使用 0 和 1",
        octal: "八进制（基数 8）：使用数字 0-7", 
        decimal: "十进制（基数 10）：使用数字 0-9（普通数字）",
        hexadecimal: "十六进制（基数 16）：使用数字 0-9 和字母 A-F",
        prefixes: "前缀：0b（二进制）、0o（八进制）、0x（十六进制）是可选的"
      },
      
      errors: {
        tooLarge: "数字太大，无法安全转换",
        someConversionsFailed: "部分转换失败：{{failures}}",
        unknownError: "发生未知错误",
        conversionFailed: "转换失败"
      }
    }
  }
}