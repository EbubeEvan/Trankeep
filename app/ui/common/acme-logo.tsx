import Image from 'next/image';
import { lusitana } from '@app/ui/common/fonts';

 const AcmeLogo = () => {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <Image src='/logo.svg' alt='logo' className="h-12 w-12" width={10} height={10} />
      <p className="text-[44px] ml-3">Trankeep</p>
    </div>
  );
}

export default AcmeLogo