export const wordCounterZhTW = {
  tools: {
    wordCounter: {
      title: "字數計算器",
      description: "分析文字統計資料，包括字數、字元數和可讀性",
      
      // Input section
      textInput: "文字輸入",
      uploadFile: "上傳檔案",
      placeholder: "在此輸入或貼上您的文字進行分析...",
      fileTypeError: "請選擇文字檔案（.txt、.md 等）",
      
      // Statistics
      characters: "字元",
      charactersNoSpaces: "字元（不含空格）",
      words: "單詞",
      sentences: "句子",
      paragraphs: "段落",
      lines: "行數",
      readingTime: "閱讀時間",
      speakingTime: "演講時間",
      readability: "可讀性",
      
      // Analysis
      mostFrequentWords: "最常見的單詞",
      readabilityAnalysis: "可讀性分析",
      readingLevel: "閱讀水準",
      noSignificantWords: "未找到重要單詞",
      
      // Export
      exportStatistics: "匯出統計資料",
      copySummary: "複製摘要",
      textStatistics: "文字統計資料",
      
      // Help
      enterTextPrompt: "在上方輸入一些文字以查看詳細分析",
      howItWorks: "運作方式：",
      realTimeAnalysisLabel: "即時分析：",
      realTimeDescription: "統計資料會隨著您輸入而更新",
      readingTimeLabel: "閱讀時間：",
      readingTimeDescription: "基於平均閱讀速度 200 單詞/分鐘",
      speakingTimeLabel: "演講時間：",
      speakingTimeDescription: "基於平均演講速度 150 單詞/分鐘",
      readabilityScoreLabel: "可讀性分數：",
      readabilityScoreDescription: "使用 Flesch 閱讀易度公式",
      wordFrequencyLabel: "詞頻：",
      wordFrequencyDescription: "排除常見單詞（the、and、of 等）",
      
      // Stats with parameters
      withoutSpaces: "{{count}} 不含空格",
      longest: "最長：\"{{word}}\"",
      wordsPerSentence: "{{avg}} 單詞/句子",
      sentencesPerParagraph: "{{avg}} 句子/段落",
      bytes: "{{count}} 位元組",
      readingSpeed: "~200 單詞/分鐘",
      speakingSpeed: "~150 單詞/分鐘",
      scoreValue: "{{score}} 分",
      scoreOutOf100: "分數：{{score}}/100",
      averageWordsPerSentenceValue: "平均每句單詞數：{{avg}}",
      averageSentencesPerParagraphValue: "平均每段句子數：{{avg}}",
      shortestWordValue: "最短單詞：\"{{word}}\""
    }
  }
}