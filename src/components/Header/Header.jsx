import React, {useRef, useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import './header.css'

import {motion} from 'framer-motion'
import logo from '../../assets/images/eco-logo.png'
import userIcon from '../../assets/images/user-icon.png'

import { Container, Row } from 'reactstrap';

import { useSelector } from 'react-redux';

const nav__links = [
    {
        path: 'home',
        display: 'Home'
    },
    {
        path: 'shop',
        display: 'Shop'
    },
    {
        path: 'cart',
        display: 'Cart'
    }
]
const Header = () => {

    const headerRef = useRef(null)
    const totalQuantity = useSelector(state => state.cart.totalQuantity)
    const menuRef = useRef(null)

    const stickyHeaderFunction = () => {
        window.addEventListener('scroll', () => {
            if(document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
                headerRef.current.classList.add('sticky__header')
            }
            else {
                headerRef.current.classList.remove('sticky__header')
            }
        })
    }

    useEffect(() => {
        stickyHeaderFunction()

        return () => window.removeEventListener('scroll', stickyHeaderFunction)
    })

    const toggleMenu = () => menuRef.current.classList.toggle('active__menu')

    return <header className='header' ref={headerRef}>
        <Container>
            <Row>
                <div className='nav__wrapper'>
                    <div className='logo'>
                        <img src={logo} alt='logo' />
                        <div>
                            <h1>Webmart</h1>

                        </div>
                    </div>

                    <div className='navigation' ref={menuRef} onClick={toggleMenu}>
                        <ul className='menu'>
                            {
                                nav__links.map((item, index) => (
                                    <li className='nav__item' key={index}>
                                        <NavLink to={item.path} className={(navClass) =>
                                        navClass.isActive ? 'nav__active' : ''}>{item.display}</NavLink>
                                    </li>
                                ))
                            }
                        </ul> 
                    </div>

                    <div className='nav__icons'>

                        <span className='fav__icon'>
                            <i class="ri-heart-line"></i>
                            <span className='badge'>2</span>
                        </span>

                        <span className='cart__icon'>
                            <i class="ri-shopping-cart-line"></i>
                            <span className='badge'>{totalQuantity}</span>
                        </span>

                        <span>
                            <motion.img whileTap={{ scale:1.2 }} src={userIcon} alt='user icon' />
                        </span>
                        <div className='mobile__menu'>
                            <span onClick={toggleMenu}>
                                <i class="ri-menu-line"></i>
                            </span>
                        </div>
                    </div>

                    

                </div>
            </Row>
        </Container>
    </header>
}

export default Header;