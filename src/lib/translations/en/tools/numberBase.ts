export const numberBaseEn = {
  tools: {
    numberBase: {
      title: "Number Base Converter",
      description: "Convert numbers between different bases (binary, octal, decimal, hexadecimal)",
      
      inputNumber: "Input Number",
      placeholder: "Enter a number to convert...",
      fromBase: "From Base",
      baseLabel: "Base",
      showPrefixes: "Show prefixes (0x, 0b, 0o)",
      
      bases: {
        binary: "Binary",
        octal: "Octal", 
        decimal: "Decimal",
        hexadecimal: "Hexadecimal"
      },
      
      descriptions: {
        binary: "Uses digits 0-1",
        octal: "Uses digits 0-7",
        decimal: "Uses digits 0-9",
        hexadecimal: "Uses digits 0-9, A-F"
      },
      
      tryExamples: "Try these examples:",
      examples: {
        decimal: "Decimal",
        hexWithPrefix: "Hexadecimal with prefix",
        binary: "Binary",
        octalWithPrefix: "Octal with prefix",
        commonDecimal: "Common decimal"
      },
      
      lengthDigits: "Length: {{length}} digits",
      enterNumberPrompt: "Enter a number above to see conversions to all bases",
      
      information: "Information",
      info: {
        binary: "Binary (Base 2): Uses only 0 and 1",
        octal: "Octal (Base 8): Uses digits 0-7", 
        decimal: "Decimal (Base 10): Uses digits 0-9 (normal numbers)",
        hexadecimal: "Hexadecimal (Base 16): Uses digits 0-9 and letters A-F",
        prefixes: "Prefixes: 0b (binary), 0o (octal), 0x (hexadecimal) are optional"
      },
      
      errors: {
        tooLarge: "Number is too large for safe conversion",
        someConversionsFailed: "Some conversions failed: {{failures}}",
        unknownError: "Unknown error occurred",
        conversionFailed: "Conversion failed"
      }
    }
  }
}