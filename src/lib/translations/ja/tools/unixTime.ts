export const unixTimeJa = {
  tools: {
    toUnixTime: {
      title: "Unix時間変換",
      description: "人間が読める日付をUnixタイムスタンプに変換",
      inputLabel: "日付/時刻入力",
      outputLabel: "Unixタイムスタンプ",
      convertButton: "Unix時間に変換",
      currentTimeButton: "現在時刻を使用",
      placeholder: "日付を入力 (例: 2024-01-01 12:00:00, 2024-01-01T12:00:00Z)",
      examples: "例",
      exampleFormats: [
        "2024-01-01 12:00:00",
        "2024-01-01T12:00:00Z",
        "January 1, 2024 12:00:00", 
        "01/01/2024 12:00:00"
      ],
      precision: "精度",
      precisionOptions: {
        seconds: "秒",
        milliseconds: "ミリ秒",
        microseconds: "マイクロ秒"
      },
      dateTimeInputs: "日付・時刻入力",
      year: "年",
      month: "月",
      day: "日",
      hour: "時",
      minute: "分",
      second: "秒",
      textInput: "テキスト入力",
      results: "結果",
      utcTime: "UTC時刻",
      localTime: "ローカル時刻",
      isoFormat: "ISO形式"
    },
    fromUnixTime: {
      title: "Unix時間から変換",
      description: "Unixタイムスタンプを人間が読める日付に変換",
      inputLabel: "Unixタイムスタンプ",
      outputLabel: "日付/時刻",
      convertButton: "日付に変換",
      currentTimeButton: "現在時刻を使用",
      placeholder: "Unixタイムスタンプを入力 (例: 1704110400)",
      formatLabel: "出力形式",
      formats: {
        iso: "ISO 8601 (2024-01-01T12:00:00.000Z)",
        local: "ローカル (2024/01/01 12:00:00)",
        utc: "UTC (Mon, 01 Jan 2024 12:00:00 GMT)"
      },
      precision: "精度",
      precisionOptions: {
        seconds: "秒",
        milliseconds: "ミリ秒",
        microseconds: "マイクロ秒"
      },
      timestampInput: "タイムスタンプ入力",
      results: "結果",
      utcTime: "UTC時刻",
      localTime: "ローカル時刻",
      isoFormat: "ISO形式"
    }
  }
}