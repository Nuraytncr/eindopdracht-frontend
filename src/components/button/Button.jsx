import React from 'react';
import './Button.css';

function Button({ label, type, onClickCallBack }) {
    return (
        <button type={type} onClick={() => onClickCallBack()}>
            {label}
        </button>
    );
}
export default Button;