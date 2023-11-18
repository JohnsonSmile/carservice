"use client"

import { usePathname, useRouter } from "next/navigation"
import { useMemo, useState } from "react"
import QRCodeIcon from "../icon/QRCode"
import QRReader from "../qrcode/QRReader"
import {
  ChargePreviewData,
  ChargePreviewResponse,
  HighWayPreviewData,
  HighWayPreviewResponse,
  useChargePreview,
  useEndCharge,
  useEndHighway,
  useHighWayPreview,
  useStartCharge,
  useStartHighway,
} from "@/hooks/http/order"
import { HighwayPreviewDialog } from "../dialog/HighwayPreviewDialog"
import { useToaster } from "../toaster/Toaster"
import useStore from "@/store/store"
import { ChargePreviewDialog } from "../dialog/ChargePreviewDialog"

const TopNavbar = () => {
  const router = useRouter()
  const pathname = usePathname()
  const { setShouldRefetch } = useStore()
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

  /**=========================highway=========================== */
  const [highwayPreviewOpen, setHighwayPreviewOpen] = useState(false)
  // 下高速之后结束订单之前的preview data
  const [finalHighwayData, setFinalHighwayData] = useState<HighWayPreviewData>()

  const handleHighwayPreviewSuccess = (response: HighWayPreviewResponse) => {
    if (response.code !== 200) {
      toast.warn(response.msg)
      setHighwayPreviewOpen(false)
      return response.data
    }
    setHighwayPreviewOpen(true)
    setShouldRefetch(true)
    console.log({ response })
    return response.data
  }
  const {
    isPending: isHighWayPreviewLoading,
    mutate: highwayPreview,
    data: highwayPreviewData,
    error: highwayPreviewError,
  } = useHighWayPreview({
    onSuccess: handleHighwayPreviewSuccess,
  })

  // start high way
  const handleStartHighwaySuccess = (data: HighWayPreviewData) => {
    console.log({ data })
    setHighwayPreviewOpen(false)
    setShouldRefetch(true)
  }

  const {
    isPending: isHighWayStartLoading,
    mutate: highwayStart,
    data: highwayStartData,
    error: highwayStartError,
  } = useStartHighway({ onSuccess: handleStartHighwaySuccess })

  // end high way
  const handleEndHighwaySuccess = (data: HighWayPreviewData) => {
    console.log({ data })
    setShouldRefetch(true)
    setFinalHighwayData(data)
  }
  const {
    isPending: isHighWayEndLoading,
    mutate: highwayEnd,
    data: highwayEndData,
    error: highwayEndError,
  } = useEndHighway({
    onSuccess: handleEndHighwaySuccess,
  })

  const highwayConfirmClick = async () => {
    if (highwayData && highwayData.status === 0) {
      console.log({ end_id: highwayData.end_id })
      // 下高速
      await highwayEnd({
        order_sn: highwayData.order_sn,
        position_id: highwayData.end_id,
      })
    } else if (highwayData && highwayData.status === 1) {
      // 使用数字人民币支付
      toast.warn("使用数字人民币支付")
    } else if (highwayData && highwayData.status === 2) {
      // 已支付,确认
    } else if (highwayData && highwayData.status === -1) {
      // 上高速
      await highwayStart({ position_id: highwayData.start_id })
    } else {
      // 出错了
    }
  }

  // high way status
  const isHighwayLoading = isHighWayPreviewLoading
  const highwayError = highwayPreviewError ? "获取数据失败请稍后重试" : ""
  const isHighwayReqeustSending = isHighWayStartLoading || isHighWayEndLoading

  const highwayData = useMemo(() => {
    if (finalHighwayData) {
      return finalHighwayData
    }
    return highwayPreviewData
  }, [highwayPreviewData, finalHighwayData])

  /**=========================charge=========================== */
  const [chargePreviewOpen, setChargePreviewOpen] = useState(false)
  // 结束充电之后结束订单之前的preview data
  const [finalChargeData, setFinalChargeData] = useState<ChargePreviewData>()

  const handleChargePreviewSuccess = (response: ChargePreviewResponse) => {
    if (response.code !== 200) {
      toast.warn(response.msg)
      setChargePreviewOpen(false)
      return response.data
    }
    setChargePreviewOpen(true)
    setShouldRefetch(true)
    console.log({ response })
    return response.data
  }
  const {
    isPending: isChargePreviewLoading,
    mutate: chargePreview,
    data: chargePreviewData,
    error: chargePreviewError,
  } = useChargePreview({
    onSuccess: handleChargePreviewSuccess,
  })

  // start charge
  const handleStartChargeSuccess = (data: ChargePreviewData) => {
    console.log({ data })
    setChargePreviewOpen(false)
    // TODO:
    setShouldRefetch(true)
  }

  const {
    isPending: isChargeStartLoading,
    mutate: chargeStart,
    data: chargeStartData,
    error: chargeStartError,
  } = useStartCharge({ onSuccess: handleStartChargeSuccess })

  // end charge
  const handleChargeSuccess = (data: ChargePreviewData) => {
    console.log({ data })
    setShouldRefetch(true)
    setFinalChargeData(data)
  }
  const {
    isPending: isChargeEndLoading,
    mutate: chargeEnd,
    data: chargeEndData,
    error: chargeEndError,
  } = useEndCharge({
    onSuccess: handleChargeSuccess,
  })

  const chargeConfirmClick = async () => {
    if (chargeData && chargeData.status === 0) {
      console.log({ end_id: chargeData.end_id })
      // 结束充电
      await chargeEnd({
        id: chargeData.id || 0,
      })
    } else if (chargeData && chargeData.status === 1) {
      // 使用数字人民币支付
      toast.warn("使用数字人民币支付")
    } else if (chargeData && chargeData.status === 2) {
      // 已支付,确认
    } else if (chargeData && chargeData.status === -1) {
      // 开始充电
      await chargeStart({ position_id: chargeData.start_id })
    } else {
      // 出错了
    }
  }

  // charge status
  const isChargeLoading = isChargePreviewLoading
  const chargeError = chargePreviewError ? "获取数据失败请稍后重试" : ""
  const isChargeReqeustSending = isChargeStartLoading // || isChargeEndLoading

  const chargeData = useMemo(() => {
    if (finalChargeData) {
      return finalChargeData
    }
    return chargePreviewData
  }, [chargePreviewData, finalChargeData])

  /**=========================QRScanner=========================== */
  const handleClick = () => {
    setScanOpen(true)
  }

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
          router.push("/highway")
          setHighwayPreviewOpen(true)
          highwayPreview({
            data,
          })
        } else if (action === "end") {
          router.push("/highway")
          setHighwayPreviewOpen(true)
          highwayPreview({
            data,
          })
        }
        break
      case "charge":
        if (action === "start") {
          router.push("/charge")
          setChargePreviewOpen(true)
          chargePreview({
            data,
          })
        } else if (action === "end") {
          router.push("/charge")
          setChargePreviewOpen(true)
          chargePreview({
            data,
          })
        }
        break
    }
  }

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
        isLoading={isHighwayLoading}
        isReqeustSending={isHighwayReqeustSending}
        highwayPreviewData={highwayData}
        error={highwayError}
        confirmClick={highwayConfirmClick}
      />
      <ChargePreviewDialog
        open={chargePreviewOpen}
        onOpenChange={setChargePreviewOpen}
        isLoading={isChargeLoading}
        isReqeustSending={isChargeReqeustSending}
        chargePreviewData={chargeData}
        error={chargeError}
        confirmClick={chargeConfirmClick}
      />
    </div>
  )
}

export default TopNavbar
