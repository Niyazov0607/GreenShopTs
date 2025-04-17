import footerImg1 from "../../assets/footerImg.svg";

const FooterHome = () => {
    return (
        <div>
            <footer className="bg-[#F5F5F580] text-white py-4 mt-10 w-[1290px] m-auto">
                <div className=" text-center">
                    <div>
                        <div>
                            <img src={footerImg1} alt="Description of image" />
                            <p>
                                Garden Care <br />
                                We are an online plant shop offering a wide
                                range of cheap and trendy plants.
                            </p>
                            <p>lorem1000</p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default FooterHome;
