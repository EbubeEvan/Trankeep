import React from 'react'

const ViewForm = () => {
  return (
    <form action="" className='flex gap-x-[3rem] gap-y-[2rem] flex-col md:flex-row mt-5'>
        <button className='bg-blue-500 text-white p-3 rounded-md'>Send as Email</button>
        <button type='submit' className='bg-blue-500 text-white p-3 rounded-md'>Generate reciept</button>
    </form>
  )
}

export default ViewForm