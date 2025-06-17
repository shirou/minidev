export const stringUtilsZhCN = {
  tools: {
    stringUtils: {
      title: "字符串工具",
      description: "各种字符串操作工具和实用程序",
      
      operation: "操作",
      swapIO: "交换输入/输出",
      
      operations: {
        trim: "修剪空白",
        removeWhitespace: "删除多余空白", 
        replace: "查找和替换",
        split: "分割文本",
        join: "连接行",
        removeDuplicates: "删除重复行",
        sort: "排序行",
        lineNumbers: "添加行号",
        prefixSuffix: "添加前缀/后缀",
        extractColumns: "提取列"
      },
      
      // Trim operation
      trimType: "修剪类型",
      trimOptions: {
        both: "两端",
        start: "仅开始",
        end: "仅结束"
      },
      
      // Replace operation
      find: "查找",
      findPlaceholder: "要查找的文本...",
      replaceWith: "替换为",
      replacePlaceholder: "替换文本...",
      caseSensitive: "区分大小写",
      wholeWordsOnly: "仅整个单词",
      useRegex: "使用正则表达式",
      replaceAll: "全部替换",
      
      // Split operation
      delimiter: "分隔符",
      delimiterPlaceholder: "分隔符（例如：逗号、空格、制表符）...",
      removeEmpty: "删除空项",
      trimResults: "修剪结果",
      
      // Join operation
      joinDelimiter: "连接分隔符",
      joinDelimiterPlaceholder: "用于连接的分隔符...",
      
      // Remove duplicates
      caseSensitiveComparison: "区分大小写比较",
      
      // Sort operation
      direction: "方向",
      ascending: "升序",
      descending: "降序",
      numericSort: "数字排序",
      removeEmptyLines: "删除空行",
      
      // Line numbers operation
      startFrom: "起始编号",
      separator: "分隔符",
      padWithZeros: "用零填充",
      
      // Prefix/Suffix operation
      prefix: "前缀",
      prefixPlaceholder: "在每行开始添加的文本...",
      suffix: "后缀",
      suffixPlaceholder: "在每行结尾添加的文本...",
      
      // Extract columns operation
      columnDelimiter: "列分隔符",
      columnDelimiterPlaceholder: "分隔符（例如：逗号、制表符）...",
      columnNumbers: "列号",
      columnNumbersPlaceholder: "例如：1,3,5",
      
      // Input/Output
      inputText: "输入文本",
      inputPlaceholder: "输入要处理的文本...",
      outputText: "输出文本",
      outputPlaceholder: "处理后的输出将显示在这里...",
      
      // Stats
      inputStats: "输入：{{chars}} 个字符，{{lines}} 行",
      outputStats: "输出：{{chars}} 个字符，{{lines}} 行",
      emptyLinesCount: "空行：{{count}}",
      longestLine: "最长行：{{length}} 个字符",
      
      // Messages
      enterTextPrompt: "在上方输入一些文本以使用字符串工具处理",
      processingError: "处理错误",
      
      // Errors
      errors: {
        invalidOperation: "无效操作",
        processingFailed: "处理失败",
        unknownError: "未知错误"
      }
    }
  }
}