import type { NextPage } from 'next';

import { Flex, Container, Box, Heading, Text } from '@chakra-ui/react';

import { ToolListLayout } from '@layouts/ToolListLayout';
import { Wrap, WrapItem } from '@chakra-ui/react';

import Card from '@components/Card/Card';
import CardBody from '@components/Card/CardBody';
import CardHeader from '@components/Card/CardHeader';

import { getAllToolAsList } from '../toolList';

const items = () => {
  return getAllToolAsList().map((t, i) => {
    return (
      <WrapItem key={i} as={'a'} href={`/d/${t.key}/`}>
        <Card p='1rem' my={{ sm: '24px', xl: '0px' }}>
          <CardHeader p='12px 5px' mb='12px'>
            <Text fontSize='lg' color='navy.500' fontWeight='bold'>
              {t.title}
            </Text>
          </CardHeader>
          <CardBody p='0px 5px'>
            <Text fontSize='md' color='gray.500' fontWeight='400' mb='30px'>
              {t.description}
            </Text>
          </CardBody>
        </Card>
      </WrapItem>
    );
  });
};

const Home: NextPage = () => {
  return (
    <ToolListLayout>
      <Container maxW={'3xl'}>
        <Flex flexDirection='column'>
          <Heading fontWeight={300} fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}>
            Minidev Tools
          </Heading>
          <Box py={{ base: '8px', md: '9px' }}>
            <Wrap>{items()}</Wrap>
          </Box>
        </Flex>
      </Container>
    </ToolListLayout>
  );
};

export default Home;
