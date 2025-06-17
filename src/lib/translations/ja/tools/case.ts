export const caseJa = {
  tools: {
    case: {
      title: "ケースコンバーター",
      description: "異なる命名規則とケーススタイル間でテキストを変換",
      
      inputText: "入力テキスト",
      placeholder: "異なるケースに変換するテキストを入力...",
      inputLength: "入力長: {{length}} 文字",
      
      tryExamples: "これらの例を試してください:",
      examples: {
        spaceSeparated: "スペース区切りの単語",
        pascalCase: "パスカルケース",
        camelCase: "キャメルケース", 
        snakeCase: "スネークケース",
        kebabCase: "ケバブケース",
        constantCase: "定数ケース"
      },
      
      conversionError: "変換エラー",
      empty: "（空）",
      conversionFailed: "変換に失敗しました",
      someConversionsFailed: "一部の変換が失敗しました: {{failures}}",
      unknownError: "不明なエラー",
      enterTextPrompt: "上記にテキストを入力するとすべてのケース変換が表示されます"
    }
  }
}