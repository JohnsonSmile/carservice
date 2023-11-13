"use client"

import { RegisterForm, RegisterFormSchema } from "@/form/user"
import { useRegister } from "@/hooks/http/user"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { SubmitHandler, useForm } from "react-hook-form"

const RegisterPage = () => {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormSchema>({
    resolver: zodResolver(RegisterForm),
    defaultValues: {
      phone: "",
      password: "",
      repassword: "",
      agree: false,
    },
    mode: "onSubmit",
    reValidateMode: "onChange",
  })

  const onSubmit: SubmitHandler<RegisterFormSchema> = async (data) => {
    console.log({ data })
    await handleRegister(data)
  }

  const {
    isPending,
    isSuccess,
    mutate: handleRegister,
    error: registerError,
  } = useRegister({})

  useEffect(() => {
    if (isSuccess) {
      router.push("/")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess])
  return (
    <form className="min-h-screen p-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="mt-10 text-xl font-bold">注册账号</div>
      <input
        placeholder="请输入手机号"
        {...register("phone")}
        className="mt-4 block w-full h-10 px-2 border-b"
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
      <input
        placeholder="请验证密码"
        {...register("repassword")}
        className="block w-full h-10 px-2 border-b"
      />
      <span className="text-red-500 text-xs">
        {errors.repassword?.message}&nbsp;
      </span>
      <button
        className="w-full h-10 rounded-md bg-green-500 text-white"
        type="submit"
      >
        同意协议并注册
      </button>
      <div className="flex justify-between text-sm mt-2">
        <div className="text-black/70 flex items-center gap-1">
          <input type="checkbox" {...register("agree")} />
          <span>我已阅读并同意协议</span>
        </div>
        <Link className="text-green-500" href="/login">
          登录账号
        </Link>
      </div>
      <span className="text-red-500 text-xs">
        {errors.agree?.message}&nbsp;
      </span>
    </form>
  )
}

export default RegisterPage
