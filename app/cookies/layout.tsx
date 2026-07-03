import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'Learn how Brandworks Advertising uses cookies and similar technologies to improve your experience on our website.',
  alternates: {
    canonical: '/cookies',
  },
};

export default function CookiesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
