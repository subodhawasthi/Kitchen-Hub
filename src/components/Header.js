import { useState } from "react";
import { LOGO_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import { useSelector } from "react-redux";

const Header = () => {

    const [btnName, setBtnName] = useState("Login");

    const onlineStatus = useOnlineStatus();

    const cartItems = useSelector((store) => store.cart.items);

    return (
        <div className="flex justify-between h-32 bg-orange-300 shadow-md">
            <div className="logo-container">
                <img
                    className="w-32"
                    src={LOGO_URL}
                />
            </div>
            <div className="flex items-center">
                <ul className="flex p-4 m-4">
                    <li className="px-4">Online Status: {onlineStatus ? "🟢" : "🔴"}</li>
                    <li className="px-4"><Link to="/">Home</Link></li>
                    <li className="px-4"><Link to="/about">About Us</Link></li>
                    <li className="px-4"><Link to="/contact">Contact Us</Link></li>
                    <li className="px-4 font-bold"><Link to="/cart">Cart (Items: {cartItems.length})</Link></li>
                    <button className="button" onClick={() => {
                        btnName === "Login" ? setBtnName("Logout") : setBtnName("Login");
                    }}>{btnName}</button>
                </ul>

            </div>
        </div>    
    );
};

export default Header;