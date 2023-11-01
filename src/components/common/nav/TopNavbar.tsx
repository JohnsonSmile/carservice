"use client"

import { usePathname } from "next/navigation"
import { useMemo, useState } from "react"
import QRCodeIcon from "../icon/QRCode"
import QRReader from "../qrcode/QRReader"

const TopNavbar = () => {
  const pathname = usePathname()
  const title = useMemo(() => {
    if (pathname === "/highway") {
      return "高速收费"
    } else if (pathname === "/charge") {
      return "智能充电"
    } else if (pathname === "/park") {
      return "停车"
    } else if (pathname === "/profile") {
      return "我"
    }
    return ""
  }, [pathname])

  const [open, setOpen] = useState(false)

  const handleClick = () => {
    setOpen(true)
  }

  return (
    <div className='h-11 w-full relative border-b shadow-md bg-white'>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">{title}</div>
      <div className="absolute top-1/2 right-6 -translate-y-1/2" onClick={handleClick}>
        <QRCodeIcon className="w-6 h-6 cursor-pointer" />
      </div>
      {open && <QRReader open={open} onOpenChange={setOpen} />}
    </div>
  )
}

export default TopNavbar