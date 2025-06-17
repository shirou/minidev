export const numberBaseJa = {
  tools: {
    numberBase: {
      title: "進数変換",
      description: "異なる進数（2進数、8進数、10進数、16進数）間で数値を変換",
      
      inputNumber: "入力数値",
      placeholder: "変換する数値を入力...",
      fromBase: "変換元の進数",
      baseLabel: "進数",
      showPrefixes: "プレフィックスを表示（0x、0b、0o）",
      
      bases: {
        binary: "2進数",
        octal: "8進数", 
        decimal: "10進数",
        hexadecimal: "16進数"
      },
      
      descriptions: {
        binary: "0-1の数字を使用",
        octal: "0-7の数字を使用",
        decimal: "0-9の数字を使用",
        hexadecimal: "0-9の数字、A-Fを使用"
      },
      
      tryExamples: "これらの例を試してください:",
      examples: {
        decimal: "10進数",
        hexWithPrefix: "16進数（プレフィックス付き）",
        binary: "2進数",
        octalWithPrefix: "8進数（プレフィックス付き）",
        commonDecimal: "一般的な10進数"
      },
      
      lengthDigits: "長さ: {{length}} 桁",
      enterNumberPrompt: "上記に数値を入力するとすべての進数への変換が表示されます",
      
      information: "情報",
      info: {
        binary: "2進数（Base 2）：0と1のみを使用",
        octal: "8進数（Base 8）：0-7の数字を使用", 
        decimal: "10進数（Base 10）：0-9の数字を使用（通常の数字）",
        hexadecimal: "16進数（Base 16）：0-9の数字とA-Fの文字を使用",
        prefixes: "プレフィックス：0b（2進数）、0o（8進数）、0x（16進数）はオプション"
      },
      
      errors: {
        tooLarge: "数値が大きすぎて安全に変換できません",
        someConversionsFailed: "一部の変換が失敗しました: {{failures}}",
        unknownError: "不明なエラーが発生しました",
        conversionFailed: "変換に失敗しました"
      }
    }
  }
}