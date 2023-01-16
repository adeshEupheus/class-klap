import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

export const Graph = ({ data: GraphData }) => {
  ChartJS.register(
    CategoryScale,
    Legend,
    LinearScale,
    BarElement,
    Title,
    Tooltip
  );

  const returnGraphValue = (object) => {
    let array = [];

    const returnAddInfo = () => {
      let addInfo = [];
      for (let key in object) {
        object[key].map((item) => {
          addInfo.push({
            section: item.sectionName,
            classTeacher: item.classTeacher,
            subjectTeacher: item.subjectTeacher,
            subject: item.subjectDisplayName,
          });
        });
      }
      //   console.log(addInfo);
      return addInfo;
    };
    // console.log(typeof addInfo);
    // Object.entries(addInfo);
    // console.log(addInfo);

    // let Info=[];
    // addInfo.map((item)=>
    // Info.push(item.subjectTeacher)
    // )
    // console.log(Info);

    //from where sName is coming subjectname
    const returnData = (sName) => {
      let dataArray = [];
      for (let key in object) {
        //accessing key values using object[key]
        object[key].map((item) => {
          if (item.subjectDisplayName === sName) {
            dataArray.push(item.averagePercentage);
          }
        });
      }
      return dataArray;
    };

    const returnAvg = () => {
      let dataArray = [];
      for (let key in object) {
        let num = 0;
        object[key].map((item) => {
          // console.log(item);
          num += item.averagePercentage;
        });
        num = num / 2;
        dataArray.push(num.toFixed(1));
      }
      return dataArray;
    };

    for (let key in object) {
      array.push({
        label: "Class Average",
        data: returnAvg(),
        backgroundColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
          Math.random() * 256
        )}, ${Math.floor(Math.random() * 256)}, 0.93)`,
        addInfo: returnAddInfo(),
      });

      object[key].map((item) => {
        // console.log(item);
        array.push({
          label: item.subjectDisplayName,
          data: returnData(item.subjectDisplayName),
          backgroundColor: `rgba(${Math.floor(
            Math.random() * 256
          )}, ${Math.floor(Math.random() * 256)}, ${Math.floor(
            Math.random() * 256
          )}, 0.93)`,
          addInfo: returnAddInfo(),
        });
      });

      break;
    }
    // console.log(array);
    return array;
  };

  // returnGraphValue(GraphData.data)

  const options = {
    responsive: true,

    plugins: {
      title: {
        display: true,
        text: "Percentage",
        position: "left",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            let info = "";

            tooltipItem.dataset.addInfo.map((item) => {
              if (item.section === tooltipItem.label) {
                if (item.subject === tooltipItem.dataset.label) {
                  info = item.subjectTeacher;
                  if (!info) {
                    info = "NA";
                  }
                } else if (!info) {
                  info = "Class Teacher -" + item.classTeacher;
                }
              }
            });

            // console.log(tooltipItem);
            // console.log(tooltipItem.dataset.addInfo);
            // console.log(info);
            return `${tooltipItem.formattedValue}% -` + info;

            // console.log(info);
          },
          title: function (tooltipItem) {
            // console.log(tooltipItem);
            return `Section ${tooltipItem[0].label}`;
          },
        },
      },
    },
  };
  // console.log(faker.datatype.number);
  // console.log(GraphData.data.A[0].averagePercentage);

  const data1 = {
    labels: Object.keys(GraphData.data),
    datasets: returnGraphValue(GraphData.data),
  };



  const {
    data: { A },
  } = GraphData;

  return (
    // <section className=" !w-full sm:!w-full !bg-slate-400 " >
    <div className="!m-1 sm:!m-[5%] bg-slate-100 rounded-md">
      <div className=" text-base sm:text-2xl font-bold text-slate-400 p-3">
        Class {GraphData.className.split("")[1]}
      </div>

      <Bar options={options} data={data1} className="" />
      <div className=" flex justify-center items-center font-bold text-sm sm:text-xl text-slate-500">
        Sections
      </div>
    </div>
    // </section>
  );
};
