import { Container } from '@chakra-ui/react';

import Header from '@components/Header';
import Footer from '@components/Footer';

type ToolListLayoutProps = {
  children: React.ReactNode;
};

export function ToolListLayout(props: ToolListLayoutProps) {
  const { children } = props;
  return (
    <Container maxW='container.xl' mx='auto'>
      <Header />
      <main>{children}</main>
      <Footer />
    </Container>
  );
}
