import { PrettierComponent } from '@components/Tools/PrettierComponent';
import { getMeta } from '@/toolList';

export const Meta = getMeta('XMLFormatter');

const formatter = () => <PrettierComponent title={Meta?.title ?? ''} lang={'xml'} />;

export default formatter;
