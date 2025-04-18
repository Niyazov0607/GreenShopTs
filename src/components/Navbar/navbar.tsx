import logoImg from "../../assets/logogreen.svg";
import { CiSearch } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { Auth } from "../Auth/auth";
import { useCart } from "@/Context/CartContext";

const Navbar = () => {
    const { cart } = useCart();

    const totalQuantity = cart.reduce(
        (sum, item) => sum + (item.quantity ?? 0),
        0
    );

    return (
        <div className="flex justify-between items-center p-4 bg-white w-[1290px] m-auto mt-[15px]">
            <div>
                <NavLink to="/">
                    <img src={logoImg} alt="Logo" />
                </NavLink>
            </div>

            <nav>
                <ul className="flex gap-4 items-center">
                    <NavLink to="/" className="font-[600] cursor-pointer">
                        Home
                    </NavLink>
                    <NavLink to="/blog" className="font-[600] cursor-pointer">
                        Blog
                    </NavLink>
                </ul>
            </nav>

            <div className="flex items-center gap-4">
                <CiSearch size={24} />
                <IoIosNotificationsOutline size={24} />

                <NavLink to="/pages/Cart" className="relative">
                    {totalQuantity > 0 && (
                        <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full w-[18px] h-[18px] flex justify-center items-center">
                            {totalQuantity}
                        </span>
                    )}
                    <IoCartOutline size={24} />
                </NavLink>

                <Auth />
            </div>
        </div>
    );
};

export default Navbar;
