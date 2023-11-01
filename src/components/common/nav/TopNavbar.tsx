"use client"

import { usePathname } from "next/navigation"
import { useMemo } from "react"

const TopNavbar = () => {
  const pathname = usePathname()
  const title = useMemo(() => {
    if (pathname === "/highway") {
      return "高速收费"
    }
    return ""
  }, [pathname])
  return (
    <div className='h-11 w-full relative border-b shadow-md'>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">{title}</div>
    </div>
  )
}

export default TopNavbar