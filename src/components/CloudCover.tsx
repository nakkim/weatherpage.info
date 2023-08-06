import { ReactComponent as CloudCover0 } from "../assets/nn/0.svg";
import { ReactComponent as CloudCover1 } from "../assets/nn/1.svg";
import { ReactComponent as CloudCover2 } from "../assets/nn/2.svg";
import { ReactComponent as CloudCover3 } from "../assets/nn/3.svg";
import { ReactComponent as CloudCover4 } from "../assets/nn/4.svg";
import { ReactComponent as CloudCover5 } from "../assets/nn/5.svg";
import { ReactComponent as CloudCover6 } from "../assets/nn/6.svg";
import { ReactComponent as CloudCover7 } from "../assets/nn/7.svg";
import { ReactComponent as CloudCover8 } from "../assets/nn/8.svg";
import { ReactComponent as CloudCover9 } from "../assets/nn/9.svg";

interface IProps {
  value: number | string | undefined
}

const CloudCover: React.FC<IProps> = ({ value }) => {

  if (value === 0) return <CloudCover0 />;
  if (value === 1) return <CloudCover1 />;
  if (value === 2) return <CloudCover2 />;
  if (value === 3) return <CloudCover3 />;
  if (value === 4) return <CloudCover4 />;
  if (value === 5) return <CloudCover5 />;
  if (value === 6) return <CloudCover6 />;
  if (value === 7) return <CloudCover7 />;
  if (value === 8) return <CloudCover8 />;
  if (value === 9) return <CloudCover9 />;
  return <CloudCover9 />;

  // return (
    // <svg>
    //   <circle cx="32" cy="32" r="28" transform="matrix(0.914,0,0,0.914,-1.76,-1.8)" id="circle3790"/>
    // </svg>
    // <svg width="50px" height="50px" viewBox="0 0 42 42" className="donut" aria-labelledby="beers-title beers-desc" role="img">
    //     <circle className="donut-hole" cx="21" cy="21" r="15.91549430918954" fill="white" role="presentation"></circle>
    //     <circle className="donut-ring" cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#d2d3d4" strokeWidth="3" role="presentation"></circle>
    //     <circle className="donut-segment" cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#ce4b99" strokeWidth="3"  strokeDashoffset="25" aria-labelledby="donut-segment-1-title donut-segment-1-desc">
    //     </circle>
    //     <g className="chart-text">
    //       <text className="chart-number" x="35%" y="60%">
    //         jeejee
    //       </text>
    //     </g>
    //   </svg>
  // )

};

export default CloudCover
