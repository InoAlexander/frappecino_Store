import React from 'react';
import { Box, Typography, Grid, Link as MuiLink } from '@mui/material';
import bmwInterior from '../assets/images/bmw_interior.png';
import bustedTrueno from '../assets/images/bustedtrueno.png';
import sadTrueno from '../assets/images/sadtrueno.png';

const About = () => {
// Replace later....
    const techImages = [
        bustedTrueno,
        bmwInterior,
        sadTrueno,
    ];

    return (
        <Box sx={{
            py: 10,
            px: '20%',
            bgcolor: 'var(--bg-color)',
            color: 'var(--text-main)',
            minHeight: '100vh',
            transition: '0.3s ease'
        }}>

{/* top section-------------*/}
            <Box sx={{ mb: 8 }}>
                <Typography
                    variant="h2"
                    sx={{
                        fontWeight: 900,
                        fontStyle: 'italic',
                        fontFamily: 'monospace',
                        letterSpacing: '-4px',
                        textTransform: 'uppercase',
                        color: '#696969',
                        mb: 2
                    }}
                >
                    love me a shit box and so should you....
                </Typography>
                <Typography
                    variant="h5"
                    sx={{
                        color: 'var(--accent-red)',
                        fontWeight: 700,
                        fontFamily: 'monospace',
                        textTransform: 'uppercase',
                        mb: 6
                    }}
                >
          // idk what im doin i just be out here... //
                </Typography>

    {/*neat img section scroll */}
                <Box
                    sx={{
                        display: 'flex',
                        gap: 2,
                        overflowX: 'auto',
                        pb: 2,
                        '&::-webkit-scrollbar': { height: '6px' },
                        '&::-webkit-scrollbar-thumb': { bgcolor: 'var(--accent-orange)' }
                    }}
                >
                    {techImages.map((img, index) => (
                        <Box
                            key={index}
                            component="img"
                            src={img}
                            sx={{
                                height: 250,
                                minWidth: 400,
                                objectFit: 'cover',
                                filter: 'grayscale(0.5)',
                                borderBottom: '4px solid var(--accent-yellow)',
                                transition: '0.3s',
                                '&:hover': { filter: 'grayscale(0)', transform: 'translateY(-5px)' }
                            }}
                        />
                    ))}
                </Box>
            </Box>

    {/* about section... figure out what to write dude */}
            <Grid container spacing={4} sx={{ mb: 10 }}>
                <Grid item xs={12}>
                    <Typography
                        variant="body1"
                        sx={{
                            lineHeight: 1.8,
                            fontSize: '1.1rem',
                            fontFamily: 'monospace',
                            borderLeft: '2px solid var(--accent-orange)',
                            pl: 3
                        }}
                    >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ut eros vitae ante pharetra hendrerit. In hac habitasse platea dictumst. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Aliquam interdum convallis dolor, a dictum nisi. Mauris ut elit vitae erat gravida congue. Quisque non nisl vulputate. 
                        i need to put actual text here about me... idk what to write though
                    </Typography>
                </Grid>
            </Grid>

    {/* Affiliate shit, uses index.css DONT CHG THIS SHIT */}
            <Box
                className="slanted-gear-box"
                sx={{
                    p: 6,
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    bgcolor: 'rgba(255, 204, 0, 0.05)',
                    borderLeft: '1px solid var(--accent-yellow)',
                    borderRight: '1px solid var(--accent-red)',
                }}
            >
    {/* TRD LIvery groups------------- */}
                <Box sx={{
                    position: 'absolute',
                    top: 0,
                    left: '5%',
                    height: '100%',
                    width: '120px',
                    display: 'flex',
                    zIndex: 0,
                    transformOrigin: 'top left'
                }}>
                    <div className="livery-stripe stripe-yellow" />
                    <div className="livery-stripe stripe-orange" />
                    <div className="livery-stripe stripe-red" />
                </Box>

                {/* CONTENT */}
                <Box sx={{ position: 'relative', zIndex: 1, px: 4 }}>
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 900,
                            fontStyle: 'italic',
                            mb: 1,
                            fontFamily: 'monospace',
                            textTransform: 'uppercase'
                        }}
                    >
                        _GEAR_LIST //
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            mb: 4,
                            opacity: 0.8,
                            fontFamily: 'monospace',
                            maxWidth: '500px'
                        }}
                    >
                        // Amazon store - 
                    </Typography>

                    <MuiLink
                        href="amazonLinkHere"
                        target="_blank"
                        className="launch-btn"
                        sx={{
                            display: 'inline-block',
                            color: 'var(--text-main)',
                            fontWeight: 'bold',
                            textDecoration: 'none',
                            border: '2px solid var(--accent-red)',
                            bgcolor: 'var(--bg-color)',
                            px: 6,
                            py: 1.5,
                            fontFamily: 'monospace'
                        }}
                    >
                        [ VIEW_AMAZON_LISTS ]
                    </MuiLink>
                </Box>
            </Box>
        </Box>
    );
};

export default About;