import React, { useContext, useEffect, useRef } from 'react';
import { Context } from '../Context';
import Searchbar from '../Components/Searchbar';
import PageList from '../Components/PageList';
import Banner from '../Components/Banner';
import bannerImg from '../Res/Images/banner3.png';

const Groceries = () => {
    const { groceriesData, setGroceriesData, searchbarQuery, setSearchbarQuery, fetchSearchIdData } = useContext(Context);
    const isInitialRender = useRef(true);

    useEffect(() => {
        !isInitialRender.current ? 
        (
            searchbarQuery ? 
            fetchSearchIdData('ingredients', searchbarQuery) : 
            setGroceriesData([])
        ) : 
        isInitialRender.current = false;
    }, [searchbarQuery])

    return (
        <div className='Page col'>
            <Searchbar title='Groceries' state={searchbarQuery} setState={setSearchbarQuery}/>

            <PageList type='groceries' state={groceriesData}/>

            <Banner image={bannerImg}/>
        </div>
    )
}

export default Groceries;