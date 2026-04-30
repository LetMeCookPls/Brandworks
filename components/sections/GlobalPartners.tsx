'use client';

import SectionHeading from '../ui/SectionHeading';

const partners = [
  {
    id: 'artful-cosmos',
    name: 'Artful Cosmos',
    url: 'https://www.artful-cosmos.com/',
    logoDull: '/images/company_logos/artful_cosmos_dull.png',
    logoBright: '/images/company_logos/artful_cosmos_bright.png',
    text: (
      <div className="flex flex-col gap-3">
        <p>Artful Cosmos Industrial Co. Ltd specializes in the <span className="text-white font-medium">design and manufacturing of acrylic POP displays</span> and custom product solutions.</p>
        <p>With strong <span className="text-white font-medium">expertise in materials and precision craftsmanship</span>, the company delivers high-quality displays that <span className="text-white font-medium">enhance brand visibility and product presentation</span>.</p>
      </div>
    )
  },
  {
    id: 'global-link-mea',
    name: 'Global Link MEA',
    url: 'https://www.globallinkmea.com/',
    logoDull: '/images/company_logos/globallinkmea_dull.png',
    logoBright: '/images/company_logos/globallinkmea_bright.png',
    text: (
      <div className="flex flex-col gap-3">
        <p>Global Link MEA is a <span className="text-white font-medium">multi-sector trading company</span> based in Dubai, <span className="text-white font-medium">connecting Asian manufacturing hubs with MENA markets</span>.</p>
        <p>It leverages the UAE’s strong logistics network to enable <span className="text-white font-medium">efficient regional and international trade</span>.</p>
      </div>
    )
  },
  {
    id: 'artful-cosmos-ae',
    name: 'Artful Cosmos MEA',
    url: 'https://artfulcosmos.ae/',
    logoDull: '/images/company_logos/atful_cosmos_ae_dull.png',
    logoBright: '/images/company_logos/atful_cosmos_ae_bright.png',
    text: (
      <div className="flex flex-col gap-3">
        <p>Artful Cosmos MEA is a Dubai-based company delivering <span className="text-white font-medium">tailored business solutions</span> across global markets.</p>
        <p>With a focus on <span className="text-white font-medium">strategy, innovation, and execution</span>, the company supports businesses in <span className="text-white font-medium">scaling and expanding across the Middle East and beyond</span>.</p>
      </div>
    )
  }
];

export default function GlobalPartners() {
  return (
    <section className="py-16 md:py-24 relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col">
      <SectionHeading>Our Global Partners</SectionHeading>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-12 w-full justify-items-center mt-8">
        {partners.map((partner) => {
          return (
            <div 
              key={partner.id}
              className="relative flex flex-col items-center group w-full max-w-[340px] lg:max-w-none"
            >
              <a 
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex items-center justify-center w-full max-w-[280px] lg:max-w-[320px] h-20 md:h-28 cursor-pointer"
              >
                {/* Dull Logo - Hidden on mobile/tablet, visible on desktop until hovered */}
                <img 
                  src={partner.logoDull} 
                  alt={`${partner.name} logo`}
                  className="hidden lg:block absolute inset-0 w-full h-full object-contain object-center transition-all duration-500 group-hover:opacity-0 group-hover:scale-95"
                />
                
                {/* Bright Logo - Always visible on mobile/tablet, hidden on desktop until hovered */}
                <img 
                  src={partner.logoBright} 
                  alt={`${partner.name} logo`}
                  className="absolute inset-0 w-full h-full object-contain object-center transition-all duration-500 lg:opacity-0 lg:scale-95 group-hover:lg:opacity-100 group-hover:lg:scale-100"
                />
              </a>

              {/* Expanding text container */}
              <div 
                className={`
                  w-full text-center
                  transition-all duration-[600ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
                  overflow-hidden
                  lg:max-h-0 lg:opacity-0 lg:mt-0
                  group-hover:lg:max-h-[400px] group-hover:lg:opacity-100 group-hover:lg:mt-8
                  max-h-[400px] opacity-100 mt-6
                `}
              >
                <div className="font-dm-sans text-[15px] text-gray-400 leading-[1.6]">
                  {partner.text}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
