"use client"

import ChargeScoreDialog from "@/components/common/dialog/ChargeScoreDialog"
import ArrowRightIcon from "@/components/common/icon/ArrowRight"
import { useChargeScore, useGetUserInfo } from "@/hooks/http/user"
import useStore from "@/store/store"
import { set } from "lodash"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"

const ProfilePage = () => {
  const router = useRouter()
  const { phone, username, score } = useStore()
  const [chargeDialogOpen, setChargeDialogOpen] = useState(false)
  const handleLogout = () => {
    router.push("/login")
  }

  const handleSearchClick = () => {
    router.push("/search")
  }

  const { isLoading } = useGetUserInfo({})

  const handleChargeClick = () => {
    setChargeDialogOpen(true)
  }

  const handleChargeSuccess = () => {
    setChargeDialogOpen(false)
  }
  const {
    isPending: isChargeLoading,
    mutate: chargeScore,
    data: highwayPreviewData,
    error: highwayPreviewError,
  } = useChargeScore({
    onSuccess: handleChargeSuccess,
  })

  const handleChargeScoreClick = async (score: number) => {
    console.log(score)
    await chargeScore({ score })
  }

  return (
    <div>
      <div className="flex items-center p-4 bg-white border-b">
        <Image
          src={"/images/avatar_0.png"}
          width={64}
          height={64}
          alt="avatar"
        />
        <div className="flex flex-col justify-center ml-2">
          <div className="text-xl font-bold">{username}</div>
          <div className="">账号: {phone}</div>
        </div>
      </div>
      <div className="flex items-center justify-between p-4 border-y border-b-gray-100 h-11 bg-white mt-2">
        <div className="text-orange-600">积分 {score}</div>
        <div
          className="flex items-center gap-1 cursor-pointer"
          onClick={handleChargeClick}
        >
          <div className="">充值</div>
          <ArrowRightIcon className="w-4 h-4 font-semibold" />
        </div>
      </div>
      <div
        className="flex items-center justify-between p-4 border-y border-b-gray-100 h-11 bg-white mt-2"
        onClick={handleSearchClick}
      >
        <div>查询</div>
        <ArrowRightIcon className="w-4 h-4" />
      </div>
      <div className="flex items-center justify-between border-b p-4 h-11 bg-white">
        <div>设置</div>
        <ArrowRightIcon className="w-4 h-4" />
      </div>
      <div
        className="flex items-center justify-center h-11 mt-2 bg-white text-red-500 cursor-pointer"
        onClick={handleLogout}
      >
        退出登录
      </div>
      <ChargeScoreDialog
        open={chargeDialogOpen}
        onOpenChange={setChargeDialogOpen}
        confirmClick={handleChargeScoreClick}
      />
    </div>
  )
}

export default ProfilePage
