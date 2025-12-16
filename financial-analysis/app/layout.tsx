import { ReactNode } from 'react';

export const metadata = {
    title: "Financial Analysis",
    description: "Automated financial analytics site",
  };
  
  

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}