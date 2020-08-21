import React from "react";
import "../App.css";

const SearchResults = ({ searchData }) => {
  return (
    <div className='all-results'>
      {searchData.map((elem, index) => (
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
              <h5 class='card-title'>{elem.name}</h5>
              <h6 class='card-subtitle mb-2 text-muted'>{elem.tagline}</h6>
              <p class='card-text'>{elem.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
