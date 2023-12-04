import './slider.css';
import Carousel from 'react-bootstrap/Carousel';
function Slider() {
    return (
        <Carousel >
            <Carousel.Item interval={1000}>
                <img src={"./images/banner1.webp"} alt='slider' width={"100%"} height={630} />
            </Carousel.Item>
            <Carousel.Item interval={500}>
                <img src={"./images/banner2.webp"} alt='slider' width={"100%"} height={630} />
            </Carousel.Item>
            <Carousel.Item>
                <img src={"./images/banner3.webp"} alt='slider' width={"100%"} height={630} />
            </Carousel.Item>
        </Carousel>
    );
}

export default Slider;