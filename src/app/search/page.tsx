"use client"

import ChargeIcon from "@/components/common/icon/Charge"
import HighwayIcon from "@/components/common/icon/Highway"
import ParkIcon from "@/components/common/icon/Park"
import SearchIcon from "@/components/common/icon/Search"
import { Order } from "@/hooks/http/order"
import instance from "@/lib/http"
import { useInfiniteQuery } from "@tanstack/react-query"
import moment from "moment"
import { useRouter } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import { useInView } from "react-intersection-observer"

const SearchPage = () => {
  const router = useRouter()
  const handelBack = () => {
    router.back()
  }

  const [words, setWords] = useState("")

  const { ref, inView } = useInView()
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
    queryKey: ["parks"],
    queryFn: async ({ pageParam = 1 }) => {
      const size = 100
      const res = await instance.get(
        `/order/list?page=${pageParam}&size=${size}`
      )
      return res.data
    },
    getNextPageParam: (lastPage) => {
      console.log({ lastPage })
      // TODO: 应该返回最大的id和当前的所有的分页, total应该是maxId
      return lastPage.nextId ?? undefined
    },
    getPreviousPageParam: (firstPage) => firstPage.previousId ?? undefined,
    initialPageParam: 1,
  })

  useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [inView])

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
            console.log({ order })
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
                unit_count: order.unit_count,
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
                    unit_count: order.unit_count,
                    user_id: order.user_id,
                  },
                ],
              })
            }
          })
        }
      })
    }
    if (words.trim()) {
      result.forEach((item) => {
        item.orders = item.orders.filter((order) => {
          return (
            order.start_position.includes(words) ||
            order.end_position.includes(words)
          )
        })
      })
    }
    return result
  }, [data, words])

  console.log({ orders })

  return (
    <div className="min-h-screen w-screen bg-gray-100">
      <div className="h-11 w-full relative border-b shadow-md bg-white">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          查询
        </div>
        <div
          className="absolute top-1/2 left-2 -translate-y-1/2 cursor-pointer"
          onClick={handelBack}
        >
          返回
        </div>
      </div>
      <div className="mt-2 px-4 flex items-center gap-2 relative">
        <input
          onChange={(e) => setWords(e.target.value)}
          placeholder="请输入名称"
          className="h-9 inline-block w-full border rounded-full pl-9"
        />
        <div className="w-10 font-bold text-right">筛选</div>
        <SearchIcon className="w-5 h-5 absolute left-6" />
      </div>
      <div className="mt-2 border-t">
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
              <div className="w-full rounded-md bg-white py-2 px-4 h-9 mt-2">
                日期：{order.dateStr}
              </div>
              {order.orders.map((order: Order) => (
                <div
                  key={order.id}
                  className="bg-white py-2 px-3 flex items-center justify-between border-b border-b-gray-100"
                >
                  <div className="flex items-center gap-4">
                    {order.order_type === 1 && (
                      <HighwayIcon className="w-12 h-12" />
                    )}
                    {order.order_type === 2 && (
                      <ChargeIcon className="w-12 h-12" />
                    )}
                    {order.order_type === 3 && (
                      <ParkIcon className="w-12 h-12" />
                    )}
                    <div>
                      <div className="text-sm text-gray-400">
                        单号: {order.order_sn}
                      </div>
                      <div className="text-sm text-gray-400">费用: 30.2元</div>
                      <div className="text-sm text-gray-400">
                        时间:{" "}
                        {order.start_at.split(" ")[1] +
                          "-" +
                          (order.end_at
                            ? order.end_at.split(" ")[1]
                            : "未结束")}
                      </div>
                      <div className="text-sm text-gray-400">
                        起点: {order.start_position}
                      </div>
                      <div className="text-sm text-gray-400">
                        终点: {order.end_position}
                      </div>
                    </div>
                  </div>
                  <div className="text-red-500">
                    {order.order_status === 2 ? "已支付" : "未支付"}
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
    </div>
  )
}

export default SearchPage
