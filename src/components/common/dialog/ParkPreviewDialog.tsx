import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Skeleton } from "@/components/ui/skeleton"
import { ParkPreviewData } from "@/hooks/http/order"
import { cn } from "@/lib/utils"
import { Dialog } from "@radix-ui/react-dialog"
import lodash from "lodash"
import { Loader2 } from "lucide-react"
import moment from "moment"

interface ParkPreviewDialogProps {
  isLoading: boolean
  isReqeustSending: boolean
  open: boolean
  parkPreviewData?: ParkPreviewData
  error?: string
  onOpenChange: (open: boolean) => void
  confirmClick: () => void
}

export const ParkPreviewDialog = ({
  isLoading,
  isReqeustSending,
  open,
  onOpenChange,
  parkPreviewData,
  error,
  confirmClick,
}: ParkPreviewDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[368px] rounded-[15px] px-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold capitalize leading-[30px] text-ui-bt0">
            <div>{"停车"}</div>
          </DialogTitle>
        </DialogHeader>
        <div className="w-full">
          <div className="w-full h-[310px] rounded-md mt-2 bg-white flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <span>位置:</span>
              {isLoading ? (
                <Skeleton className="w-24 h-5" />
              ) : (
                <span>{parkPreviewData?.start_positon || "-"}</span>
              )}
            </div>
            <div className="flex justify-between items-center">
              <span>停车场编号:</span>
              {isLoading ? (
                <Skeleton className="w-44 h-5" />
              ) : (
                <span>{parkPreviewData?.order_sn || "-"}</span>
              )}
            </div>
            <div className="flex justify-between items-center">
              <span>收费标准:</span>
              {isLoading ? (
                <Skeleton className="w-44 h-5" />
              ) : (
                <span>
                  {parkPreviewData?.price
                    ? lodash.round(parkPreviewData.price / 100, 2) + "元/小时"
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
                    parkPreviewData && parkPreviewData?.status === 0
                      ? "text-orange-400"
                      : parkPreviewData?.status === 1
                      ? "text-red-500"
                      : parkPreviewData?.status === 2
                      ? "text-green-500"
                      : "text-cyan-500"
                  }
                >
                  {parkPreviewData && parkPreviewData?.status === 0
                    ? "停车中"
                    : parkPreviewData?.status === 1
                    ? "未支付"
                    : parkPreviewData?.status === 2
                    ? "已支付"
                    : "未创建"}
                </span>
              )}
            </div>
            <div className="flex justify-between items-center">
              <span>停车时间:</span>
              {isLoading ? (
                <Skeleton className="w-44 h-5" />
              ) : (
                <span>
                  {parkPreviewData?.hour
                    ? lodash.round(parkPreviewData.hour / 100, 2) + "小时"
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
                  {parkPreviewData?.price && parkPreviewData?.hour
                    ? lodash.round(
                        (parkPreviewData.price * parkPreviewData.hour) / 10000,
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
                  {parkPreviewData?.start_at
                    ? moment(parkPreviewData.start_at).format(
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
                  {parkPreviewData?.end_at
                    ? moment(parkPreviewData.end_at).format(
                        "YYYY-MM-DD hh:mm:ss"
                      )
                    : "-"}
                </span>
              )}
            </div>
            <div
              className={cn(
                "mt-4 w-full text-center py-2 bg-cyan-500 text-white rounded-md flex items-center justify-center gap-1",
                parkPreviewData && parkPreviewData?.status === 0
                  ? "bg-orange-400"
                  : parkPreviewData?.status === 1
                  ? "bg-green-500"
                  : parkPreviewData?.status === 2
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
                {parkPreviewData && parkPreviewData?.status === 0
                  ? "结束停车"
                  : parkPreviewData?.status === 1
                  ? "使用数字人民币支付"
                  : parkPreviewData?.status === 2
                  ? "已支付"
                  : "开始停车"}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
