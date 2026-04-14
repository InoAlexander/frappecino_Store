import React, { useState, } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Box, Drawer, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = ({ isDark, setIsDark }) => {
// old dark mode i dont thing works right
    // Default false for loads in lite mode
    // const [isDark, setIsDark] = useState(false);

    // useEffect(() => {
    //     document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    // }, [isDark]);

// --- sidebar ------------------
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleDrawer = (open) => (e) => {
        if (e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) return;
        setSidebarOpen(open);
    };

    const menuLinks = [
        // { text: '[HOME]', path: '/' },
        { text: '[DRIVE]', path: '/' },
        { text: '[WORKSHOP]', path: '/products' }, 
        { text: '[LOGS]', path: '/' },
        { text: '[MANIFESTO]', path: '/about' },
        // { text: '[GARAGE]', path: '/' },
    ];

    return (
        <>
            <AppBar
                position="sticky"
                sx={{
                    bgcolor: 'var(--bg-color)', 
                    color: 'var(--text-main)',   
                    borderBottom: '1px solid var(--accent-red)', 
                    transition: 'all 0.3s ease'
                }}
                elevation={0}
            >
                <Toolbar sx={{ px: { xs: 2, sm: '20%' } }}>

    {/* need some kind of logo or somethintg here */}
                    <Typography
                        variant="h4"
                        component={Link}
                        to="/"
                        sx={{
                            flexGrow: 1,
                            textDecoration: 'none',
                            color: 'inherit',
                            fontWeight: 900,
                            fontStyle: 'italic',
                            fontFamily: 'sora'
                        }}
                    >
                        FRAッPE 
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
    {/* nav shit for larger screeeeeeeeeeeee */}
                        {/* <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 1 }}>
                            <Button component={Link} to="/productListings" color="inherit" sx={{ fontFamily: 'monospace' }}>Shop</Button>
                            <Button component={Link} to="/about" color="inherit" sx={{ fontFamily: 'monospace' }}>About</Button>
                        </Box> */}

    {/* Theme button.... =====--------*/}
                        <Button
                            onClick={() => setIsDark(!isDark)}
                            sx={{
                                fontFamily: 'monospace',
                                fontSize: '0.75rem',
                                color: 'var(--accent-orange)',
                                border: '1px solid var(--accent-orange)',
                                borderRadius: 0,
                                ml: 2,
                                px: 1,
                                minWidth: 'auto',
                                '&:hover':{
                                    bgcolor: 'var(--accent-orange)',
                                    color: 'var(--bg-color)'
                                }
                            }}
                        >
            {/* dark mode shit */}
                            {isDark ? '// [ DAY_SHIFT ]' : '// [ NIGHT_DRIVE ]'}
                        </Button>

                        <IconButton
                            color="inherit"
                            aria-label="menu"
                            onClick={toggleDrawer(true)}
                            sx={{ ml: 1 }}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>

{/* Sidebar ------------------------ */}
            <Drawer
                anchor="right"
                open={isSidebarOpen}
                onClose={toggleDrawer(false)}
                PaperProps={{
                    sx: { bgcolor: 'var(--bg-color)', color: 'var(--text-main)', borderLeft: '2px solid var(--accent-red)' }
                }}
            >
                <Box
                    sx={{ width: 250 }}
                    role="presentation"
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}
                >
                    <Typography variant="h5" 
                                sx={{ px: 2, py: 1, fontWeight: 800, textAlign: 'left', fontFamily: 'sora' }}>
                        // CORE
                    </Typography>
                    <Typography
                        variant="caption"
                        sx={{
                            textAlign: 'center',
                            color: 'var(--accent-orange)',
                            p: 1,
                            fontFamily: 'monospace',
                            borderTop: '3px solid black',
                            margin: 'auto'
                            
                        }}
                    >
                        understood without being said
                    </Typography>
{/* links for the shit--------------------- */}
                    <List>
                        {menuLinks.map((item) => (
                            <ListItem key={item.text} disablePadding>
                                <ListItemButton
                                    component={Link}
                                    to={item.path}
                                    sx={{
                                        textAlign: 'right',
                                        borderRadius: '5px',
                                        mx: 1,
                                        transition: 'all 0.2s ease-in-out',
                                        '&:hover': {
                                            bgcolor: 'var(--accent-red)',
                                            color: '#FFF',
                                            transform: 'translateX(-8px)',
                                            boxShadow: `1px 1px 0px var(--accent-orange), 3px 3px 0px var(--accent-yellow)` ,
                                            opacity: '86%',
                                            '& .MuiTypography-root': { fontWeight: 'bold' }
                                        }
                                    }}
                                >
                                    <ListItemText
                                        primary={item.text}
                                        primaryTypographyProps={{
                                            fontSize: '1rem',
                                            fontWeight: 500,
                                            letterSpacing: '0.5px',
                                            fontFamily: 'monospace'
                                        }}
                                    />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
        </>
    );
}

export default Navbar;