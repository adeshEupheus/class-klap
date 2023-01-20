import React from 'react';
import SelectSchoolCard from '../components/Material/SelectSchoolCard';

const SelectSchool = () => {
  return (
    <div className='flex flex-col items-center justify-center'>
        <div className=' p-5 mb-4 text-xl lg:text-2xl font-bold text-slate-600'>
            Select School for Login
        </div>
        <div className='bg-slate-200 p-3 lg:w-1/3 '> 
            <div className='flex items-center justify-center p-3 font-bold text-slate-600'>
                Academic Year 2022-2023
            </div>
          
          <SelectSchoolCard/>
          <SelectSchoolCard/>
          <SelectSchoolCard/>
             
    
        </div>
    </div>
  )
}

export default SelectSchool