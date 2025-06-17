export const numberBaseId = {
  tools: {
    numberBase: {
      title: "Konverter Basis Bilangan",
      description: "Konversi bilangan antara basis yang berbeda (biner, oktal, desimal, heksadesimal)",
      
      inputNumber: "Bilangan Input",
      placeholder: "Masukkan bilangan untuk dikonversi...",
      fromBase: "Dari Basis",
      baseLabel: "Basis",
      showPrefixes: "Tampilkan prefiks (0x, 0b, 0o)",
      
      bases: {
        binary: "Biner",
        octal: "Oktal", 
        decimal: "Desimal",
        hexadecimal: "Heksadesimal"
      },
      
      descriptions: {
        binary: "Menggunakan digit 0-1",
        octal: "Menggunakan digit 0-7",
        decimal: "Menggunakan digit 0-9",
        hexadecimal: "Menggunakan digit 0-9, A-F"
      },
      
      tryExamples: "Coba contoh berikut:",
      examples: {
        decimal: "Desimal",
        hexWithPrefix: "Heksadesimal dengan prefiks",
        binary: "Biner",
        octalWithPrefix: "Oktal dengan prefiks",
        commonDecimal: "Desimal umum"
      },
      
      lengthDigits: "Panjang: {{length}} digit",
      enterNumberPrompt: "Masukkan bilangan di atas untuk melihat konversi ke semua basis",
      
      information: "Informasi",
      info: {
        binary: "Biner (Basis 2): Hanya menggunakan 0 dan 1",
        octal: "Oktal (Basis 8): Menggunakan digit 0-7", 
        decimal: "Desimal (Basis 10): Menggunakan digit 0-9 (bilangan normal)",
        hexadecimal: "Heksadesimal (Basis 16): Menggunakan digit 0-9 dan huruf A-F",
        prefixes: "Prefiks: 0b (biner), 0o (oktal), 0x (heksadesimal) bersifat opsional"
      },
      
      errors: {
        tooLarge: "Bilangan terlalu besar untuk konversi yang aman",
        someConversionsFailed: "Beberapa konversi gagal: {{failures}}",
        unknownError: "Terjadi kesalahan tidak diketahui",
        conversionFailed: "Konversi gagal"
      }
    }
  }
}