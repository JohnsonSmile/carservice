"use client"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog"
import { useState } from "react"
import { useToaster } from "../toaster/Toaster"
import lodash from "lodash"

interface ChargeScoreDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  confirmClick: (score: number) => void
}

const ChargeScoreDialog = ({
  open,
  onOpenChange,
  confirmClick,
}: ChargeScoreDialogProps) => {
  const toast = useToaster()
  const [score, setScore] = useState(0)

  const handleChargeScoreClick = () => {
    const isInteger = lodash.isInteger(score)
    if (!isInteger) {
      toast.warn("请输入整数")
      return
    }
    if (score <= 0) {
      toast.warn("请输入大于0的整数")
      return
    }
    confirmClick(score)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[368px] rounded-[15px] px-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold capitalize leading-[30px] text-ui-bt0">
            <div>{"充值积分"}</div>
          </DialogTitle>
        </DialogHeader>
        <div className="w-full mt-2">
          <input
            type="number"
            onChange={(e) => setScore(Number(e.target.value))}
            placeholder="请输入积分金额"
            className="block w-full h-10 px-2 border rounded-md"
          />
          <button
            className="mt-6 w-full h-10 bg-green-500 text-white rounded-md"
            onClick={handleChargeScoreClick}
          >
            充值
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ChargeScoreDialog
