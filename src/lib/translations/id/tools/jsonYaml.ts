export const jsonYamlId = {
  tools: {
    jsonToYaml: {
      title: "Konverter JSON ke YAML",
      description: "Konversi data JSON ke format YAML",
      inputLabel: "Input JSON",
      outputLabel: "Output YAML",
      convertButton: "Konversi ke YAML",
      placeholder: "Tempel JSON Anda di sini...",
      example: '{\n  "name": "contoh",\n  "version": "1.0.0",\n  "dependencies": {\n    "react": "^18.0.0"\n  }\n}'
    },
    yamlToJson: {
      title: "Konverter YAML ke JSON", 
      description: "Konversi data YAML ke format JSON",
      inputLabel: "Input YAML",
      outputLabel: "Output JSON",
      convertButton: "Konversi ke JSON",
      placeholder: "Tempel YAML Anda di sini...",
      prettifyLabel: "Cetak cantik JSON",
      example: 'name: contoh\nversion: 1.0.0\ndependencies:\n  react: ^18.0.0'
    }
  }
}