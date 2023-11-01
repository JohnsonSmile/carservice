import React from 'react'

const ParkPage = () => {
  return (


    <div className='px-6 pb-20 text-sm'>
      <div>
        <div className='shadow-md w-full bg-white py-1 px-4 mt-6'>日期：2023-11-12</div>
        <div className='shadow-md w-full rounded-md mt-2 p-4 bg-white flex flex-col gap-2'>
          <div className='flex justify-between items-center'>
            <span>位置:</span>
            <span>深圳湾壹号</span>
          </div>
          <div className='flex justify-between items-center'>
            <span>停车场编号:</span>
            <span>SZ1012237443223</span>
          </div>
          <div className='flex justify-between items-center'>
            <span>收费标准:</span>
            <span>2.5元/小时</span>
          </div>
          <div className='flex justify-between items-center'>
            <span>状态:</span>
            <span className='text-red-500'>未支付</span>
          </div>
          <div className='flex justify-between items-center'>
            <span>停车时间:</span>
            <span>2.5小时</span>
          </div>
          <div className='flex justify-between items-center'>
            <span>价格:</span>
            <span>33.50元</span>
          </div>
          <div className='flex justify-between items-center'>
            <span>开始时间:</span>
            <span>2023-11-12 09:11:30</span>
          </div>
          <div className='flex justify-between items-center'>
            <span>结束时间:</span>
            <span>2023-11-12 12:12:10</span>
          </div>
          <div className='mt-4 w-full text-center py-2 bg-green-500 text-white rounded-md'>
            使用数字人民币支付
          </div>
        </div>
        <div className='shadow-md w-full rounded-md mt-2 p-4 bg-white flex flex-col gap-2'>
          <div className='flex justify-between items-center'>
            <span>位置:</span>
            <span>深圳湾壹号</span>
          </div>
          <div className='flex justify-between items-center'>
            <span>停车场编号:</span>
            <span>SZ1012237443223</span>
          </div>
          <div className='flex justify-between items-center'>
            <span>收费标准:</span>
            <span>2.5元/小时</span>
          </div>
          <div className='flex justify-between items-center'>
            <span>状态:</span>
            <span className='text-green-500'>已支付</span>
          </div>
          <div className='flex justify-between items-center'>
            <span>停车时间:</span>
            <span>2.5小时</span>
          </div>
          <div className='flex justify-between items-center'>
            <span>价格:</span>
            <span>45.20元</span>
          </div>
          <div className='flex justify-between items-center'>
            <span>开始时间:</span>
            <span>2023-11-12 06:11:30</span>
          </div>
          <div className='flex justify-between items-center'>
            <span>结束时间:</span>
            <span>2023-11-12 07:12:10</span>
          </div>
          <div className='mt-4 w-full text-center py-2 bg-gray-100 text-black/70 rounded-md'>
            已支付
          </div>
        </div>
        <div className='shadow-md w-full rounded-md mt-2 p-4 bg-white flex flex-col gap-2'>
          <div className='flex justify-between items-center'>
            <span>位置:</span>
            <span>深圳湾壹号</span>
          </div>
          <div className='flex justify-between items-center'>
            <span>停车场编号:</span>
            <span>SZ1012237443223</span>
          </div>
          <div className='flex justify-between items-center'>
            <span>收费标准:</span>
            <span>2.5元/小时</span>
          </div>
          <div className='flex justify-between items-center'>
            <span>状态:</span>
            <span className='text-orange-400'>停车中</span>
          </div>
          <div className='flex justify-between items-center'>
            <span>停车时间:</span>
            <span>-</span>
          </div>
          <div className='flex justify-between items-center'>
            <span>价格:</span>
            <span>-</span>
          </div>
          <div className='flex justify-between items-center'>
            <span>开始时间:</span>
            <span>2023-11-12 06:11:30</span>
          </div>
          <div className='flex justify-between items-center'>
            <span>结束时间:</span>
            <span>-</span>
          </div>
          <div className='mt-4 w-full text-center py-2 bg-orange-400 text-white rounded-md'>
            离开停车场
          </div>
        </div>
      </div>
    </div>
  )
}

export default ParkPage