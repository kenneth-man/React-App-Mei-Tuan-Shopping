import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../Context';
import { Link } from 'react-router-dom';
import meiTuanLogo from '../Res/Images/meituan-logo.png';

const PageItem = ({ fullData, name, price, image, aisle, numOf, isOnShoppingCart }) => {
    const { setPageDetailsData, formatPrice, setIsAtleastOneItemSelected, isUnselectAllBtnClicked, setIsUnselectAllBtnClicked } = useContext(Context);
    const [isModalShown, setIsModalShown] = useState(false);
    const [isModalChecked, setIsModalChecked] = useState(false);

    const formatSlug = (input) => input.replaceAll(' ', '-');

    const toggleModal = () => setIsModalShown(!isModalShown);

    const toggleChecked = () => setIsModalChecked(!isModalChecked);

    useEffect(() => 
        Array.from(document.querySelectorAll('.Page__item--link')).find(curr => curr.classList.contains('Page__item--selected')) ?  
        setIsAtleastOneItemSelected(true) :
        setIsAtleastOneItemSelected(false)
    , [isModalChecked])

    useEffect(() => {
        if(isUnselectAllBtnClicked){
            document.querySelectorAll('.Page__item--link').forEach(curr => curr.classList.remove('Page__item--selected'));
            setIsModalChecked(false);
            setIsUnselectAllBtnClicked(false);
        }
    }, [isUnselectAllBtnClicked])
    
    return (
        //the api splits up image path names; making life easier by adding 'image' to 'pageDetailsData'
        <Link 
            to={isOnShoppingCart ? '/ShoppingCart' : `/PageDetails/${formatSlug(name)}`} 
            exact='true' 
            onClick={isOnShoppingCart ? toggleChecked : () => setPageDetailsData({fullData, image})} 
            onMouseOver={isOnShoppingCart ? toggleModal : null}
            onMouseOut={isOnShoppingCart ? toggleModal : null}
            className={isModalChecked ? 'Page__item--link Page__item--selected' : 'Page__item--link'}
            id={fullData.id}>
            <div className='Page__item col' style={{backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(${image ? image : meiTuanLogo})`}}>
                <h1>{name}</h1>
                <h2><span>${formatPrice(price)} USD</span></h2>
                <h2>{aisle ? aisle : 'N/A'}</h2>
                {numOf ? <div>x{numOf} Items</div> : null}
            </div>
            
            {
                isOnShoppingCart ? 
                <div className={isModalShown ? 'Page__item--modal row fw fh' : 'Page__item--modal hidden row fw fh'}>
                    <input type='checkbox' checked={isModalChecked} />
                </div> :
                null
            }   
        </Link>
    )
}

export default PageItem;