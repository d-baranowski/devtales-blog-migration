export const getLayerHeight: (buttonWidth: number) => number = buttonWidth => buttonWidth * 0.1;
export const getLayerSpacing: (buttonWidth: number) => number = buttonWidth => buttonWidth * 0.15;
export const getBarColor: ({barColor}) => string = ({barColor}) => `background-color: ${barColor || 'black'}`;
