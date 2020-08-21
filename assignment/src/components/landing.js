import React from "react";
import axios from "axios";

const Landing = ({ allData, isFetching }) => {
  var allFavs = [];
  const addFavourite = async (id) => {
    const res = await axios.get(`https://api.punkapi.com/v2/beers/${id}`);
    allFavs.push(...res.data.map((b) => b));
    localStorage.setItem("favourites", JSON.stringify(allFavs));
  };
  console.log(allFavs);
  return (
    <div className='all-results'>
      {allData.map((elem, index) => (
        <div key={index} class='card mt-5' style={{ width: "23rem" }}>
          <div className='card-top'>
            <div class='card-body col-4'>
              <img
                src={
                  elem.image_url === null
                    ? "https://cdn4.vectorstock.com/i/thumb-large/19/58/no-image-vector-30371958.jpg"
                    : elem.image_url
                }
                width='90px'
                height='200px'
                alt=''
              />
            </div>
            <div class='card-body col-8'>
              <i
                id={elem.id}
                class='far fa-star text-yellow'
                onClick={() => addFavourite(elem.id)}></i>
              <h5 class='card-title'>{elem.name}</h5>
              <h6 class='card-subtitle mb-2 text-muted'>{elem.tagline}</h6>
              <p class='card-text'>{elem.description}</p>
            </div>
          </div>
        </div>
      ))}
      {isFetching && (
        <div className='spin-parent mb-5'>
          <div class='spinner-border' role='status'>
            <span class='sr-only'>Loading...</span>
          </div>
          <div className='load-text'>Fetching more items...</div>
        </div>
      )}
    </div>
  );
};

export default Landing;
