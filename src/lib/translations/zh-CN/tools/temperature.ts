export const temperatureZhCN = {
  tools: {
    temperature: {
      title: "温度转换器",
      description: "在摄氏度、华氏度、开尔文和兰氏度之间转换温度",
      
      temperatureValue: "温度值",
      placeholder: "输入温度...",
      fromUnit: "从单位",
      
      units: {
        celsius: "摄氏度 (°C)",
        fahrenheit: "华氏度 (°F)",
        kelvin: "开尔文 (K)",  
        rankine: "兰氏度 (°R)"
      },
      
      closestReference: "最接近的参考",
      difference: "差值",
      commonReferences: "常见温度参考",
      enterTemperaturePrompt: "在上方输入温度值以查看转换",
      
      temperatureScales: "温度标尺",
      scaleInfo: {
        celsius: "水在 0° 结冰，100° 沸腾",
        fahrenheit: "水在 32° 结冰，212° 沸腾",
        kelvin: "绝对温度标尺，0K = 绝对零度",
        rankine: "基于华氏度的绝对标尺"
      },
      
      empty: "（空）",
      
      references: {
        absolutezero: "绝对零度",
        liquidnitrogen: "液氮", 
        dryice: "干冰",
        waterfreezing: "水的冰点",
        roomtemperature: "室温",
        humanbody: "人体温度",
        waterboiling: "水的沸点",
        paperignition: "纸的燃点",
        leadmelting: "铅的熔点",
        sunsurface: "太阳表面"
      },
      
      referenceDescriptions: {
        absolutezero: "最低可能温度",
        liquidnitrogen: "沸点",
        dryice: "升华点", 
        waterfreezing: "水的冰点",
        roomtemperature: "典型室内温度",
        humanbody: "正常体温",
        waterboiling: "海平面水的沸点",
        paperignition: "自燃温度",
        leadmelting: "铅的熔点",
        sunsurface: "太阳表面温度"
      },
      
      errors: {
        invalidNumber: "请输入有效数字",
        invalidTemperature: "无效温度",
        someConversionsFailed: "部分转换失败：{{failures}}",
        unknownError: "未知错误",
        conversionFailed: "转换失败"
      }
    }
  }
}