import { PlusCircleIcon, TrashIcon } from '@heroicons/react/24/solid'
import React from 'react'

const ManageAdmins = () => {
  return (
    <div className='w-full h-full overflow-hidden'>
      <div className='flex items-center justify-center flex-col w-full'>
        <div className='flex items-center justify-between w-full pb-5'>
          <p className='text-2xl font-bold'>Manage Artworks</p>
          <button
            className='bg-black border-2 border-green-500 rounded-full px-3 py-1 flex items-center justify-center gap-4'
            onClick={() => openSidebar()}
          >
            <PlusCircleIcon className='size-8 text-green-500' />
            <p className='font-bold text-lg'>Add Admin</p>
          </button>
        </div>
        <hr className='w-full h-[1px] border-none bg-white mb-5' />
      </div>
      <div className='w-full h-[25.5rem] pb-4 flex gap-6 flex-col items-center justify-start pt-7 px-3 overflow-hidden overflow-y-auto'>
        <div className='w-full bg-black border-2 border-green-500 rounded-md flex items-center justify-between px-4 py-2'>
          <div className='flex items-start justify-center flex-col gap-2'>
            <div className='text-2xl font-bold'>Admin 1</div>
            <div className='text-base font-normal italic'>admin@gmail.com</div>
          </div>
          <div className='flex items-start justify-center flex-col gap-2'>
            <div className='text-sm w-full text-center'>Date added: 06-01-2025</div>
            <button className='flex items-center justify-center px-3 bg-black border-2 border-red-500 w-full rounded-md py-1 hover:bg-red-500 gap-3 font-semibold'>
              <TrashIcon className='size-6' /> Delete Admin
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ManageAdmins