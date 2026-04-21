import React, { useState, } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Box, Drawer, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { keyframes } from '@mui/system'

const Navbar = ({ isDark, setIsDark }) => {
    // old dark mode i dont thing works right
    // Default false for loads in lite mode
    // const [isDark, setIsDark] = useState(false);

    // useEffect(() => {
    //     document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    // }, [isDark]);

    // --- sidebar stuff ------------------
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleDrawer = (open) => (e) => {
        if (e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) return;
        setSidebarOpen(open);
    };

    const menuLinks = [
        // { text: '[HOME]', path: '/' },
        { text: '[DRIVE]', path: '/' },
        { text: '[WORKSHOP]', path: '/products' },
        { text: '[LOGS]', path: '/forum' },
        { text: '[MANIFESTO]', path: '/about' },
        // { text: '[GARAGE]', path: '/' },
    ];

    const scanLine = keyframes`
        0% { left: -30%; opacity: 0; }
        20% { opacity: 1; }
        80% { opacity: 1; }
        100% { left: 100%; opacity: 0; }
`;


    const yota = ['#CC0000', '#EB4625', '#F08D2D'];

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
                                '&:hover': {
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
                    sx: {
                        bgcolor: (theme) => theme.palette.mode === 'dark' ? '#0F0F0F' : '#FFFFFF',
                        color: (theme) => theme.palette.mode === 'dark' ? '#FFF' : '#000',
                        width: 320, // Increased width for better proportions
                        borderLeft: '2px solid rgba(128,128,128,0.3)', // Thinner, more surgical border
                        boxShadow: '-20px 0 40px rgba(0,0,0,0.1)',
                    }
                }}
            >
                <Box sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column' }}>

{/* header text which is a little much  */}
                    <Box sx={{ mb: 8, position: 'relative' }}>
                        <Typography variant="h4" sx={{ fontFamily: 'Sora', fontWeight: 900, letterSpacing: '-2px' }}>
                            CORE
                        </Typography>
                        <Box sx={{ display: 'flex', gap: '4px', mt: 1 }}>
                            <Box sx={{ flex: 1, height: '4px', bgcolor: '#CC0000' }} />
                            <Box sx={{ flex: 1, height: '4px', bgcolor: '#EB4625' }} />
                            <Box sx={{ flex: 1, height: '4px', bgcolor: '#F08D2D' }} />
                        </Box>
                    </Box>
{/* sidebar list starts */}
                    <List sx={{ flexGrow: 1 }}>
                        {menuLinks.map((item, index) => (
                            <ListItem key={item.text} disablePadding sx={{ mb: 2 }}>
                                <ListItemButton
                                    component={Link}
                                    to={item.path}
                                    sx={{
                                        position: 'relative',
                                        py: 2.5,
                                        px: 3,
                                        bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
                                    // cool box over text
                                        clipPath: 'polygon(0 0, 100% 0, 100% 70%, 92% 100%, 0 100%)',
                                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                        overflow: 'hidden', 
                                        border: '1px solid rgba(128,128,128,0.1)',

                                        '&:hover': {
                                            bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
                                            transform: 'translateX(-12px)',
                                            borderColor: yota[index % 3],

                                    // cyberscanner again
                                            '&::before': {
                                                content: '""',
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                width: '30%', // scanner length
                                                height: '2px',
                                                background: `linear-gradient(90deg, transparent, ${yota[index % 3]}, transparent)`,
                                                animation: `${scanLine} 1.1s infinite linear`,
                                            }
                                        }
                                    }}
                                >
                                    <ListItemText
                                        primary={item.text}
                                        primaryTypographyProps={{
                                            fontFamily: 'monospace',
                                            fontWeight: 700,
                                            fontSize: '1rem',
                                            textAlign: 'right',
                                            textTransform: 'uppercase',
                                            letterSpacing: '2px',
                                            color: 'inherit'
                                        }}
                                    />
                                    {/* Subtle index number for that technical feel */}
                                    <Typography sx={{
                                        position: 'absolute',
                                        left: 12,
                                        bottom: 8,
                                        fontSize: '0.6rem',
                                        fontFamily: 'monospace',
                                        opacity: 0.3
                                    }}>
                                        MOD_0{index + 1}
                                    </Typography>
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
{/* sidebar footer ----  */}
                    <Box sx={{ mt: 'auto', borderTop: '1px solid rgba(128,128,128,0.2)', pt: 2 }}>
                        <Typography sx={{ fontFamily: 'monospace', fontSize: '0.65rem', opacity: 0.5 }}>
                            [ understood without being said... ]
                        </Typography>
                    </Box>
                </Box>
            </Drawer>
        </>
    );
}

export default Navbar;