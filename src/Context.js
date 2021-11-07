import React, { createContext, useState, useEffect } from 'react';

export const Context = createContext();

const ContextProvider = ({ children }) => {
    const [tempData, setTempData] = useState({ type: '', data: [] });
    const [groceriesData, setGroceriesData] = useState([]);
    const [productsData, setProductsData] = useState([]);
    const [discoverData, setDiscoverData] = useState([]);
    const [aboutData, setAboutData] = useState([]);
    const [pageDetailsData, setPageDetailsData] = useState({});
    const [shoppingCartData, setShoppingCartData] = useState([]);
    const [shoppingCartTotal, setShoppingCartTotal] = useState(0);
    const [searchbarQuery, setSearchbarQuery] = useState('');
    const [searchIds, setSearchIds] = useState({ type: '', data: [] });
    const [fetchIndex, setFetchIndex] = useState(0);
    const [isAtleastOneItemSelected, setIsAtleastOneItemSelected] = useState(false);
    const [isUnselectAllBtnClicked, setIsUnselectAllBtnClicked] = useState(false);
    const key = '6ab8f96b757540b9affa40f91abd6e84';

    const fetchSearchIdData = async (type, query) => {
        try {
            const response = await fetch(`https://api.spoonacular.com/food/${type}/search?query=${query}&number=10&apiKey=${key}`);
            const data = await response.json();

            type === 'ingredients' ?
            setSearchIds({ type, data: data.results }) :
            setSearchIds({ type, data: data.products });
        } catch(error){
            console.log(error);
        }
    }

    const fetchSearchDetailedData = async (type, id) => {
        try {
            let response;
            
            type === 'ingredients' ?
            response = await fetch(`https://api.spoonacular.com/food/ingredients/${id}/information?amount=10&apiKey=${key}`) :
            response = await fetch(`https://api.spoonacular.com/food/products/${id}?amount=1&apiKey=${key}`);

            const data = await response.json();
            setTempData({ type, data: [...tempData.data, data] });
        } catch(error){
            console.log(error);
        }
    }

    const fetchRandomRecipes = async () => {
        try {
            const response = await fetch(`https://api.spoonacular.com/recipes/random?number=10&apiKey=${key}`);
            const data = await response.json();
            setDiscoverData(data.recipes);
        } catch(error){
            console.log(error);
        }
    }

    const formatPrice = (input) => String( (input / 100).toFixed(2) );

    const capitalizeFirstLetter = (input) => `${input.charAt(0).toUpperCase()}${input.slice(1)}`;

    const scrollToTop = () => {
        //prevent .Page from being overlapped by .navbar; offset position from top by 90px (bc .navbar is 90px height); scrollIntoView() doesn't allow offset positioning
        document.querySelector('.App').scrollTo({
            top: document.querySelector('.Page').offsetTop - 90,
            behavior: 'smooth'
        });

        //document.querySelector('.Page').scrollIntoView({ behavior: 'smooth' });
    }

    useEffect(() => {
        if(searchIds.data.length > 0)
            tempData.data.length === searchIds.data.length ? setTempData({ type: '', data: [] }) : fetchSearchDetailedData(searchIds.type, searchIds.data[fetchIndex].id);
    }, [searchIds, fetchIndex])

    useEffect(() => {
        if(tempData.data.length > 0){
            if(tempData.data.length !== searchIds.data.length){
                setFetchIndex(fetchIndex => fetchIndex += 1);
            } else if(tempData.data.length === searchIds.data.length){
                if(tempData.type === 'ingredients') setGroceriesData(tempData.data);
                if(tempData.type === 'products') setProductsData(tempData.data);
                setSearchIds({ type: '', data: [] });
                setTempData({ type: '', data: [] });
            }
        } else {
            setFetchIndex(0);  
        }  
    }, [tempData])
    
    useEffect(() => {
        if(shoppingCartData.length > 0) setShoppingCartTotal(formatPrice( shoppingCartData.reduce((acc, curr) => acc + (curr.price * curr.numberOf), 0) ));
    }, [shoppingCartData])

    return (
        <Context.Provider value={{ 
            groceriesData, productsData, searchbarQuery, discoverData, aboutData, pageDetailsData, shoppingCartData, shoppingCartTotal, isAtleastOneItemSelected, isUnselectAllBtnClicked,
            setSearchbarQuery, fetchSearchIdData, fetchRandomRecipes, setGroceriesData, setProductsData, setAboutData, setPageDetailsData, setShoppingCartData, setShoppingCartTotal, 
            formatPrice, capitalizeFirstLetter, scrollToTop, setIsAtleastOneItemSelected, setIsUnselectAllBtnClicked }}>
            {children}
        </Context.Provider>
    )
}

export default ContextProvider;