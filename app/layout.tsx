import "@/app/ui/global.css";
import { inter } from "@app/ui/fonts";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Finkeep',
    default: 'Finkeep',
  },
  description: 'Book Keeping app.',
  metadataBase: new URL('https://finkeep-ebubeevan.vercel.app/'),
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={`${inter.className} antaliased`}>  {children}
      </body>
    </html>
  );
};

export default RootLayout;
