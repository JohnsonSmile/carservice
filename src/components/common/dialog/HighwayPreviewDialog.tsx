import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Skeleton } from "@/components/ui/skeleton"
import { HighWayPreviewData } from "@/hooks/http/order"
import { cn } from "@/lib/utils"
import { Dialog } from "@radix-ui/react-dialog"
import loadash from "lodash"
import moment from "moment"

interface HighwayPreviewDialogProps {
  isLoading: boolean
  open: boolean
  highwayPreviewData?: HighWayPreviewData
  error?: string
  onOpenChange: (open: boolean) => void
  confirmClick: () => void
}

export const HighwayPreviewDialog = ({
  isLoading,
  open,
  onOpenChange,
  highwayPreviewData,
  error,
  confirmClick,
}: HighwayPreviewDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[368px] rounded-[15px] px-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold capitalize leading-[30px] text-ui-bt0">
            <div>{"高速公路"}</div>
          </DialogTitle>
        </DialogHeader>
        <div className="w-full">
          <div className="w-full h-[280px] rounded-md mt-2 bg-white flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <span>起始收费站:</span>
              {isLoading ? (
                <Skeleton className="w-24 h-5" />
              ) : (
                <span>{highwayPreviewData?.start_positon || "-"}</span>
              )}
            </div>
            <div className="flex justify-between items-center">
              <span>结束收费站:</span>
              {isLoading ? (
                <Skeleton className="w-24 h-5" />
              ) : (
                <span>{highwayPreviewData?.end_positon || "-"}</span>
              )}
            </div>
            <div className="flex justify-between items-center">
              <span>单号:</span>
              {isLoading ? (
                <Skeleton className="w-44 h-5" />
              ) : (
                <span>{highwayPreviewData?.order_sn || "-"}</span>
              )}
            </div>
            <div className="flex justify-between items-center">
              <span>状态:</span>
              {isLoading ? (
                <Skeleton className="w-24 h-5" />
              ) : (
                <span
                  className={
                    highwayPreviewData && highwayPreviewData?.status === 0
                      ? "text-orange-400"
                      : highwayPreviewData?.status === 1
                      ? "text-red-500"
                      : highwayPreviewData?.status === 2
                      ? "text-green-500"
                      : "text-cyan-500"
                  }
                >
                  {highwayPreviewData && highwayPreviewData?.status === 0
                    ? "行驶中"
                    : highwayPreviewData?.status === 1
                    ? "未支付"
                    : highwayPreviewData?.status === 2
                    ? "已支付"
                    : "未创建"}
                </span>
              )}
            </div>
            <div className="flex justify-between items-center">
              <span>价格:</span>
              {/* <span>33.50元</span> */}
              {isLoading ? (
                <Skeleton className="w-24 h-5" />
              ) : (
                <span>
                  {highwayPreviewData?.price
                    ? loadash.round(highwayPreviewData.price / 100, 2) + "元"
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
                  {highwayPreviewData?.start_at
                    ? moment(highwayPreviewData.start_at).format(
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
                  {highwayPreviewData?.end_at
                    ? moment(highwayPreviewData.end_at).format(
                        "YYYY-MM-DD hh:mm:ss"
                      )
                    : "-"}
                </span>
              )}
            </div>
            <div
              className={cn(
                "mt-4 w-full text-center py-2 bg-cyan-500 text-white rounded-md",
                highwayPreviewData && highwayPreviewData?.status === 0
                  ? "bg-orange-400"
                  : highwayPreviewData?.status === 1
                  ? "bg-green-500"
                  : highwayPreviewData?.status === 2
                  ? "" // TODO: 已支付
                  : "bg-cyan-500"
              )}
              onClick={confirmClick}
            >
              {highwayPreviewData && highwayPreviewData?.status === 0
                ? "下高速"
                : highwayPreviewData?.status === 1
                ? "使用数字人民币支付"
                : highwayPreviewData?.status === 2
                ? "已支付"
                : "上高速"}
            </div>
            {/* <div className="mt-4 w-full text-center py-2 bg-green-500 text-white rounded-md">
              使用数字人民币支付
            </div> */}
          </div>
        </div>
        {/* <Button
          variant={"outline"}
          className="rounded-full"
          onClick={handleComplete}
        >
          {"Complete Purchase"}
        </Button> */}
      </DialogContent>
    </Dialog>
  )
}
