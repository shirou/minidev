import { Box, Flex, chakra, Container, Stack, Text, useColorModeValue, VisuallyHidden } from '@chakra-ui/react';
import { FaGithub } from 'react-icons/fa';
import { ReactNode } from 'react';

const SocialButton = ({ children, label, href }: { children: ReactNode; label: string; href: string }) => {
  return (
    <chakra.button
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export default function Footer() {
  return (
    <Flex w='full'>
      <Flex
        w='full'
        as='footer'
        flexDir={{
          base: 'column',
          sm: 'row',
        }}
        align='center'
        justify='space-between'
        px='6'
        bg={useColorModeValue('navy.50', 'navy.900')}
        color={useColorModeValue('navy.700', 'navy.200')}
      >
        <Text>© 2022 Shirou</Text>
        <SocialButton label={'GitHub'} href={'https://github.com/shirou/minidev/'}>
          <FaGithub />
        </SocialButton>
      </Flex>
    </Flex>
  );
}
