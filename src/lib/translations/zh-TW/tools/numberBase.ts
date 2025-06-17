export const numberBaseZhTW = {
  tools: {
    numberBase: {
      title: "進位制轉換器",
      description: "在不同進位制之間轉換數字（二進制、八進制、十進制、十六進制）",
      
      inputNumber: "輸入數字",
      placeholder: "輸入要轉換的數字...",
      fromBase: "來源進位",
      baseLabel: "進位",
      showPrefixes: "顯示前綴（0x、0b、0o）",
      
      bases: {
        binary: "二進制",
        octal: "八進制", 
        decimal: "十進制",
        hexadecimal: "十六進制"
      },
      
      descriptions: {
        binary: "使用數字 0-1",
        octal: "使用數字 0-7",
        decimal: "使用數字 0-9",
        hexadecimal: "使用數字 0-9、A-F"
      },
      
      tryExamples: "試試這些範例：",
      examples: {
        decimal: "十進制",
        hexWithPrefix: "帶前綴的十六進制",
        binary: "二進制",
        octalWithPrefix: "帶前綴的八進制",
        commonDecimal: "常見的十進制數"
      },
      
      lengthDigits: "長度：{{length}} 位數",
      enterNumberPrompt: "在上方輸入數字以查看所有進位制的轉換",
      
      information: "資訊",
      info: {
        binary: "二進制（基數 2）：只使用 0 和 1",
        octal: "八進制（基數 8）：使用數字 0-7", 
        decimal: "十進制（基數 10）：使用數字 0-9（一般數字）",
        hexadecimal: "十六進制（基數 16）：使用數字 0-9 和字母 A-F",
        prefixes: "前綴：0b（二進制）、0o（八進制）、0x（十六進制）是可選的"
      },
      
      errors: {
        tooLarge: "數字太大，無法安全轉換",
        someConversionsFailed: "部分轉換失敗：{{failures}}",
        unknownError: "發生未知錯誤",
        conversionFailed: "轉換失敗"
      }
    }
  }
}