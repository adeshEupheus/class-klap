import React from 'react'
import { Card } from '@mui/material';
import RecommendIcon from '@mui/icons-material/Recommend';
import { Download } from '@mui/icons-material';

const FeedbackCard = (props) => {
  return (
    <div className='!w-[600px] bg-slate-50 drop-shadow-xl rounded-sm'>
        <div className="flex flex-row bg-slate-300  w-full py-3 px-1 ">
       <div className='w-full font-bold text-slate-700 flex gap-2 mx-3 text-lg'><div><RecommendIcon/></div><div className='!font-lg mt-[1px]'>Feedback Report</div></div>
      
        <div className='!flex !flex-row  !justify-end  !w-full '>
            <div className='text-slate-700 font-bold text-sm mt-[3px]'>Triggered by : </div>
           <div className='!font-bold !text-slate-700 mt-[3px] text-sm'>{props.name}</div>
        </div>
        </div>
     <div className='flex flex-row w-full p-2'>
      <div className='flex flex-row w-full font-bold text-slate-500 mx-3'>Download <div className='!font-bold !text-slate-700 mx-1'>{props.examname}</div>feedback report</div>
        
        <div className='!flex !flex-row  !justify-end  !w-full'>
          <div className='px-1 py-1 rounded-md bg-blue-600 mr-3'>

           <Download /> 
          </div>
        </div>
        </div>
    </div>
  )
}

export default FeedbackCard