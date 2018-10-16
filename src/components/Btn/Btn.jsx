import React from 'react';

export default function Btn (props) {
    return (
        <div className='Btn' onClick={props.action}>
            <button>{props.children}</button>
        </div>
    )
}