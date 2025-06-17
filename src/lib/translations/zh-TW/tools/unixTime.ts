export const unixTimeZhTW = {
  tools: {
    toUnixTime: {
      title: "轉換為 Unix 時間",
      description: "將人類可讀的日期轉換為 Unix 時間戳記",
      inputLabel: "日期/時間輸入",
      outputLabel: "Unix 時間戳記",
      convertButton: "轉換為 Unix 時間",
      currentTimeButton: "使用當前時間",
      placeholder: "輸入日期（例如：2024-01-01 12:00:00、2024-01-01T12:00:00Z）",
      examples: "範例",
      exampleFormats: [
        "2024-01-01 12:00:00",
        "2024-01-01T12:00:00Z", 
        "January 1, 2024 12:00:00",
        "01/01/2024 12:00:00"
      ],
      precision: "精確度",
      precisionOptions: {
        seconds: "秒",
        milliseconds: "毫秒", 
        microseconds: "微秒"
      },
      dateTimeInputs: "日期與時間輸入",
      year: "年",
      month: "月",
      day: "日",
      hour: "時",
      minute: "分",
      second: "秒",
      textInput: "文字輸入",
      results: "結果",
      utcTime: "UTC 時間",
      localTime: "本地時間",
      isoFormat: "ISO 格式"
    },
    fromUnixTime: {
      title: "從 Unix 時間轉換",
      description: "將 Unix 時間戳記轉換為人類可讀的日期",
      inputLabel: "Unix 時間戳記",
      outputLabel: "日期/時間",
      convertButton: "轉換為日期",
      currentTimeButton: "使用當前時間",
      placeholder: "輸入 Unix 時間戳記（例如：1704110400）",
      formatLabel: "輸出格式",
      formats: {
        iso: "ISO 8601 (2024-01-01T12:00:00.000Z)",
        local: "本地 (01/01/2024, 12:00:00 PM)",
        utc: "UTC (Mon, 01 Jan 2024 12:00:00 GMT)"
      },
      precision: "精確度",
      precisionOptions: {
        seconds: "秒",
        milliseconds: "毫秒",
        microseconds: "微秒"
      },
      timestampInput: "時間戳記輸入",
      results: "結果",
      utcTime: "UTC 時間",
      localTime: "本地時間",
      isoFormat: "ISO 格式"
    }
  }
}