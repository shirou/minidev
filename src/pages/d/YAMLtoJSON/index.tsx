import { JsonYamlComponent } from '@components/Tools/JsonYamlComponent';
import { getMeta } from '@/toolList';

export const Meta = getMeta('YAMLtoJSON');

const YamlJson = () => <JsonYamlComponent title={Meta?.title ?? ''} convertType={'toJSON'} />;

export default YamlJson;
