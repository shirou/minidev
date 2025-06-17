export const jsonYamlZhCN = {
  tools: {
    jsonToYaml: {
      title: "JSON 转 YAML 转换器",
      description: "将 JSON 数据转换为 YAML 格式",
      inputLabel: "JSON 输入",
      outputLabel: "YAML 输出",
      convertButton: "转换为 YAML",
      placeholder: "在此粘贴您的 JSON...",
      example: '{\n  "name": "example",\n  "version": "1.0.0",\n  "dependencies": {\n    "react": "^18.0.0"\n  }\n}'
    },
    yamlToJson: {
      title: "YAML 转 JSON 转换器", 
      description: "将 YAML 数据转换为 JSON 格式",
      inputLabel: "YAML 输入",
      outputLabel: "JSON 输出",
      convertButton: "转换为 JSON",
      placeholder: "在此粘贴您的 YAML...",
      prettifyLabel: "美化 JSON",
      example: 'name: example\nversion: 1.0.0\ndependencies:\n  react: ^18.0.0'
    }
  }
}