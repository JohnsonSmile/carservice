import { useToaster } from "@/components/common/toaster/Toaster"
import { LoginFormSchema, RegisterFormSchema } from "@/form/user"
import instance from "@/lib/http"
import useStore from "@/store/store"
import { useMutation } from "@tanstack/react-query"

export const useLogin = ({ onSuccess }: { onSuccess?: () => void }) => {
  const toast = useToaster()
  const toastId = "user login"

  const { setUser } = useStore()

  const login = async (params: LoginFormSchema) => {
    const postData = JSON.stringify(params)
    return await instance.post<UserData>("/user/login", postData)
  }

  return useMutation({
    mutationKey: ["login"],
    mutationFn: async (params: LoginFormSchema) => {
      toast.loading("登录中...", {
        toastId,
      })
      const { data } = await login(params)
      if (data.data?.token) {
        const token = (data as UserData)?.data?.token
        localStorage?.setItem("car-token", token || "")
        toast.update(toastId, {
          isLoading: false,
          render: "登录成功.",
          type: "success",
          autoClose: 3000,
          closeButton: false,
        })
        if (data.data.user) {
          setUser(
            data.data.user.avatar,
            data.data.user.bio,
            data.data.user.id,
            data.data.user.phone,
            data.data.user.username
          )
        }
        return data?.data
      }
      throw "login failed"
    },
    onSuccess: onSuccess,
    onError: (err) => {
      console.log({ err })
      toast.update(toastId, {
        isLoading: false,
        render: "登录失败，请稍后重试",
        type: "error",
        autoClose: 3000,
        closeButton: false,
      })
    },
  })
}

export const useRegister = ({ onSuccess }: { onSuccess?: () => void }) => {
  const toast = useToaster()
  const toastId = "user register"

  const { setUser } = useStore()

  const register = async (params: Omit<RegisterFormSchema, "agree">) => {
    const postData = JSON.stringify(params)
    return await instance.post<UserData>("/user/register", postData)
  }

  return useMutation({
    mutationKey: ["register"],
    mutationFn: async (params: RegisterFormSchema) => {
      toast.loading("注册中...", {
        toastId,
      })
      const { data } = await register(params)
      /**
       {
          "code": 200,
          "msg": "create user successfully",
          "data": {
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6MSwiTmlja05hbWUiOiIxODUzOTI2NTYwMCIsIkF1dGhvcml0eUlkIjowLCJleHAiOjE3MDIzODk3MTAsImlhdCI6MTY5OTc5NzcxMCwiaXNzIjoiY2Fyc2VydmljZSJ9.fsEoUg7EQPaJfmVGQpUnuy3vi7XPN0aesMrM79rLh0A",
            "user": {
                "avatar": "",
                "bio": "",
                "id": 1,
                "phone": "18539265600",
                "username": "18539265600"
            }
          }
        }
       */
      if (data.data?.token) {
        const token = (data as UserData)?.data?.token
        localStorage?.setItem("car-token", token || "")
        toast.update(toastId, {
          isLoading: false,
          render: "注册成功.",
          type: "success",
          autoClose: 3000,
          closeButton: false,
        })
        if (data.data.user) {
          setUser(
            data.data.user.avatar,
            data.data.user.bio,
            data.data.user.id,
            data.data.user.phone,
            data.data.user.username
          )
        }
        return data?.data
      }
      throw "register failed"
    },
    onSuccess: onSuccess,
    onError: (err) => {
      console.log({ err })
      toast.update(toastId, {
        isLoading: false,
        render: "注册失败，请稍后重试",
        type: "error",
        autoClose: 3000,
        closeButton: false,
      })
    },
  })
}

interface UserData {
  code: number
  msg: string
  data?: {
    token?: string
    user: {
      avatar: string
      bio: string
      id: number
      phone: string
      username: string
    }
  }
}
