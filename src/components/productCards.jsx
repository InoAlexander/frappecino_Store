import React from 'react';
import { Card, CardMedia, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    return (
        <Card
            elevation={0}
            className="slanted-gear-box"
            sx={{
                bgcolor: 'rgba(150, 150, 150, 0.05)',
                width: '100%',
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '4px',
                borderLeft: '1px solid var(--accent-yellow)',
                borderRight: '1px solid var(--accent-red)',
                transition: '0.3s ease',
                '&:hover': { bgcolor: 'rgba(150, 150, 150, 0.08)' }
            }}
        >
            <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>

{/* pix=----------------- */}
                <Box
                    sx={{
                        bgcolor: '#fff',
                        display: 'flex',
                        justifyContent: 'center',
                        height: { xs: 200, sm: 300 }, // Responsive height
                        width: '100%',
                        p: 3,
                        borderBottom: '4px solid var(--accent-red)',
                        position: 'relative',
                        zIndex: 2
                    }}
                >
                    <CardMedia
                        component="img"
                        image={product.image}
                        alt={product.name}
                        sx={{ height: '100%', width: '100%', objectFit: 'contain' }}
                    />
                </Box>

{/*info sect---------------- */}
                <Box sx={{ position: 'relative', width: '100%' }}>

    {/* TRD LIvery stripes...  */}
                    <Box
                        className="livery-stripe"
                        sx={{
                            position: 'absolute',
                            top: 0,
                            bottom: 0,
                            left: { xs: '-5%', sm: '2%' }, // good for mobile shit
                            width: { xs: '60px', sm: '100px' }, // thin on smallscreen
                            transform: 'skewX(-20deg)',
                            zIndex: 1,
                            pointerEvents: 'none',
                // i pasted this in, idk what it does, it gets rid of the gaps though
                            background: `
                                linear-gradient(90deg, 
                                var(--accent-yellow) 0%, var(--accent-yellow) 33.33%, 
                                var(--accent-orange) 33.33%, var(--accent-orange) 66.66%, 
                                var(--accent-red) 66.66%, var(--accent-red) 100%)`,
                        }}
                    />

{/* words with frierends */}
                    <Box
                        sx={{
                            p: { xs: 2, sm: 4 },
                            pl: { xs: 8, sm: 18 }, // stripe pad
                            pr: { xs: 2, sm: 10 },
                            position: 'relative',
                            zIndex: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 1
                        }}
                    >
                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: 900,
                                fontStyle: 'italic',
                                fontFamily: 'monospace',
                                color: 'var(--text-main)',
                                textTransform: 'uppercase',
                                fontSize: { xs: '1.2rem', sm: '2.125rem' }, // small text for mobile
                                lineHeight: 1
                            }}
                        >
                            {product.name}
                        </Typography>

                        <Box sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', sm: 'row' }, // respoonsive stacking
                            alignItems: { xs: 'flex-start', sm: 'center' },
                            justifyContent: 'space-between',
                            mt: 1,
                            gap: { xs: 2, sm: 0 }
                        }}>
                            <Typography variant="h5" sx={{ color: 'var(--accent-orange)', fontWeight: 900, fontFamily: 'monospace' }}>
                                ${product.price}
                            </Typography>

                            <Box
                                className="launch-btn"
                                sx={{
                                    fontFamily: 'monospace',
                                    fontWeight: 900,
                                    color: 'var(--accent-red)',
                                    border: '2px solid var(--accent-red)',
                                    px: 3, py: 0.8,
                                    bgcolor: 'var(--bg-color)',
                                    borderRadius: '4px',
                                    fontSize: { xs: '0.75rem', sm: '0.9rem' },
                                    transition: '0.2s ease',
                                    '&:hover': {
                                        transform: 'translateX(8px) translateY(-4px)',
                                        boxShadow: '-4px 4px 0px var(--accent-orange)',
                                        bgcolor: 'var(--accent-red)',
                                        color: '#fff'
                                    }
                                }}
                            >
                                [ VIEW_SPECS ]
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Link>
        </Card>
    );
};

export default ProductCard;