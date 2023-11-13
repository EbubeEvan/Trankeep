import "@/app/ui/global.css";
import { inter } from "@app/ui/fonts";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={`${inter.className} antaliased`}>  {children}
      </body>
    </html>
  );
};

export default RootLayout;
