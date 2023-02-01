import { Container, SimpleGrid, ResponsiveValue } from '@chakra-ui/react';

import Header from '@components/Header';
import Footer from '@components/Footer';
import ToolTitle from '@/components/Common/ToolTitle';

type ToolLayoutLayoutProps = {
  title?: string;
  columns: ResponsiveValue<number> | undefined;
  children: React.ReactNode;
};

export const ToolLayout = (props: ToolLayoutLayoutProps) => {
  const { title, columns, children } = props;
  return (
    <Container maxW='container.xl' mx='auto'>
      <Header />
      <main>
        <ToolTitle>{title ?? ''}</ToolTitle>
        <SimpleGrid columns={columns} spacing={{ sm: '1px', md: '10px' }}>
          {children}
        </SimpleGrid>
      </main>
      <Footer />
    </Container>
  );
};
