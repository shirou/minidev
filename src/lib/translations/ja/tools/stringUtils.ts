export const stringUtilsJa = {
  tools: {
    stringUtils: {
      title: "文字列ユーティリティ",
      description: "様々な文字列操作ツールとユーティリティ",
      
      operation: "操作",
      swapIO: "入出力を交換",
      
      operations: {
        trim: "空白文字を削除",
        removeWhitespace: "余分な空白を削除", 
        replace: "検索・置換",
        split: "テキスト分割",
        join: "行結合",
        removeDuplicates: "重複行を削除",
        sort: "行をソート",
        lineNumbers: "行番号を追加",
        prefixSuffix: "接頭辞・接尾辞を追加",
        extractColumns: "列を抽出"
      },
      
      // Trim operation
      trimType: "削除タイプ",
      trimOptions: {
        both: "両端",
        start: "開始のみ",
        end: "終了のみ"
      },
      
      // Replace operation
      find: "検索",
      findPlaceholder: "検索するテキスト...",
      replaceWith: "置換後",
      replacePlaceholder: "置換するテキスト...",
      caseSensitive: "大文字小文字を区別",
      wholeWordsOnly: "単語全体のみ",
      useRegex: "正規表現を使用",
      replaceAll: "すべて置換",
      
      // Split operation
      delimiter: "区切り文字",
      delimiterPlaceholder: "区切り文字（例：カンマ、スペース、タブ）...",
      removeEmpty: "空の項目を削除",
      trimResults: "結果をトリム",
      
      // Join operation
      joinDelimiter: "結合区切り文字",
      joinDelimiterPlaceholder: "結合に使用する区切り文字...",
      
      // Remove duplicates
      caseSensitiveComparison: "大文字小文字を区別して比較",
      
      // Sort operation
      direction: "方向",
      ascending: "昇順",
      descending: "降順",
      numericSort: "数値ソート",
      removeEmptyLines: "空行を削除",
      
      // Line numbers operation
      startFrom: "開始番号",
      separator: "区切り文字",
      padWithZeros: "ゼロ埋め",
      
      // Prefix/Suffix operation
      prefix: "接頭辞",
      prefixPlaceholder: "各行の先頭に追加するテキスト...",
      suffix: "接尾辞",
      suffixPlaceholder: "各行の末尾に追加するテキスト...",
      
      // Extract columns operation
      columnDelimiter: "列区切り文字",
      columnDelimiterPlaceholder: "区切り文字（例：カンマ、タブ）...",
      columnNumbers: "列番号",
      columnNumbersPlaceholder: "例：1,3,5",
      
      // Input/Output
      inputText: "入力テキスト",
      inputPlaceholder: "処理するテキストを入力...",
      outputText: "出力テキスト",
      outputPlaceholder: "処理結果がここに表示されます...",
      
      // Stats
      inputStats: "入力: {{chars}} 文字、{{lines}} 行",
      outputStats: "出力: {{chars}} 文字、{{lines}} 行",
      emptyLinesCount: "空行: {{count}}",
      longestLine: "最長行: {{length}} 文字",
      
      // Messages
      enterTextPrompt: "上記にテキストを入力して文字列ユーティリティで処理してください",
      processingError: "処理エラー",
      
      // Errors
      errors: {
        invalidOperation: "無効な操作",
        processingFailed: "処理に失敗しました",
        unknownError: "不明なエラー"
      }
    }
  }
}