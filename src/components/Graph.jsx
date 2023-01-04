import { Chart as ChartJS ,CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import {faker} from '@faker-js/faker';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";


ChartJS.register(
CategoryScale,Legend,LinearScale,BarElement,Title,Tooltip
);

const labels=['A','B','C'];
export const options={
    // events:['mousemove', 'mouseout', 'click', 'touchstart', 'touchmove'],
    responsive:true,
    plugins:{
        
        // legend:{
        //     // position:'bottom'
        // },
        // title:{
        //     display:true,
        //     text:'SECTIONS',
        //     position:'bottom',
        // },
        // scales:{
        //     y:{
        //         title:{
        //             display:true,
        //             text: 'percentage',
        //             position:'left'
                    
        //         }
        //     },
            
        title:{
            display:true,
            text:'Percentage',
            position:'left',
        },
        
        }
    };


export const data ={
    labels,datasets:[
        {
            label:'Class Average',
            data:labels.map(()=>faker.datatype.number({min:0,max:100})),
            backgroundColor:'rgba(63, 99, 100, 0.24)',
        },
        
        {
            label:' English Language',
            data : labels.map(()=>faker.datatype.number({min:0,max:100})),
            backgroundColor:'rgba(246, 240, 60, 0.93)',
        },{
            label:'English Literature',
            data : labels.map(()=>faker.datatype.number({min:0,max:100})),
            backgroundColor:'rgba(246, 240, 60, 0.93)',
        },

        {
            label:'EVS',
            data : labels.map(()=>faker.datatype.number({min:0,max:100})),
            backgroundColor:'rgba(59, 245, 64, 0.93)',
        },
        {
            label:'Maths',
            data : labels.map(()=>faker.datatype.number({min:0,max:100})),
            backgroundColor:'rgba(59, 162, 245, 0.93)',
        },

    ],
};


export const Graph=(({data: GraphData})=>{
    console.log(GraphData);
    // console.log(GraphData.data.A[0]);
    

return (
    // <section className=" !w-full sm:!w-full !bg-slate-400 " >
<div className=" sm:!w-[90%] !m-1 sm:!m-[5%] bg-slate-100 rounded-md" >
    <div className=" text-base sm:text-2xl font-bold text-slate-400 p-3">{GraphData.className}</div>
<Bar options={options} data={data} className="sm:!w-[90%]"/>
<div className=" flex justify-center items-center font-bold text-base sm:text-xl text-slate-500">
    Sections
    </div>
</div>
// </section>
)})