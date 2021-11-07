import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../Context';
import Loading from '../Components/Loading';
import AboutItem from '../Components/AboutItem';
import { AboutQuoteData } from '../AboutQuoteData';
import { AboutRolesData } from '../AboutRolesData';

const About = () => {
    const { aboutData, setAboutData } = useContext(Context);

    const fetchStaff = async () => {
        try {
            const response = await fetch(`https://randomuser.me/api/`);
            const data = await response.json();
            setAboutData([...aboutData, data.results]);
        } catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if(aboutData.length !== 5) fetchStaff();
    }, [aboutData])

    return (
        <div className='Page about col'>
            {
                aboutData.length === 5 ?
                <div className='fw'>
                    <div className='Page__section--medium col fw'>
                        {
                            aboutData.map((curr, index) => {
                                if(index === 0)
                                    return <AboutItem
                                        key={index}
                                        name={`${curr[0].name.title} ${curr[0].name.first} ${curr[0].name.last}`}
                                        location={`${curr[0].location.city}, ${curr[0].location.country}`} 
                                        email={curr[0].email} 
                                        picture={curr[0].picture.large} 
                                        role={AboutRolesData[index]} 
                                        quote={AboutQuoteData[index]}
                                        isCEO={true}
                                    />
                            })
                        }
                    </div>
        
                    <div className='about__grid fw'>
                        {
                            aboutData.map((curr, index) => {
                                if(index !== 0)
                                    return <AboutItem
                                        key={index}
                                        name={`${curr[0].name.title} ${curr[0].name.first} ${curr[0].name.last}`}
                                        location={`${curr[0].location.city}, ${curr[0].location.country}`} 
                                        email={curr[0].email} 
                                        picture={curr[0].picture.large} 
                                        role={AboutRolesData[index]} 
                                        quote={AboutQuoteData[index]}
                                    />
                            })
                        }
                    </div>
                </div> :
                <Loading/>
            }
        </div>
    )
}

export default About;