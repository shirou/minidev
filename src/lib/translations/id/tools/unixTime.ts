export const unixTimeId = {
  tools: {
    toUnixTime: {
      title: "Konverter ke Unix Time",
      description: "Konversi tanggal yang dapat dibaca manusia ke timestamp Unix",
      inputLabel: "Input Tanggal/Waktu",
      outputLabel: "Timestamp Unix",
      convertButton: "Konversi ke Unix Time",
      currentTimeButton: "Gunakan Waktu Sekarang",
      placeholder: "Masukkan tanggal (misal: 2024-01-01 12:00:00, 2024-01-01T12:00:00Z)",
      examples: "Contoh",
      exampleFormats: [
        "2024-01-01 12:00:00",
        "2024-01-01T12:00:00Z", 
        "1 Januari 2024 12:00:00",
        "01/01/2024 12:00:00"
      ],
      precision: "Presisi",
      precisionOptions: {
        seconds: "Detik",
        milliseconds: "Milidetik", 
        microseconds: "Mikrodetik"
      },
      dateTimeInputs: "Input Tanggal & Waktu",
      year: "Tahun",
      month: "Bulan",
      day: "Hari",
      hour: "Jam",
      minute: "Menit",
      second: "Detik",
      textInput: "Input Teks",
      results: "Hasil",
      utcTime: "Waktu UTC",
      localTime: "Waktu Lokal",
      isoFormat: "Format ISO"
    },
    fromUnixTime: {
      title: "Konverter dari Unix Time",
      description: "Konversi timestamp Unix ke tanggal yang dapat dibaca manusia",
      inputLabel: "Timestamp Unix",
      outputLabel: "Tanggal/Waktu",
      convertButton: "Konversi ke Tanggal",
      currentTimeButton: "Gunakan Waktu Sekarang",
      placeholder: "Masukkan timestamp Unix (misal: 1704110400)",
      formatLabel: "Format Output",
      formats: {
        iso: "ISO 8601 (2024-01-01T12:00:00.000Z)",
        local: "Lokal (01/01/2024, 12:00:00 PM)",
        utc: "UTC (Sen, 01 Jan 2024 12:00:00 GMT)"
      },
      precision: "Presisi",
      precisionOptions: {
        seconds: "Detik",
        milliseconds: "Milidetik",
        microseconds: "Mikrodetik"
      },
      timestampInput: "Input Timestamp",
      results: "Hasil",
      utcTime: "Waktu UTC",
      localTime: "Waktu Lokal",
      isoFormat: "Format ISO"
    }
  }
}