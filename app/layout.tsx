import "@/app/ui/common/global.css";
import { inter } from "@app/ui/common/fonts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Trankeep",
    default: "Trankeep",
  },
  description: "Book Keeping app.",
  metadataBase: new URL("https://trankeep.vercel.app/"),
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={`${inter.className} antaliased`}>{children}</body>
    </html>
  );
};

export default RootLayout;
