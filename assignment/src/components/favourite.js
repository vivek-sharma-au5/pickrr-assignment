import React, { useState, useEffect } from "react";
import "../App.css";
import SearchResults from "./search_results";

const Favourites = ({ searchData }) => {
  const [favourites, setFavourites] = useState([]);
  useEffect(() => {
    var data = localStorage.getItem("favourites");
    setFavourites(JSON.parse(data));
  }, []);

  if (searchData.length !== 0) {
    return <SearchResults searchData={searchData} />;
  } else {
    return (
      <div>
        {favourites !== null ? (
          <div className='all-results'>
            {favourites.map((elem, index) => (
              <div key={index} class='card mt-5' style={{ width: "23rem" }}>
                <div className='card-top'>
                  <div class='card-body col-4'>
                    <img
                      src={elem.image_url}
                      width='90px'
                      height='200px'
                      alt=''
                    />
                  </div>
                  <div class='card-body col-8'>
                    <h5 class='card-title'>{elem.name}</h5>
                    <h6 class='card-subtitle mb-2 text-muted'>
                      {elem.tagline}
                    </h6>
                    <p class='card-text'>{elem.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>Favourites List Empty !!! </div>
        )}
      </div>
    );
  }
};

export default Favourites;
