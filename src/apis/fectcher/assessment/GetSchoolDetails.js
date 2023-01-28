import Cookies from 'js-cookie'
import instance from '../../../instance'

export const GetSchoolDetails = async (id) => {
  const res = await instance({
    url: `schoolApp/schoolDetails?schoolAcademicYearId=${id}`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${Cookies.get('token')}`,
    },
  }).catch((err) => console.log(err))
  return res.data
}
