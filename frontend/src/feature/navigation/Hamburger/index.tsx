import * as React from 'react'
import {Button} from './button/Button'
import {StyledLinesSlider} from './HamburgerSlider/StyledLinesSlider'

type Props = {
    onClick?: () => void;
    buttonColor?: string;
    buttonWidth?: string;
    buttonStyle?: string;
    barColor?: string;
    isActive?: boolean;
}

const Index: React.FC<Props> = props => <Button {...props} Lines={StyledLinesSlider}/>;

export default Index
