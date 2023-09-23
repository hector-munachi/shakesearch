import { Link } from "react-router-dom";
import { slugify } from "../../utils/helper";

interface IGridProps {
  play: {
    title: string;
    noOfActs: number;
  };
}

const GridPlayItem = ({ play }: IGridProps) => {
  return (
    <Link to={`/plays/${slugify(play.title)}`}>
      <div className="flex bg-white rounded-lg px-5 py-6 shadow-[4px_0px_15px_rgba(31,_31,_31,_0.08),_0px_4px_15px_rgba(31,_31,_31,_0.08)]">
        <div className="h-[147px] w-[120px] mr-4 bg-gray-600"></div>
        <div>
          <p className="text-[#1C1C1E] text-xl font-bold mb-4">{play.title}</p>
          <div className="text-[#636366] text-md">
            <p className="mb-2">{play.noOfActs} Acts</p>
            <p>20 Scenes</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GridPlayItem;
