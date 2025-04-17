import Categories from "./Categories/categories";
import HomeCards from "./HomeCards/homeCards";

const MainHome = () => {
    return (
        <div className="flex w-[1290px] m-auto mt-[15px]">
            <Categories />
            <HomeCards />
        </div>
    );
};

export default MainHome;
