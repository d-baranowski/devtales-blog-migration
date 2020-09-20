// @flow
import React, {FC} from 'react';
import ResponsiveNavComponent from './ResponsiveNavComponent';

import HamburgerComponent from "./HamburgerComponent";
import Link from "next/link";
import {useRouter} from "next/router";

interface Props {
    toggleMenu: () => void;
    showMenu: boolean;
}

const PageNavigation: FC<Props> = ({showMenu, toggleMenu}) => {
    const router = useRouter();

    return (
        <header>
            <img id="logo" alt="logo" src="/img/devtalesico.svg"/>
            <nav>
                <img alt="Devtales" id="title" src="/img/title.svg"/>
                <HamburgerComponent toggleMenu={toggleMenu} isOpen={showMenu}/>
                <ResponsiveNavComponent isOpen={showMenu}>
                    <ul>
                        <li className={router.pathname == "/" ? "active" : ""}>
                            <Link /*onClick={toggleMenu} activeClassName="active"*/ href="/">Blog</Link></li>
                        <li className={router.pathname == "/projects" ? "active" : ""}>
                            <Link /*onClick={toggleMenu} activeClassName="active"*/
                                href="/projects">Projects</Link></li>
                        <li className={router.pathname == "/about" ? "active" : ""}>
                            <Link /*onClick={toggleMenu} activeClassName="active"*/
                                href="/about">About</Link></li>
                    </ul>
                </ResponsiveNavComponent>
            </nav>
            <div
                id="searchBar">{/*<input placeholder="search" className="pretty-input"/><i className="fa fa-search" aria-hidden="true"/>*/}</div>
        </header>
    );
}

export default PageNavigation;
