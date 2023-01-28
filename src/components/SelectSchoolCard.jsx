import Cookies from 'js-cookie'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { setSchoolId } from '../apis/fectcher/SetSchoolId'

const SelectSchoolCard = ({ details }) => {
  const navigate = useNavigate()
  const handleSelectSchool = async (data) => {
    // console.log(data.schoolAcademicYearId)
    const token = await setSchoolId(data.schoolAcademicYearId)
    // console.log(token.token)
    Cookies.set('token', token.token)
    navigate('/assessment/overview')
  }
  return (
    <div
      onClick={() => handleSelectSchool(details)}
      className='bg-white flex border-2 cursor-pointer border-slate-200 rounded-lg p-4 mb-2 text-blue-500'
    >
      <div className='bg-slate-200 rounded-full '>
        <img src=''></img>
      </div>

      <div className='flex flex-col p-2  ml-2'>
        <div className='font-semibold'>{details.schoolName}</div>
        <div className=''>{details.schoolCode}</div>
      </div>
    </div>
  )
}

export default SelectSchoolCard
