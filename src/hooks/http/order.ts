import { useToaster } from "@/components/common/toaster/Toaster"
import {
  HighwayEndRequest,
  HighwayPreviewRequest,
  HighwayStartRequest,
} from "@/form/order"
import instance from "@/lib/http"
import { useMutation } from "@tanstack/react-query"

export interface Order {
  end_at?: string
  end_position: string
  fee: number
  id: number
  order_sn: string
  order_status: number // 0-start;1-end;2-payed
  order_type: number
  start_at: string
  start_position: string
  user_id: number
}

export const useHighWayPreview = ({
  onSuccess,
}: {
  onSuccess?: () => void
}) => {
  const toast = useToaster()

  const highwayPreview = async (params: HighwayPreviewRequest) => {
    const postData = JSON.stringify(params)
    return await instance.post<HighWayPreviewResponse>(
      "/highway/preview",
      postData
    )
  }

  return useMutation({
    mutationKey: ["highway/preview"],
    mutationFn: async (params: HighwayPreviewRequest) => {
      const { data } = await highwayPreview(params)
      if (data.data) {
        return data?.data
      }
      // TODO: error handling
      console.log({ data })
      throw "preview failed"
    },
    onSuccess: onSuccess,
    onError: (err) => {
      console.log({ err })
      toast.error("获取数据失败，请稍后重试")
    },
  })
}

interface HighWayPreviewResponse {
  code: number
  msg: string
  data?: HighWayPreviewData
}

export interface HighWayPreviewData {
  end_at: string
  end_positon: string
  order_sn: string
  price: number
  start_at: string
  start_positon: string
  start_id: number
  end_id: number
  status: number
}

// start high way

export const useStartHighway = () => {
  const toast = useToaster()

  const startHighway = async (params: HighwayStartRequest) => {
    const postData = JSON.stringify(params)
    return await instance.post<HighWayPreviewResponse>(
      "/highway/start",
      postData
    )
  }
  return useMutation({
    mutationKey: ["highway/start"],
    mutationFn: async (params: HighwayStartRequest) => {
      const { data } = await startHighway(params)
      if (data.data) {
        return data?.data
      }
      // TODO: error handling
      console.log({ data })
      throw "start highway failed"
    },
    onError: (err) => {
      console.log({ err })
      toast.error("获取数据失败，请稍后重试")
    },
  })
}

// end high way
export const useEndHighway = () => {
  const toast = useToaster()

  const endHighway = async (params: HighwayEndRequest) => {
    const postData = JSON.stringify(params)
    return await instance.post<HighWayPreviewResponse>("/highway/end", postData)
  }
  return useMutation({
    mutationKey: ["highway/end"],
    mutationFn: async (params: HighwayEndRequest) => {
      const { data } = await endHighway(params)
      if (data.data) {
        return data?.data
      }
      // TODO: error handling
      console.log({ data })
      throw "end highway failed"
    },
    onError: (err) => {
      console.log({ err })
      toast.error("获取数据失败，请稍后重试")
    },
  })
}
