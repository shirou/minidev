import { Box, BoxProps, Container, Heading, useStyleConfig } from '@chakra-ui/react';
import React, { Component } from 'react';

interface BlocklProps extends BoxProps {
  title: string;
  variant?: string;
}

const styles = {
  float: 'right',
  maxWidth: '100%',
  overflow: 'auto',
  position: 'relative',
  maxHeight: '100%',
  transition: 'all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)',
  transitionDuration: '.2s, .2s, .35s',
  transitionProperty: 'top, bottom, width',
  transitionTimingFunction: 'linear, linear, ease',
};

export const Block = (props: BlocklProps) => {
  const { variant, title, children, ...rest } = props;
  return (
    <Container __css={styles} py='3' {...rest}>
      <Heading as='h3' fontSize='md'>
        {title}
      </Heading>
      <Box px='2' py='3' borderRadius='10'>
        {children}
      </Box>
    </Container>
  );
};
