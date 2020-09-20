import {HTMLProps} from "react";
import {StyledFunction} from "styled-components"
import {Theme} from "./theme";


export default function styledComponentWithProps<T = Theme, U extends HTMLElement | SVGElement = HTMLElement>(styledFunction: StyledFunction<HTMLProps<U>>): StyledFunction<T & HTMLProps<U>> {
    return styledFunction
}
