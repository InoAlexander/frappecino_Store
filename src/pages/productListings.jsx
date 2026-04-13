import React from 'react';
import { Box, Typography, Link, useTheme } from '@mui/material';
import { products } from '../data/products';

const ProductListings = () => {
    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';

    return (
        <Box sx={{
            height: 'calc(100vh - 64px)',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
// important for bg theme togg -----------------------
            bgcolor: 'background.default', 
            color: 'text.primary',
            position: 'relative',
            overflow: 'hidden', // i cant get the page to stop fkn scrollin!!!!!!!!!!!!!!!!!
            transition: 'all 0.3s ease'
        }}>

{/*fixed behind position, i dont normally like to use absolute, it was the only way tho...  */}
            <Box sx={{
                position: 'absolute', 
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                pointerEvents: 'none',
                zIndex: 0, // 0 zindex will make it look like its behind shit
                opacity: isDark ? 0.08 : 0.12,
            }}>
                <Box sx={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 4
                }}>
                    <Box sx={{ flex: 1, height: '1px', bgcolor: 'error.main' }} />
                    <Box sx={{
                        p: 4,
                        border: `1px solid ${theme.palette.error.main}`,
                        transform: 'rotate(45deg)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Typography sx={{
                            transform: 'rotate(-45deg)',
                            fontSize: { xs: '15vw', md: '8vw' },
                            fontWeight: 900,
                            fontFamily: 'monospace',
                            fontStyle: 'italic',
                            color: 'text.primary', // toggles based on theme
                        }}>
                            86
                        </Typography>
                    </Box>
                    <Box sx={{ flex: 1, height: '1px', bgcolor: 'error.main' }} />
                </Box>
                <Typography sx={{
                    mt: 4,
                    fontSize: '0.8rem',
                    fontFamily: 'monospace',
                    letterSpacing: 12,
                    fontWeight: 900,
                    color: 'text.primary'
                }}>
                    FRAッPE_RACING_SYSTEMS
                </Typography>
            </Box>

{/* header ------------------------------ */}
            <Box sx={{
                position: 'relative',
                zIndex: 2,
                py: 3, px: { xs: 3, md: 6 },
                borderBottom: `1px solid ${theme.palette.divider}`,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                bgcolor: 'background.default', // makes header opaque
            }}>
                <Box>
                    <Typography sx={{ fontFamily: 'monospace', fontSize: '0.6rem', color: 'error.main', fontWeight: 900, letterSpacing: 4 }}>
                        SYSTEM.MANIFEST_v.86
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 900, fontFamily: 'monospace', textTransform: 'uppercase' }}>
                        Inventory<span style={{ color: theme.palette.error.main }}>_</span>
                    </Typography>
                </Box>
                <Typography sx={{ fontFamily: 'monospace', fontWeight: 900 }}>{products.length} UNITS</Typography>
            </Box>

{/* scrolling grid portion of shit -------------------- */}
            <Box sx={{
                flex: 1,
                overflowY: 'auto',
                position: 'relative',
                zIndex: 1, 
                p: { xs: 4, md: 8, lg: 10 },
                '&::-webkit-scrollbar': { width: '4px' },
                '&::-webkit-scrollbar-thumb': { bgcolor: 'error.main' },
            }}>
                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4, 1fr)', lg: 'repeat(6, 1fr)' },
                    gap: { xs: 4, md: 6 },
                    maxWidth: '2400px',
                    mx: 'auto'
                }}>
                    {products.map((item, idx) => (
                        <Link key={item.id} href={`/product/${item.id}`} sx={{ textDecoration: 'none', color: 'inherit' }}>
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                transition: '0.3s',
                                '&:hover': {
                                    transform: 'translateY(-8px)',
                                    '& .image-box': { borderColor: 'error.main', bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'white' },
                                    '& .ninja-line': { width: '100%' }
                                }
                            }}>
                                <Typography sx={{ fontFamily: 'monospace', fontSize: '0.55rem', opacity: 0.4, mb: 1 }}>ID_{idx + 100}</Typography>
                                <Box className="image-box" sx={{
                                    width: '100%', aspectRatio: '1/1',
                                    bgcolor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
                                    border: `1px solid ${theme.palette.divider}`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    p: 2, mb: 2, transition: '0.3s',
                                    clipPath: 'polygon(0 0, 100% 0, 100% 90%, 90% 100%, 0 100%)',
                                }}>
                                    <img src={item.image} alt={item.name} style={{ maxWidth: '90%', maxHeight: '90%', objectFit: 'contain' }} />
                                </Box>
                                <Typography sx={{ 
                                    fontWeight: 900, fontSize: '0.9rem', fontFamily: 'monospace', 
                                    textTransform: 'uppercase', height: '2.4em', overflow: 'hidden',
                                    display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical'
                                }}>
                                    {item.name}
                                </Typography>
                                <Box className="ninja-line" sx={{ height: '2px', width: '20px', bgcolor: 'error.main', my: 1, transition: '0.4s' }} />
                                <Box sx={{ borderLeft: `2px solid ${theme.palette.error.main}`, pl: 1 }}>
                                    <Typography sx={{ fontSize: '1.2rem', fontWeight: 900, fontFamily: 'monospace' }}>${item.price}</Typography>
                                </Box>
                            </Box>
                        </Link>
                    ))}
                </Box>
            </Box>

{/* footer-----------------*/}
            <Box sx={{
                py: 2, px: 4, borderTop: `1px solid ${theme.palette.divider}`,
                display: 'flex', justifyContent: 'space-between', bgcolor: 'background.default', zIndex: 10
            }}>
                <Typography sx={{ fontFamily: 'monospace', fontSize: '0.6rem', letterSpacing: 2 }}>STATUS: ONLINE</Typography>
                <Typography sx={{ fontFamily: 'monospace', fontSize: '0.6rem', opacity: 0.4 }}>© 2026 FRAッPE_RACING</Typography>
            </Box>
        </Box>
    );
};

export default ProductListings;