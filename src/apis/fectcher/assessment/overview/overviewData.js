// import axios from "axios";
import Cookies from 'js-cookie'
import instance from '../../../../instance'

export const GetOverviewData = async (id) => {
  const res = await instance({
    url: `schoolApp/configuration/overviewData/${id}`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${Cookies.get('token')}`,
    },
  }).catch((err) => console.log(err))

  const result = res.data.examOverviewData
  return result
}
