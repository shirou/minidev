export const temperatureEn = {
  tools: {
    temperature: {
      title: "Temperature Converter",
      description: "Convert temperatures between Celsius, Fahrenheit, Kelvin, and Rankine",
      
      temperatureValue: "Temperature Value",
      placeholder: "Enter temperature...",
      fromUnit: "From Unit",
      
      units: {
        celsius: "Celsius (°C)",
        fahrenheit: "Fahrenheit (°F)",
        kelvin: "Kelvin (K)",  
        rankine: "Rankine (°R)"
      },
      
      closestReference: "Closest Reference",
      difference: "Difference",
      commonReferences: "Common Temperature References",
      enterTemperaturePrompt: "Enter a temperature value above to see conversions",
      
      temperatureScales: "Temperature Scales",
      scaleInfo: {
        celsius: "Water freezes at 0°, boils at 100°",
        fahrenheit: "Water freezes at 32°, boils at 212°",
        kelvin: "Absolute temperature scale, 0K = absolute zero",
        rankine: "Absolute scale based on Fahrenheit degrees"
      },
      
      empty: "(empty)",
      
      references: {
        absolutezero: "Absolute Zero",
        liquidnitrogen: "Liquid Nitrogen", 
        dryice: "Dry Ice",
        waterfreezing: "Water Freezing",
        roomtemperature: "Room Temperature",
        humanbody: "Human Body",
        waterboiling: "Water Boiling",
        paperignition: "Paper Ignition",
        leadmelting: "Lead Melting",
        sunsurface: "Sun Surface"
      },
      
      referenceDescriptions: {
        absolutezero: "Coldest possible temperature",
        liquidnitrogen: "Boiling point",
        dryice: "Sublimation point", 
        waterfreezing: "Freezing point of water",
        roomtemperature: "Typical indoor temperature",
        humanbody: "Normal body temperature",
        waterboiling: "Boiling point of water at sea level",
        paperignition: "Auto-ignition temperature",
        leadmelting: "Melting point of lead",
        sunsurface: "Temperature of the Sun's surface"
      },
      
      errors: {
        invalidNumber: "Please enter a valid number",
        invalidTemperature: "Invalid temperature",
        someConversionsFailed: "Some conversions failed: {{failures}}",
        unknownError: "Unknown error",
        conversionFailed: "Conversion failed"
      }
    }
  }
}