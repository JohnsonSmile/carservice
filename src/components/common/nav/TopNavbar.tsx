"use client"

import { usePathname } from "next/navigation"
import { useMemo, useState } from "react"
import QRCodeIcon from "../icon/QRCode"
import QRReader from "../qrcode/QRReader"
import {
  useEndHighway,
  useHighWayPreview,
  useStartHighway,
} from "@/hooks/http/order"
import { HighwayPreviewDialog } from "../dialog/HighwayPreviewDialog"
import { useToaster } from "../toaster/Toaster"

const TopNavbar = () => {
  const pathname = usePathname()
  const toast = useToaster()
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
    error: highwayPreviewError,
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
        } else if (action === "end") {
          setHighwayPreviewOpen(true)
          highwayPreview({
            data,
          })
        }
        break
    }
  }

  // start high way
  const {
    isPending: isHighWayStartLoading,
    mutate: highwayStart,
    data: highwayStartData,
    error: highwayStartError,
  } = useStartHighway()

  // end high way
  const {
    isPending: isHighWayEndLoading,
    mutate: highwayEnd,
    data: highwayEndData,
    error: highwayEndError,
  } = useEndHighway()

  const highwayConfirmClick = async () => {
    if (highwayPreviewData && highwayPreviewData.status === 0) {
      console.log({ end_id: highwayPreviewData.end_id })
      // 下高速
      await highwayEnd({
        order_sn: highwayPreviewData.order_sn,
        position_id: highwayPreviewData.end_id,
      })
    } else if (highwayPreviewData && highwayPreviewData.status === 1) {
      // 使用数字人民币支付
      toast.warn("使用数字人民币支付")
    } else if (highwayPreviewData && highwayPreviewData.status === 2) {
      // 已支付,确认
    } else if (highwayPreviewData && highwayPreviewData.status === -1) {
      // 上高速
      await highwayStart({ position_id: highwayPreviewData.start_id })
    } else {
      // 出错了
    }
  }

  const isLoading = isHighWayPreviewLoading
  const highwayError = highwayPreviewError ? "获取数据失败请稍后重试" : ""

  console.log({ highwayEndData })
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
        error={highwayError}
        confirmClick={highwayConfirmClick}
      />
    </div>
  )
}

export default TopNavbar
