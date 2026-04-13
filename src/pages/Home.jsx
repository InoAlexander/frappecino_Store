import React from 'react';
import { Box, Typography, keyframes, useTheme } from '@mui/material';
import ProductCard from '../components/productCards';
import { products } from '../data/products';
import '../index.css';

// box shadow ani goes harddd tho
const cyanGlow = keyframes`
    0% { box-shadow: 0 0 20px rgba(0, 229, 255, 0.05); border-color: rgba(0, 229, 255, 0.08); }
    50% { box-shadow: 0 0 40px rgba(0, 229, 255, 0.12); border-color: rgba(0, 229, 255, 0.15); }
    100% { box-shadow: 0 0 20px rgba(0, 229, 255, 0.05); border-color: rgba(0, 229, 255, 0.08); }
`;

const magentaGlow = keyframes`
    0% { box-shadow: 10px 10px 50px rgba(0,0,0,0.2); border-color: rgba(216, 27, 96, 0.05); }
    50% { box-shadow: 10px 10px 60px rgba(216, 27, 96, 0.08); border-color: rgba(216, 27, 96, 0.15); }
    100% { box-shadow: 10px 10px 50px rgba(0,0,0,0.2); border-color: rgba(216, 27, 96, 0.05); }
`;

const Home = () => {
    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';

    return (
        <Box
            sx={{
                py: 6,
                width: '100%',
                px: { xs: '5%', md: '20%' },
                boxSizing: 'border-box',
                overflowX: 'hidden',
                bgcolor: 'var(--bg-color)',
                minHeight: '100vh'
            }}
        >
{/* header section ------------------*/}
            <Box sx={{ 
                mb: 6, 
                p: 4, 
                bgcolor: isDark ? 'rgba(255,255,255,0.01)' : 'rgba(0,0,0,0.01)',
                borderLeft: '4px solid var(--accent-red)', // Thinned from 8px for subtlety
                border: `1px solid ${theme.palette.divider}`,
                animation: `${magentaGlow} 12s infinite ease-in-out`,
                position: 'relative',
                backdropFilter: 'blur(4px)', // Soft background bleed
            }}>
                <Typography
                    variant="h1"
                    className="racing-title"
                    sx={{
                        fontWeight: 900,
                        letterSpacing: '-3px',
                        textTransform: 'uppercase',
                        fontStyle: 'italic',
                        fontFamily: 'monospace',
                        lineHeight: 1,
                        color: 'var(--text-main)',
                    }}
                >
                    New Drops
                </Typography>

                <Typography
                    variant="h5"
                    className="racing-subtitle"
                    sx={{
                        color: 'var(--accent-red)',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '3px',
                        fontFamily: 'monospace',
                        mt: 1,
                        fontSize: '0.9rem',
                        opacity: 0.7
                    }}
                >
                    // high_performance_shit
                </Typography>
            </Box>

{/* product.item list??-======------------ */}
            <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: 3, 
                p: { xs: 1, md: 2 },
                bgcolor: 'transparent', // Fully set into the page
                border: `1px solid ${theme.palette.divider}`,
                position: 'relative',
                transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                animation: `${cyanGlow} 10s infinite ease-in-out`,
                
// magenta when actions happ
                '&:hover': {
                    borderColor: 'rgba(216, 27, 96, 0.2)',
                    boxShadow: `0 0 50px rgba(216, 27, 96, 0.08)`,
                }
            }}>
                {products?.map((item) => (
                    <Box key={item.id} sx={{ 
                        p: 1,
                        transition: 'all 0.4s ease',
                        border: '1px solid transparent',
                        '&:hover': { 
                            transform: 'translateX(8px)',
                            bgcolor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.01)',
                            borderColor: 'rgba(0, 229, 255, 0.1)',
                            borderRadius: '2px'
                        } 
                    }}>
                        <ProductCard product={item} />
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default Home;
