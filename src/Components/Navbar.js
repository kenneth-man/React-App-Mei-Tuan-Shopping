import React, { useContext } from 'react';
import { Context } from '../Context';
import { Link, NavLink } from 'react-router-dom';
import meiTuanLogo from '../Res/Images/meituan-logo.png';

const Navbar = () => {
    const { scrollToTop } = useContext(Context);

    return (
        <div className='navbar row fw'>
            <Link to='/' exact='true' className='link link--logo' onClick={scrollToTop}>
                <img src={meiTuanLogo} alt='meiTuanLogo'/>
            </Link>

            <div className='row'>
                <NavLink to='/' exact={true} activeClassName='navlink--active' className='navlink' onClick={scrollToTop}>Home</NavLink>
                <NavLink to='/About' exact={true} activeClassName='navlink--active' className='navlink' onClick={scrollToTop}>About</NavLink>
                <NavLink to='/Groceries' exact={true} activeClassName='navlink--active' className='navlink' onClick={scrollToTop}>Groceries</NavLink>
                <NavLink to='/Products' exact={true} activeClassName='navlink--active' className='navlink' onClick={scrollToTop}>Products</NavLink>
                <NavLink to='/Discover' exact={true} activeClassName='navlink--active' className='navlink' onClick={scrollToTop}>Discover</NavLink>
                <NavLink to='/ShoppingCart' exact={true} activeClassName='navlink--active' className='navlink' onClick={scrollToTop}>Shopping Cart</NavLink>
            </div>
        </div>
    )
}

export default Navbar;