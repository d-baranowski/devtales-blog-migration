import React from 'react';
import Link from "next/link";
import styledComponentWithProps from "src/style/styledComponentWithProps";
import styled from 'styled-components';
import cleanClassName from "../util/cleanClassName";

interface Props {
    src: string;
    to: string;
    title: string;
}

const Tile = styledComponentWithProps(styled.div`
    background-color: ${props => props.theme.secondaryAlternateColor};
    padding: 15px;
    width: 320px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 400ms ease-in-out;
    
    :hover {
        color: #090D12;
        background-color: ${props => props.theme.secondaryColor};
    }
    
    :hover img {
        transform: scale(1.05);
    }
}`);

const ImageFrame = styledComponentWithProps(styled.div`
    overflow: hidden;
    width: 100%;
    max-width: 100%;
`);

const TileImage = styledComponentWithProps(styled.img`
    width: 100%;
    max-width: 100%;
    border-radius: 3px;
    transition: transform 0.3s ease-in-out;
`);

const GameTileContent = styledComponentWithProps(styled.div`
    color: white;
    font-weight: 700;
    padding-top: 15px;
    padding-bottom: 5px;
    transition: color 200ms ease-in-out;
`);

const MenuTile: React.FunctionComponent<Props> = ({src, to, title}) => (
    <Link href={to}>
        <div id={cleanClassName("menu-tile-to", to)}>
            <Tile>
                <ImageFrame>
                    <TileImage alt="" src={src}/>
                </ImageFrame>
                <GameTileContent>
                    <div>{title}</div>
                </GameTileContent>
            </Tile>
        </div>
    </Link>
);

export default MenuTile;
