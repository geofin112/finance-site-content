import type { ReactNode } from "react";


export const metadata = {
  title: "Financial Analysis Dashboard",
  description: "Crypto, Gold and Trading Insights",
};
  
  

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "Arial, sans-serif" }}>
        
        <nav
          style={{
            background: "#111",
            padding: "14px 30px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <div style={{ color: "white", fontWeight: "bold", fontSize: "18px" }}>
            Financial Analysis
          </div>

          <div style={{ display: "flex", gap: "25px" }}>
            <a href="/" style={{ color: "white", textDecoration: "none" }}>
              Dashboard
            </a>

            <a href="/blog" style={{ color: "white", textDecoration: "none" }}>
              Trading Journal
            </a>
          </div>
        </nav>

        {children}

      </body>
    </html>
  );
}

