"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoginForm, LoginFormSchema } from "@/form/user"
import { useEffect } from "react"
import { useLogin } from "@/hooks/http/user"

const LoginPage = () => {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormSchema>({
    resolver: zodResolver(LoginForm),
    defaultValues: {
      phone: "",
      password: "",
    },
    mode: "onSubmit",
    reValidateMode: "onChange",
  })

  const onSubmit: SubmitHandler<LoginFormSchema> = async (data) => {
    console.log({ data })
    await handleLogin(data)
  }

  const {
    isPending,
    isSuccess,
    mutate: handleLogin,
    error: loginError,
  } = useLogin({})

  useEffect(() => {
    if (isSuccess) {
      router.push("/")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess])

  return (
    <form className="min-h-screen w-full p-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="mt-10 text-xl font-bold">欢迎使用</div>
      <input
        placeholder={"请输入手机号"}
        {...register("phone")}
        className={"mt-4 block w-full h-10 px-2 border-b"}
      />
      <span className="text-red-500 text-xs">
        {errors.phone?.message}&nbsp;
      </span>
      <input
        placeholder="请输入密码"
        {...register("password")}
        className="block w-full h-10 px-2 border-b"
      />
      <span className="text-red-500 text-xs">
        {errors.password?.message}&nbsp;
      </span>
      <button
        className="w-full h-10 rounded-md bg-green-500 text-white"
        type="submit"
      >
        登录
      </button>
      <div className="flex justify-between text-sm mt-2">
        <button className="text-black/70">忘记密码</button>
        <Link className="text-green-500" href="/register">
          注册账号
        </Link>
      </div>
    </form>
  )
}

export default LoginPage
