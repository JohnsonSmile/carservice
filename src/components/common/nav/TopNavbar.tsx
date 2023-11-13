"use client"

import { usePathname } from "next/navigation"
import { useMemo, useState } from "react"
import QRCodeIcon from "../icon/QRCode"
import QRReader from "../qrcode/QRReader"
import { useHighWayPreview } from "@/hooks/http/order"
import { HighwayPreviewDialog } from "../dialog/HighwayPreviewDialog"

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

  const [scanOpen, setScanOpen] = useState(false)
  const [highwayPreviewOpen, setHighwayPreviewOpen] = useState(false)

  const handleClick = () => {
    setScanOpen(true)
  }

  const {
    isPending: isHighWayPreviewLoading,
    mutate: highwayPreview,
    data: highwayPreviewData,
  } = useHighWayPreview({})

  const handleResult = ({
    type,
    action,
    data,
  }: {
    type: string
    action: string
    data: string
  }) => {
    // TODO: use
    console.log({ type, action, data })
    switch (type) {
      case "highway":
        if (action === "start") {
          setHighwayPreviewOpen(true)
          highwayPreview({
            data,
          })
        }
        break
    }
  }

  const isLoading = isHighWayPreviewLoading

  return (
    <div className="h-11 w-full relative border-b shadow-md bg-white">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {title}
      </div>
      <div
        className="absolute top-1/2 right-6 -translate-y-1/2"
        onClick={handleClick}
      >
        <QRCodeIcon className="w-6 h-6 cursor-pointer" />
      </div>
      {scanOpen && (
        <QRReader
          open={scanOpen}
          onOpenChange={setScanOpen}
          onResult={handleResult}
        />
      )}
      <HighwayPreviewDialog
        open={highwayPreviewOpen}
        onOpenChange={setHighwayPreviewOpen}
        isLoading={isLoading}
        highwayPreviewData={highwayPreviewData}
      />
    </div>
  )
}

export default TopNavbar
