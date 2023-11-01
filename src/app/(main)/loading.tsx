import { Loader2 } from 'lucide-react'
import React from 'react'

const Loading = () => {
  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <Loader2 className='w-12 h-12 animate-spin'/>
    </div>
  )
}

export default Loading