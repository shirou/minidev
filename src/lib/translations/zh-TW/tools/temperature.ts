export const temperatureZhTW = {
  tools: {
    temperature: {
      title: "溫度轉換器",
      description: "在攝氏、華氏、克耳文和蘭氏之間轉換溫度",
      
      temperatureValue: "溫度值",
      placeholder: "輸入溫度...",
      fromUnit: "來源單位",
      
      units: {
        celsius: "攝氏 (°C)",
        fahrenheit: "華氏 (°F)",
        kelvin: "克耳文 (K)",  
        rankine: "蘭氏 (°R)"
      },
      
      closestReference: "最接近的參考",
      difference: "差異",
      commonReferences: "常見溫度參考",
      enterTemperaturePrompt: "在上方輸入溫度值以查看轉換",
      
      temperatureScales: "溫度刻度",
      scaleInfo: {
        celsius: "水在 0° 結冰，在 100° 沸騰",
        fahrenheit: "水在 32° 結冰，在 212° 沸騰",
        kelvin: "絕對溫度刻度，0K = 絕對零度",
        rankine: "基於華氏度的絕對刻度"
      },
      
      empty: "(空白)",
      
      references: {
        absolutezero: "絕對零度",
        liquidnitrogen: "液態氮", 
        dryice: "乾冰",
        waterfreezing: "水的凝固點",
        roomtemperature: "室溫",
        humanbody: "人體溫度",
        waterboiling: "水的沸點",
        paperignition: "紙張燃點",
        leadmelting: "鉛的熔點",
        sunsurface: "太陽表面"
      },
      
      referenceDescriptions: {
        absolutezero: "可能的最低溫度",
        liquidnitrogen: "沸點",
        dryice: "昇華點", 
        waterfreezing: "水的凝固點",
        roomtemperature: "典型的室內溫度",
        humanbody: "正常體溫",
        waterboiling: "海平面水的沸點",
        paperignition: "自燃溫度",
        leadmelting: "鉛的熔點",
        sunsurface: "太陽表面的溫度"
      },
      
      errors: {
        invalidNumber: "請輸入有效的數字",
        invalidTemperature: "無效的溫度",
        someConversionsFailed: "部分轉換失敗：{{failures}}",
        unknownError: "未知錯誤",
        conversionFailed: "轉換失敗"
      }
    }
  }
}