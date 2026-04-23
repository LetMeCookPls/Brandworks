import Image from 'next/image';

interface LogoProps {
  className?: string;
}

export default function Logo({ className = '' }: LogoProps) {
  return (
    <div className={`relative ${className}`}>
      <Image 
        src="/logo.png" 
        alt="Brandworks Logo" 
        fill 
        className="object-contain"
        priority
      />
    </div>
  );
}
