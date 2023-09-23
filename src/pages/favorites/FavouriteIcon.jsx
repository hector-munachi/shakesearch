import { useState } from 'react';
import { FaHeart } from 'react-icons/fa';

// eslint-disable-next-line react/prop-types
const FavoriteIcon = ({ play, onLike }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  
  const handleLike = () => {
    setIsFavorite(!isFavorite); // Toggle the state first

    // Call the onLike function
    onLike(play);
    
  };

  return (
    <div>
      {/* FavoriteIcon content */}
      <button onClick={handleLike} className="text-red-500 float-right">
        {isFavorite ? <FaHeart fill="red" /> : <FaHeart fill="gray" />}
      </button>
    </div>
  );
};

export default FavoriteIcon;
