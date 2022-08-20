import React from 'react';
import { Box, BoxProps } from '@chakra-ui/react';

const CardBody = (props: BoxProps) => {
  const { children, ...rest } = props;
  return <Box {...rest}>{children}</Box>;
};

export default CardBody;
