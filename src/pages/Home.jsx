import React from 'react';
import { Box, Typography, Grid, Button, ButtonBase, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { products } from '../data/products';

const Home = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const featuredDrops = products.slice(0, 4);

    return (
        <Box sx={{ width: '100%', minHeight: '100vh', bgcolor: 'background.default', color: 'text.primary', overflowX: 'hidden' }}>

    {/* header -------- */}
            <Box sx={{ pt: { xs: 12, md: 20 }, pb: 8, px: { xs: 4, md: '12%' } }}>
                <Typography
                    variant="h1"
                    sx={{
                        fontWeight: 800,
                        fontSize: { xs: '2.8rem', md: '5.2rem' },
                        lineHeight: 0.9,
                        textTransform: 'uppercase',
                        fontFamily: 'Syne, sans-serif',
                        letterSpacing: '-0.06em',
                        transform: 'skewX(-9deg)',
                        mb: 2
                    }}
                >
                        THE AFTER
                    <br />
                    <Box component="span" sx={{ color: '#CC0000' }}>
                        HOURS.
                    </Box>
                </Typography>

                <Typography sx={{
                    maxWidth: 520,
                    fontSize: '.9rem',
                    color: 'text.secondary',
                    lineHeight: 1.6,
                    mt: 5,
                    borderLeft: '2px solid #CC0000',
                    pl: 4,
                    fontFamily:'consolas',
                    transform: 'skewX(-6deg)'
                }}>
                    It's the raw tension between what is given and what is earned; for those who see the machine as a road to release. Where the standard ends, the rhythm begins.

                    <Box sx={{
                        // display: 'block',
                        mt: 2,
                        color: 'text.primary',
                        fontWeight: 800,
                        letterSpacing: '1px',
                        fontSize: '0.7rem',
                        textTransform: 'uppercase'
                    }}>
                        // ANY CHASSIS. ANY CULTURE. EVERY OUTLIER.
                    </Box>
                </Typography>
            </Box>

    {/* middle bars---  */}
            <Grid container justifyContent="space-around" sx={{ borderTop: 1, borderBottom: 1, borderColor: 'divider' }}>
                {['PROVISIONS', 'ARCHIVES', 'NETWORK'].map((label, i) => (
                    <Grid item xs={12} md={4} key={label} sx={{
                        borderRight: { md: i < 2 ? 1 : 0 },
                        borderBottom: { xs: 1, md: 0 },
                        borderColor: 'divider'
                    }}>
                        <ButtonBase sx={{
                            width: '100%', py: { xs: 5, md: 8 }, px: 4,
                            justifyContent: { xs: 'flex-start', md: 'center' },
                            '&:hover': { bgcolor: 'action.hover', color: '#CC0000' }
                        }}>
                            <Typography variant="h5" sx={{ fontWeight: 900, fontFamily: 'Sora', letterSpacing: { xs: 2, md: 0 } }}>
                                {label}
                            </Typography>
                        </ButtonBase>
                    </Grid>
                ))}
            </Grid>

    {/*product cards----------- */}
            <Box sx={{ px: { xs: 4, md: '12%' }, py: 12 }}>
                <Box sx={{ position: 'relative', mb: 8 }}>
                    <Typography variant="h6" sx={{ fontWeight: 900, fontFamily: 'monospace' }}>[ LATEST_RELEASES ]</Typography>
                    <Box sx={{ width: '100%', height: '1px', bgcolor: 'divider', overflow: 'hidden', mt: 1 }}>
                        <Box sx={{
                            position: 'absolute', width: '150px', height: '100%',
                            background: 'linear-gradient(90deg, transparent, #CC0000, transparent)',
                            animation: 'cometMove 4s infinite linear'
                        }} />
                    </Box>
                </Box>

                <Grid container spacing={6} justifyContent="center" sx={{ mb: 12 }}>
                    {featuredDrops.map((item) => (
                        <Grid item key={item.id} sx={{ width: { xs: '100%', sm: '280px', md: '240px', lg: '280px' } }}>
                            <Box className="product-card-container" sx={{ display: 'flex', flexDirection: 'column' }}>

        {/*DONT TOUCH -- image boxes. */}
                                <Box sx={{
                                    width: '100%', aspectRatio: '1/1', bgcolor: 'rgba(128,128,128,0.05)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    border: `1px solid ${theme.palette.divider}`, overflow: 'hidden'
                                }}>
                                    <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </Box>

       {/*item names and prices */}
                                <Box sx={{ pt: 2 }}>
                                    <Typography sx={{ fontWeight: 900, fontSize: '0.85rem', textTransform: 'uppercase' }}>
                                        {item.name}
                                    </Typography>
                                    <Typography sx={{ color: 'text.secondary', fontFamily: 'monospace', fontSize: '0.75rem', mb: 1 }}>
                                        ${item.price.toFixed(2)}
                                    </Typography>
                                </Box>
        {/*product dsc hover------ */}
                                <Box className="description-preview">
                                    <Typography className="fade-text"  sx={{fontSize: '0.75rem', fontFamily: 'monospace' }}>
                                        {item.description}
                                    </Typography>
                                </Box>

        {/*links to product details */}
                                <Button
                                    onClick={() => navigate(`/product/${item.id}`)}
                                    variant="outlined"
                                    fullWidth
                                    sx={{
                                        borderRadius: 0, mt: 1, fontFamily: 'monospace', fontSize: '0.65rem',
                                        borderColor: 'divider', color: 'text.primary',
                                        transition: 'all 0.2s ease',
                                        '&:hover': { borderColor: '#CC0000', fontWeight: 900, letterSpacing: '1px' }
                                    }}
                                >
                                    DETAILS [+]
                                </Button>
                            </Box>
                        </Grid>
                    ))}
                </Grid>

                {/* boxes for latest and other stuff */}
                <Grid container justifyContent="space-between" spacing={10}>
                    <Grid item xs={12} lg={5}>
                        <Box className="utilityBox" sx={{
                            p: 4, bgcolor: 'rgba(128, 128, 128, 0.02)', border: 1, borderColor: 'divider',
                            borderLeft: '4px solid #CC0000'
                        }}>
                            <Typography sx={{ fontFamily: 'monospace', fontSize: '0.7rem', color: '#CC0000', fontWeight: 'bold', mb: 1 }}>
                                // DATA_INTEGRITY
                            </Typography>
                            <Typography sx={{ fontSize: '0.85rem', opacity: 0.8 }}>
                                Protocol initiated. Null-pointer override at 0x00FF42. The uplink sequence fractured across the encrypted subsystem, hemorrhaging raw telemetry into the neural buffer. Ghost-code fragments oscillate within the optical lattice, bypassing the firewall with a recursive handshake. Dark-fiber packets synchronize under the neon glare of a dying mainframe, hard-lined into the central node. Syntax error in the legacy core—rebooting the secondary shunt. Virtualized packets bleed into the physical layer, a surge of overclocked pulses racing through the copper veins. Systemic bypass achieved. The grid flickers, a low-latency echo in the void. Data-drift confirmed. Connection established. Signal lost.
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={12} lg={5}>
                        <Box className="utilityBox" sx={{
                            p: 4, bgcolor: 'rgba(128, 128, 128, 0.02)', border: 1, borderColor: 'divider',
                            borderRight: '4px solid #CC0000', textAlign: { lg: 'right' }
                        }}>
                            <Typography sx={{ fontFamily: 'monospace', fontSize: '0.7rem', color: '#CC0000', fontWeight: 'bold', mb: 1 }}>
                                // SHIPPING_LOGS
                            </Typography>
                            <Typography sx={{ fontSize: '0.85rem', opacity: 0.8 }}>
                                Protocol initiated. Null-pointer override at 0x00FF42. The uplink sequence fractured across the encrypted subsystem, hemorrhaging raw telemetry into the neural buffer. Ghost-code fragments oscillate within the optical lattice, bypassing the firewall with a recursive handshake. Dark-fiber packets synchronize under the neon glare of a dying mainframe, hard-lined into the central node. Syntax error in the legacy core—rebooting the secondary shunt. Virtualized packets bleed into the physical layer, a surge of overclocked pulses racing through the copper veins. Systemic bypass achieved. The grid flickers, a low-latency echo in the void. Data-drift confirmed. Connection established. Signal lost.
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Box>

            {/* 05. FOOTER */}
            <Box sx={{ p: 6, borderTop: 1, borderColor: 'divider', display: 'flex', justifyContent: 'space-between', opacity: 0.4 }}>
                <Typography sx={{ fontFamily: 'monospace', fontSize: '0.6rem' }}>CORE_IND // 2026</Typography>
                <Typography sx={{ fontFamily: 'monospace', fontSize: '0.6rem' }}>UNDERSTOOD_WITHOUT_BEING_SAID</Typography>
            </Box>
        </Box>
    );
};

export default Home;