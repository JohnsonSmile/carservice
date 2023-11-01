"use client"

import ChargeIcon from '@/components/common/icon/Charge'
import HighwayIcon from '@/components/common/icon/Highway'
import ParkIcon from '@/components/common/icon/Park'
import SearchIcon from '@/components/common/icon/Search'
import { useRouter } from 'next/navigation'
import React from 'react'

const SearchPage = () => {
  const router = useRouter()
  const handelBack = () => {
    router.back()
  }
  return (
    <div className='min-h-screen w-screen bg-gray-100'>

      <div className='h-11 w-full relative border-b shadow-md bg-white'>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">查询</div>
        <div className="absolute top-1/2 left-2 -translate-y-1/2 cursor-pointer" onClick={handelBack}>返回</div>
      </div>
      <div className='mt-2 px-4 flex items-center gap-2 relative'>
        <input placeholder='请输入名称' className='h-9 inline-block w-full border rounded-full pl-9' />
        <div className='w-10 font-bold text-right'>筛选</div>
        <SearchIcon className='w-5 h-5 absolute left-6' />
      </div>
      <div className='mt-6 border-y'>

        <div className='bg-white py-2 px-3 flex items-center justify-between border-b border-b-gray-100'>
          <div className='flex items-center gap-2'>
            <HighwayIcon className='w-10 h-10' />
            <div>
              <div className='text-sm text-gray-400'>单号: akdslfffff</div>
              <div className='text-sm text-gray-400'>费用: 30.2元</div>
            </div>
          </div>
          <div className='text-red-500'>未支付</div>
        </div>
        <div className='bg-white py-2 px-3 flex items-center justify-between border-b border-b-gray-100'>
          <div className='flex items-center gap-2'>
            <HighwayIcon className='w-10 h-10' />
            <div>
              <div className='text-sm text-gray-400'>单号: akdslfffff</div>
              <div className='text-sm text-gray-400'>费用: 30.2元</div>
            </div>
          </div>
          <div className='text-green-500'>已支付</div>
        </div>
        <div className='bg-white py-2 px-3 flex items-center justify-between border-b border-b-gray-100'>
          <div className='flex items-center gap-2'>
            <ChargeIcon className='w-10 h-10' />
            <div>
              <div className='text-sm text-gray-400'>单号: akdslfffff</div>
              <div className='text-sm text-gray-400'>费用: 30.2元</div>
            </div>
          </div>
          <div className='text-green-500'>已支付</div>
        </div>
        <div className='bg-white py-2 px-3 flex items-center justify-between border-b border-b-gray-100'>
          <div className='flex items-center gap-2'>
            <ParkIcon className='w-10 h-10' />
            <div>
              <div className='text-sm text-gray-400'>单号: akdslfffff</div>
              <div className='text-sm text-gray-400'>费用: 30.2元</div>
            </div>
          </div>
          <div className='text-green-500'>已支付</div>
        </div>
      </div>
    </div>
  )
}

export default SearchPage