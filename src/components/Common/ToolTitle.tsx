import { Heading, HeadingProps } from '@chakra-ui/react';
import React, { Component } from 'react';

const ToolTitle = (props: HeadingProps) => {
  const { variant, title, children, ...rest } = props;

  return (
    <Heading as='h3' fontSize='md'>
      {title}
      {children}
    </Heading>
  );
};

export default ToolTitle;
