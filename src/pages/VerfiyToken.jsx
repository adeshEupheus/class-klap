// import axios from "axios";
// import Cookies from "js-cookie";
// import React from "react";
// import { useEffect } from "react";
// import { useSearchParams } from "react-router-dom";
// import Loader from "../components/Material/Loader";
// import instance from "../instance";

// const VerfiyToken = () => {
//   // const [queryParameters] = useSearchParams();

//   const returnPDF = async () => {
//     const res = await instance({
//       url: "https://schoolsbel.xamcheck.com/app/schoolApp/configuration/previewAnswerKey/112478/RSA1/ENGLISH",
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${Cookies.get("token")}`,
//       },
//     });
//     // console.log(res);

//     let binaryString = window.atob(res.data);

//     let binaryLen = binaryString.length;

//     let bytes = new Uint8Array(binaryLen);

//     for (let i = 0; i < binaryLen; i++) {
//       let ascii = binaryString.charCodeAt(i);
//       bytes[i] = ascii;
//     }
//     let blob = new Blob([bytes], { type: "application/pdf" });

//     return blob;
//   };

//   return <div>{returnPDF()}</div>;
// };

// export default VerfiyToken;
