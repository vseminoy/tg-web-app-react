import React from 'react';

const Button = (props) => {
    return (
        <botton {...props} className={'button ' + props.className}/>
    );
};

export default Button;