export const unixTimeEn = {
  tools: {
    toUnixTime: {
      title: "To Unix Time Converter",
      description: "Convert human-readable dates to Unix timestamps",
      inputLabel: "Date/Time Input",
      outputLabel: "Unix Timestamp",
      convertButton: "Convert to Unix Time",
      currentTimeButton: "Use Current Time",
      placeholder: "Enter date (e.g., 2024-01-01 12:00:00, 2024-01-01T12:00:00Z)",
      examples: "Examples",
      exampleFormats: [
        "2024-01-01 12:00:00",
        "2024-01-01T12:00:00Z", 
        "January 1, 2024 12:00:00",
        "01/01/2024 12:00:00"
      ],
      precision: "Precision",
      precisionOptions: {
        seconds: "Seconds",
        milliseconds: "Milliseconds", 
        microseconds: "Microseconds"
      },
      dateTimeInputs: "Date & Time Inputs",
      year: "Year",
      month: "Month",
      day: "Day",
      hour: "Hour",
      minute: "Minute",
      second: "Second",
      textInput: "Text Input",
      results: "Results",
      utcTime: "UTC Time",
      localTime: "Local Time",
      isoFormat: "ISO Format"
    },
    fromUnixTime: {
      title: "From Unix Time Converter",
      description: "Convert Unix timestamps to human-readable dates",
      inputLabel: "Unix Timestamp",
      outputLabel: "Date/Time",
      convertButton: "Convert to Date",
      currentTimeButton: "Use Current Time",
      placeholder: "Enter Unix timestamp (e.g., 1704110400)",
      formatLabel: "Output Format",
      formats: {
        iso: "ISO 8601 (2024-01-01T12:00:00.000Z)",
        local: "Local (01/01/2024, 12:00:00 PM)",
        utc: "UTC (Mon, 01 Jan 2024 12:00:00 GMT)"
      },
      precision: "Precision",
      precisionOptions: {
        seconds: "Seconds",
        milliseconds: "Milliseconds",
        microseconds: "Microseconds"
      },
      timestampInput: "Timestamp Input",
      results: "Results",
      utcTime: "UTC Time",
      localTime: "Local Time",
      isoFormat: "ISO Format"
    }
  }
}