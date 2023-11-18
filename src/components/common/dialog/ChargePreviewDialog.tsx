import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Skeleton } from "@/components/ui/skeleton"
import { ChargePreviewData } from "@/hooks/http/order"
import { cn } from "@/lib/utils"
import { Dialog } from "@radix-ui/react-dialog"
import loadash from "lodash"
import { Loader2 } from "lucide-react"
import moment from "moment"

interface ChargePreviewDialogProps {
  isLoading: boolean
  isReqeustSending: boolean
  open: boolean
  chargePreviewData?: ChargePreviewData
  error?: string
  onOpenChange: (open: boolean) => void
  confirmClick: () => void
}

export const ChargePreviewDialog = ({
  isLoading,
  isReqeustSending,
  open,
  onOpenChange,
  chargePreviewData,
  error,
  confirmClick,
}: ChargePreviewDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[368px] rounded-[15px] px-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold capitalize leading-[30px] text-ui-bt0">
            <div>{"充电桩充电"}</div>
          </DialogTitle>
        </DialogHeader>
        <div className="w-full">
          <div className="w-full h-[310px] rounded-md mt-2 bg-white flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <span>位置:</span>
              {isLoading ? (
                <Skeleton className="w-24 h-5" />
              ) : (
                <span>{chargePreviewData?.start_positon || "-"}</span>
              )}
            </div>
            <div className="flex justify-between items-center">
              <span>充电桩编号:</span>
              {isLoading ? (
                <Skeleton className="w-44 h-5" />
              ) : (
                <span>{chargePreviewData?.order_sn || "-"}</span>
              )}
            </div>
            <div className="flex justify-between items-center">
              <span>收费标准:</span>
              {isLoading ? (
                <Skeleton className="w-44 h-5" />
              ) : (
                <span>
                  {chargePreviewData?.price
                    ? loadash.round(chargePreviewData.price / 100, 2) + "元/度"
                    : "-"}
                </span>
              )}
            </div>
            <div className="flex justify-between items-center">
              <span>状态:</span>
              {isLoading ? (
                <Skeleton className="w-24 h-5" />
              ) : (
                <span
                  className={
                    chargePreviewData && chargePreviewData?.status === 0
                      ? "text-orange-400"
                      : chargePreviewData?.status === 1
                      ? "text-red-500"
                      : chargePreviewData?.status === 2
                      ? "text-green-500"
                      : "text-cyan-500"
                  }
                >
                  {chargePreviewData && chargePreviewData?.status === 0
                    ? "充电中"
                    : chargePreviewData?.status === 1
                    ? "未支付"
                    : chargePreviewData?.status === 2
                    ? "已支付"
                    : "未创建"}
                </span>
              )}
            </div>
            <div className="flex justify-between items-center">
              <span>消耗度数:</span>
              {isLoading ? (
                <Skeleton className="w-44 h-5" />
              ) : (
                <span>
                  {chargePreviewData?.degree
                    ? loadash.round(chargePreviewData.degree / 100, 2) + "度"
                    : "-"}
                </span>
              )}
            </div>
            <div className="flex justify-between items-center">
              <span>价格:</span>
              {isLoading ? (
                <Skeleton className="w-44 h-5" />
              ) : (
                <span>
                  {chargePreviewData?.price && chargePreviewData?.degree
                    ? loadash.round(
                        (chargePreviewData.price * chargePreviewData.degree) /
                          10000,
                        2
                      ) + "元"
                    : "-"}
                </span>
              )}
            </div>
            <div className="flex justify-between items-center">
              <span>开始时间:</span>
              {isLoading ? (
                <Skeleton className="w-36 h-5" />
              ) : (
                <span>
                  {chargePreviewData?.start_at
                    ? moment(chargePreviewData.start_at).format(
                        "YYYY-MM-DD hh:mm:ss"
                      )
                    : "-"}
                </span>
              )}
            </div>
            <div className="flex justify-between items-center">
              <span>结束时间:</span>
              {isLoading ? (
                <Skeleton className="w-36 h-5" />
              ) : (
                <span>
                  {chargePreviewData?.end_at
                    ? moment(chargePreviewData.end_at).format(
                        "YYYY-MM-DD hh:mm:ss"
                      )
                    : "-"}
                </span>
              )}
            </div>
            <div
              className={cn(
                "mt-4 w-full text-center py-2 bg-cyan-500 text-white rounded-md flex items-center justify-center gap-1",
                chargePreviewData && chargePreviewData?.status === 0
                  ? "bg-orange-400"
                  : chargePreviewData?.status === 1
                  ? "bg-green-500"
                  : chargePreviewData?.status === 2
                  ? "" // TODO: 已支付
                  : "bg-cyan-500",
                isLoading || isReqeustSending ? "opacity-70" : ""
              )}
              onClick={() => {
                if (isLoading || isReqeustSending) {
                  return
                }
                confirmClick()
              }}
            >
              {(isLoading || isReqeustSending) && (
                <Loader2 className="animate-spin" />
              )}
              <div>
                {chargePreviewData && chargePreviewData?.status === 0
                  ? "结束充电"
                  : chargePreviewData?.status === 1
                  ? "使用数字人民币支付"
                  : chargePreviewData?.status === 2
                  ? "已支付"
                  : "开始充电"}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
