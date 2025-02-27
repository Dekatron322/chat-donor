import SideBar from "components/Sidebar/Sidebar"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Altima Dashboard | Payment",
  description:
    "Convexity is a pioneering technology company that has made significant contributions to the literacy of the financial ecosystem.",
  twitter: {
    card: "summary_large_image",
  },
  openGraph: {
    url: "https://smarthavensystems.com/",
    images: [
      {
        width: 1200,
        height: 630,
        url: "https://raw.githubusercontent.com/Dekatron322/Caregiverhospital/main/public/img.png",
      },
    ],
  },
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-screen flex-col-reverse border-0 border-blue-700 lg:flex-row">
      <div className="">
        <SideBar />
      </div>
      <div className="grow overflow-y-auto border-0 border-black ">{children}</div>
    </div>
  )
}
