export const stringUtilsZhTW = {
  tools: {
    stringUtils: {
      title: "字串工具",
      description: "各種字串操作工具和實用程式",
      
      operation: "操作",
      swapIO: "交換輸入/輸出",
      
      operations: {
        trim: "修剪空白",
        removeWhitespace: "移除多餘空白", 
        replace: "尋找與取代",
        split: "分割文字",
        join: "合併行",
        removeDuplicates: "移除重複行",
        sort: "排序行",
        lineNumbers: "新增行號",
        prefixSuffix: "新增前綴/後綴",
        extractColumns: "擷取欄位"
      },
      
      // Trim operation
      trimType: "修剪類型",
      trimOptions: {
        both: "兩端",
        start: "僅開頭",
        end: "僅結尾"
      },
      
      // Replace operation
      find: "尋找",
      findPlaceholder: "要尋找的文字...",
      replaceWith: "取代為",
      replacePlaceholder: "取代文字...",
      caseSensitive: "區分大小寫",
      wholeWordsOnly: "僅完整單詞",
      useRegex: "使用正規表達式",
      replaceAll: "全部取代",
      
      // Split operation
      delimiter: "分隔符",
      delimiterPlaceholder: "分隔符（例如：逗號、空格、Tab）...",
      removeEmpty: "移除空白",
      trimResults: "修剪結果",
      
      // Join operation
      joinDelimiter: "合併分隔符",
      joinDelimiterPlaceholder: "用於合併的分隔符...",
      
      // Remove duplicates
      caseSensitiveComparison: "區分大小寫比較",
      
      // Sort operation
      direction: "方向",
      ascending: "升序",
      descending: "降序",
      numericSort: "數字排序",
      removeEmptyLines: "移除空白行",
      
      // Line numbers operation
      startFrom: "起始編號",
      separator: "分隔符",
      padWithZeros: "以零填充",
      
      // Prefix/Suffix operation
      prefix: "前綴",
      prefixPlaceholder: "在每行開頭新增的文字...",
      suffix: "後綴",
      suffixPlaceholder: "在每行結尾新增的文字...",
      
      // Extract columns operation
      columnDelimiter: "欄位分隔符",
      columnDelimiterPlaceholder: "分隔符（例如：逗號、Tab）...",
      columnNumbers: "欄位編號",
      columnNumbersPlaceholder: "例如：1,3,5",
      
      // Input/Output
      inputText: "輸入文字",
      inputPlaceholder: "輸入要處理的文字...",
      outputText: "輸出文字",
      outputPlaceholder: "處理後的輸出將顯示在這裡...",
      
      // Stats
      inputStats: "輸入：{{chars}} 個字元，{{lines}} 行",
      outputStats: "輸出：{{chars}} 個字元，{{lines}} 行",
      emptyLinesCount: "空白行：{{count}}",
      longestLine: "最長行：{{length}} 個字元",
      
      // Messages
      enterTextPrompt: "在上方輸入一些文字以使用字串工具處理",
      processingError: "處理錯誤",
      
      // Errors
      errors: {
        invalidOperation: "無效的操作",
        processingFailed: "處理失敗",
        unknownError: "未知錯誤"
      }
    }
  }
}