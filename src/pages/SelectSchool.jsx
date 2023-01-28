import React, { useEffect } from 'react'
import { useState } from 'react'
import { GetSchoolDetails } from '../apis/fectcher/assessment/GetSchoolDetails'
import { GetSchoolList } from '../apis/fectcher/GetSchoolList'
import Loader from '../components/Material/Loader'
import SelectSchoolCard from '../components/SelectSchoolCard'

const SelectSchool = () => {
  const [schoolList, setSchoolList] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getList = async () => {
      const schoolIdList = await GetSchoolList()
      const list = await Promise.all(
        schoolIdList.map(async (id) => {
          return await GetSchoolDetails(id)
        })
      )
      const newArr = list.reduce((group, school) => {
        const { academicYearDisplayName } = school
        group[academicYearDisplayName] = group[academicYearDisplayName] ?? []
        group[academicYearDisplayName].push(school)
        return group
      }, {})
      console.log(newArr)
      setSchoolList(newArr)
      setLoading(false)
    }
    getList()
  }, [])

  return (
    <div className='flex flex-col items-center justify-center'>
      <Loader loading={loading} />
      <div className=' p-5 mb-4 text-xl lg:text-2xl font-bold text-slate-600'>
        Select School for Login
      </div>
      {/* <div className='bg-slate-200 p-3 lg:w-1/3 '>
        <div className='flex items-center justify-center p-3 font-bold text-slate-600'>
          Academic Year 2022-2023
        </div>

        <SelectSchoolCard />
        <SelectSchoolCard />
        <SelectSchoolCard />
      </div> */}
      {Object.keys(schoolList).map((year) => {
        return (
          <div className='bg-slate-200 p-3 lg:w-1/3 '>
            <div className='flex items-center justify-center p-3 font-bold text-slate-600'>
              Academic Year {year}
            </div>
            {schoolList[year].map((school) => {
              return <SelectSchoolCard details={school} />
            })}
          </div>
        )
      })}
    </div>
  )
}

export default SelectSchool
