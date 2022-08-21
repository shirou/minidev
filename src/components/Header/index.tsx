import { ReactNode } from 'react';
import { Box, Flex, Link, Button, useColorModeValue, Stack, Image, useColorMode } from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';

import Search from '@components/Search';

export default function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box bg={useColorModeValue('primary.100', 'primary.900')} px={4} alignContent='center'>
      <Flex h={16} w='full' alignItems={'center'} justifyContent={'space-between'}>
        <Box as={'a'} href={'/'}>
          MiniDev
        </Box>
        <Search />
        <Flex alignItems={'right'}>
          <Stack direction={'row'} spacing={7}>
            <Button onClick={toggleColorMode}>{colorMode === 'light' ? <FaMoon /> : <FaSun />}</Button>
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
}
