import { useToaster } from "@/components/common/toaster/Toaster"
import { HighwayPreviewRequest } from "@/form/order"
import instance from "@/lib/http"
import { useMutation } from "@tanstack/react-query"

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
  status: number
}
