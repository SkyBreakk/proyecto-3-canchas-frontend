import React from 'react'

const AlertApp = ({message}) => {
  return (
    <div className='mt-4 p-4 bg-red-50 border-l-4 border-red-500 rounded-md shadow-md animate-fade-in max-w-md w-full'>
                <div className='flex items-center'>
                    <p className='text-red-700 font-medium'>{message}</p>
                </div>
            </div>
  )
}

export default AlertApp