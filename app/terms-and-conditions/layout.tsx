import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'Review the Terms & Conditions governing your use of the Brandworks Advertising Company website and our services in Kuwait and the GCC.',
  alternates: {
    canonical: '/terms-and-conditions',
  },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
