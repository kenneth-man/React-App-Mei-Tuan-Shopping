import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import footerImg1 from '../Res/Images/footer-img1.png';
import footerImg2 from '../Res/Images/footer-img2.png';

const Footer = () => {
    return (
        <div className='footer row fw'>
            <div className='footer__wrapper col fh' style={{height: '75%'}}>
                <a href='www.google.com'>开放平台</a>
                <a href='www.google.com'>媒体报道</a>
                <a href='www.google.com'>资质规则</a>
                <a href='www.google.com'>入驻加盟</a>
                <a href='www.google.com'>常见问题</a>
                <a href='www.google.com'>用户反馈</a>
            </div> 

            <div className='footer__wrapper col fh'>
                <div className='col fw'>
                    <h1>品牌合作</h1>
                    <h2>wpbg.marketing@meituan.com</h2>
                </div>

                <div className='col fw'>
                    <h1>客服 1010-9777</h1>
                    <h2>周一至周日 9:00~23:00</h2>
                    <h2>客服不受理商务合作</h2>
                </div>
            </div>

            <div className='footer__wrapper col fh'>
                <h1>更多商家，更多优惠</h1>

                <div className='row fw'>
                    <LazyLoadImage effect='opacity' threshold={-50} src={footerImg1} alt='footer-img'/>
                    <LazyLoadImage effect='opacity' threshold={-50} src={footerImg2} alt='footer-img'/>
                </div>
            </div>
        </div>
    )
}

export default Footer;