import axios from 'axios'
import Cookies from 'js-cookie'
import instance from '../../instance'

export const setSchoolId = async (id) => {
  console.log(Cookies.get('token'))
  const res = await instance({
    url: 'schoolApp/selectedSchool/?schoolAcademicYearId=8247',
    method: 'GET',
    headers: {
      Authorization: `Bearer ${Cookies.get('token')}`,
    },
  }).catch((err) => console.log(err))
}
