/*------  Add here  -------------*/
// Note: Please divide tools into as fine a granularity as possible.
const toolList: { [key: string]: toolMeta } = {
  RandomString: {
    title: 'Random String',
    description: 'Generate random string',
  },
  JSONtoYAML: {
    title: 'JSON to YAML',
    description: 'Convert JSON to YAML',
  },
  YAMLtoJSON: {
    title: 'YAML to JSON',
    description: 'Convert YAML to JSON',
  },
  UnixTime: {
    title: 'Unix Time',
    description: 'Convert unix timestamp',
  },
};

/*------  exported functions. Do not touch  -------------*/
type toolMeta = Omit<MetaData, 'key'>; // key should be add after metadata.getMeta

export type MetaData = {
  key: string;
  title: string;
  description?: string;
  author?: string;
};

export const getMeta = (key: string): MetaData | undefined => {
  const t = toolList[key];
  return t ? { key: key, ...t } : undefined;
};

export const getAllListAsDict = () => {
  return toolList;
};

export const getAllToolAsList = () => {
  return Object.keys(toolList).map((key: string) => {
    const t = toolList[key];
    return { key: key, ...t };
  });
};
