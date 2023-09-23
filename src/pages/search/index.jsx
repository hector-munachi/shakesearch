/* eslint-disable react/no-unknown-property */
import { useState, useEffect, useRef } from "react";
import Fuse from "fuse.js";
import Layout from "../../components/layout";
import { BsSearch } from "react-icons/bs";
import HomeIntro from "../../components/homeIntro";
import { useFuse } from "../../hooks/useFuse";
import data from "../../data/collections.min.json";
import FavoritesPage from "../favorites/FavoritesPage";
import FavoriteIcon from "../favorites/FavouriteIcon";
import { FaRegBookmark } from "react-icons/fa";
import Modal from "./Modal";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [fuse, setFuse] = useState(null);
  const [searchHistory, setHistory] = useState([]);
  const [placeholder, setPlaceholder] = useState("Type something...");
  const [favorites, setFavorites] = useState([]);
  const [likedPlays, setLikedPlays] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fuseInstance = new Fuse(data, {
      keys: [
        "PLAY.TITLE",
        "PLAY.SCENE.TITLE",
        "PLAY.PERSONAE.PERSONA",
        "PLAY.ACT.TITLE",
      ],
      includeScore: true,
      includeMatches: true,
    });
    setFuse(fuseInstance);
  }, []);

  // A simple debounce function to optimiize the search
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query === "") {
        setResults([]);
      } else if (fuse) {
        const fuzzyResults = fuse.search(query);
        const formattedResults = fuzzyResults.map((result) => result.item);
        setResults(formattedResults);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query, fuse]);

  const handleSearch = (event) => {
    setQuery(event.target.value);
    const set = new Set([...searchHistory, query]);
    setHistory([...set]);
  };

  // Predictive typing
  const suggestions = useFuse(query, searchHistory);
  const exactMatch = (query, text) => {
    const regex = new RegExp(`^${query}`);
    return regex.test(text);
  };

  // Search results limit
  const resultsLimit = 3;

  // Search text highlights
  // Modify the highlightText function to handle arrays of strings
  const highlightText = (text) => {
    if (!query || !text) {
      return text;
    }

    if (Array.isArray(text)) {
      return text.map((item, index) => (
        <span key={index}>{highlightText(item)}</span>
      ));
    }

    if (typeof text !== "string") {
      return text;
    }

    const regex = new RegExp(`(${query})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <span key={index} className="text-red-500 font-extrabold rounded">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  // Placeholder prompting
  let intervalIdRef = useRef(null);

  const startInterval = () => {
    intervalIdRef.current = setInterval(() => {
      const placeholders = [
        "The Tempest",
        "A Midsummer Night's Dream",
        "The Winter's Tale",
        "Much Ado About Nothing",
        "As You Like It",
        "The Two Gentlemen of Verona",
        "The Merchant of Venice",
        "Cymbeline",
        "King Lear",
        "Macbeth",
        "All's Well That Ends Well",
        "The Comedy of Errors",
        "Measure for Measure",
        "Twelfth Night, or What You Will",
        "Timon of Athens",
        "Romeo and Juliet",
        "Hamlet, Prince of Denmark",
        "Othello",
        "Pericles, Prince of Tyre",
        "King Richard II",
        "King Henry IV, Part 1",
        "King Henry IV, Part 2",
        "King Henry V",
        "King Henry VI, Part 1",
        "King Henry VI, Part 2",
        "King Henry VI, Part 3",
        "King Richard III",
        "King Henry VIII",
        "Troilus and Cressida",
        "Coriolanus",
        "Titus Andronicus",
        "Julius Caesar",
        "Antony and Cleopatra",
        "The Merry Wives of Windsor",
        "Love's Labour's Lost",
        "The Taming of the Shrew",
      ];

      const randomIndex = Math.floor(Math.random() * placeholders.length);
      setPlaceholder(placeholders[randomIndex]);
    }, 5000);
  };

  const resetInterval = () => {
    clearInterval(intervalIdRef.current);
    setPlaceholder("Type something...");
    startInterval();
  };

  useEffect(() => {
    startInterval();

    return () => {
      clearInterval(intervalIdRef.current);
    };
  }, []);

  // Add the liked FavoriteIcon to favorites
  const addToFavorites = (play) => {
    // Check if the play is already in favorites
    if (favorites.some((favorite) => favorite.PLAY.TITLE === play.PLAY.TITLE)) {
      // If it is, remove it from favorites
      setFavorites((prevFavorites) =>
        prevFavorites.filter(
          (favorite) => favorite.PLAY.TITLE !== play.PLAY.TITLE
        )
      );
    } else {
      // If it's not, add it to favorites
      setFavorites((prevFavorites) => [...prevFavorites, play]);
    }
  };

  // Favorites modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Layout>
      <section>
        <div className="container">
          <HomeIntro />
          <div className="flex items-center flex-col">
            <div className="max-w-4xl mx-auto w-full">
              <div className="mb-3 flex flex-row">
                <FaRegBookmark
                  className="text-2xl text-red-500 inset-y-0 left-0 cursor-pointer"
                  color="#9B1E25"
                  onClick={openModal}
                />
                <span
                  className="font-bold cursor-pointer"
                  style={{ fontFamily: "'Kalam', cursive" }}
                  onClick={openModal}
                >
                  Favorites
                </span>
              </div>
              <div className="relative">
                {/* Search Input */}
                <input
                  type="search"
                  value={query}
                  onChange={handleSearch}
                  placeholder={placeholder}
                  className="px-4 py-2 h-14 border-2 border-[#9B1E25] rounded-xl focus:outline-none w-full"
                  autoFocus
                  onFocus={() => clearInterval(intervalIdRef.current)}
                  onBlur={() => resetInterval()}
                />
                <span className="w-14 h-14 border border-[#9B1E25] rounded-xl rounded-l-none absolute inset-y-0 right-0 pl-3 bg-[#9B1E25] flex items-center">
                  <BsSearch className="text-white fill-current w-6 h-6" />
                </span>
              </div>
              {/* Search prediction */}
              <div className="text-red-400 font-bold select-none top-0 mb-10">
                <div className="">
                  {suggestions.length > 0 &&
                    exactMatch(query, suggestions[0]) &&
                    suggestions[0]}
                </div>
              </div>
            </div>
          </div>

          {/* Search History */}
          <div className="container mx-auto mb-10">
            <div className="flex flex-wrap justify-center">
              {query.length > 0 &&
                searchHistory.length > 0 &&
                searchHistory.map((search) => (
                  <span
                    key={search}
                    className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                  >
                    {search}
                  </span>
                ))}
            </div>
          </div>

          {/* Suggestions */}
          {query !== "" && (
            <p
              className="text-gray-700 text-base font-extrabold mb-3"
              style={{ fontFamily: "'Kalam', cursive" }}
            >
              See results about {query}
            </p>
          )}

          {/* Search results */}
          <div className="container mx-auto">
            <div className="lg:grid lg:grid-cols-3 lg:items-start lg:gap-6 lg:space-x-16">
              {results.slice(0, resultsLimit).map((play, index) => {
                const scene = play?.PLAY?.ACT?.[0]?.SCENE?.[0] || {};
                const personas = play?.PLAY?.PERSONAE?.PERSONA || [];
                const actTitles =
                  play?.PLAY?.ACT?.map((act) => act?.TITLE) || [];
                // const { SPEAKER, LINE } = scene?.SPEECH?.[0] || {};

                // console.log(scene)

                // Handle the like event
                const handleLike = (play) => {
                  addToFavorites(play);
                  setLikedPlays((prevLikedPlays) => {
                    if (prevLikedPlays.includes(play)) {
                      return prevLikedPlays.filter(
                        (likedPlay) => likedPlay !== play
                      );
                    } else {
                      return [...prevLikedPlays, play];
                    }
                  });
                  console.log(likedPlays);
                };

                return (
                  <div key={play?.PLAY?.TITLE}>
                    {/* FavoriteIcon 1 */}
                    <div className="max-w-sm rounded overflow-hidden shadow-lg mb-3 px-6 py-4">
                      <FavoriteIcon
                        key={index}
                        play={play}
                        onLike={handleLike}
                      />
                      <h2 className="text-2xl mb-3">
                        {highlightText(play?.PLAY?.TITLE)}
                      </h2>
                      <span className="inline-flex items-center leading-none px-2.5 py-1.5 text-sm font-medium text-skin-inverted rounded-full border border-skin-input bg-red-200 mb-3">
                        {highlightText(scene?.TITLE)}
                      </span>
                    </div>

                    {/* FavoriteIcon 2 */}
                    <div className="max-w-sm rounded overflow-hidden shadow-lg mb-3 px-6 py-4">
                      {/* <FavoriteIcon key={index} play={play} onLike={handleLike}/> */}
                      <span className="inline-flex items-center leading-none px-2.5 py-1.5 text-sm font-medium text-skin-inverted rounded-full border border-skin-input bg-red-200 mb-3">
                        Characters
                      </span>
                      <ul className="text-gray-700 text-base mb-3">
                        {personas.map((persona, index) => (
                          <li key={index}>{highlightText(persona)}</li>
                        ))}
                      </ul>
                    </div>

                    {/* FavoriteIcon 3 */}
                    <div className="max-w-sm rounded overflow-hidden shadow-lg mb-3 px-6 py-4">
                      {/* <FavoriteIcon key={index} play={play} onLike={handleLike}/> */}
                      <span className="inline-flex items-center leading-none px-2.5 py-1.5 text-sm font-medium text-skin-inverted rounded-full border border-skin-input bg-red-200 mb-3">
                        Act Titles
                      </span>
                      <ul className="text-gray-700 text-base mb-3">
                        {actTitles.map((actTitle, index) => (
                          <li key={index}>{highlightText(actTitle)}</li>
                        ))}
                      </ul>
                    </div>

                    {/* FavoriteIcon 4 */}
                    <div className="max-w-sm rounded overflow-hidden shadow-lg mb-3 px-6 py-4">
                      {/* <FavoriteIcon key={index} play={play} onLike={handleLike} /> */}
                      <div key={scene?.TITLE}>
                        {Array.isArray(scene?.SPEECH?.[0]) ? (
                          <ul>
                            {scene?.SPEECH?.[0].map((speech, index) => (
                              <li key={index}>
                                {highlightText(speech.SPEAKER) && (
                                  <span className="inline-flex items-center leading-none px-2.5 py-1.5 text-sm font-medium text-skin-inverted rounded-full border border-skin-input bg-red-200 mb-3">
                                    {highlightText(speech.SPEAKER)}
                                  </span>
                                )}
                                {Array.isArray(speech.LINE) ? (
                                  <ul>
                                    {speech.LINE.map((line, idx) => (
                                      <li key={idx}>{highlightText(line)}</li>
                                    ))}
                                  </ul>
                                ) : (
                                  <p>{highlightText(speech.LINE)}</p>
                                )}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <div>
                            <span className="inline-flex items-center leading-none px-2.5 py-1.5 text-sm font-medium text-skin-inverted rounded-full border border-skin-input bg-red-200 mb-3">
                              {highlightText(scene?.SPEECH?.[0]?.SPEAKER)}
                            </span>
                            <p>{highlightText(scene?.SPEECH?.[0]?.LINE)}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {/* Favorites modal */}
          <div>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
              {favorites.length > 0 && (
                <FavoritesPage
                  favorites={favorites}
                  setFavorites={setFavorites}
                />
              )}
            </Modal>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default SearchPage;
