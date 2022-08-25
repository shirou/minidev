import { PrettierComponent } from '@components/Tools/PrettierComponent';
import { getMeta } from '@/toolList';

export const Meta = getMeta('SQLFormatter');

const formatter = () => <PrettierComponent title={Meta?.title ?? ''} lang={'sql'} />;

export default formatter;
