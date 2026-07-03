import Hero from '@/components/sections/Hero';
import GlobalPartners from '@/components/sections/GlobalPartners';
import Services from '@/components/sections/Services';
import About from '@/components/sections/About';
import Projects from '@/components/sections/Projects';
import Contact from '@/components/sections/Contact';


export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LocalBusiness',
        '@id': 'https://brandworkskwt.com/#organization',
        name: 'Brandworks Advertising',
        url: 'https://brandworkskwt.com',
        image: 'https://brandworkskwt.com/images/work_images/Qwe1.jpg',
        description: 'Brandworks is a premium international agency in Kuwait specializing in bespoke signage, luxury retail mall pop-ups, exhibition stands, and interior design across the GCC.',
        telephone: '+965 507 27586',
        email: 'info@brandworkskwt.com',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Street 22, near Naif Poultry, Shuwaikh Industrial Area 2',
          addressLocality: 'Kuwait City',
          addressCountry: 'KW',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 29.322689,
          longitude: 47.939278,
        },
        areaServed: ['Kuwait', 'UAE', 'Saudi Arabia', 'Qatar', 'Bahrain', 'Oman'],
      },
      {
        '@type': 'WebSite',
        '@id': 'https://brandworkskwt.com/#website',
        url: 'https://brandworkskwt.com',
        name: 'Brandworks Advertising Kuwait',
        publisher: {
          '@id': 'https://brandworkskwt.com/#organization',
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What services does Brandworks Advertising provide in Kuwait?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'We provide bespoke signage, retail mall pop-ups, exhibition stands, digital LED screens, and complete interior design solutions across Kuwait and the GCC.',
            }
          },
          {
            '@type': 'Question',
            name: 'Where is Brandworks located?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Our main office and production facility are located in Shuwaikh Industrial Area 2, Kuwait City.',
            }
          }
        ]
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <GlobalPartners />
      <Services />
      <About />
      <Projects />
      <Contact />
    </>
  );
}
