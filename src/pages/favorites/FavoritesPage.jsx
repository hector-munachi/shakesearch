import { v4 as uuidv4 } from 'uuid';
import { FaTrash } from 'react-icons/fa';


// eslint-disable-next-line react/prop-types
const FavoritesPage = ({ favorites, setFavorites }) => {

  const handleRemove = (card) => {
  // Remove the card from favorites
  // eslint-disable-next-line react/prop-types
  const updatedFavorites = favorites.filter((favorite) => favorite !== card);
  setFavorites(updatedFavorites);
  };

  console.log(favorites)
  console.log("Renders")

  return (
    <div>
      
      {/* eslint-disable-next-line react/prop-types */}
      {favorites?.map((card) => (
        <div key={uuidv4()}>
          <div className='max-w-sm rounded overflow-hidden shadow-lg mb-3 px-6 py-4 bg-white'>
          <h1 className='font-bold' style={{ fontFamily: "'Kalam', cursive" }}>Favorites</h1>
          <FaTrash className='float-right cursor-pointer' fill='red' onClick={() => handleRemove(card)}/>
            {/* Render the favorite card content */}
          <h2>{card?.PLAY?.TITLE}</h2>
          <h2>{card?.scene?.TITLE}</h2>
          </div>
        </div>
      ))}


      {/* <h2>{persona.name}</h2>
      <button onClick={handleRemove}>Remove</button>
      <h2>{actTitle.title}</h2>
      <button onClick={handleRemove}>Remove</button> */}
      
    </div>
  );
};

export default FavoritesPage;