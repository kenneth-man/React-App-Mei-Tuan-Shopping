import React, { useState, useEffect, useRef } from 'react';
import { SliderImageData } from '../SliderImageData';
import { ReactComponent as LeftArrowIcon } from '../Res/Icons/keyboard_arrow_left.svg';
import { ReactComponent as RightArrowIcon } from '../Res/Icons/keyboard_arrow_right.svg';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';

const Slider = () => {
    const [currSlide, setCurrSlide] = useState(0);
    const [maxSlide, setMaxSlide] = useState(SliderImageData.length);
    const isInitialRender = useRef(true);
    let timer = null;
 
    const moveSlides = () => {
        document.querySelectorAll('.slider__img').forEach(curr => curr.style.transform = `translateX(${-1640 * currSlide}px)`);
        activateDot(currSlide);
    }

    //determine next/previous 'currSlide'
    const nextPrevSlide = (direction) => {
        //if arrow button clicked, reset automatic slide move on timer; when 'currSlide' is updated in this func, 'timer' is assigned a new 'setTimeout' in useEffect
        clearTimeout(timer);

        direction === 'next' ? 
        (currSlide === maxSlide - 1 ? setCurrSlide(0) : setCurrSlide(currSlide => currSlide + 1)) :
        (currSlide === 0 ? setCurrSlide(maxSlide - 1) : setCurrSlide(currSlide => currSlide - 1));
    }

    const activateDot = (slide) => {
        //reset active dots
        document.querySelectorAll('.slider__dot').forEach(curr => curr.classList.remove('slider__dot--active'));
        
        //display current slide's dot
        document.querySelector(`#slider__dot-${slide}`).classList.add('slider__dot--active');
    }

    const dotOnClick = (input) => {
        clearTimeout(timer);
        setCurrSlide(input);
    }
      
    useEffect(() => activateDot(currSlide), []);

    useEffect(() => {
        !isInitialRender.current ? moveSlides() : isInitialRender.current = false;

        timer = setTimeout(() => nextPrevSlide('next'), 5000);
    }, [currSlide])

    return (
        <div className='slider ctr'>
            <button className='button-clear ctr' id='previous' onClick={e => nextPrevSlide(e.currentTarget.id)}>
                <LeftArrowIcon/>
            </button>

            <div className='slider__content row'>
                {
                    SliderImageData.map((curr, index) => 
                        //if rendered all 'LazyLoadImage's, the images after 0 index don't render
                        index === 0 ?
                        <LazyLoadImage effect='opacity' threshold={-100} key={index} src={curr} alt={`slide-img-${index}`} className='slider__img'/> :
                        <img key={index} src={curr} alt={`slide-img-${index}`} className='slider__img'/>
                    )
                }
            </div>

            <button className='button-clear ctr' id='next' onClick={e => nextPrevSlide(e.currentTarget.id)}>
                <RightArrowIcon/>
            </button>

            <div className='slider__dots'>
                {
                    SliderImageData.map((curr, index) => 
                        <button key={index} className="slider__dot" id={`slider__dot-${index}`} onClick={() => dotOnClick(index)}/>
                    )
                }
            </div> 
        </div>
    )
}

export default Slider;