import React from 'react'
import PlusIcon from '../icon/Plus'

const PlusBarItem = () => {
  return (
    <div className="flex items-center justify-center">
      <button type="button" className="inline-flex items-center justify-center w-10 h-10 font-medium bg-blue-600 rounded-full hover:bg-blue-700 group focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800">
        <PlusIcon className="w-4 h-4 text-white" />
      </button>
    </div>
  )
}

export default PlusBarItem