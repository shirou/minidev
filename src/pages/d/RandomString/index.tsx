import { useState, useEffect } from 'react';

import { FormControl, FormLabel, VStack, CheckboxGroup, Checkbox, Code } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { NumberInputForm } from '@components/Input/NumberInputForm';
import { Block } from '@/components/Common/Block';
import { ToolLayout } from '@layouts/ToolLayout';
import range from '@utils/range';
import { getMeta } from '@/toolList';
import { TextBox } from '@/components/Common/TextBox';

const defaultLength = 13;
const defaultRow = 5;
const maxLength = 120;

const misreadRegex = /[iloqILOQ019!]/g;
const poolNumber = '0123456789';
const poolLower = 'abcdefghijklmnopqrstuvwxyz';
const poolUpper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const poolSpecial = '!@#$%^&*';

export const Meta = getMeta('RandomString');

const RandomString = () => {
  const { t } = useTranslation('RandomString');
  const [output, setOutput] = useState<string>('');
  const [optLength, setOptLength] = useState<number>(defaultLength);
  const [optRow, setOptRow] = useState<number>(defaultRow);
  const [flags, setFlags] = useState<string[]>(['number', 'upper', 'lower', 'special']);

  const handleOptLengthChange = (valueAsString: string, valueAsNumber: number) => setOptLength(valueAsNumber);
  const handleOptRowChange = (valueAsString: string, valueAsNumber: number) => setOptRow(valueAsNumber);

  useEffect(() => {
    const f = async () => {
      if (flags.length === 0) {
        return '';
      }
      // create character pool
      let pool = flags.reduce((p: string, flag: string) => {
        switch (flag) {
          case 'number':
            return p + poolNumber;
          case 'upper':
            return p + poolUpper;
          case 'lower':
            return p + poolLower;
          case 'special':
            return p + poolSpecial;
          default:
            return p;
        }
      }, '');
      if (flags.includes('avoid')) {
        pool = pool.replace(misreadRegex, '');
      }
      const len = pool.length;
      const out = range(1, optRow)
        .map(() => {
          return range(1, optLength)
            .map(() => {
              // pick random char from pool
              return pool.charAt(Math.floor(Math.random() * len));
            })
            .join('');
        })
        .join('\n');
      setOutput(out);
    };
    f();
  }, [optLength, optRow, flags]);

  return (
    <ToolLayout title={t('title')} columns={{ sm: 1, md: 2 }}>
      <Block title='Output'>
        <TextBox value={output} language={undefined} editable={false} height='auto' />
      </Block>

      <Block title='Config' w='300px'>
        <NumberInputForm label={'Length'} value={optLength} min={1} max={maxLength} onChange={handleOptLengthChange} />
        <NumberInputForm label={'Row'} value={optRow} min={1} max={maxLength} onChange={handleOptRowChange} />

        <FormControl as='fieldset'>
          <FormLabel as='legend'>Character</FormLabel>
          <VStack spacing={2} align={'left'} ml='5%'>
            <CheckboxGroup defaultValue={flags} onChange={(value) => setFlags(value as string[])}>
              <Checkbox defaultChecked value='number'>
                0-9
              </Checkbox>
              <Checkbox defaultChecked value='lower'>
                a-z
              </Checkbox>
              <Checkbox defaultChecked value='upper'>
                A-Z
              </Checkbox>
              <Checkbox defaultChecked value='special'>
                !@#$%^&*
              </Checkbox>
              <Checkbox value='avoid'>
                Avoid letters that can be mistaken (<Code>iloqILOQ019!</Code>)
              </Checkbox>
            </CheckboxGroup>
          </VStack>
        </FormControl>
      </Block>
    </ToolLayout>
  );
};

export default RandomString;
