import { Skeleton } from '@mui/material'
import React from 'react'

const SchoolInfo = ({SchoolInfoLoading, schoolInfo}) => {
  return (
    <>
     {SchoolInfoLoading ? (
            <div className="w-full flex flex-col gap-1 items-end">
             <Skeleton
            animation="wave"
            variant="text"
            width={200}
            />
              <Skeleton
            animation="wave"
            variant="text"
            width={200}
            />
            </div>
           ) : (
             <div className="w-full flex text-sm font-semibold bg-gray-200 text-gray-600 justify-end">
              <div className="flex flex-col px-4 cursor-pointer py-4 items-end gap-[1px]">
              <span>{schoolInfo.schoolName}</span>
              <span>{schoolInfo.schoolCode} [{schoolInfo.academicYearDisplayName}]</span>
              </div>
              
          </div>
           )}
           
    </>
  )
}

export default SchoolInfo
