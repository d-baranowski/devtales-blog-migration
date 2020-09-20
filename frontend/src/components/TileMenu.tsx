import React from 'react';
import styledComponentWithProps from "src/style/styledComponentWithProps";
import styled from 'styled-components';

const Menu = styledComponentWithProps(styled.div`
    padding: 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    
    > * {
        margin: 5px;
    }
`);

const TileMenu: React.FunctionComponent = ({children}) => (
    <Menu>
        {children}
    </Menu>
);

export default TileMenu;
