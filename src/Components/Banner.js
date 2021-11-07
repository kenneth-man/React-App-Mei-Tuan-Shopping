import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';

const Banner = ({ image, styling = null }) => {
    return (
        <LazyLoadImage effect='opacity' threshold={-200} src={image} alt='banner' className='banner fw' wrapperClassName='bannerWrapper fw' style={styling ? styling : null}/>
    )
}

export default Banner;