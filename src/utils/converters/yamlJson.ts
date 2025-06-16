import yaml from 'js-yaml'

export interface ConversionResult {
  success: boolean
  result?: string
  error?: string
}

export function convertJsonToYaml(jsonString: string): ConversionResult {
  try {
    const jsonObject = JSON.parse(jsonString)
    const yamlString = yaml.dump(jsonObject, {
      indent: 2,
      lineWidth: -1,
      noRefs: true,
      skipInvalid: false,
    })
    
    return {
      success: true,
      result: yamlString
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }
  }
}

export function convertYamlToJson(yamlString: string, prettify: boolean = true): ConversionResult {
  try {
    const jsonObject = yaml.load(yamlString)
    const jsonString = prettify 
      ? JSON.stringify(jsonObject, null, 2)
      : JSON.stringify(jsonObject)
    
    return {
      success: true,
      result: jsonString
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }
  }
}