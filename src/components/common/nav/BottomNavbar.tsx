"use client"

import BarItem from './BarItem'
import { IconProps } from '../icon/Icon'
import HighwayIcon from '../icon/Highway'
import ChargeIcon from '../icon/Charge'
import ParkIcon from '../icon/Park'
import ProfileIcon from '../icon/Profile'
import PlusBarItem from './PlusBarItem'
import { usePathname } from 'next/navigation'


interface NavItem {
  title: string
  icon: ({ className }: Partial<IconProps>) => React.JSX.Element
  href: string
  type: 0 // 0 normal item, 1 plus item
}

interface PlusItem {
  title: string
  type: 1 // 0 normal item, 1 plus item
}

const navItems: (NavItem | PlusItem)[] = [
  {
    title: "高速",
    icon: HighwayIcon,
    href: "/highway",
    type: 0
  },
  {
    title: "充电",
    icon: ChargeIcon,
    href: "/charge",
    type: 0
  },
  {
    type: 1,
    title: "plus"
  },
  {
    title: "停车",
    icon: ParkIcon,
    href: "/park",
    type: 0
  },
  {
    title: "我",
    icon: ProfileIcon,
    href: "/profile",
    type: 0
  }
]

const BottomNavbar = () => {
  const pathname = usePathname()
  return (
    <div className="fixed z-50 w-full h-16 max-w-lg -translate-x-1/2 bg-white border-t border-gray-200 bottom-0 left-1/2 dark:bg-gray-700 dark:border-gray-600 shadow-md">
      <div className="grid h-full w-full max-w-lg grid-cols-5 mx-auto">
        {navItems.map((item) => item.type === 0 ? <BarItem key={item.title} icon={item.icon} title={item.title} href={item.href} active={pathname.startsWith(item.href)} /> : <PlusBarItem key={item.title} />)}
      </div>
    </div>
  )
}

export default BottomNavbar