"use client"

const HighwayPage = () => {
  return (
    <div className="px-6 pb-20 text-sm">
      <div>
        <div className="shadow-md w-full rounded-md bg-white py-2 px-4 mt-2">
          日期：2023-11-12
        </div>
        <div className="shadow-md w-full rounded-md mt-2 p-4 bg-white flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <span>起始收费站:</span>
            <span>尖沙咀</span>
          </div>
          <div className="flex justify-between items-center">
            <span>结束收费站:</span>
            <span>深圳湾</span>
          </div>
          <div className="flex justify-between items-center">
            <span>单号:</span>
            <span>ETC202311110911123456</span>
          </div>
          <div className="flex justify-between items-center">
            <span>状态:</span>
            <span className="text-red-500">未支付</span>
          </div>
          <div className="flex justify-between items-center">
            <span>价格:</span>
            <span>33.50元</span>
          </div>
          <div className="flex justify-between items-center">
            <span>开始时间:</span>
            <span>2023-11-12 09:11:30</span>
          </div>
          <div className="flex justify-between items-center">
            <span>结束时间:</span>
            <span>2023-11-12 12:12:10</span>
          </div>
          <div className="mt-4 w-full text-center py-2 bg-green-500 text-white rounded-md">
            使用数字人民币支付
          </div>
        </div>
        <div className="shadow-md w-full rounded-md mt-2 p-4 bg-white flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <span>起始收费站:</span>
            <span>尖沙咀</span>
          </div>
          <div className="flex justify-between items-center">
            <span>结束收费站:</span>
            <span>深圳湾</span>
          </div>
          <div className="flex justify-between items-center">
            <span>单号:</span>
            <span>ETC202311110610123451</span>
          </div>
          <div className="flex justify-between items-center">
            <span>状态:</span>
            <span className="text-green-500">已支付</span>
          </div>
          <div className="flex justify-between items-center">
            <span>价格:</span>
            <span>45.20元</span>
          </div>
          <div className="flex justify-between items-center">
            <span>开始时间:</span>
            <span>2023-11-12 06:11:30</span>
          </div>
          <div className="flex justify-between items-center">
            <span>结束时间:</span>
            <span>2023-11-12 07:12:10</span>
          </div>
          <div className="mt-4 w-full text-center py-2 bg-gray-100 text-black/70 rounded-md">
            已支付
          </div>
        </div>
        <div className="shadow-md w-full rounded-md mt-2 p-4 bg-white flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <span>起始收费站:</span>
            <span>尖沙咀</span>
          </div>
          <div className="flex justify-between items-center">
            <span>结束收费站:</span>
            <span>-</span>
          </div>
          <div className="flex justify-between items-center">
            <span>单号:</span>
            <span>ETC202311110610123451</span>
          </div>
          <div className="flex justify-between items-center">
            <span>状态:</span>
            <span className="text-orange-400">行驶中</span>
          </div>
          <div className="flex justify-between items-center">
            <span>价格:</span>
            <span>-</span>
          </div>
          <div className="flex justify-between items-center">
            <span>开始时间:</span>
            <span>2023-11-12 06:11:30</span>
          </div>
          <div className="flex justify-between items-center">
            <span>结束时间:</span>
            <span>-</span>
          </div>
          <div className="mt-4 w-full text-center py-2 bg-orange-400 text-white rounded-md">
            下高速
          </div>
        </div>
      </div>
    </div>
  )
}

export default HighwayPage
