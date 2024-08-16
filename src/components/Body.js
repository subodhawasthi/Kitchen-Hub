import RestaurantCard, {withPromotedLabel} from "./RestaurantCard";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Body = () => {
    const [listOfRestaurants, setListOfRestaurants] = useState([]);
    const [filteredRestaurant, setFilteredRestaurants] = useState([]);
    const [searchText, setSearchText] = useState("");

    const PromotedRestaurantCard = withPromotedLabel(RestaurantCard);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const data = await fetch(
            "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.5355161&lng=77.3910265&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
        );

        const json = await data.json();

        console.log(json);

        setListOfRestaurants(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        setFilteredRestaurants(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    };

    const onlineStatus = useOnlineStatus();

    if(onlineStatus === false)
        return (<h1>Looks like you are offline!! Please check your internet connection!</h1>);

    if (listOfRestaurants.length === 0) {
        return <Shimmer />
    }

    return (
        <div className="body">
            <div className="filter mr-20 flex justify-between">
                <div className="m-4 p-4">
                    <input type="text" className="border border-solid border-black" value={searchText} onChange={(e) => {
                        setSearchText(e.target.value);
                    }}  
                    />
                    <button className="px-4 py-2 bg-yellow-200 m-4 rounded-xl" onClick={() => {

                        const filteredRestaurant = listOfRestaurants.filter((res) => 
                            res.info.name.toLowerCase().includes(searchText.toLowerCase())
                    );
                    setFilteredRestaurants(filteredRestaurant);
                    }}>Search</button>
                </div>
                <div className="m-4 p-4 flex items-center">
                <button className="px-4 py-2 bg-red-300 rounded-lg" onClick={() => {
                    const filteredList = listOfRestaurants.filter(
                        (res) => res.info.avgRating > 4
                    );
                    setFilteredRestaurants(filteredList);
                }}>
                    Top Rated
                </button>
                </div>
            </div>
            <div className="flex flex-wrap space-x-2">
                {filteredRestaurant.map((restaurants) => (
                    <Link key={restaurants.info.id} to={"/restaurants/"+ restaurants.info.id}>
                        {restaurants.info.isOpen ? (<PromotedRestaurantCard resData={restaurants} />) : (<RestaurantCard resData={restaurants}/>)}</Link>
                )) }
            </div>
        </div>
    );
};

export default Body;