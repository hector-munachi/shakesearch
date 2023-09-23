import { Link } from "react-router-dom";
import TimonOfAthens from "../../assets/timon-of-athenss.png";
import { slugify } from "../../utils/helper";

interface IListProps {
  play: {
    title: string;
    noOfActs: number;
  };
}

const ListPlayItem = ({ play }: IListProps) => {
  return (
    <Link to={`/plays/${slugify(play.title)}`}>
      <div className="flex items-center justify-between rounded-lg shadow-[4px_0px_15px_rgba(31,_31,_31,_0.08),_0px_4px_15px_rgba(31,_31,_31,_0.08)] px-8 py-4">
        <div className="flex items-center">
          <div>
            <img src={TimonOfAthens} alt="Timon of Athens" />
          </div>
          <p className="ml-4 font-bold text-xl">{play.title}</p>
        </div>

        <div className="text-[#636366]">
          <p>{play.noOfActs} Acts</p>
          <p>20 Scenes</p>
        </div>
      </div>
    </Link>
  );
};

export default ListPlayItem;
