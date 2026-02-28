import RestaurantCard, { RestaurantCardPromoted } from "./RestaurantCard";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import { RES_API } from "../utils/constants";
import Shimmer from "./Shimmer";

const Body = () => {
  const [listOfRestaurants, setListofRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [buttonClicked, setButtonClicked] = useState(false);

  let filteredRestaurants = listOfRestaurants.filter((res) =>
    res.info.name.toLowerCase().includes(searchText.toLowerCase())
  )
  if (buttonClicked) {
    filteredRestaurants = filteredRestaurants.filter(r => {
      if (buttonClicked) {
        return r.info.avgRating > 4.7;
      }
      else return r;
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch(RES_API);
        if (!data.ok) {
          throw new Error("Error while fetching restaurant data");
        }
        const text = await data.text();
        if (!text) {
          throw new Error("Empty response from API");
        }
        const json = JSON.parse(text);
        const restaurants = json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
        setListofRestaurants(restaurants);
      }
      catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, []);

  const onlineStatus = useOnlineStatus();
  if (onlineStatus === false)
    return <h1 className="text-center text-red-600 text-lg font-semibold mt-4">Looks like you are offline!! Please check your internet connection</h1>;

  if (!listOfRestaurants.length) return <Shimmer />;
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div className="mt-6 mb-4 flex flex-col sm:flex-row items-center justify-center gap-4 px-4">
        <input
          className="w-full sm:w-64 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 shadow-sm"
          value={searchText}
          placeholder="Search..."
          onChange={(e) => {
            setSearchText(e.target.value);
            // setButtonClicked(false);
          }}
          data-testid="searchInput"
        />

        <button
          className="w-full sm:w-64 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-transform transform hover:scale-105 shadow-md"
          onClick={() => {
            if (buttonClicked) {
              setButtonClicked(false);
            } else {
              // setSearchText("");
              setButtonClicked(true);
            }
          }}
        >
          {buttonClicked ? "Show All Restaurants" : "Top Rated Restaurants"}
        </button>
      </div>

      {filteredRestaurants.length && <div className="flex-grow">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4">
          <RestaurantCardPromoted resData={filteredRestaurants[0]} />
          {filteredRestaurants.slice(1)
            .map((restaurant) => (
              <Link to={`/restaurant/${restaurant.info.id}`} key={restaurant.info.id} data-testid="resCard">
                <RestaurantCard resData={restaurant} />
              </Link>
            ))}
        </div>
      </div>}

      <footer className="bg-gray-800 text-white py-4 mt-8">
        <div className="container mx-auto text-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} Food App. No Rights Reserved.</p>
          <nav className="flex justify-center mt-2 space-x-4">
            <Link to="/about" className="hover:text-gray-400">About Us</Link>
            <Link to="/contact" className="hover:text-gray-400">Contact</Link>
            <Link className="hover:text-gray-400">Privacy Policy</Link>
            <Link className="hover:text-gray-400">Terms of Service</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default Body;