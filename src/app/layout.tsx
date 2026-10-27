import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{
          background: "#08111f",
          color: "white",
          margin: 0,
        }}
      >
        <div
          style={{
            padding: "16px 24px",
            borderBottom: "1px solid #1f2937",
          }}
        >
          <Link
            href="/"
            style={{
              color: "#60a5fa",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: "16px",
            }}
          >
            ← Home
          </Link>
        </div>

        {children}
      </body>
    </html>
  );
}
