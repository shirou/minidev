import { useState, useEffect } from 'react';

import { useTranslation } from 'react-i18next';

import { Block } from '@/components/Common/Block';
import { ToolLayout } from '@layouts/ToolLayout';
import { getMeta } from '@/toolList';
import { TextBox } from '@/components/Common/TextBox';

export const Meta = getMeta('Base64Decoder');

const Base64Decoder = () => {
  const [input, setInput] = useState<string>('');
  const [output, setOutput] = useState<string>('');

  const handleChange = (value: string) => setInput(value);

  useEffect(() => {
    const f = async () => {
      if (input === '') {
        setOutput('');
        return;
      }
      try {
          setOutput(Buffer.from(input, 'base64').toString());
      } catch (e: any) {
        setOutput(e.message);
      }
    };
    f();
  }, [input]);

  return (
    <ToolLayout title={Meta?.title} columns={{ sm: 1, md: 2 }}>
      <Block title='Input'>
        <TextBox value={input} language={undefined} height='auto' onChange={handleChange} minHeight={'100px'} />
      </Block>
      <Block title='Output'>
        <TextBox value={output} language={undefined} editable={false} height='auto' minHeight={'100px'} />
      </Block>
    </ToolLayout>
  );
};

export default Base64Decoder;
