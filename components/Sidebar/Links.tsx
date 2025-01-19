"use client"

import clsx from "clsx"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import {
  AdminIcon,
  ChatIcon,
  DashboardIcon,
  EstatesIcon,
  HomeIcon,
  LogoutIcon,
  NoteIcon,
  PropertyIcon,
  ServiceIcon,
  SupportIcon,
  UtilityIcon,
  VisitorIcon,
} from "./Icons"
import { LogoIcon } from "components/Icons/Icons"

const links = [
  { name: "Projects", href: "/projects", icon: DashboardIcon },
  // {
  //   name: "Orders",
  //   href: "",
  //   icon: UtilityIcon,
  //   sublinks: [
  //     { name: "All Pre-Orders", href: "/orders/all-preorders" },
  //     { name: "Confirmed", href: "/orders/confirmed" },
  //     { name: "Delivered", href: "/orders/delivered" },
  //     { name: "Cancelled", href: "/orders/cancelled" },
  //     { name: "Completed", href: "/orders/completed" },
  //     { name: "Orders by Door Model", href: "/orders/orders-by-model" },
  //   ],
  // },
  // {
  //   name: "Payment",
  //   href: "",
  //   icon: NoteIcon,
  //   sublinks: [
  //     { name: "All Payments", href: "/payment" },
  //     { name: "Pending Payments", href: "/payment/pending-payments" },
  //     { name: "Overdue Payments", href: "/payment/overdue-payments" },
  //   ],
  // },
  // { name: "Customers", href: "/customers", icon: ServiceIcon },
  // {
  //   name: "Products",
  //   href: "",
  //   icon: SupportIcon,
  //   sublinks: [{ name: "All Products", href: "/products/all-products" }],
  // },
]

const secondlinks = [{ name: "Email Campaign", href: "/email-campaing", icon: ChatIcon }]

interface LinksProps {
  isCollapsed: boolean
}

export function Links({ isCollapsed }: LinksProps) {
  const pathname = usePathname()
  const [expandedLink, setExpandedLink] = useState<string | null>(null)

  const handleExpand = (linkName: string) => {
    setExpandedLink(expandedLink === linkName ? null : linkName)
  }

  return (
    <div className="flex flex-col border-black">
      {links.map((link) => {
        const LinkIcon = link.icon
        const isActive = pathname.startsWith(link.href)
        const isExpanded = expandedLink === link.name

        return (
          <div key={link.name}>
            <div className="dashboard-style  cursor-pointer">
              <Link href={link.href}>
                <div className="flex w-full items-center justify-between gap-2  pl-5">
                  <div className="flex w-[200px] items-center gap-3 rounded-[10px] bg-[#17CE89] px-4 py-3">
                    <LinkIcon isActive={isActive} />
                    <p
                      className={clsx("text-lg  text-white transition-opacity duration-500", {
                        hidden: isCollapsed,
                        " transition-opacity duration-500": isActive,
                      })}
                    >
                      {link.name}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        )
      })}
    </div>
  )
}

// export function SecondLinks({ isCollapsed }: LinksProps) {
//   const pathname = usePathname()
//   return (
//     <div className="flex  flex-col border-black lg:h-auto">
//       {secondlinks.map((link) => {
//         const LinkIcon = link.icon
//         const isActive = pathname.startsWith(link.href)
//         return (
//           <>
//             <p className="pl-6 text-sm text-[#727272]">DATABASE</p>
//             <Link
//               key={link.name}
//               href={link.href}
//               className={clsx("dashboard-style", {
//                 "active-dashboard": isActive,
//               })}
//             >
//               <div className="flex items-center gap-2 pl-5">
//                 <LinkIcon isActive={isActive} />
//                 <p
//                   className={clsx("text-sm font-semibold transition-opacity duration-500", {
//                     hidden: isCollapsed,
//                     "font-extrabold transition-opacity duration-500": isActive,
//                   })}
//                 >
//                   {link.name}
//                 </p>
//               </div>
//             </Link>
//           </>
//         )
//       })}
//     </div>
//   )
// }
