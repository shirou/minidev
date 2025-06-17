export const stringUtilsEn = {
  tools: {
    stringUtils: {
      title: "String Utilities",
      description: "Various string manipulation tools and utilities",
      
      operation: "Operation",
      swapIO: "Swap I/O",
      
      operations: {
        trim: "Trim Whitespace",
        removeWhitespace: "Remove Extra Whitespace", 
        replace: "Find & Replace",
        split: "Split Text",
        join: "Join Lines",
        removeDuplicates: "Remove Duplicate Lines",
        sort: "Sort Lines",
        lineNumbers: "Add Line Numbers",
        prefixSuffix: "Add Prefix/Suffix",
        extractColumns: "Extract Columns"
      },
      
      // Trim operation
      trimType: "Trim Type",
      trimOptions: {
        both: "Both ends",
        start: "Start only",
        end: "End only"
      },
      
      // Replace operation
      find: "Find",
      findPlaceholder: "Text to find...",
      replaceWith: "Replace with",
      replacePlaceholder: "Replacement text...",
      caseSensitive: "Case sensitive",
      wholeWordsOnly: "Whole words only",
      useRegex: "Use regex",
      replaceAll: "Replace all",
      
      // Split operation
      delimiter: "Delimiter",
      delimiterPlaceholder: "Delimiter (e.g., comma, space, tab)...",
      removeEmpty: "Remove empty",
      trimResults: "Trim results",
      
      // Join operation
      joinDelimiter: "Join Delimiter",
      joinDelimiterPlaceholder: "Delimiter to join with...",
      
      // Remove duplicates
      caseSensitiveComparison: "Case sensitive comparison",
      
      // Sort operation
      direction: "Direction",
      ascending: "Ascending",
      descending: "Descending",
      numericSort: "Numeric sort",
      removeEmptyLines: "Remove empty lines",
      
      // Line numbers operation
      startFrom: "Start from",
      separator: "Separator",
      padWithZeros: "Pad with zeros",
      
      // Prefix/Suffix operation
      prefix: "Prefix",
      prefixPlaceholder: "Text to add at start of each line...",
      suffix: "Suffix",
      suffixPlaceholder: "Text to add at end of each line...",
      
      // Extract columns operation
      columnDelimiter: "Column Delimiter",
      columnDelimiterPlaceholder: "Delimiter (e.g., comma, tab)...",
      columnNumbers: "Column Numbers",
      columnNumbersPlaceholder: "e.g., 1,3,5",
      
      // Input/Output
      inputText: "Input Text",
      inputPlaceholder: "Enter text to process...",
      outputText: "Output Text",
      outputPlaceholder: "Processed output will appear here...",
      
      // Stats
      inputStats: "Input: {{chars}} characters, {{lines}} lines",
      outputStats: "Output: {{chars}} characters, {{lines}} lines",
      emptyLinesCount: "Empty lines: {{count}}",
      longestLine: "Longest line: {{length}} characters",
      
      // Messages
      enterTextPrompt: "Enter some text above to process with string utilities",
      processingError: "Processing Error",
      
      // Errors
      errors: {
        invalidOperation: "Invalid operation",
        processingFailed: "Processing failed",
        unknownError: "Unknown error"
      }
    }
  }
}