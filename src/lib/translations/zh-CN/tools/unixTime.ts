export const unixTimeZhCN = {
  tools: {
    toUnixTime: {
      title: "转换为 Unix 时间",
      description: "将人类可读的日期转换为 Unix 时间戳",
      inputLabel: "日期/时间输入",
      outputLabel: "Unix 时间戳",
      convertButton: "转换为 Unix 时间",
      currentTimeButton: "使用当前时间",
      placeholder: "输入日期（例如：2024-01-01 12:00:00、2024-01-01T12:00:00Z）",
      examples: "示例",
      exampleFormats: [
        "2024-01-01 12:00:00",
        "2024-01-01T12:00:00Z", 
        "January 1, 2024 12:00:00",
        "01/01/2024 12:00:00"
      ],
      precision: "精度",
      precisionOptions: {
        seconds: "秒",
        milliseconds: "毫秒", 
        microseconds: "微秒"
      },
      dateTimeInputs: "日期和时间输入",
      year: "年",
      month: "月",
      day: "日",
      hour: "时",
      minute: "分",
      second: "秒",
      textInput: "文本输入",
      results: "结果",
      utcTime: "UTC 时间",
      localTime: "本地时间",
      isoFormat: "ISO 格式"
    },
    fromUnixTime: {
      title: "从 Unix 时间转换",
      description: "将 Unix 时间戳转换为人类可读的日期",
      inputLabel: "Unix 时间戳",
      outputLabel: "日期/时间",
      convertButton: "转换为日期",
      currentTimeButton: "使用当前时间",
      placeholder: "输入 Unix 时间戳（例如：1704110400）",
      formatLabel: "输出格式",
      formats: {
        iso: "ISO 8601 (2024-01-01T12:00:00.000Z)",
        local: "本地 (01/01/2024, 12:00:00 PM)",
        utc: "UTC (Mon, 01 Jan 2024 12:00:00 GMT)"
      },
      precision: "精度",
      precisionOptions: {
        seconds: "秒",
        milliseconds: "毫秒",
        microseconds: "微秒"
      },
      timestampInput: "时间戳输入",
      results: "结果",
      utcTime: "UTC 时间",
      localTime: "本地时间",
      isoFormat: "ISO 格式"
    }
  }
}