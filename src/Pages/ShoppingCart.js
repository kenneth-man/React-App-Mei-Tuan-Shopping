import React, { useContext } from 'react';
import { Context } from '../Context';
import { Link } from 'react-router-dom';
import PageList from '../Components/PageList';
import PaymentTotal from '../Components/PaymentTotal';
import Banner from '../Components/Banner';
import bannerImg from '../Res/Images/banner2.png';

const ShoppingCart = () => {
    const { shoppingCartData, setShoppingCartData, isAtleastOneItemSelected, setIsAtleastOneItemSelected, 
        setIsUnselectAllBtnClicked, scrollToTop, shoppingCartTotal, setShoppingCartTotal } = useContext(Context);

    const unselectAll = () => setIsUnselectAllBtnClicked(true);

    const deleteAll = () => {
        //find out which '.Page__item's are selected and create an array with all of them filtered out
        const filteredSelectedElements = Array.from(document.querySelectorAll('.Page__item--link')).filter(curr => !curr.classList.contains('Page__item--selected'));
        const filteredSelectedIds = filteredSelectedElements.map(curr => Number(curr.id));
        
        //filtering and array with another array (OPTIMAL METHOD); filter 'shoppingCartData' based on 'filteredSelectedIds'; check for matching ids
        const filteredShoppingCartData = shoppingCartData.filter(curr => filteredSelectedIds.includes(curr.data.id));

        setShoppingCartData(filteredShoppingCartData);
        setIsAtleastOneItemSelected(false);
        setShoppingCartTotal(0);
    }

    const showCheckoutAlert = () => {
        alert('There are no items in Shopping Cart to Checkout!')
    }
    
    return (
        <div className='Page shoppingCart col'>
            <div className='Page__section--small searchbar col fw'>
                <h1>Your Shopping Cart Items from 美团...</h1>

                <h2>品类全覆盖，应有尽有</h2>
            </div>

            <div className={isAtleastOneItemSelected ? 'shoppingCart__modal col' : 'shoppingCart__modal col hidden'}>
                <button onClick={unselectAll}>Unselect All</button>

                <button onClick={deleteAll}>Remove All Selected</button>
            </div>

            <PageList type='shoppingCart' state={shoppingCartData}/>

            <PaymentTotal/>

            <div className='Page__section--tiny payment__btn-cont fw ctr'>
                <Link 
                    to={!shoppingCartTotal ? '/ShoppingCart' : '/Checkout'} 
                    exact='true' 
                    className='link payment__btn' 
                    onClick={!shoppingCartTotal ? showCheckoutAlert : scrollToTop}>
                        Checkout
                </Link>
            </div>

            <Banner image={bannerImg}/>
        </div>
    )
}

export default ShoppingCart;