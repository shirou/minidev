export const jsonYamlJa = {
  tools: {
    jsonToYaml: {
      title: "JSON to YAML 変換",
      description: "JSONデータをYAML形式に変換",
      inputLabel: "JSON入力",
      outputLabel: "YAML出力",
      convertButton: "YAMLに変換",
      placeholder: "JSONをここに貼り付けてください...",
      example: '{\n  "name": "example",\n  "version": "1.0.0",\n  "dependencies": {\n    "react": "^18.0.0"\n  }\n}'
    },
    yamlToJson: {
      title: "YAML to JSON 変換",
      description: "YAMLデータをJSON形式に変換", 
      inputLabel: "YAML入力",
      outputLabel: "JSON出力",
      convertButton: "JSONに変換",
      placeholder: "YAMLをここに貼り付けてください...",
      prettifyLabel: "JSONを整形表示",
      example: 'name: example\nversion: 1.0.0\ndependencies:\n  react: ^18.0.0'
    }
  }
}