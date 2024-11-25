import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

function HomeSlider() {
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

    const images = [
        'https://img-c.udemycdn.com/notices/web_carousel_slide/image/333e2f2f-fd01-4e76-aae4-5b04bb5d546d.png',
        'https://img-c.udemycdn.com/notices/web_carousel_slide/image/9fa1fa32-1920-45d1-8be1-e4653bbd7726.png',
        'https://img-c.udemycdn.com/notices/web_carousel_slide/image/333e2f2f-fd01-4e76-aae4-5b04bb5d546d.png'
    ]

    return (
        <div className="h-auto w-[95%] z-0 my-0 mx-auto overflow-hidden relative">
            <Slider {...settings}>
                {
                    images.map((image, index) => (
                        <img key={index} src={image} alt="Slide" />
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