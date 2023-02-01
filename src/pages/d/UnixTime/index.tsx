import { Table, Tbody, Tr, Td, useColorModeValue, useClipboard } from '@chakra-ui/react';
import { FiCopy } from 'react-icons/fi';
import { useState, useEffect } from 'react';

import { SimpleGrid  } from '@chakra-ui/react';

import { NumberInputForm } from '@components/Input/NumberInputForm';
import { CopyIconButton } from '@components/Common/CopyIconButton';
import { Block } from '@/components/Common/Block';
import { ToolLayout } from '@layouts/ToolLayout';
import { PrecisionType, getPrecision, getDate } from '@utils/unixtime';
import { getMeta } from '@/toolList';

const localTZ = Intl.DateTimeFormat().resolvedOptions().timeZone;

export const Meta = getMeta('UnixTime');

const UnixTime = () => {
  const [unixTime, setUnixTime] = useState<number>();
  const [unixUTC, setUnixUTC] = useState<string>('');
  const [unixLocal, setUnixLocal] = useState<string>('');
  const [precision, setPrecision] = useState<PrecisionType>('seconds');

  const [year, setYear] = useState<number>(0);
  const [month, setMonth] = useState<number>(0);
  const [day, setDay] = useState<number>(0);
  const [hour, setHour] = useState<number>(0);
  const [min, setMin] = useState<number>(0);
  const [second, setSecond] = useState<number>(0);
  const [dateLocal, setDateLocal] = useState<string>(''); // used for copy

  const unixUtcCopy = useClipboard(unixUTC);
  const unixLocalCopy = useClipboard(unixLocal);
  const dateLocalCopy = useClipboard(dateLocal);


  const tableTitleColor = useColorModeValue('gray.100', 'whiteAlpha.200');

  const handleUnixTimeChange = (valueAsString: string, value: number) => setUnixTime(value);
  const handleYearChange = (valueAsString: string, value: number) => setYear(value);
  const handleMonthChange = (valueAsString: string, value: number) => setMonth(value);
  const handleDayChange = (valueAsString: string, value: number) => setDay(value);
  const handlehourChange = (valueAsString: string, value: number) => setHour(value);
  const handleMinChange = (valueAsString: string, value: number) => setMin(value);
  const handleSecondhange = (valueAsString: string, value: number) => setSecond(value);

  // use current time initially.
  useEffect(() => {
    const now = new Date();
    setUnixTime(Math.floor(now.getTime() / 1000.0));
    setYear(now.getFullYear());
    setMonth(now.getMonth() + 1);
    setDay(now.getDate());
    setHour(now.getHours());
    setMin(now.getMinutes());
    setSecond(now.getSeconds());
  }, []);

  // UnixTime -> String
  useEffect(() => {
    if (!unixTime) {
      return;
    }
    const precision = getPrecision(unixTime);
    setPrecision(precision);

    const d = getDate(unixTime, precision);
    if (!d) {
      return;
    }
    const unixUTC = d.toLocaleString(navigator.language, { timeZone: 'UTC' });
    setUnixUTC(unixUTC);
    unixUtcCopy.setValue(unixUTC);

    const unixLocal = d.toLocaleString(navigator.language, { timeZone: localTZ });
    setUnixLocal(unixLocal);
    unixLocalCopy.setValue(unixLocal);

  }, [unixTime, unixUtcCopy, unixLocalCopy]);

  // Date -> UnixTime
  useEffect(() => {
    const d = new Date(year, month - 1, day, hour, min, second);
    const t = (d.getTime() / 1000.0).toString();
    setDateLocal(t);
    dateLocalCopy.setValue(t);
  }, [year, month, day, hour, min, second, setDateLocal, dateLocalCopy]);
  return (
    <ToolLayout title={Meta?.title} columns={{ sm: 1, md: 2 }}>
      <Block title='From Unix time'>
        <NumberInputForm label={'UnixTime'} value={unixTime} min={1} onChange={handleUnixTimeChange} />
      </Block>
      <Block title=''>
        <Table variant='simple' size='sm' w='full'>
          <Tbody>
            <Tr>
              <Td bgColor={tableTitleColor} pe={0}>
                UTC
              </Td>
              <Td pe={0}>{unixUTC}</Td>
              <td>
                <CopyIconButton
                  onCopy={unixUtcCopy.onCopy}
                  hasCopied={unixUtcCopy.hasCopied}
                  />
              </td>
            </Tr>
            <Tr>
              <Td bgColor={tableTitleColor}>Local</Td>
              <Td>{unixLocal}</Td>
              <td>
                <CopyIconButton
                  onCopy={unixLocalCopy.onCopy}
                  hasCopied={unixLocalCopy.hasCopied}
                  />
              </td>
            </Tr>
            <Tr>
              <Td bgColor={tableTitleColor}>Precision</Td>
              <Td>{precision}</Td>
            </Tr>
          </Tbody>
        </Table>
      </Block>
      <Block title='From Human'>
        <SimpleGrid columns={3} gap={2}>
          <NumberInputForm label={'Year'} value={year} size='sm' min={1} max={9999} onChange={handleYearChange} />
          <NumberInputForm label={'Month'} value={month} size='sm' min={1} max={12} onChange={handleMonthChange} />
          <NumberInputForm label={'Day'} value={day} size='sm' min={1} max={31} onChange={handleDayChange} />
          <NumberInputForm label={'Hour'} value={hour} size='sm' min={0} max={23} onChange={handlehourChange} />
          <NumberInputForm label={'Min'} value={min} size='sm' min={0} max={59} onChange={handleMinChange} />
          <NumberInputForm label={'Sec'} value={second} size='sm' min={0} max={59} onChange={handleSecondhange} />
        </SimpleGrid>
      </Block>

      <Block title=''>
        <Table variant='simple' size='sm' w='full'>
          <Tbody>
            <Tr>
              <Td bgColor={tableTitleColor} pe={0}>
                UnixTime(Local)
              </Td>
              <Td pe={0}>{dateLocal}</Td>
              <td>
                <CopyIconButton 
                  onCopy={dateLocalCopy.onCopy}
                  hasCopied={dateLocalCopy.hasCopied}
              />
              </td>
            </Tr>
          </Tbody>
        </Table>
      </Block>
    </ToolLayout>
  );
};

export default UnixTime;
