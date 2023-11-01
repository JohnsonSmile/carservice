"use client"

import { useState } from 'react'
import PlusIcon from '../icon/Plus'
import QRReader from '../qrcode/QRReader'

const PlusBarItem = () => {
  const [open, setOpen] = useState(false)
  const handlePlusClick = () => {
    setOpen(true)
  }
  return (
    <div className="flex items-center justify-center">
      <button type="button" className="inline-flex items-center justify-center w-10 h-10 font-medium bg-blue-600 rounded-full hover:bg-blue-700 group focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800" onClick={handlePlusClick}>
        <PlusIcon className="w-4 h-4 text-white" />
      </button>
      {open && <QRReader open={open} onOpenChange={setOpen} />}
    </div>
  )
}

export default PlusBarItem