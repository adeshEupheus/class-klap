import instance from "../../../../instance";

export const GetScoreBoardData= async(id)=>{
    const res= await instance({
        url:'schoolApp/api/v1/performance?classGroup=Primary',
        method:"GET",

    }).catch((err)=>console.log(err));

    const result=res.data;
    return result;
}
