import { useToaster } from "@/components/common/toaster/Toaster"
import {
  ChargeEndRequest,
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
  unit_count?: number
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
  onSuccess?: (
    response: HighWayPreviewResponse
  ) => HighWayPreviewData | undefined
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
      if (onSuccess) {
        const res = onSuccess(data)
        if (res) {
          return res
        } else {
          throw "preview failed"
        }
      }
      if (data.data) {
        console.log({ data })
        return data.data
      }
      // TODO: error handling
      console.log({ data })
      throw "preview failed"
    },
    onError: (err) => {
      console.log({ err })
      // toast.error("获取数据失败，请稍后重试")
    },
  })
}

export interface HighWayPreviewResponse {
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

export const useStartHighway = ({
  onSuccess,
}: {
  onSuccess?: (data: HighWayPreviewData) => void
}) => {
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
        if (onSuccess) {
          onSuccess(data.data)
        }
        if (data.code !== 200) {
          toast.warn(data.msg)
        } else if (data.code === 200) {
          toast.success("成功创建订单！")
        }
        return data?.data
      }
      // TODO: error handling
      console.log({ data })
      throw "start highway failed"
    },
    onError: (err) => {
      console.log({ err })
      // toast.error("获取数据失败，请稍后重试")
    },
  })
}

// end high way
export const useEndHighway = ({
  onSuccess,
}: {
  onSuccess?: (data: HighWayPreviewData) => void
}) => {
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
        if (onSuccess) {
          onSuccess(data.data)
        }
        if (data.code !== 200) {
          toast.warn(data.msg)
        } else if (data.code === 200) {
          toast.success("成功结束订单！")
        }
        return data?.data
      }
      // TODO: error handling
      console.log({ data })
      throw "end highway failed"
    },
    onError: (err) => {
      console.log({ err })
      // toast.error("获取数据失败，请稍后重试")
    },
  })
}

export interface ChargePreviewResponse {
  code: number
  msg: string
  data?: ChargePreviewData
}

export interface ChargePreviewData {
  id?: number
  end_at: string
  end_positon: string
  order_sn: string // 充电桩编号
  price: number // fee per degree
  degree: number // degree, 这里后台直接给个假数据就行
  start_at: string
  start_positon: string
  start_id: number
  end_id: number
  status: number
}

export const useChargePreview = ({
  onSuccess,
}: {
  onSuccess?: (response: ChargePreviewResponse) => ChargePreviewData | undefined
}) => {
  const toast = useToaster()

  const chargePreview = async (params: HighwayPreviewRequest) => {
    const postData = JSON.stringify(params)
    return await instance.post<ChargePreviewResponse>(
      "/charge/preview",
      postData
    )
  }

  return useMutation({
    mutationKey: ["charge/preview"],
    mutationFn: async (params: HighwayPreviewRequest) => {
      const { data } = await chargePreview(params)
      if (onSuccess) {
        const res = onSuccess(data)
        if (res) {
          return res
        } else {
          throw "preview failed"
        }
      }
      if (data.data) {
        console.log({ data })
        return data.data
      }
      // TODO: error handling
      console.log({ data })
      throw "preview failed"
    },
    onError: (err) => {
      console.log({ err })
      // toast.error("获取数据失败，请稍后重试")
    },
  })
}

// start charge
export const useStartCharge = ({
  onSuccess,
}: {
  onSuccess?: (data: ChargePreviewData) => void
}) => {
  const toast = useToaster()

  const startHighway = async (params: HighwayStartRequest) => {
    const postData = JSON.stringify(params)
    return await instance.post<ChargePreviewResponse>("/charge/start", postData)
  }
  return useMutation({
    mutationKey: ["charge/start"],
    mutationFn: async (params: HighwayStartRequest) => {
      const { data } = await startHighway(params)
      if (data.data) {
        if (onSuccess) {
          onSuccess(data.data)
        }
        if (data.code !== 200) {
          toast.warn(data.msg)
        } else if (data.code === 200) {
          toast.success("成功创建订单！")
        }
        return data?.data
      }
      // TODO: error handling
      console.log({ data })
      throw "start charge failed"
    },
    onError: (err) => {
      console.log({ err })
      // toast.error("获取数据失败，请稍后重试")
    },
  })
}

// end charge
export const useEndCharge = ({
  onSuccess,
}: {
  onSuccess?: (data: ChargePreviewData) => void
}) => {
  const toast = useToaster()

  const endCharge = async (params: ChargeEndRequest) => {
    const postData = JSON.stringify(params)
    return await instance.post<ChargePreviewResponse>("/charge/end", postData)
  }
  return useMutation({
    mutationKey: ["charge/end"],
    mutationFn: async (params: ChargeEndRequest) => {
      const { data } = await endCharge(params)
      if (data.data) {
        if (onSuccess) {
          onSuccess(data.data)
        }
        if (data.code !== 200) {
          toast.warn(data.msg)
        } else if (data.code === 200) {
          toast.success("成功结束订单！")
        }
        return data?.data
      }
      // TODO: error handling
      console.log({ data })
      throw "end charge failed"
    },
    onError: (err) => {
      console.log({ err })
      // toast.error("获取数据失败，请稍后重试")
    },
  })
}
