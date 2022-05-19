import { useState, useEffect } from 'react';
import useClipboard from 'react-use-clipboard';

import { Container, Text, Grid, Spacer, Row, Textarea, Input} from '@nextui-org/react';
import { CopyIconButton } from '@components/Common/CopyIconButton';

import { DefaultLayout } from '@layouts/default';
import range from '@utils/range';
import { MetaData } from '@pages/metadata';

const defaultLength = 13;
const defaultRow = 5;
const maxLength = 120;

const misreadRegex = /[iloqILOQ019!]/g;
const poolNumber = '0123456789';
const poolLower = 'abcdefghijklmnopqrstuvwxyz';
const poolUpper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const poolSpecial = '!@#$%^&*';

export const Meta: MetaData = {
  key: 'JSONtoYAML',
  title: 'JSON to YAML',
};

const JSONtoYAML = () => {
  const [output, setOutput] = useState<string>('');
  const [optLength, setOptLength] = useState<number>(defaultLength);
  const [optRow, setOptRow] = useState<number>(defaultRow);
  const [flags, setFlags] = useState<string[]>(['number', 'upper', 'lower', 'special']);

  // const { hasCopied, onCopy } = useClipboard(output);

  
  const handleOptLengthChange = (e: React.ChangeEvent<Input.FormElement>) => {
    e.currentTarget.value && setOptLength(Number(e.currentTarget.value));
  };
  const handleOptRowChange = (e: React.ChangeEvent<HTMLInputElement>) => setOptRow(Number(e.currentTarget.value));

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
    <DefaultLayout>
      <Container fluid>
        <Text h2>{Meta.title}</Text>

        {/* Output Box */}
        <Container>
          <Row css={{ alignItems: 'center' }}>
            <Text h3>Output</Text>
            <Spacer />
            <CopyIconButton />
          </Row>
          <Textarea fullWidth></Textarea>
        </Container>
        <Spacer />
        {/* Configuration part */}
        <Grid.Container gap={2} justify='center'>
          <Grid xs={6} md={6}>
            <Input underlined value={optLength} labelLeft='Length' min={1} max={maxLength} onChange={handleOptLengthChange} type='number' />
          </Grid>
          <Grid xs={6} md={6}>
            <Input underlined value={optRow} labelLeft='Row' min={1} max={maxLength} type='number' />
          </Grid>
        </Grid.Container>
      </Container>
    </DefaultLayout>
  );
};

export default JSONtoYAML;
