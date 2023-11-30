import { ReactComponent as CloudCover0 } from "../../assets/nn/0.svg";
import { ReactComponent as CloudCover1 } from "../../assets/nn/1.svg";
import { ReactComponent as CloudCover2 } from "../../assets/nn/2.svg";
import { ReactComponent as CloudCover3 } from "../../assets/nn/3.svg";
import { ReactComponent as CloudCover4 } from "../../assets/nn/4.svg";
import { ReactComponent as CloudCover5 } from "../../assets/nn/5.svg";
import { ReactComponent as CloudCover6 } from "../../assets/nn/6.svg";
import { ReactComponent as CloudCover7 } from "../../assets/nn/7.svg";
import { ReactComponent as CloudCover8 } from "../../assets/nn/8.svg";
import { ReactComponent as CloudCover9 } from "../../assets/nn/9.svg";

interface IProps {
  value: number | string | undefined;
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
};

export default CloudCover;
