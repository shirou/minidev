import { JsonYamlComponent } from '@components/Tools/JsonYamlComponent';
import { getMeta } from '@/toolList';

export const Meta = getMeta('JSONtoYAML');

const JsonYaml = () => <JsonYamlComponent title={Meta?.title ?? ''} convertType={'toYAML'} />;

export default JsonYaml;
