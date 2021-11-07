import React from 'react';
import { HomeTextData } from '../HomeTextData';
import Phone from '../Components/Phone';
import Banner from '../Components/Banner';
import Slider from '../Components/Slider';
import bannerImg1 from '../Res/Images/banner1.png';
import bannerImg2 from '../Res/Images/banner2.png';
import bannerImg3 from '../Res/Images/banner4.png';
import backgroundImg1 from '../Res/Images/background1.png';
import backgroundImg2 from '../Res/Images/background2.png';

const Home = () => {
    return (
        <div className='Page home col'>
            <div className='Page__section--large fw' style={{backgroundImage: `url(${backgroundImg1})`}}/>

            <div className='Page__section--large fw' style={{backgroundImage: `url(${backgroundImg2})`}}/>

            <div className='Page__section--xxlarge col fw'>
                <h1>品类全覆盖，应有尽有 Service</h1>

                <Phone/>
            </div>
           
            <Banner image={bannerImg1}/>

            <div className='Page__section--large col fw'>
                <h1>&ndash; &nbsp; About Meituan &nbsp; &ndash;</h1>

                <h2>Our mission is: “We Help People Eat Better, Live Better.” As China’s leading e-commerce platform for services, Meituan’s business revolves around the “Food+ Platform” strategy, and is centered on “eating” as its core. Meituan operates several well-known mobile apps in China, including Meituan, Dianping, Meituan Waimai and others. Its business comprises over 200 service categories, including catering, on-demand delivery, car-hailing, bike-sharing, hotel and travel booking, movie ticketing, and other entertainment and lifestyle services, covering over 2,800 cities and counties across China.</h2>

                <h2>Leveraging its advantages in innovative technology, Meituan partners with a vast number of merchants and diverse partners to provide consumers with a higher quality of life. In doing so, Meituan is accelerating the digitization of the lifestyle services industry across both demand and supply.</h2>

                <h2>Meituan (3690.HK) was officially listed on the Main Board of the Stock Exchange of Hong Kong Limited on September 20, 2018. Meituan continues to center its business on customers, while increasing its investment in technology R&D, in order to better fulfill its social responsibilities, create more value for society, and achieve win-win cooperation with its partners.</h2>
            </div>

            <div className='Page__section--large ctr fw'>
                <Slider/>
            </div>
            
            <Banner image={bannerImg2}/>

            <div className='Page__section--xlarge col fw'>
                <h1>&ndash; &nbsp; Meituan’s Values &nbsp; &ndash;</h1>
                
                <h2>We firmly believe in a handful of simple values that attract people to accomplish both ordinary and great things together. These are our values:</h2>
            
                <div className='col fw' style={{height: '800px', justifyContent: 'space-between'}}>
                    {
                        HomeTextData.map((curr, index) => 
                            <div key={index} className='col fw'>
                                <h1 className='mb'><span>{curr.title}</span></h1>
                                <h2>{curr.subtitle}</h2>
                            </div>
                        )
                    }
                </div>
            </div>

            <Banner image={bannerImg3}/>
        </div>
    )
}

export default Home;