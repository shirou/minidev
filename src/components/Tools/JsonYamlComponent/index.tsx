import { useState, useEffect } from 'react';

import { useClipboard } from '@chakra-ui/react';

import { Block } from '@/components/Common/Block';
import { TextBox } from '@/components/Common/TextBox';
import { NumberInputForm } from '@components/Input/NumberInputForm';
import { ToolLayout } from '@layouts/ToolLayout';

type ConvertType = 'toYAML' | 'toJSON';
const defaultIndent = 2;

type JsonYamlComponentProps = {
  title: string;
  convertType: ConvertType;
};

export const JsonYamlComponent = (props: JsonYamlComponentProps) => {
  const { title, convertType } = props;
  const [input, setInput] = useState<string>('');
  const [output, setOutput] = useState<string>('');
  const [indent, setIndent] = useState<number>(defaultIndent);
  const { hasCopied, onCopy } = useClipboard(output);

  const handleChange = (value: string) => setInput(value);
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

  const inLang = convertType === 'toJSON' ? 'yaml' : 'json';
  const outLang = convertType === 'toJSON' ? 'json' : 'yaml';

  return (
    <ToolLayout title={title} columns={{ sm: 1, md: 2 }}>
      <Block title='Input'>
        <TextBox value={input} language={inLang} height='auto' onChange={handleChange} minHeight={'100px'} />
      </Block>
      <Block title='Output'>
        <TextBox value={output} language={outLang} editable={false} height='auto' minHeight={'100px'} />
      </Block>
      <Block title='Config'>
        <NumberInputForm label={'Indent'} value={indent} min={0} max={16} onChange={handleOptIndentChange} />
      </Block>
    </ToolLayout>
  );
};

JsonYamlComponent;
