import { Chart as ChartJS ,CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import {faker} from '@faker-js/faker';


export const Graph=(({data: GraphData})=>{


ChartJS.register(
CategoryScale,Legend,LinearScale,BarElement,Title,Tooltip
);


    const returnGraphValue = (object) => {
        let array = [];
        
        
        const returnData = (sName) => {
            let dataArray = []
            for(let key in object){
                object[key].map((item) => {
                    if(item.subjectDisplayName === sName){
                        dataArray.push(item.averagePercentage)
                    }
                })
            }
            return dataArray;
        }

        const returnAvg = () => {
            let dataArray = []
            for(let key in object){
                let num = 0
                object[key].map((item) => {
                    num += item.averagePercentage 
                })
                num = num / 2;
                dataArray.push(num.toFixed(1))
            }
            return dataArray
        }

        for(let key in object){
            array.push({label: "Class Average", data: returnAvg(), backgroundColor:`rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.93)`})

            object[key].map((item) => {
                array.push({label: item.subjectDisplayName, data: returnData(item.subjectDisplayName), backgroundColor:`rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.93)`})
            })

            break
        }
        console.log(array);
        return array
    }

    returnGraphValue(GraphData.data)

 const options={
    
    responsive:true,
   
    plugins:{
         title:{
            display:true,
            text:'Percentage',
            position:'left',
        },
        tooltip: {
            callbacks: {
                label: function(tooltipItem) {
                    
                    console.log(tooltipItem)
                    return tooltipItem.formattedValue + '%';
                }
            }
        }
        
        }
    };
// console.log(faker.datatype.number);
// console.log(GraphData.data.A[0].averagePercentage);

// GraphData.data

const data1 ={

    labels:Object.keys(GraphData.data),datasets:returnGraphValue(GraphData.data),
};



    console.log(GraphData);
   
    const {data:{A}}=GraphData;
    
return (
    // <section className=" !w-full sm:!w-full !bg-slate-400 " >
<div className=" sm:!w-[90%] !m-1 sm:!m-[5%] bg-slate-100 rounded-md" >
    <div className=" text-base sm:text-2xl font-bold text-slate-400 p-3">Class {GraphData.className.split('')[1]}</div>

<Bar options={options} data={data1} className="sm:!w-[90%]"/>
<div className=" flex justify-center items-center font-bold text-base sm:text-xl text-slate-500">
    Sections
    </div>
</div>
// </section>
)})