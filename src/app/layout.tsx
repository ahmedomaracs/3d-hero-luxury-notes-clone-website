import type { Metadata } from 'next';
import './globals.css';
import { StoreProvider } from '@/context/StoreContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { QuickViewModal } from '@/components/QuickViewModal';
import { CartDrawer } from '@/components/CartDrawer';

export const metadata: Metadata = {
  title: 'Original Perfume Decants in Egypt — 4, 6 & 10 ml',
  description:
    'Perfume decants poured by hand in Cairo from bottles we own — 4, 6 and 10 ml of niche and designer fragrances, delivered across Egypt.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr">
      <body>
        <StoreProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <QuickViewModal />
          <CartDrawer />
        </StoreProvider>
      </body>
    </html>
  );
}
