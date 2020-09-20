import styled from 'styled-components';
import styledComponentWithProps from "../style/styledComponentWithProps";
import {NAV_HEIGHT} from "../feature/navigation/Navbar";

const CenterIn = styledComponentWithProps(styled.div`
  position: absolute;
  top: ${NAV_HEIGHT};
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center; 
`);

export default CenterIn;
