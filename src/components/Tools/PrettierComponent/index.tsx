import { useState, useEffect } from 'react';

import { useClipboard } from '@chakra-ui/react';
import { format as prettify } from 'prettier/standalone';
const plugins = [require('prettier/parser-babel'), require('prettier/parser-yaml'), require('@prettier/plugin-xml'), require('prettier-plugin-sql')];

import { Block } from '@/components/Common/Block';
import { ToolLayout } from '@layouts/ToolLayout';
import { TextBox } from '@/components/Common/TextBox';

export type LanguageType = 'sql' | 'xml' | 'jsx';

type PrettierComponentProps = {
  title: string;
  lang: LanguageType;
};

const langSwitch = async (lang: LanguageType) => {
  switch (lang) {
    case 'xml':
      return;
  }
  return [];
};

export const PrettierComponent = (props: PrettierComponentProps) => {
  const { title, lang } = props;

  const [input, setInput] = useState<string>('');
  const [output, setOutput] = useState<string>('');
  const { hasCopied, onCopy } = useClipboard(output);

  const handleChange = (value: string) => setInput(value);
  useEffect(() => {
    const f = async () => {
      if (input === '' || !lang) {
        setOutput('');
        return;
      }
      try {
        setOutput(prettify(input, { semi: false, parser: lang, plugins: plugins }));
      } catch (e: any) {
        setOutput(e.message);
      }
    };
    f();
  }, [input, lang]);

  return (
    <ToolLayout title={title} columns={{ sm: 1, md: 2 }}>
      <Block title='Input'>
        <TextBox value={input} language={lang} height='auto' onChange={handleChange} minHeight={'100px'} />
      </Block>
      <Block title='Output'>
        <TextBox value={output} language={lang} editable={false} height='auto' minHeight={'100px'} />
      </Block>
    </ToolLayout>
  );
};
