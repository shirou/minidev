import { Container } from '@nextui-org/react';

import { Header } from '@components/Header';
import Footer from '@components/Footer';

export function DefaultLayout({ children }) {
  return (
    <Container fluid>
      <Header />
      <main>{children}</main>
      <Footer />
    </Container>
  );
}
