import Layout from "../../components/layout";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import TimonOfAthens from "../../assets/timon-of-athenss.png";
import playsData from "../../data/collections.min.json";
import { useEffect, useState } from "react";
import Pagination from "../../components/pagination";
import { useNavigate, useParams } from "react-router-dom";
import { slugify } from "../../utils/helper";

const PlayDetailsPage = () => {
  const { playId } = useParams();
  const navigate = useNavigate();

  const [navSelection, setNavSelection] = useState("acts_and_scenes");
  const [currentPlayIndex, setCurrentPlayIndex] = useState(0);
  const [currentPlay, setCurrentPlay] = useState();

  const [currentAct, setCurrentAct] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const result = playsData.find(
      (data) => slugify(data?.PLAY?.TITLE || "") === playId
    );
    const playIndex = playsData.findIndex(
      (data) => slugify(data?.PLAY?.TITLE) === playId
    );

    setCurrentPlay(result.PLAY);
    setCurrentPlayIndex(playIndex);
    setCurrentAct(result.PLAY.ACT[0]);

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [playId]);

  const handleNavSelection = (selection: string) => {
    setNavSelection(selection);
  };

  const handleSelectAct = (act) => {
    console.log(act);
    setCurrentAct(act);
  };

  const nextPlay = () => {
    if (currentPlayIndex < playsData.length) {
      const nextPlayUrl = slugify(playsData[currentPlayIndex + 1].PLAY.TITLE);
      navigate(`/plays/${nextPlayUrl}`);
    }
  };

  const previousPlay = () => {
    if (currentPlayIndex >= 1) {
      const nextPlayUrl = slugify(playsData[currentPlayIndex - 1].PLAY.TITLE);
      navigate(`/plays/${nextPlayUrl}`);
    }
  };

  // Logic for displaying todos
  const perPage = 1;
  const scenes = Array.isArray(currentAct?.SCENE)
    ? currentAct?.SCENE
    : [{ ...currentAct?.SCENE }];
  const pageTotal = scenes.length;
  const indexOfLast = currentPage * perPage;
  const indexOfFirst = indexOfLast - perPage;
  const sceneList = scenes.slice(indexOfFirst, indexOfLast);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      return window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNext = () => {
    if (currentPage < pageTotal) {
      setCurrentPage(currentPage + 1);
      return window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const acts = currentPlay?.ACT || [];

  return (
    <Layout>
      <section className="pb-40">
        <div className="flex items-center">
          <button
            className="w-14 h-14 rounded-lg bg-gray-200 flex items-center justify-center"
            onClick={() => navigate("/plays")}
          >
            <BsChevronLeft />
          </button>
        </div>

        <div className="flex items-center justify-center gap-16">
          <button
            className="w-10 h-10 disabled:bg-none rounded-lg text-gray-500 flex items-center justify-center hover:bg-gray-100 hover:text-gray-700 disabled:bg-gray-100 disabled:text-gray-500"
            onClick={previousPlay}
            disabled={currentPlayIndex === 0}
          >
            <BsChevronLeft />
          </button>

          <div>
            <img src={TimonOfAthens} className="w-[171px] h-[271px]" />
          </div>

          <button
            className="w-10 h-10 disabled:bg-none rounded-lg text-gray-500 flex items-center justify-center hover:bg-gray-100 hover:text-gray-700 disabled:bg-gray-100 disabled:text-gray-500"
            onClick={nextPlay}
            disabled={currentPlayIndex === playsData.length - 1}
          >
            <BsChevronRight />
          </button>
        </div>
        <div className="flex flex-col items-center justify-center mt-8 mb-6">
          <p className="text-3xl font-bold mb-2">{currentPlay?.TITLE}</p>
          <p className="text-xl font-medium">William Shakespeare</p>
        </div>

        <div className="flex items-center justify-center gap-4">
          <button
            className={`flex flex-shrink-0 items-center px-4 h-14 rounded-lg ${
              navSelection === "acts_and_scenes"
                ? "bg-[#9B1E25] text-white"
                : "text-black"
            }`}
            onClick={() => handleNavSelection("acts_and_scenes")}
          >
            Acts and Scenes
          </button>
          <button
            className={`flex flex-shrink-0 items-center px-4 h-14 rounded-lg ${
              navSelection === "characters"
                ? "bg-[#9B1E25] text-white"
                : "text-black"
            }`}
            onClick={() => handleNavSelection("characters")}
          >
            Characters
          </button>
        </div>

        <div className="flex rounded-lg shadow-[4px_0px_15px_rgba(31,_31,_31,_0.08),_0px_4px_15px_rgba(31,_31,_31,_0.08)] px-8 mt-14 max-w-xl mx-auto w-full">
          <div className="w-[160px] p-6 border-r-[#D1D1D6] border-r-[1px]">
            {acts?.map((act) => (
              <button
                key={act.TITLE}
                onClick={() => handleSelectAct(act)}
                className={`flex items-center justify-between rounded-lg px-4 py-2 w-full ${
                  act.TITLE === currentAct.TITLE ? "bg-[#FEF7F7]" : ""
                }`}
              >
                <p>{act.TITLE}</p>
                <BsChevronRight />
              </button>
            ))}
          </div>

          <div className="flex-1 px-4 py-8">
            {scenes.map((scene) => (
              <p key={scene.TITLE} className="text-[#48484A] mb-4">
                {scene.TITLE}
              </p>
            ))}
          </div>
        </div>

        <div className="mt-24">
          <h2 className="text-3xl font-bold leading-9">{currentAct?.TITLE}</h2>

          {sceneList?.map((scene) => (
            <div className="">
              <h3 className="text-2xl mb-8 font-bold leading-9">
                {scene.TITLE}
              </h3>

              {scene?.SPEECH?.map((speech) => (
                <div className="mb-2">
                  <p className="font-bold">{speech?.SPEAKER}</p>

                  {Array.isArray(speech?.LINE) ? (
                    <div className="mb-8">
                      {speech?.LINE?.map((line) => (
                        <p>{`${line}`}</p>
                      ))}
                    </div>
                  ) : typeof speech?.LINE === "string" ? (
                    <p>{`${speech?.LINE}`}</p>
                  ) : null}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="mt-28 flex items-center justify-end">
          <Pagination
            total={pageTotal}
            currentPage={currentPage}
            data={scenes}
            handleNext={handleNext}
            handlePrevious={handlePrevious}
          />
        </div>
      </section>
    </Layout>
  );
};

export default PlayDetailsPage;
