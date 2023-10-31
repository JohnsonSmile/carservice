import Link from 'next/link'
import React from 'react'
import { IconProps } from '../icon/Icon'
import { cn } from '@/lib/utils'

interface BarItemProps extends React.PropsWithChildren {
  icon: (props: Partial<IconProps>) => React.JSX.Element
  title: string
  href: string
  active: boolean
}

const BarItem = ({ icon: Icon, title, href, active }: BarItemProps) => {
  return (
    <Link href={href} type="button" className="inline-flex flex-col items-center justify-center px-5 rounded-l-full hover:bg-gray-50 dark:hover:bg-gray-800 group">
      <Icon className={cn("w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500", active ? "text-blue-600 dark:text-blue-500 scale-110" : "")} />
      <span className={cn("text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500", active ? "text-blue-600 dark:text-blue-500" : "")}>{title}</span>
    </Link>
  )
}

export default BarItem