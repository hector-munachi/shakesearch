import { useState } from "react";
import HomeIntro from "../../components/homeIntro";
import Layout from "../../components/layout";
import SearchInput from "../../components/searchInput";
import { ReactComponent as GridIcon } from "../../assets/grid.svg";
import { ReactComponent as ListIcon } from "../../assets/list.svg";
import { ReactComponent as CloseIcon } from "../../assets/close.svg";
import ListPlayItem from "../../components/playItem/list";
import GridPlayItem from "../../components/playItem/grid";
import playsData from "../../data/collections.min.json";

type View = "grid" | "list";

const PlaysPage = () => {
  const [view, setvVew] = useState<View>("list");
  const [query, setQuery] = useState("");
  const [filteredPlays, setFilteredPlays] = useState([]);

  const changeView = (view: View) => setvVew(view);

  const handleSearch = () => {
    const filtered = playsData.filter((data) =>
      data.PLAY.TITLE.toLowerCase().includes(query.toLowerCase())
    );
    console.log(filtered);
    setFilteredPlays(filtered);
  };

  const cancelFilter = () => {
    setQuery("");
    setFilteredPlays([]);
  };

  return (
    <Layout>
      <section className="pb-40">
        <div className="container max-w-4xl mx-auto">
          <HomeIntro
            title="Iconic Plays and Poems of William Shakespeare"
            hasSubTitle={false}
          />

          <div className="mt-10 flex items-center gap-4">
            {/* Search Input */}
            <SearchInput
              placeholder="search books, words, quotes and more"
              onSearch={handleSearch}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
            {/* <button className="flex flex-shrink-0 items-center px-4 h-14 rounded-lg text-white bg-[#9B1E25]">
              <span className="mr-1">
                <FilterIcon />
              </span>
              Filter Search
            </button> */}
            {filteredPlays.length ? (
              <button
                className="h-14 w-14 rounded-lg border border-[#FEE8E9] flex items-center justify-center"
                onClick={cancelFilter}
              >
                <CloseIcon />
              </button>
            ) : null}
          </div>
        </div>

        <div className="plays mt-[6rem]">
          <div className="flex items-center justify-end mb-4">
            <div className="flex items-center gap-4">
              <p className="text-[#636366]">View Type:</p>

              <button
                type="button"
                className={`h-10 w-10 border-0 rounded-md flex items-center justify-center ${
                  view === "grid" ? "bg-[#9B1E25] text-white" : ""
                }`}
                onClick={() => changeView("grid")}
              >
                <GridIcon />
              </button>

              <button
                type="button"
                className={`h-10 w-10 border-0 rounded-md flex items-center justify-center ${
                  view === "list" ? "bg-[#9B1E25] text-white" : ""
                }`}
                onClick={() => changeView("list")}
              >
                <ListIcon />
              </button>
            </div>
          </div>

          {view === "grid" ? (
            <div className="grid grid-cols-3 gap-x-6 gap-y-14">
              {(filteredPlays.length ? filteredPlays : playsData).map(
                (data) => (
                  <GridPlayItem
                    key={data.PLAY.TITLE}
                    play={{
                      title: data.PLAY.TITLE,
                      noOfActs: data.PLAY.ACT.length,
                      // noOfScenes: data.PLA,
                    }}
                  />
                )
              )}
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {(filteredPlays.length ? filteredPlays : playsData).map(
                (data) => (
                  <ListPlayItem
                    key={data.PLAY.TITLE}
                    play={{
                      title: data.PLAY.TITLE,
                      noOfActs: data.PLAY.ACT.length,
                      // noOfScenes: data.PLA,
                    }}
                  />
                )
              )}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default PlaysPage;
