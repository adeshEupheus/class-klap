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
      return addInfo;
    };

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
        num = num / object[key].length;
        dataArray.push(num.toFixed(1));
      }
      return dataArray;
    };

    // const color = {
    //   English: "#facc15",
    //   EVS: "#16a34a",
    //   SCIENCE: "#16a34a",
    //   Maths: "#3b82f6",
    //   Social: "#854d0e",
    // };
    const returnColor = (sub) => {
      switch (sub) {
        case "English":
          return "#facc15";
          break;
        case "EVS":
          return "#16a34a";
          break;
        case "SCIENCE":
          return "#16a34a";
          break;
        case "Maths":
          return "#3b82f6";
          break;
        case "Social":
          return "#854d0e";
          break;
        default:
          return "#854d0e";

          break;
      }
    };

    for (let key in object) {
      array.push({
        label: "Class Average",
        data: returnAvg(),
        backgroundColor: `#9ca3af`,
        addInfo: returnAddInfo(),
      });

      object[key].map((item) => {
        // console.log(item);
        array.push({
          label: item.subjectDisplayName,
          data: returnData(item.subjectDisplayName),
          backgroundColor: returnColor(item.subjectDisplayName),
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
    scales: {
      y: {
        min: 0, // Set minimum value of the y-axis
        max: 100, // Set maximum value of the y-axis
        ticks: {
          stepSize: 10, // Set step size between ticks
        },
      },
      x: {
        display: true, // Hide x-axis
      },
    },
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

            return `${tooltipItem.formattedValue}% -` + info;
          },
          title: function (tooltipItem) {
            // console.log(tooltipItem);
            return `Section ${tooltipItem[0].label}`;
          },
        },
      },
    },
  };

  const data1 = {
    labels: Object.keys(GraphData.data),
    datasets: returnGraphValue(GraphData.data),
  };

  const {
    data: { A },
  } = GraphData;

  return (
    <div className="!m-1 sm:!m-[5%] bg-slate-100 rounded-md">
      <div className=" text-base sm:text-2xl font-bold text-slate-400 p-3">
        Class {GraphData.className.split("")[1]}
      </div>

      <Bar options={options} data={data1} className="" />
      <div className=" flex justify-center items-center font-bold text-sm sm:text-xl text-slate-500">
        Sections
      </div>
    </div>
  );
};
