import { useClipboard } from '@chakra-ui/react';
import { useState, useEffect } from 'react';

import { Block }from '@/components/Common/Block';
import { NumberInputForm } from '@components/Input/NumberInputForm';
import { ToolLayout } from '@layouts/ToolLayout';
import { getMeta } from '@/toolList';
import { AutoResizeTextarea } from '@/components/AutoResizeTextarea';

type ConvertType = 'toYAML' | 'toJSON';
const defaultIndent = 2;

export const Meta = getMeta('JSONtoYAML');

type JsonYamlComponentProps = {
  convertType: ConvertType;
};

export const JsonYamlComponent = (props: JsonYamlComponentProps) => {
  const { convertType } = props;
  const [input, setInput] = useState<string>('');
  const [output, setOutput] = useState<string>('');
  const [indent, setIndent] = useState<number>(defaultIndent);
  const { hasCopied, onCopy } = useClipboard(output);

  const handleChange = (e: any) => setInput(e.currentTarget.value);
  const handleOptIndentChange = (valueAsString: string, valueAsNumber: number) => setIndent(valueAsNumber);

  useEffect(() => {
    const f = async () => {
      const { toJson, toYaml } = await import('@/utils/json-yaml');
      if (input === '') {
        setOutput('');
        return;
      }
      try {
        if (convertType === 'toYAML') {
          setOutput(toYaml(input, indent));
        } else {
          setOutput(toJson(input, indent));
        }
      } catch (e: any) {
        setOutput(e.message);
      }
    };
    f();
  }, [input, indent, convertType]);

  return (
    <ToolLayout title={Meta?.title} columns={{ sm: 1, md: 2 }}>
      <Block title='Input'>
        <AutoResizeTextarea value={input} h='auto' onChange={handleChange} minH={'100px'} />
      </Block>
      <Block title='Output'>
        <AutoResizeTextarea value={output} isReadOnly h='auto' minH={'100px'} />
      </Block>
      <Block title='Config'>
        <NumberInputForm label={'Length'} value={indent} min={0} max={16} onChange={handleOptIndentChange} />
      </Block>
    </ToolLayout>
  );
};

const JsonYaml = () => <JsonYamlComponent convertType={'toYAML'} />;

export default JsonYaml;
