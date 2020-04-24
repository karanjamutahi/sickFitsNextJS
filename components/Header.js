import Link from 'next/link';
import styled from 'styled-components';
import Router from 'next/router';
import NProgress from 'nprogress';

import Nav from './Nav';
import Cart from './Cart'; 

Router.onRouteChangeStart = ()=> {
    NProgress.start();
}

Router.onRouteChangeComplete = ()=> {
    NProgress.done();
}

Router.onRouteChangeError = ()=> {
    NProgress.done();
    {/**TODO: Add a little error popup */}
}

const Logo = styled.h1`
    font-size: 4rem;
    margin-left: 2rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
    position: relative;
    z-index: 2;
    transform: skew(-20deg);
    a {
        padding: 0.5rem 1rem;
        background: ${props => props.theme.red};
        color: white;
        text-transform: uppercase;
        text-decoration: none;
    }
    @media (max-width: ${props => props.theme.screenWidth}) {
        margin: 0;
        text-align: center;
    }
`;

const StyledHeader = styled.header`
    .bar{
        border-bottom: 5px solid ${props => props.theme.black};
        display: grid;
        grid-template-columns: auto 1fr;
        justify-content: space-between;
        align-items: stretch;
        @media (max-width: ${props => props.theme.screenWidth}) {
            grid-template-columns: 1fr;
            justify-content: center; 
        }
    }

    .sub-bar{
        display: grid;
        grid-template-columns: 1fr auto;
        border-bottom: 1px solid ${props => props.theme.lightgrey};

    }
`;

const Header = () => (
    <StyledHeader>
        <div className="bar">
            <Logo>
                <Link href="/">
                    <a>Sick Fits!</a>
                </Link>
            </Logo>
            <Nav></Nav>
        </div>
        <div className="sub-bar">
            <p>Search</p>
        </div>
        <Cart></Cart>
    </StyledHeader>
    
);

export default Header;