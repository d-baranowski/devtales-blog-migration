import React, {useState} from 'react';
import styled from 'styled-components';
import theme, {Theme} from "src/style/theme";
import styledComponentWithProps from "src/style/styledComponentWithProps";
import device, {size} from "src/style/media";
import HomeIco from "src/icons/HomeIco"
import Hamburger from "./Hamburger";
import Link from "next/link";
import ProfileIndicator from "./ProfileIndicator";

export const NAV_HEIGHT = "100px";

const NavContainer = styledComponentWithProps(styled.div`
    height: ${NAV_HEIGHT};
    font-size: calc(10px + 2vmin);
    color: white;
    background-color: ${props => props.theme.primaryColor};
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    z-index: 999;
    
    > * {
        fill: ${props => props.theme.secondaryColor};
    }
`);

const LogoContainer = styledComponentWithProps(styled.div`
    height: 70px;
    
    @media ${device.mobileL} {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    
    @media ${device.laptop} {
        width: 100px;
    }
`);


const NavLogo = styledComponentWithProps(styled.img`
    height: 100%;
    align-self: center;
`);

const btnStyle = `
    position: absolute;
    left: 15px;
    top: 10px;
    bottom: 0;

    @media ${device.laptop} {
        display: none;
    }
`;

type ThemeWithProps = Theme | { isOpen: boolean }
const MobileNavLinks = styledComponentWithProps<ThemeWithProps>(styled.div`
    @media ${device.laptop} {
        display: none;
    }
    
    position: fixed;
    top: ${NAV_HEIGHT};
    bottom: 0;
    left: -250px;
    display: flex;
    flex-direction: column;
    background-color: ${props => props.theme.primaryAlternateColor};
    width: 250px;
    opacity: 0.90;
    transition: left .3s ease-out;

    
    ${props => props.isOpen ? `
    left: 0; 
    ` : ''}
    
    > a {
        width: 100%;
        text-align: center;
        height: 24px;
        line-height: 24px;
        padding-top: 20px;
        padding-bottom: 20px;
    }
    
    > a:hover {
        border-right: 1px solid ${props => props.theme.secondaryColor};
        padding-left: 1px;
    }
`);

const DesktopNavLinks = styledComponentWithProps(styled.div`
    @media ${`(max-width: ${size.laptop})`} {
        display: none;
    }

    height: 100%;
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: calc(100% - 200px);

    
    > a {
        height: 100%;
        display: flex;
        width: 150px;
        justify-content: center;
        align-items: center;
        line-height: 24px;
    }
    
    > a:hover {
        border-bottom: 1px solid ${props => props.theme.secondaryColor};
        margin-bottom: -1px;
    }
    
    > svg {
        height: 100%;
    }
`);

const NavLink = styledComponentWithProps(styled.a`
    cursor: pointer;
    font-size:14px;
    font-weight:800;
    text-decoration: none;
    color: white;
    box-sizing: border-box;
`);

const ProfileContainer = styledComponentWithProps(styled.div`
    position: absolute;
    right: 30px;
`);

const Links = () => (
    <>
        <Link href="/"><NavLink><HomeIco/></NavLink></Link>
        <Link href="/about"><NavLink>About</NavLink></Link>
        <NavLink href="https://devtales.net/">Devtales</NavLink>
    </>
);

const Navbar: React.FC = () => {
    const [isOpen, setOpen] = useState(false);

    return (
        <NavContainer>
            <LogoContainer>
                <NavLogo src="/logo.png" alt="logo"/>
            </LogoContainer>
            <Hamburger
                onClick={() => setOpen(!isOpen)}
                buttonStyle={btnStyle}
                barColor={theme.secondaryColor}
                isActive={isOpen}
            />
            <MobileNavLinks isOpen={isOpen}>
                <Links/>
            </MobileNavLinks>
            <DesktopNavLinks>
                <Links/>
            </DesktopNavLinks>
            <ProfileContainer>
                <ProfileIndicator/>
            </ProfileContainer>
        </NavContainer>
    );
};

export default Navbar;
