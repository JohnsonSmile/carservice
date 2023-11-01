"use client"

import Link from 'next/link'
import { useRouter } from 'next/navigation'

const RegisterPage = () => {
  const router = useRouter()
  const handleRegister = () => {
    router.replace("/")
  }
  return (
    <div className='min-h-screen w-screen p-6'>
      <div className='mt-10 text-xl font-bold'>注册账号</div>
      <input placeholder='请输入手机号' className='mt-4 block w-full h-10 px-2 border-b' />
      <input placeholder='请输入密码' className='mt-4 block w-full h-10 px-2 border-b' />
      <input placeholder='请验证密码' className='mt-4 block w-full h-10 px-2 border-b' />
      <button className='w-full mt-4 h-10 rounded-md bg-green-500 text-white' onClick={handleRegister}>同意协议并注册</button>
      <div className='flex justify-between text-sm mt-2'>
        <div className='text-black/70 flex items-center gap-1'>
          <input type='checkbox' />
          <span>我已阅读并同意协议</span>
        </div>
        <Link className='text-green-500' href="/login">登录账号</Link>
      </div>
    </div>
  )
}

export default RegisterPage