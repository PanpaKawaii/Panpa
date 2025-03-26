import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import './TypePi.css';

export default function TypePi() {

    // var Pi = '3,14159265358979323846264338327950288419716939937510582097494459230781640628620899862803482534211706798214808651328230664709384460955058223172535940812848111745028';
    var Pi =
        '3,141592653589793238462643383279502884' +
        '19716939937510582097494459230781640628' +
        '62089986280348253421170679821480865132' +
        '82306647093844609550582231725359408128' +
        '48111745028410270193852110555964462294' +
        '89549303819644288109756659334461284756' +
        '48233786783165271201909145648566923460' +
        '34861045432664821339360726024914127372' +
        '45870066063155881748815209209628292540' +
        '91715364367892590360011330530548820466' +
        '52138414695194151160943305727036575959' +
        '19530921861173819326117931051185480744' +
        '62379962749567351885752724891227938183' +
        '01194912983367336244065664308602139494' +
        '63952247371907021798609437027705392171' +
        '76293176752384674818467669405132000568' +
        '12714526356082778577134275778960917363' +
        '71787214684409012249534301465495853710' +
        '50792279689258923542019956112129021960' +
        '86403441815981362977477130996051870721' +
        '13499999983729780499510597317328160963' +
        '18595024459455346908302642522308253344' +
        '6850352619311881710100031378387';
    const [YourPi, setYourPi] = useState('');

    const PiLength = YourPi.split('').filter(char => !isNaN(char) && char !== '\n').length;

    const handleEnterPi = (e) => {
        e.preventDefault();
    }

    return (
        <div className='typepi-container'>
            <div className='header'>
                <h1>Type <span>π</span></h1>
                <p>Length:
                    {
                        Pi.substring(0, YourPi.length).includes(YourPi) ?
                            <span> {PiLength}</span>
                            :
                            <span> 0</span>
                    }
                </p>

                <p style={{ color: Pi.substring(0, YourPi.length).includes(YourPi) ? '#28a745' : '#dc3545' }}>
                    {YourPi.split('').map((char, index) => (
                        <span key={index}>{char}{(index % 20 === 19) ? <br /> : ''}</span>
                    ))}
                </p>
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
