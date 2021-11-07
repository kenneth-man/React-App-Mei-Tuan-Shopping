import React, { useContext, useEffect, useRef } from 'react';
import { Context } from '../Context';
import Searchbar from '../Components/Searchbar';
import PageList from '../Components/PageList';
import Banner from '../Components/Banner';
import bannerImg from '../Res/Images/banner4.png'

const Products = () => {
    const { productsData, setProductsData, searchbarQuery, setSearchbarQuery, fetchSearchIdData } = useContext(Context);
    const isInitialRender = useRef(true);

    useEffect(() => {
        !isInitialRender.current ?
        (
            searchbarQuery ?
            fetchSearchIdData('products', searchbarQuery) :
            setProductsData([])
        ) :
        isInitialRender.current = false;
    }, [searchbarQuery])

    return (
        <div className='Page col'>
            <Searchbar title='Products' state={searchbarQuery} setState={setSearchbarQuery}/>

            <PageList type='products' state={productsData}/>

            <Banner image={bannerImg}/>
        </div>
    )
}

export default Products;