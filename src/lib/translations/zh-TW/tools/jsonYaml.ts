export const jsonYamlZhTW = {
  tools: {
    jsonToYaml: {
      title: "JSON 轉 YAML 轉換器",
      description: "將 JSON 資料轉換為 YAML 格式",
      inputLabel: "JSON 輸入",
      outputLabel: "YAML 輸出",
      convertButton: "轉換為 YAML",
      placeholder: "在此貼上您的 JSON...",
      example: '{\n  "name": "example",\n  "version": "1.0.0",\n  "dependencies": {\n    "react": "^18.0.0"\n  }\n}'
    },
    yamlToJson: {
      title: "YAML 轉 JSON 轉換器", 
      description: "將 YAML 資料轉換為 JSON 格式",
      inputLabel: "YAML 輸入",
      outputLabel: "JSON 輸出",
      convertButton: "轉換為 JSON",
      placeholder: "在此貼上您的 YAML...",
      prettifyLabel: "美化輸出 JSON",
      example: 'name: example\nversion: 1.0.0\ndependencies:\n  react: ^18.0.0'
    }
  }
}