import { Metadata } from "next"
import "styles/tailwind.css"

export const metadata: Metadata = {
  title: "Chats | Convexity Humanitarian Aid Transfer Solution",
  description:
    "Convexity is a pioneering technology company that has made significant contributions to the literacy of the financial ecosystem.",
  twitter: {
    card: "summary_large_image",
  },
  openGraph: {
    url: "https://amddashboard.com/",
    images: [
      {
        width: 1200,
        height: 630,
        url: "https://raw.githubusercontent.com/Dekatron322/amd-dashboard/main/public/venus.png?token=GHSAT0AAAAAACSXKXAZP2KPMRTJS6WATSS6ZU5PHZQ",
      },
    ],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
