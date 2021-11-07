import React, { useContext, useEffect } from 'react';
import { Context } from '../Context';
import PageList from '../Components/PageList';
import Banner from '../Components/Banner';
import bannerImg from '../Res/Images/banner1.png';

const Discover = () => {
    const { fetchRandomRecipes, discoverData } = useContext(Context);

    useEffect(() => fetchRandomRecipes(), [])

    return (
        <div className='Page col'>
            <div className='Page__section--small searchbar col fw'>
                <h1>Discover Random Recipes in 美团...</h1>

                <h2>品类全覆盖，应有尽有</h2>
            </div>

            <PageList type='recipes' state={discoverData}/>

            <Banner image={bannerImg}/>
        </div>
    )
}

export default Discover;