import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { homeSlideData } from "../features/homeSlide/homeSlideThunk";
import { useEffect } from "react";

function HomeSlider() {
    const dispatch = useDispatch();

    const images = useSelector((state) => state.homeSlider.images);

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
        <div className="h-full w-[95%] rounded-md z-0 my-0 mx-auto overflow-hidden relative">
            <Slider {...settings}>
                {
                    images.map((image, index) => (
                        <img key={index} src={image.image} alt="Slide" className="w-full h-auto object-cover" />
                    ))
                }
            </Slider>
        </div>
    );
};

// Custom Next Arrow
const SampleNextArrow = (props) => {
    // eslint-disable-next-line react/prop-types
    const { onClick } = props;
    return (
        <div className="flex absolute h-full items-center bottom-0 z-20 right-3">
            <div onClick={onClick} className="flex p-1.5 justify-center items-center rounded-full hover:bg-[#444444] bg-[#373737] border border-[#8f8e8e] bottom-0">
                <IoIosArrowForward color="white" size={28}/>
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
                <IoIosArrowBack color="white" size={28}/>
            </div>
        </div>
    );
};


export default HomeSlider