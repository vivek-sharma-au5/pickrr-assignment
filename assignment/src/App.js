import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Redirect, Link } from "react-router-dom";
import axios from "axios";
import "./App.css";
import Navbar from "./components/navbar";
import Landing from "./components/landing";
import Favourites from "./components/favourite";

const App = () => {
  const [query, setQuery] = useState("");
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const [searchData, setSearchData] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isFetching) return;
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
    fetchMoreListItems(pageNumber);
  }, [isFetching]);

  const fetchPosts = async () => {
    setLoading(true);
    const res = await axios.get("https://api.punkapi.com/v2/beers");
    setAllData(res.data);
    setLoading(false);
  };

  const fetchMoreListItems = async () => {
    setTimeout(async () => {
      const res = await axios.get(
        `https://api.punkapi.com/v2/beers?page=${pageNumber}&per_page=26`
      );
      setAllData((prevAllData) => {
        return [...new Set([...allData, ...res.data.map((b) => b)])];
      });

      setIsFetching(false);
    }, 1000);
  };

  const searchAPI = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (query !== "") {
      setTimeout(async () => {
        const res = await axios.get(
          `https://api.punkapi.com/v2/beers?beer_name=${query}&per_page=50`
        );
        setQuery("");
        setAllData(res.data);
        setLoading(false);
      }, 1000);
    } else {
      window.location.reload();
    }
    setIsFetching(false);
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    ) {
      return;
    }
    if (!query) {
      setIsFetching(true);
    }
  };

  const handleQuery = (e) => {
    setQuery(e.target.value);
  };

  return (
    <BrowserRouter>
      <div className='App'>
        <Navbar />
        <div className='form-div'>
          <form className='form-inline' onSubmit={(e) => searchAPI(e)}>
            <input
              className='form-control form-control-sm w-75'
              type='text'
              placeholder='Search'
              aria-label='Search'
              onChange={(e) => handleQuery(e)}
            />
            <button className='btn btn-default btn-sm' type='submit'>
              Search
            </button>
          </form>
        </div>
        <Route path='/'>
          <Redirect to='/home' />
        </Route>
        <Route path='/home'>
          {loading ? (
            <div className='spin-parent'>
              <div class='spinner-border' role='status'>
                <span class='sr-only'>Loading...</span>
              </div>
              <div className='load-text'>Loading...</div>
            </div>
          ) : (
            <div>
              <Landing allData={allData} isFetching={isFetching} />
            </div>
          )}
        </Route>
        <Route path='/favourites'>
          {loading ? (
            <div className='spin-parent'>
              <div class='spinner-border' role='status'>
                <span class='sr-only'>Loading...</span>
              </div>
              <div className='load-text'>Loading...</div>
            </div>
          ) : (
            <div>
              <Favourites isFetching={isFetching} />
            </div>
          )}
        </Route>
      </div>
    </BrowserRouter>
  );
};

export default App;
