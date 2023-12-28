import React from 'react';
import './Button.css';

function Button({ label, type }) {
    return (
        <button type={type}>
            {label}
        </button>
    );
}
export default Button;