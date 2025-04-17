import React, { useRef, useState } from "react";
import { Carousel } from "antd";
import { CarouselRef } from "antd/es/carousel";

const slides = [
    {
        id: 1,
        suptitle: "Welcome to GreenShop",
        title: "LET'S MAKE A BETTER PLANET",
        description:
            "We are an online plant shop offering a wide range of cheap and trendy plants. Use our plants to create a unique Urban Jungle. Order your favorite plants!",
        btn: "Shop now",
        img: "https://firebasestorage.googleapis.com/v0/b/aema-image-upload.appspot.com/o/greenshop%2Fimages%2Fflower1.png?alt=media&token=0b53d608-7264-4c54-b497-a9bf054fcd9d",
    },
    {
        id: 2,
        suptitle: "Welcome to GreenShop",
        title: "LET'S LIVE IN A BETTER PLANET",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni eos aut vitae, exercitationem voluptatum porro veniam animir alias?",
        btn: "Let's Start",
        img: "https://firebasestorage.googleapis.com/v0/b/aema-image-upload.appspot.com/o/greenshop%2Fimages%2Fhero-flower-1.png?alt=media&token=74ea8d3d-06b5-41e7-bb12-7caaf3035a6d",
    },
    {
        id: 3,
        suptitle: "Welcome to GreenShop",
        title: "LET'S OBSERVE A BETTER PLANET",
        description:
            "Nmadur Nmadur Lalala Balo battar auo io maooo gul! Atirgul lolagul kokgul qoragul jigarrang gul naushnik.",
        btn: "Get Credits",
        img: "https://firebasestorage.googleapis.com/v0/b/aema-image-upload.appspot.com/o/greenshop%2Fimages%2Fhero-flower-2.png?alt=media&token=5b5addec-d344-4897-a983-95c9b10a1662",
    },
];

const Hero: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const carouselRef = useRef<CarouselRef>(null);

    return (
        <div className="relative w-[1290px] m-auto mt-[15px]">
            <Carousel
                ref={carouselRef}
                autoplay
                autoplaySpeed={4000}
                dots={false}
                beforeChange={(_, to) => setCurrentSlide(to)}
            >
                {slides.map((slide) => (
                    <div
                        key={slide.id}
                        className="flex items-center justify-center bg-[#F5F5F5] rounded-xl max-sm:h-[180px] max-sm:pl-3 max-md:h-[250px] h-[400px] pl-10 transition"
                    >
                        <div className="flex items-center justify-between w-full max-w-[1290px] m-auto">
                            {/* Left Text Content */}
                            <div className="flex flex-col flex-1 justify-center">
                                <h3 className="uppercase text-lg max-sm:text-sm font-medium text-[#3D3D3D]">
                                    {slide.suptitle}
                                </h3>
                                <h2 className="font-extrabold text-6xl max-lg:text-4xl max-md:text-2xl max-sm:text-lg text-[#3D3D3D] max-sm:pr-2 pr-10">
                                    {slide.title
                                        .split(" ")
                                        .slice(0, -1)
                                        .join(" ")}{" "}
                                    <span className="text-[#46A358] uppercase">
                                        {slide.title.split(" ").slice(-1)}
                                    </span>
                                </h2>
                                <p className="mt-6 text-[#727272] font-bold text-base max-lg:text-sm max-md:font-light max-sm:text-[10px] max-md:leading-4 leading-5 max-md:pr-3 xl:max-w-[60%]">
                                    {slide.description}
                                </p>
                                <button className="mt-6 px-6 py-2 max-w-40 text-sm font-semibold uppercase bg-[#46A358] hover:bg-[#46A358]/70 text-white rounded-md">
                                    {slide.btn}
                                </button>
                            </div>

                            {/* Right Image */}
                            <div className="relative max-lg:max-w-[30%] max-sm:hidden flex items-end justify-end">
                                <img
                                    src={slide.img}
                                    alt={slide.title}
                                    className="max-w-[390px] max-h-[390px] max-lg:max-w-[300px] max-md:max-w-[160px]"
                                    width={390}
                                    height={390}
                                />
                                <img
                                    src={slide.img}
                                    alt=""
                                    className="absolute bottom-3 left-0 -translate-x-10 max-w-[130px] max-h-[130px] max-md:max-w-[0px]"
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </Carousel>

            {/* Custom Dots */}
            <div className="absolute flex items-center justify-center gap-2 bottom-4 left-1/2 -translate-x-1/2">
                {slides.map((_, index) => (
                    <div
                        key={index}
                        className={`cursor-pointer h-[3px] rounded transition-all duration-300 ${
                            currentSlide === index
                                ? "w-6 bg-[#46A358]"
                                : "w-4 bg-[#46A358]/40 hover:bg-[#46A358]/70"
                        }`}
                        onClick={() => carouselRef.current?.goTo(index)}
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default Hero;
