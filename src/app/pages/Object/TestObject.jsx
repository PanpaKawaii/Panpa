import React from 'react';

export default function TestObject() {
    return (
        <div>
            <svg width='1000' height='600' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'
                style={{ border: '1px solid red' }}>
                <path d='M10 10 H 90 V 90 H 10 Z' fill='red' stroke='black' strokeWidth='2' />
                <path
                    d='M100 80 C 40 10, 40 90, 100 150 C 160 90, 160 10, 100 80'
                    fill='#cccccc80'
                    stroke='black'
                    strokeWidth='2' />
            </svg>
        </div>
    )
}
