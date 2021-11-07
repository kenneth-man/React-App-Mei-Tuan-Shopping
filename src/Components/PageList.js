import React from 'react';
import PageItem from '../Components/PageItem';

const PageList = ({ type, state }) => {
    return (
        <div className='Page__list Page__section--large row fw'>
            {
                state.length > 0 ?
                state.map((curr, index) => 
                    <PageItem
                        key={index}
                        fullData={type === 'shoppingCart' ? curr.data : curr}
                        name={type === 'groceries' || type === 'shoppingCart' ? curr.name : curr.title}
                        price={type === 'shoppingCart' ? curr.price : (type === 'groceries' ? curr.estimatedCost.value : (type === 'products' ? curr.price: curr.pricePerServing))}
                        image={
                            type === 'recipes' || type === 'shoppingCart' ?
                            curr.image :
                            (
                                type === 'groceries' ? 
                                `https://spoonacular.com/cdn/ingredients_500x500/${curr.image}` : 
                                `https://spoonacular.com/productImages/${curr.id}-636x393.${curr.imageType}`
                            )
                        }
                        aisle={curr.aisle}
                        numOf={curr.numberOf ? curr.numberOf : null}
                        isOnShoppingCart={type === 'shoppingCart' ? true : false}
                    />
                ) :
                <h1 className='no-data'>(没有结果...) No Results Found...</h1>
            }
        </div>
    )
}

export default PageList;