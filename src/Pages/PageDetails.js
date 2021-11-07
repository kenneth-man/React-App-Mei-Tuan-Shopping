import React, { useContext } from 'react';
import { Context } from '../Context';
import Phone from '../Components/Phone';
import Loading from '../Components/Loading';
import { ReactComponent as AddIcon } from '../Res/Icons/add.svg';
import meiTuanLogo from '../Res/Images/meituan-img.png';

const PageDetails = () => {
    const { pageDetailsData, formatPrice, capitalizeFirstLetter, shoppingCartData, setShoppingCartData } = useContext(Context);

    const returnShoppingCartObj = (numItems = 0) => ({
        data: pageDetailsData.fullData, 
        numberOf: numItems === 0 ? 1 : numItems, 
        image: pageDetailsData.image, 
        name: pageDetailsData.fullData.name ? pageDetailsData.fullData.name : pageDetailsData.fullData.title,
        //gotcha: 'pageDetailsData.fullData.estimatedCost.value' assumes 'pageDetailsData.fullData.estimatedCost' exists
        price: pageDetailsData.fullData.estimatedCost ? 
            pageDetailsData.fullData.estimatedCost.value : 
            (pageDetailsData.fullData.price ? pageDetailsData.fullData.price : pageDetailsData.fullData.pricePerServing),
        aisle: pageDetailsData.fullData.aisle ? pageDetailsData.fullData.aisle : 'N/A'
    })

    const checkIsItemInShoppingCart = (shouldReturnElement = false) => {
        const matchingItem = shoppingCartData.find(curr => curr.data.id === pageDetailsData.fullData.id);

        if(matchingItem){
            if(shouldReturnElement) return matchingItem;
            return true;
        }

        return false;
    }

    const returnNumItemsInShoppingCart = () => shoppingCartData.find(curr => curr.data.id === pageDetailsData.fullData.id).numberOf;

    const addItemToShoppingCart = () => {
        if(checkIsItemInShoppingCart()){
            //storing total number of the current item in shopping cart and incrementing by 1
            const numberOfItem = checkIsItemInShoppingCart(true).numberOf + 1;

            //leaving out (removing) the current item from 'shoppingCartData' array
            const tempShoppingCartData = shoppingCartData.filter(curr => curr.data.id !== pageDetailsData.fullData.id);

            //spreading out previous state and adding new object containing new 'numberOf' property value
            setShoppingCartData([...tempShoppingCartData, returnShoppingCartObj(numberOfItem)])
        } else {
            //if item doesn't exist in 'shoppingCartData' already, add to state and give 'numberOf' 1
            setShoppingCartData([...shoppingCartData, returnShoppingCartObj()])
        }
    }

    return (
        <div className='Page col'>
            {
                Object.keys(pageDetailsData.fullData).length > 0 ?
                <div className='Page__section--large pageDetails col fw'>
                    <img src={pageDetailsData.image ? pageDetailsData.image : meiTuanLogo} alt='pageDetails-img'/>
                    <h1>{pageDetailsData.fullData.title ? pageDetailsData.fullData.title : pageDetailsData.fullData.name}</h1>
                    <h2>{pageDetailsData.fullData.aisle ? pageDetailsData.fullData.aisle : pageDetailsData.fullData.creditsText}</h2>
                    <h2>
                        {
                            pageDetailsData.fullData.price ? 
                            `Price: $${formatPrice(pageDetailsData.fullData.price)}` : 
                            (
                                pageDetailsData.fullData.pricePerServing ? 
                                `Price per Serving: $${formatPrice(pageDetailsData.fullData.pricePerServing)}` :
                                `Estimated Price: $${formatPrice(pageDetailsData.fullData.estimatedCost.value)}`
                            )
                        }
                    </h2>
                    <div className='row'>
                        {
                            pageDetailsData.fullData.ingredientCount || pageDetailsData.fullData.ingredientCount === 0 ? 
                            <h2>Contains {pageDetailsData.fullData.ingredientCount} Ingredients</h2> : 
                            (
                                pageDetailsData.fullData.dishTypes ?
                                pageDetailsData.fullData.dishTypes.map((curr,index) => <h2 key={index}>{capitalizeFirstLetter(curr)}</h2>) :
                                pageDetailsData.fullData.categoryPath.map((curr,index) => <h2 key={index}>{capitalizeFirstLetter(curr)}</h2>)
                            )
                        }
                    </div>
                </div> :
                <Loading/>
            }

            <div className='Page__section--small col fw'>
                <h1>
                    {checkIsItemInShoppingCart() ? 
                    `${returnNumItemsInShoppingCart()} of this Item currently in Shopping Cart` : 
                    'Like this Product? Add to your Shopping Cart!'}
                </h1>
    
                <button className='button--shopping-cart button-clear row' onClick={addItemToShoppingCart}>
                    <h2>Add to Shopping Cart</h2>

                    <AddIcon/>
                </button>
            </div>

            <div className='Page__section--xxlarge col fw'>
                <h1>品类全覆盖，应有尽有 Service</h1>

                <Phone/>
            </div>
        </div>
    )
}

export default PageDetails;