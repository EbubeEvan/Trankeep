import Image from 'next/image';
import { lusitana } from '@app/ui/common/fonts';
import Link from 'next/link';

 const AcmeLogo = () => {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <Link href='/' className='flex '>
      <Image src='/logo.svg' alt='logo' className="h-12 w-12" width={5} height={5} />
      <p className="text-[44px] ml-3">Trankeep</p>
      </Link>
    </div>
  );
}

export default AcmeLogo