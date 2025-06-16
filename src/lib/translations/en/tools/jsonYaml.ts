export const jsonYamlEn = {
  tools: {
    jsonToYaml: {
      title: "JSON to YAML Converter",
      description: "Convert JSON data to YAML format",
      inputLabel: "JSON Input",
      outputLabel: "YAML Output",
      convertButton: "Convert to YAML",
      placeholder: "Paste your JSON here...",
      example: '{\n  "name": "example",\n  "version": "1.0.0",\n  "dependencies": {\n    "react": "^18.0.0"\n  }\n}'
    },
    yamlToJson: {
      title: "YAML to JSON Converter", 
      description: "Convert YAML data to JSON format",
      inputLabel: "YAML Input",
      outputLabel: "JSON Output",
      convertButton: "Convert to JSON",
      placeholder: "Paste your YAML here...",
      prettifyLabel: "Pretty print JSON",
      example: 'name: example\nversion: 1.0.0\ndependencies:\n  react: ^18.0.0'
    }
  }
}