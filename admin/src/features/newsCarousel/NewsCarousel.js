import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import  './style.css'
function NewsCarousel(props) {
    return (
            <Carousel className='newsCarousel'
                autoPlay={true}
                infiniteLoop={true}
                interval={4000}
                showStatus={false}
                showThumbs={false}
            >
                <div>
                    <img src="https://via.placeholder.com/450x150" alt='s' />
                    <p className="legend">Legend 1</p>
                </div>
                <div>
                    <img src="https://via.placeholder.com/450x150" alt='a'/>
                    <p className="legend">Legend 2</p>
                </div>
                <div>
                    <img src="https://via.placeholder.com/450x150" alt='s'/>
                    <p className="legend">Legend 3</p>
                </div>
            </Carousel>
    );
}

export default NewsCarousel;        