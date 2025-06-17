export const temperatureId = {
  tools: {
    temperature: {
      title: "Konverter Suhu",
      description: "Konversi suhu antara Celsius, Fahrenheit, Kelvin, dan Rankine",
      
      temperatureValue: "Nilai Suhu",
      placeholder: "Masukkan suhu...",
      fromUnit: "Dari Satuan",
      
      units: {
        celsius: "Celsius (°C)",
        fahrenheit: "Fahrenheit (°F)",
        kelvin: "Kelvin (K)",  
        rankine: "Rankine (°R)"
      },
      
      closestReference: "Referensi Terdekat",
      difference: "Perbedaan",
      commonReferences: "Referensi Suhu Umum",
      enterTemperaturePrompt: "Masukkan nilai suhu di atas untuk melihat konversi",
      
      temperatureScales: "Skala Suhu",
      scaleInfo: {
        celsius: "Air membeku pada 0°, mendidih pada 100°",
        fahrenheit: "Air membeku pada 32°, mendidih pada 212°",
        kelvin: "Skala suhu absolut, 0K = nol absolut",
        rankine: "Skala absolut berdasarkan derajat Fahrenheit"
      },
      
      empty: "(kosong)",
      
      references: {
        absolutezero: "Nol Absolut",
        liquidnitrogen: "Nitrogen Cair", 
        dryice: "Es Kering",
        waterfreezing: "Titik Beku Air",
        roomtemperature: "Suhu Ruangan",
        humanbody: "Tubuh Manusia",
        waterboiling: "Titik Didih Air",
        paperignition: "Titik Nyala Kertas",
        leadmelting: "Titik Leleh Timah",
        sunsurface: "Permukaan Matahari"
      },
      
      referenceDescriptions: {
        absolutezero: "Suhu terdingin yang mungkin",
        liquidnitrogen: "Titik didih",
        dryice: "Titik sublimasi", 
        waterfreezing: "Titik beku air",
        roomtemperature: "Suhu dalam ruangan biasa",
        humanbody: "Suhu tubuh normal",
        waterboiling: "Titik didih air di permukaan laut",
        paperignition: "Suhu nyala otomatis",
        leadmelting: "Titik leleh timah",
        sunsurface: "Suhu permukaan Matahari"
      },
      
      errors: {
        invalidNumber: "Harap masukkan angka yang valid",
        invalidTemperature: "Suhu tidak valid",
        someConversionsFailed: "Beberapa konversi gagal: {{failures}}",
        unknownError: "Kesalahan tidak diketahui",
        conversionFailed: "Konversi gagal"
      }
    }
  }
}