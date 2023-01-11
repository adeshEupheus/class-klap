import React from 'react'
import { Card } from '@mui/material';
import RecommendIcon from '@mui/icons-material/Recommend';
import { Download } from '@mui/icons-material';



const FeedbackCard = ({data}) => {
  return (
    <div className=' !w-full sm:!w-[600px] bg-slate-50 drop-shadow-xl rounded-sm'>
        <div className="flex flex-row bg-slate-300  w-full py-3 px-1 ">
       <div className='w-full font-bold text-slate-700 flex gap-1 sm:gap-2 sm:mx-3  text-xs'><div className=""><RecommendIcon className='!text-[20px] sm:!text-[30px]'/></div><div className='sm:!text-lg mt-[1px] text-xs'>{data.title}</div></div>
      
        <div className='!flex !flex-row  !justify-end  !w-full ml-2'>
            <div className='text-slate-700 font-bold     sm:!text-lg mt-[1px] text-xs'>Triggered by : </div>
           <div className='!font-semibold !text-slate-700 mt-[2%] sm:mt-[7px] text-xs sm:text-sm ml-1'>{data.triggeredBy}</div>
        </div>
        </div>
     <div className='flex flex-row w-full p-2'>
      <div className='flex flex-row w-full  mx-0  text-xs sm:text-lg sm:mx-3 font-semibold text-slate-500  '>{data.description}</div>
        <div className='!flex !flex-row  !justify-end  !w-full'>
          <div className='px-1 py-1 rounded-md bg-blue-500 my-5 sm:mr-3'>

           <Download className='text-white sm:m-1 sm:!text-lg !text-base' /> 
          </div>
        </div>
        </div>
    </div>
  )
}

export default FeedbackCard