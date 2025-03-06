import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Drawer, IconButton, List, ListItem, ListItemText, Toolbar, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import './GuestHeader.css';

export default function GuestHeader() {

    const [id, setId] = useState(null);
    const UserId = localStorage.getItem('UserId');
    useEffect(() => {
        const UserIdInt = parseInt(UserId, 10);
        setId(UserIdInt);
    }, [UserId]);

    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };
    
    const menuItems = [
        { text: 'Home', path: '/' },
        { text: 'About', path: '/about' },
        { text: 'Contact', path: '/contact' },
        { text: 'App', path: '/testapp' },
        { text: 'Game', path: '/game' },
        { text: 'Japanese', path: '/japanese' },
        { text: 'Sign In', path: '/signinsignup' },
    ];

    return (
        <div className='guestheader-container'>
            <AppBar position="static" className='menu'>
                <Toolbar>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        <Link to='/' className='brand-logo'><b>Panpa</b></Link>
                    </Typography>

                    <Link to='/' className='menu-item'><i className='fa-solid fa-house icon'></i> Home</Link>
                    <Link to='/about' className='menu-item'><i className='fa-solid fa-circle-info icon'></i> About</Link>
                    <Link to='/contact' className='menu-item'><i className='fa-regular fa-address-card icon'></i> Contact</Link>
                    <Link to='/testapp' className='menu-item'><i className='fa-solid fa-laptop icon'></i> App</Link>
                    <Link to='/game' className='menu-item'><i className='fa-solid fa-gamepad icon'></i> Game</Link>
                    <Link to='/japanese' className='menu-item'><i className='fa-solid fa-torii-gate icon'></i> Japanese</Link>
                    <Link to='/signinsignup' className='menu-item'><i className='fas fa-sign-in-alt icon'></i> Sign In</Link>

                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleMenu}>
                        <MenuIcon className='menu-icon' />
                    </IconButton>

                </Toolbar>
            </AppBar>

            <Drawer anchor="right" open={menuOpen} onClose={toggleMenu} className='drawer'>
                <List className='drawer-list' style={{ height: '100%', backgroundColor: '#fcfcfc' }}>

                    {menuItems.map((item) => (
                        <ListItem key={item.text} component={Link} to={item.path} onClick={toggleMenu}>
                            <ListItemText primary={item.text}
                                style={{ color: '#000000', fontFamily: 'Quicksand', fontWeight: 'bold' }} />
                        </ListItem>
                    ))}

                </List>
            </Drawer>

            <Outlet />
        </div>
    );
}
