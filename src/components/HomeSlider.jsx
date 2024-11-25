import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './HomeSlider.css'
import Slider from "react-slick";

function HomeSlider() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
        customPaging: (i) => <div className="custom-dot">{i + 1}</div>, // Custom dots
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
        <div className="carousel-container">
            <Slider {...settings}>
                <div>
                    <img src="image1.jpg" alt="Slide 1" />
                </div>
                <div>
                    <img src="image2.jpg" alt="Slide 2" />
                </div>
                <div>
                    <img src="image3.jpg" alt="Slide 3" />
                </div>
            </Slider>
        </div>
    );
};

// Custom Next Arrow
const SampleNextArrow = (props) => {
    // eslint-disable-next-line react/prop-types
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{
                ...style,
                display: "block",
                background: "blue",
                borderRadius: "50%",
            }}
            onClick={onClick}
        />
    );
};

// Custom Prev Arrow
const SamplePrevArrow = (props) => {
    // eslint-disable-next-line react/prop-types
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{
                ...style,
                display: "block",
                background: "red",
                borderRadius: "50%",
            }}
            onClick={onClick}
        />
    );
};


export default HomeSlider