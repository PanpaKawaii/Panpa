import React from 'react';
import './Footer.css';

export default function Footer() {

    return (
        <div className='footer-container'>
            <section className='section-1'>
                <div className='footer-brand'>
                    <h1>Panpa</h1>
                    <p>Panpa is a website that hosts games and learning materials for the purpose of improving programming skills.</p>
                </div>
                <div className='footer-location'>
                    <h1>Email</h1>
                    <p>dngngchitriu2004@gmail.com</p>
                    <p>trieuDNHSE180392@fpt.edu.vn</p>
                </div>
                <div className='footer-solution'>
                    <h1>Contact</h1>
                    <p>Viettel: ***8370030</p>
                </div>
            </section>
            <section className='section-2'>
                <p>Copyright © 2025 Tactic</p>
            </section>
        </div>
    )
}
