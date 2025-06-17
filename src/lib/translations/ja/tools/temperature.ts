export const temperatureJa = {
  tools: {
    temperature: {
      title: "温度変換",
      description: "摂氏、華氏、ケルビン、ランキン度の間で温度を変換",
      
      temperatureValue: "温度値",
      placeholder: "温度を入力...",
      fromUnit: "変換元の単位",
      
      units: {
        celsius: "摂氏（°C）",
        fahrenheit: "華氏（°F）",
        kelvin: "ケルビン（K）",
        rankine: "ランキン（°R）"
      },
      
      closestReference: "最も近い参考値",
      difference: "差",
      commonReferences: "一般的な温度参考値",
      enterTemperaturePrompt: "上記に温度値を入力するとすべての変換が表示されます",
      
      temperatureScales: "温度スケール",
      scaleInfo: {
        celsius: "水が0°で凍り、100°で沸騰",
        fahrenheit: "水が32°で凍り、212°で沸騰",
        kelvin: "絶対温度スケール、0Kは絶対零度",
        rankine: "華氏度に基づく絶対スケール"
      },
      
      empty: "（空）",
      
      references: {
        absolutezero: "絶対零度",
        liquidnitrogen: "液体窒素", 
        dryice: "ドライアイス",
        waterfreezing: "水の氷点",
        roomtemperature: "室温",
        humanbody: "人体温度",
        waterboiling: "水の沸点",
        paperignition: "紙の発火点",
        leadmelting: "鉛の融点",
        sunsurface: "太陽表面"
      },
      
      referenceDescriptions: {
        absolutezero: "最も低い可能温度",
        liquidnitrogen: "沸点",
        dryice: "昇華点", 
        waterfreezing: "水の凍結点",
        roomtemperature: "一般的な室内温度",
        humanbody: "正常体温",
        waterboiling: "海抜での水の沸点",
        paperignition: "自然発火温度",
        leadmelting: "鉛の融点",
        sunsurface: "太陽表面の温度"
      },
      
      errors: {
        invalidNumber: "有効な数値を入力してください",
        invalidTemperature: "無効な温度",
        someConversionsFailed: "一部の変換が失敗しました: {{failures}}",
        unknownError: "不明なエラー",
        conversionFailed: "変換に失敗しました"
      }
    }
  }
}