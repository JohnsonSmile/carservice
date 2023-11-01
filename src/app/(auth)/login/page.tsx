"use client"
import Link from 'next/link'
import { useRouter } from 'next/navigation'


const LoginPage = () => {
  const router = useRouter()
  const handleLogin = () => {
    router.replace("/")
  }
  return (
    <div className='min-h-screen w-screen p-6'>
      <div className='mt-10 text-xl font-bold'>欢迎使用</div>
      <input placeholder='请输入手机号' className='mt-4 block w-full h-10 px-2 border-b' />
      <input placeholder='请输入密码' className='mt-4 block w-full h-10 px-2 border-b' />
      <button className='w-full mt-4 h-10 rounded-md bg-green-500 text-white' onClick={handleLogin}>登录</button>
      <div className='flex justify-between text-sm mt-2'>
        <button className='text-black/70'>忘记密码</button>
        <Link className='text-green-500' href="/register">注册账号</Link>
      </div>
    </div>
  )
}

export default LoginPage