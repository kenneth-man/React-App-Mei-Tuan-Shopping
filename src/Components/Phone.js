import React, { useState } from 'react';
import phoneBorder from '../Res/Images/phone-border.png';
import { PhoneImageData } from '../PhoneImageData';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const Phone = () => {
    const [phoneImageIndex, setPhoneImageIndex] = useState(0);

    const spliceId = (input) => Number(input.slice(-1));

    return (
        <div className='phone fw row'>
            <div className='phone__options col'>
                <div className='col' id='phone-img-0' onMouseOver={e => setPhoneImageIndex(spliceId(e.currentTarget.id))}>
                    <h1>美食</h1>
                    <h1>Delicacy</h1>
                    <h2>大牌优惠</h2>
                </div>

                <div className='col' id='phone-img-1' onMouseOver={e => setPhoneImageIndex(spliceId(e.currentTarget.id))}>
                    <h1>甜点饮品</h1>
                    <h1>Desserts & Drinks</h1>
                    <h2>幸福甜蜜</h2>
                </div>

                <div className='col' id='phone-img-2' onMouseOver={e => setPhoneImageIndex(spliceId(e.currentTarget.id))}>
                    <h1>水果生鲜</h1>
                    <h1>Fresh foods</h1>
                    <h2>新鲜速达</h2>
                </div>

                <div className='col' id='phone-img-3' onMouseOver={e => setPhoneImageIndex(spliceId(e.currentTarget.id))}>
                    <h1>超市便利</h1>
                    <h1>Supermarket</h1>
                    <h2>优惠促销</h2>
                </div>
            </div>

            <div className='phone__border ctr' style={{backgroundImage: `url(${phoneBorder})`}}>
                <LazyLoadImage effect='opacity' threshold={-400} src={PhoneImageData[phoneImageIndex]} alt='phone__inner' className='phone__inner'/>
            </div>
        </div>
    )
}

export default Phone;