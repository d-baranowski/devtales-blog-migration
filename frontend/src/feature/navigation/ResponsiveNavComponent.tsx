// @flow
import React from 'react';

const ResponsiveNavComponent = (props) =>
    React.createElement('responsivenav',
        {className: props.isOpen ? 'open' : ''},
        props.children); //Custom html element

export default ResponsiveNavComponent;
