import React from 'react'

const AlertApp = ({message}) => {
  return (
    <div className='mt-4 p-4 bg-red-50 border-l-4 border-red-500 rounded-md shadow-md animate-fade-in max-w-md w-full'>
                <div className='flex items-center'>
                    <svg className='w-5 h-5 text-red-500 mr-2 shrink-0' fill='currentColor' viewBox='0 0 20 20'>
                        <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z' clipRule='evenodd' />
                    </svg>
                    <p className='text-red-700 font-medium'>{message}</p>
                </div>
            </div>
  )
}

export default AlertApp