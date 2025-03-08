import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import './TypePi.css';

export default function TypePi() {

    var Pi = '3,14159265358979323846264338327950288419716939937510582097494459230781640628620899862803482534211706798214808651328230664709384460955058223172535940812848111745028';
    const [YourPi, setYourPi] = useState('');

    const PiLength = YourPi.split('').filter(char => !isNaN(char) && char !== '\n').length;

    const handleEnterPi = (e) => {
        e.preventDefault();
    }

    return (
        <div className='typepi-container'>
            <div className='header'>
                <h1>Type Pi π</h1>
                <span>Length:
                    {
                        Pi.substring(0, YourPi.length).includes(YourPi) ?
                            <span> {PiLength}</span>
                            :
                            <span> 0</span>
                    }
                </span>

                <div style={{ color: Pi.substring(0, YourPi.length).includes(YourPi) ? '#28a745' : '#dc3545' }}>
                    {YourPi.split('').map((char, index) => (
                        <span key={index}>{char}{(index % 20 === 19) ? <br /> : ''}</span>
                    ))}
                </div>
            </div>

            <Form onSubmit={handleEnterPi}>
                <Form.Group controlId='yourpi'>
                    <Form.Control
                        as='textarea'
                        value={YourPi}
                        placeholder='Write your Pi'
                        onChange={(e) => {
                            const validInput = e.target.value.replace(/[^0-9,]/g, '');
                            setYourPi(validInput);
                        }} />
                </Form.Group>
            </Form>
        </div>
    )
}
