import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { homeSlideData } from "../features/homeSlide/homeSlideThunk";
import { useEffect } from "react";
import LazyLoad from "react-lazyload";
import ContentLoader from "react-content-loader";

function HomeSlider() {
    const dispatch = useDispatch();

    const { images, loading } = useSelector((state) => state.homeSlider);

    useEffect(() => {
        dispatch(homeSlideData());
    }, [dispatch]);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
        nextArrow: <SampleNextArrow />, // Custom Next Arrow
        prevArrow: <SamplePrevArrow />, // Custom Prev Arrow
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };


    return (
        <>
            {
                (!loading && images?.length > 0) ?
                    <div className="h-full w-[95%] z-0 my-0 mx-auto relative">
                        <Slider {...settings}>
                            {images?.map((image, index) => (
                                <LazyLoad key={index} once placeholder={<div>Loading...</div>} className="flex relative">
                                    <img
                                        src={image?.image}
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        alt="Slide"
                                        className="w-full h-full object-cover rounded-md"
                                    />
                                </LazyLoad>
                            ))}
                        </Slider>
                    </div>
                    :
                    <div className="w-[80%]">
                        <ContentLoader
                            viewBox="0 0 350 100%"
                            height={350}
                            width={"100%"}
                            backgroundColor="#f3f3f3"
                            foregroundColor="#ecebeb"
                            className='flex relative items-center'
                        >
                            <rect x="0" y="20" rx="4" ry="4" width="256" height="256" />
                            <rect x="300" y="50" rx="4" ry="4" width="800" height="40" />
                            <rect x="300" y="130" rx="4" ry="4" width="800" height="40" />
                            <rect x="300" y="210" rx="4" ry="4" width="800" height="40" />
                        </ContentLoader>
                    </div>
            }
        </>

    );
};

// Custom Next Arrow
const SampleNextArrow = (props) => {
    // eslint-disable-next-line react/prop-types
    const { onClick } = props;
    return (
        <div className="flex absolute h-full items-center bottom-0 z-20 right-3">
            <div onClick={onClick} className="flex p-1.5 justify-center items-center rounded-full hover:bg-[#444444] bg-[#373737] border border-[#8f8e8e] bottom-0">
                <IoIosArrowForward color="white" size={28} />
            </div>
        </div>
    );
};

// Custom Prev Arrow
const SamplePrevArrow = (props) => {
    // eslint-disable-next-line react/prop-types
    const { onClick } = props;
    return (
        <div className="flex absolute h-full items-center z-20 left-3">
            <div onClick={onClick} className="flex p-1.5 justify-center items-center rounded-full hover:bg-[#444444] bg-[#373737] border border-[#8f8e8e] bottom-0">
                <IoIosArrowBack color="white" size={28} />
            </div>
        </div>
    );
};


export default HomeSlider