import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, IconButton, useTheme, keyframes } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { products } from '../data/products';

// dont delete... this is for animating shit on the page. its ugly and really should be in the index.css file.... 
// i dont wanna move it cuz it might break lol

const borderScan = keyframes`
    0% { clip-path: inset(0 100% 100% 0); }
    25% { clip-path: inset(0 0 100% 0); }
    50% { clip-path: inset(0 0 0 0); }
    75% { clip-path: inset(100% 0 0 0); }
    100% { clip-path: inset(100% 100% 0 0); }
`;

const cyanPulse = keyframes`
    0% { border-color: rgba(0, 229, 255, 0.2); box-shadow: 0 0 15px rgba(0, 229, 255, 0.1); }
    50% { border-color: rgba(0, 229, 255, 0.6); box-shadow: 0 0 35px rgba(0, 229, 255, 0.3); }
    100% { border-color: rgba(0, 229, 255, 0.2); box-shadow: 0 0 15px rgba(0, 229, 255, 0.1); }
`;

const magentaPulse = keyframes`
    0% { border-color: rgba(216, 27, 96, 0.2); box-shadow: -20px 20px 60px rgba(0,0,0,0.6); }
    50% { border-color: rgba(216, 27, 96, 0.5); box-shadow: -20px 20px 60px rgba(216, 27, 96, 0.15); }
    100% { border-color: rgba(216, 27, 96, 0.2); box-shadow: -20px 20px 60px rgba(0,0,0,0.6); }
`;

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';

    const productIndex = products.findIndex((p) => p.id === parseInt(id));
    const product = products[productIndex];
    const nextProduct = products[(productIndex + 1) % products.length];

    const [selectedOption, setSelectedOption] = useState('');
    const [isAssembled, setIsAssembled] = useState(false);

// idk how to get rid of this setState error
    useEffect(() => {
        const timer = setTimeout(() => setIsAssembled(true), 600);
        if (product.options && product.options.length > 0) {
            setSelectedOption(() => product.options[0]);
        }
        return () => clearTimeout(timer);
    }, [id, product]);

    if (!product) return <Typography sx={{ p: 5 }}>// DATA_VOID</Typography>;

    const palette = {
        red: '#D32F2F',
        orange: '#EF6C00',
        cyan: '#00E5FF',
        magenta: '#D81B60',
        yellow: '#FBC02D'
    };

    return (
        <Box sx={{
            width: '100%', minHeight: { md: 'calc(100vh - 64px)' },
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            bgcolor: 'background.default',
            p: { xs: 2, md: '4vh 4vw' }, boxSizing: 'border-box', overflow: 'hidden', position: 'relative'
        }}>

            <Box sx={{
                width: '100%', maxWidth: '1400px', flex: 1,
                display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 5, zIndex: 2
            }}>

{/* left magenta magenta -hehe sbr soon!!!!!!! */}
                <Box sx={{
                    flex: { md: '0 1 500px' }, display: 'flex', flexDirection: 'column',
                    bgcolor: 'background.paper', borderLeft: `12px solid ${palette.red}`,
                    p: 5, position: 'relative',
                    border: `1px solid ${palette.magenta}33`,
                    animation: `${magentaPulse} 8s infinite ease-in-out`,
                    // Heavy industrial shadow from the "better" version
                    boxShadow: isDark ? '40px 40px 80px rgba(0,0,0,0.4)' : '15px 15px 40px rgba(0,0,0,0.1)',
                }}>
                    <Box sx={{ mb: 4 }}>
                        <IconButton onClick={() => navigate(-1)} sx={{ color: 'text.secondary', mb: 1, p: 0 }}>
                            <ArrowBackIcon />
                        </IconButton>
                        <Typography variant="h2" sx={{
                            fontWeight: 900, fontStyle: 'italic', lineHeight: 0.85,
                            fontFamily: '"Orbitron", sans-serif', letterSpacing: -2,
                            color: 'text.primary', textTransform: 'uppercase'
                        }}>
                            {product.name}
                        </Typography>
                        <Typography sx={{ color: palette.magenta, fontSize: '0.7rem', fontWeight: 900, letterSpacing: 5, fontFamily: 'monospace', mt: 2 }}>
                            DATA_LINK // ACTIVE_OS
                        </Typography>
                    </Box>

                    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <Typography sx={{ color: 'text.secondary', fontSize: '1.05rem', mb: 6, lineHeight: 1.8 }}>
                            {product.description}
                        </Typography>

                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            {(product.options || ['CORE']).map((opt, index) => {
                                const colors = [palette.red, palette.orange, palette.yellow];
                                const color = colors[index % 3];
                                const active = selectedOption === opt;
                                return (
                                    <Box key={opt} onClick={() => setSelectedOption(opt)}
                                        sx={{
                                            p: 2, pl: 4, cursor: 'pointer',
                                            fontSize: '0.85rem', fontWeight: 900,
                                            fontFamily: 'monospace', position: 'relative',
                                            bgcolor: active ? `${color}15` : 'transparent',
                                            color: active ? color : 'text.primary',
                                            transition: '0.3s ease',
                                            clipPath: 'polygon(8% 0, 100% 0, 92% 100%, 0 100%)',
                                            border: `1px solid ${active ? color : theme.palette.divider}`,
                                            transform: active ? 'translateX(10px)' : 'none',
                                            '&::before': active ? {
                                                content: '""', position: 'absolute', inset: 0,
                                                border: `2px solid ${color}`,
                                                animation: `${borderScan} 2s linear infinite`,
                                            } : {}
                                        }}>
                                        {active ? `> ${opt.toUpperCase()}` : opt.toUpperCase()}
                                    </Box>
                                );
                            })}
                        </Box>
                    </Box>
                </Box>

    {/* right cyan shi */}
                <Box sx={{
                    flex: 1.5, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    bgcolor: isDark ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.03)',
                    overflow: 'hidden', border: `1px solid ${palette.cyan}22`,
                    animation: `${cyanPulse} 6s infinite ease-in-out`,
                    boxShadow: isDark ? '40px 40px 80px rgba(0,0,0,0.4)' : '15px 15px 40px rgba(0,0,0,0.1)',
                }}>
                    <Box onClick={() => navigate(`/product/${nextProduct.id}`)}
                        sx={{
                            position: 'absolute', top: 30, right: 30, width: '130px',
                            cursor: 'pointer', zIndex: 10, bgcolor: 'background.paper',
                            p: 1.5, border: `1px solid ${palette.cyan}44`,
                            boxShadow: '10px 10px 20px rgba(0,0,0,0.3)',
                            '&:hover': { borderColor: palette.cyan, transform: 'translateY(-5px)' }
                        }}>
                        <Box component="img" src={nextProduct.image} sx={{ width: '100%', height: '60px', objectFit: 'contain' }} />
                        <Typography sx={{ fontSize: '0.55rem', fontFamily: 'monospace', color: palette.cyan, fontWeight: 900, textAlign: 'center', mt: 1 }}>
                            NEXT_UNIT <ArrowForwardIcon sx={{ fontSize: 10, verticalAlign: 'middle' }} />
                        </Typography>
                    </Box>

                    <Box sx={{ position: 'relative', width: '80%', height: '80%' }}>
                        {[
                            { clip: 'polygon(0 0, 100% 0, 50% 50%)', trans: 'translateY(-60px) blur(10px)' },
                            { clip: 'polygon(100% 0, 100% 100%, 50% 50%)', trans: 'translateX(60px) blur(10px)' },
                            { clip: 'polygon(100% 100%, 0 100%, 50% 50%)', trans: 'translateY(60px) blur(10px)' },
                            { clip: 'polygon(0 100%, 0 0, 50% 50%)', trans: 'translateX(-60px) blur(10px)' }
                        ].map((s, i) => (
                            <Box key={i} component="img" src={product.image}
                                sx={{
                                    position: 'absolute', width: '100%', height: '100%', objectFit: 'contain',
                                    clipPath: s.clip,
                                    transform: isAssembled ? 'translate(0,0)' : s.trans,
                                    filter: isAssembled ? 'none' : 'opacity(0)',
                                    transition: `all 2s cubic-bezier(0.19, 1, 0.22, 1) ${i * 0.15}s`,
                                }}
                            />
                        ))}
                    </Box>
                </Box>
            </Box>

{/* price sect---------------- */}
            <Box sx={{
                width: '100%', maxWidth: '1400px', mt: 8,
                display: 'flex', justifyContent: 'space-between', alignItems: 'center'
            }}>
                <Box sx={{ borderLeft: `6px solid ${palette.cyan}`, pl: 4 }}>
                    <Typography sx={{ fontSize: '0.7rem', fontWeight: 900, color: palette.cyan, fontFamily: 'monospace', letterSpacing: 5 }}>
                        PRICE_AS_SPECIFIED
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
                        <Typography sx={{ fontSize: '1.5rem', color: palette.cyan, fontFamily: 'monospace', fontWeight: 900, mr: 1 }}>$</Typography>
                        <Typography sx={{
                            fontSize: '4rem', fontWeight: 900, lineHeight: 1,
                            fontFamily: '"Orbitron", sans-serif', color: 'text.primary',
                        }}>
                            {product.price}
                        </Typography>
                    </Box>
                </Box>

                <Button variant="contained"
                    sx={{
                        px: 12, height: 80, borderRadius: 0,
                        bgcolor: 'text.primary', color: 'background.paper',
                        fontWeight: 900, fontSize: '1.2rem', fontFamily: 'monospace',
                        clipPath: 'polygon(15% 0, 100% 0, 85% 100%, 0 100%)',
                        transition: '0.4s cubic-bezier(0.19, 1, 0.22, 1)',
                        '&:hover': {
                            bgcolor: palette.magenta,
                            color: '#fff',
                            transform: 'translateY(-8px)',
                            boxShadow: `0 15px 40px ${palette.magenta}44`,
                        }
                    }}>
                    EXECUTE_ORDER
                </Button>
            </Box>
        </Box>
    );
};

export default ProductDetail;