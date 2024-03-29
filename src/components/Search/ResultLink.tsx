import { Link, Kbd, useColorModeValue } from '@chakra-ui/react';
import NextLink from 'next/link';
import { ReactNode } from 'react';

interface ResultLinkProps {
  href: string;
  active: boolean;
  children: ReactNode;
  key?: any;
  onClose: () => void;
  [key: string]: any;
}

const ResultLink = ({ href, active, children, onClose, ...otherProps }: ResultLinkProps): JSX.Element => {
  const primaryColor = useColorModeValue('navy.700', 'navy.300');
  const secondaryBg = useColorModeValue('navy.600', 'navy.400');
  const secondaryColor = useColorModeValue('white', 'gray.800');

  return (
    <NextLink href={href} passHref>
      <Link
        my={2}
        fontSize={['sm', 'md']}
        rounded='md'
        px={[2, 3]}
        py={2}
        ml={{ base: 1, md: 2 }}
        w='auto'
        bg={active ? secondaryBg : undefined}
        fontWeight={active ? 'semibold' : 'normal'}
        color={active ? secondaryColor : primaryColor}
        onClick={onClose}
        _hover={{
          bg: secondaryBg,
          color: secondaryColor,
        }}
        display='flex'
        justifyContent='space-between'
        {...otherProps}
      >
        {children}
        {active && <Kbd color='black'>Enter</Kbd>}
      </Link>
    </NextLink>
  );
};

export default ResultLink;
