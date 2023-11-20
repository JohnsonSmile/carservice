"use client"

import instance from "@/lib/http"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useEffect, useMemo } from "react"
import { useInView } from "react-intersection-observer"
import moment from "moment"
import { Order, usePayOrder } from "@/hooks/http/order"
import { cn } from "@/lib/utils"
import useStore from "@/store/store"

const HighwayPage = () => {
  const { ref, inView } = useInView()
  const { shouldRefetch, setShouldRefetch, setScanOpen } = useStore()
  const {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["highways"],
    queryFn: async ({ pageParam = 1 }) => {
      const size = 100
      const res = await instance.get(
        `/highway/orders?page=${pageParam}&size=${size}`
      )
      return res.data
    },
    getNextPageParam: (lastPage) => lastPage.nextId ?? undefined,
    getPreviousPageParam: (firstPage) => firstPage.previousId ?? undefined,
    initialPageParam: 1,
  })

  useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [inView])

  useEffect(() => {
    if (shouldRefetch) {
      refetch()
      setShouldRefetch(false)
    }
  }, [shouldRefetch])

  const orders = useMemo(() => {
    if (!data?.pages) {
      return []
    }
    // code: 200
    // data: {orders: Array(1), total: 1}
    // msg: "success"
    const result: {
      dateStr: string
      orders: Order[]
    }[] = []
    if (data.pages.length > 0) {
      data.pages.forEach((page) => {
        if (page.data && page.data.orders && page.data.orders.length > 0) {
          page.data.orders.forEach((order: any) => {
            const dateStr = moment(order.start_at).format("YYYY-MM-DD")
            console.log(dateStr)
            if (
              result.length > 0 &&
              result[result.length - 1].dateStr === dateStr
            ) {
              result[result.length - 1].orders.push({
                id: order.id,
                order_sn: order.order_sn,
                order_status: order.order_status,
                order_type: order.order_type_id,
                start_at: order.start_at
                  ? moment(order.start_at).format("YYYY-MM-DD hh:mm:ss")
                  : "-",
                end_at: order.end_at
                  ? moment(order.end_at).format("YYYY-MM-DD hh:mm:ss")
                  : "-",
                start_position: order.start_position.name,
                end_position: order.end_position.name,
                fee: order.fee,
                user_id: order.user_id,
              })
            } else {
              result.push({
                dateStr,
                orders: [
                  {
                    id: order.id,
                    order_sn: order.order_sn,
                    order_status: order.order_status,
                    order_type: order.order_type_id,
                    start_at: order.start_at
                      ? moment(order.start_at).format("YYYY-MM-DD hh:mm:ss")
                      : "-",
                    end_at: order.end_at
                      ? moment(order.end_at).format("YYYY-MM-DD hh:mm:ss")
                      : "-",
                    start_position: order.start_position.name,
                    end_position: order.end_position.name,
                    fee: order.fee,
                    user_id: order.user_id,
                  },
                ],
              })
            }
          })
        }
      })
    }
    return result
  }, [data])

  // payorder
  const handlePaySuccess = () => {
    setShouldRefetch(true)
  }
  const {
    isPending: isPayLoading,
    mutate: payOrder,
    data: payData,
    error: payError,
  } = usePayOrder({
    onSuccess: handlePaySuccess,
  })

  const handleClick = async (order_status: number, order_id: number) => {
    if (order_status === 2) {
      // order_status === 2 payed
      // 已经支付了，就不做任何响应
      return
    }
    if (order_status === 0) {
      // order_status === 0 start
      // 点击打开二维码，来end当前order
      setScanOpen(true)
      return
    }

    if (order_status === 1) {
      // order_status === 1 end
      // 点击来支付当前order
      await payOrder({ id: order_id })
      return
    }
  }

  return (
    <div className="px-6 pb-20 text-sm">
      <div>
        {orders.length === 0 && isFetching && (
          <div className="h-screen w-full flex items-center justify-center">
            正在加载中...
          </div>
        )}
        {orders.length === 0 && !isFetching && (
          <div className="h-screen w-full flex items-center justify-center">
            没有历史订单...
          </div>
        )}
        {/* <button
          onClick={() => fetchPreviousPage()}
          disabled={!hasPreviousPage || isFetchingPreviousPage}
        >
          {isFetchingPreviousPage
            ? "Loading more..."
            : hasPreviousPage
            ? "Load Older"
            : "Nothing more to load"}
        </button> */}
        {orders.map((order) => (
          <div key={order.dateStr}>
            <div className="shadow-md w-full rounded-md bg-white py-2 px-4 h-9 mt-2">
              日期：{order.dateStr}
            </div>
            {order.orders.map((order: Order) => (
              <div
                key={order.id}
                className="shadow-md w-full rounded-md mt-2 p-4 bg-white flex flex-col gap-2"
              >
                <div className="flex justify-between items-center">
                  <span>起始收费站:</span>
                  <span>{order.start_position}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>结束收费站:</span>
                  <span>{order.end_position || "-"}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>单号:</span>
                  <span>{order.order_sn || "-"}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>状态:</span>
                  {/* TODO: status */}
                  <span
                    className={
                      order.order_status === 0
                        ? "text-orange-400" // start
                        : order.order_status === 1
                        ? "text-red-500" // end
                        : "text-green-500" // payed
                    }
                  >
                    {/* 0-start;1-end;2-payed */}
                    {
                      order.order_status === 0
                        ? "行驶中" // start
                        : order.order_status === 1
                        ? "未支付" // end
                        : "已支付" // payed
                    }
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>价格:</span>
                  <span>{order.fee}元</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>开始时间:</span>
                  <span>{order.start_at}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>结束时间:</span>
                  <span>{order.end_at}</span>
                </div>
                {/* TODO: status */}
                <div
                  className={cn(
                    "mt-4 w-full text-center py-2 text-white rounded-md",
                    {
                      "bg-orange-400 text-white": order.order_status === 0,
                      "bg-green-500 text-white": order.order_status === 1,
                      "bg-gray-100 text-black/70": order.order_status === 2,
                      "cursor-pointer": order.order_status !== 2,
                    }
                  )}
                  onClick={() => handleClick(order.order_status, order.id)}
                >
                  {
                    order.order_status === 0
                      ? "下高速" // start
                      : order.order_status === 1
                      ? "使用数字人民币支付" // end
                      : "已支付" // payed
                  }
                </div>
              </div>
            ))}
          </div>
        ))}
        {orders.length !== 0 && (
          <button
            ref={ref}
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
            className="w-full py-2"
          >
            {isFetchingNextPage
              ? "加载更多"
              : hasNextPage
              ? "加载最新"
              : "我是有底线的"}
          </button>
        )}
        <div>{isFetching && !isFetchingNextPage ? "更新中..." : null}</div>
      </div>
    </div>
  )
}

export default HighwayPage
