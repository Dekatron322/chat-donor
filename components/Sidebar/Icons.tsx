import Image from "next/image"
import Link from "next/link"
export const LogoIcon = () => (
  <>
    <Link href="/" className="icon-style mb-5 content-center">
      <img src="/Logo.png" alt="dekalo" className="w-[142px]" />
    </Link>
    <Link href="/" className="dark-icon-style mb-5 content-center">
      <img src="/Logo.png" alt="dekalo" className="w-[142px]" />
    </Link>
  </>
)

export const CollapsedLogoIcon = () => (
  <>
    <Link href="/" className="icon-style content-center">
      <img src="/Logo.png" alt="dekalo" className="w-[142px]" />
    </Link>
    <Link href="/" className="dark-icon-style content-center ">
      <img src="/Logo.png" alt="dekalo" className="w-[142px]" />
    </Link>
  </>
)

export const DashboardIcon = ({ isActive }: { isActive: boolean }) => (
  <Image src={isActive ? "/Icons/Vector (2).png" : "/Icons/Vector (2).png"} alt="Dashboard" width={20} height={20} />
)

export const EstatesIcon = ({ isActive }: { isActive: boolean }) => (
  <Image src={isActive ? "/Icons/Estates-active.svg" : "/Icons/Estates.svg"} alt="Estates" width={20} height={20} />
)

export const HomeIcon = ({ isActive }: { isActive: boolean }) => (
  <Image src={isActive ? "/Icons/Home-active.svg" : "/Icons/Home.svg"} alt="Home" width={20} height={20} />
)

export const UtilityIcon = ({ isActive }: { isActive: boolean }) => (
  <Image src={isActive ? "/Icons/ShoppingCart.png" : "/Icons/ShoppingCart.png"} alt="Utility" width={20} height={20} />
)

export const NoteIcon = ({ isActive }: { isActive: boolean }) => (
  <Image src={isActive ? "/Icons/Note.png" : "/Icons/Note.png"} alt="Utility" width={20} height={20} />
)

export const ChatIcon = ({ isActive }: { isActive: boolean }) => (
  <Image src={isActive ? "/Icons/MailStar.png" : "/Icons/MailStar.png"} alt="Utility" width={20} height={20} />
)

export const ServiceIcon = ({ isActive }: { isActive: boolean }) => (
  <Image src={isActive ? "/Icons/UsersThree.png" : "/Icons/UsersThree.png"} alt="Utility" width={20} height={20} />
)

export const SupportIcon = ({ isActive }: { isActive: boolean }) => (
  <Image src={isActive ? "/Icons/Door.png" : "/Icons/Door.png"} alt="Utility" width={20} height={20} />
)

export const AdminIcon = ({ isActive }: { isActive: boolean }) => (
  <Image src={isActive ? "/Icons/Utility-active.svg" : "/Icons/Admin.svg"} alt="Utility" width={20} height={20} />
)

export const LogoutIcon = ({ isActive }: { isActive: boolean }) => (
  <Image src={isActive ? "/Icons/Utility-active.svg" : "/Icons/Logout.svg"} alt="Utility" width={20} height={20} />
)

export const PropertyIcon = ({ isActive }: { isActive: boolean }) => (
  <Image src={isActive ? "/Icons/Property-active.svg" : "/Icons/Property.svg"} alt="Utility" width={20} height={20} />
)

export const VisitorIcon = ({ isActive }: { isActive: boolean }) => (
  <Image src={isActive ? "/Icons/Visitor-active.svg" : "/Icons/Visitor.svg"} alt="Utility" width={20} height={20} />
)
