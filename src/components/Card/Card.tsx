import React from 'react';
import { Box, BoxProps } from '@chakra-ui/react';

const styles = {
  p: '22px',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  boxShadow: '0px 5px 14px rgba(0, 0, 0, 0.05)',
  borderRadius: '10px',
  position: 'relative',
  wordWrap: 'break-word',
  backgroundClip: 'border-box',
};

const Card = (props: BoxProps) => {
  const { children, ...rest } = props;
  return (
    <Box __css={styles} {...rest}>
      {children}
    </Box>
  );
};

export default Card;
