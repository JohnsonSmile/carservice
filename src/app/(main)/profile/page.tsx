"use client"

import ArrowRightIcon from '@/components/common/icon/ArrowRight'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const ProfilePage = () => {
  const router = useRouter()
  const handleLogout = () => {
    router.push("/login")
  }

  const handleSearchClick = () => {
    router.push("/search")
  }
  return (
    <div>
      <div className='flex items-center p-4 bg-white border-b'>
        <Image src={"/images/avatar_0.png"} width={64} height={64} alt='avatar' />
        <div className='flex flex-col justify-center ml-2'>
          <div className='text-xl font-bold'>我会发光</div>
          <div className=''>账号: xxxssfffff</div>
        </div>
      </div>
      <div className='flex items-center justify-between p-4 border-y border-b-gray-100 h-11 bg-white mt-2' onClick={handleSearchClick}>
        <div>查询</div>
        <ArrowRightIcon className='w-4 h-4' />
      </div>
      <div className='flex items-center justify-between border-b p-4 h-11 bg-white'>
        <div>设置</div>
        <ArrowRightIcon className='w-4 h-4' />
      </div>
      <div className='flex items-center justify-center h-11 mt-2 bg-white text-red-500 cursor-pointer' onClick={handleLogout}>
        退出登录
      </div>

    </div>
  )
}

export default ProfilePage