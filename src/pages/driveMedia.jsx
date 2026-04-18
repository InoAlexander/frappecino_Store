import React from 'react';
import { 
    Box, Typography, ButtonBase, Grid, Container, 
    Stack, SvgIcon, useTheme, alpha, Divider 
} from '@mui/material';

// static icons because fucking vite hates font awesome or something
const BoltIcon = (p) => <SvgIcon {...p}><path d="M11 21h-1l1-7H7.5c-.58 0-.57-.32-.38-.66.19-.34.05-.08.07-.12C8.48 10.94 10.42 7.54 13 3h1l-1 7h3.5c.49 0 .56.33.47.51l-.07.15C12.96 17.94 11 21 11 21z"/></SvgIcon>;
const PlayIcon = (p) => <SvgIcon {...p}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/></SvgIcon>;
const ReviewIcon = (p) => <SvgIcon {...p}><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 14v-2.47l6.88-6.88c.19-.19.51-.19.71 0l1.77 1.77c.2.2.2.51 0 .71L8.47 14H6zm12 0h-7.5l2-2H18v2z"/></SvgIcon>;

// shit for the page to run
// Adjust opacity (0.4) or filter below to change background video 
const heroVideo = "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExY2drZG1vbG51dnFsa2N5bmloaWo1OXhyM2I0ZXRjb3Nuc2g5ZjVpMCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/mZOwa6KhyJ79G6I0Fz/giphy.gif";

const videoUploads = [
    { id: 'dQw4w9WgXcQ', title: 'After Hours // Shibuya Drift', views: 999999, category: 'Street' },
    { id: 'M7lc1UVf-VE', title: 'Garage Talk: Twin Turbo Setup', views: 99999, category: 'Garage' },
    { id: '3lZQDq1F6Mv', title: 'Touge Monsters // Kanagawa Run', views: 12000, category: 'Race' },
    { id: 'V_jZ2xO_ySg', title: 'Night Runners // 3AM Highway', views: 33000, category: 'Street' },
    { id: 'L_u9_I2vO7k', title: 'Rally Spec // Dirt Track Test', views: 7777, category: 'Race' },
];

const DriveMedia = () => {
    const theme = useTheme();
    const getThumb = (id) => `https://img.youtube.com/vi/${id}/mqdefault.jpg`;
    const getYTLink = (id) => `https://youtube.com/watch?v=${id}`;

    const sortedVideos = [...videoUploads].sort((a, b) => b.views - a.views);
    const featured = sortedVideos[0];

    // video boxes
    const cleanBorderStyle = {
        border: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.paper',
        transition: '0.3s ease-in-out',
        borderRadius: 0, // Set to 1 or 2 for rounded corners
        overflow: 'hidden',
        '&:hover': { borderColor: 'primary.main' }
    };

    return (
        <Box sx={{ width: '100%', minHeight: '100vh', bgcolor: 'background.default', pb: 10 }}>
            
{/* cool shit up top with kenblock vid or something */}
            <Box sx={{
                height: '40vh', // Adjust banner height here
                position: 'relative', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center',
                bgcolor: '#000', 
                mb: 8, 
                borderBottom: '6px solid', 
                borderColor: 'primary.main', // Thickness/color bot stripe
                overflow: 'hidden'
            }}>
{/* video in herobox */}
                <Box component="img" src={heroVideo} sx={{ 
                    position: 'absolute', inset: 0, width: '100%', height: '100%', 
                    objectFit: 'cover', 
                    opacity: 0.4, // 
                    filter: 'grayscale(1) contrast(1.1)' 
                }} />
                
                <Stack alignItems="center" sx={{ zIndex: 3 }}>
{/* header---------------- */}
                    <Typography variant="h1" sx={{ 
                        fontFamily: '"Arial Black", sans-serif', // impact also a good font
                        fontWeight: 900, 
                        color: alpha('#fff', 0.75), // opacity second
                        fontStyle: 'italic', 
                        letterSpacing: -5, 
                        fontSize: { xs: '4.5rem', md: '8.5rem' },
                        textTransform: 'uppercase',
                        lineHeight: 0.8,
                        // 1st part offset then opac
                        textShadow: `10px 10px 0px ${alpha('#FF0000', 0.35)}`, 
                    }}>
                        HARD//DRIVE
                    </Typography>

{/* subtext under heading */}
                    <Typography sx={{ 
                        fontFamily: 'monospace',
                        color: 'primary.main',
                        fontSize: '0.85rem',
                        fontWeight: 900,
                        letterSpacing: 12, // Space out letters for that high-tech cockpit feel
                        mt: 3,
                        textTransform: 'uppercase',
                        bgcolor: alpha('#000', 0.7), // bar opacity
                        backdropFilter: 'blur(6px)', // blurs vid
                        px: 4,
                        py: 0.8,
                        border: '1px solid',
                        borderColor: alpha(theme.palette.primary.main, 0.4),
                    }}>
                        LOG_VOL_004 // PHASE_ACTIVE
                    </Typography>
                </Stack>
            </Box>

            <Container maxWidth="xl">
                <Grid container spacing={3}>
{/*main video -----------[] */}
                    <Grid item xs={12} lg={8.5}>
                        <Box sx={cleanBorderStyle}>
                            <ButtonBase component="a" href={getYTLink(featured.id)} target="_blank" sx={{ width: '100%', aspectRatio: '16/9', bgcolor: '#000', display: 'block', position: 'relative' }}>
                                <Box component="img" src={`https://img.youtube.com/vi/${featured.id}/maxresdefault.jpg`} sx={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} />
{/* featrued vid title text overlay ------*/}
                                <Box sx={{ position: 'absolute', bottom: 0, left: 0, p: 3, width: '100%', background: 'linear-gradient(transparent, rgba(0,0,0,0.9))', textAlign: 'left' }}>
                                    <Typography variant="h4" sx={{ fontWeight: 900, color: '#fff' }}>{featured.title}</Typography>
                                    <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 900 }}>FEATURED // {featured.views.toLocaleString()} REVS</Typography>
                                </Box>
                                <PlayIcon sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: 80, color: '#fff', opacity: 0.6 }} />
                            </ButtonBase>
                        </Box>
                    </Grid>

{/* left side controls--  */}
                    <Grid item xs={12} lg={3.5}>
                        <Stack spacing={2} sx={{ height: '100%' }}>
{/* enter / submit */}
                            <ButtonBase 
                                href="https://forms.google.com" target="_blank"
                                sx={{ 
                                    p: 4, bgcolor: 'primary.main', color: '#fff', 
                                    display: 'flex', flexDirection: 'column', alignItems: 'flex-start', flex: 1,
                                    '&:hover': { bgcolor: 'primary.dark' } // Button hover color
                                }}
                            >
                                <ReviewIcon sx={{ mb: 1, fontSize: 32 }} />
                                <Typography variant="h5" sx={{ fontWeight: 900 }}>SUBMIT_BUILD</Typography>
                                <Typography variant="caption" sx={{ opacity: 0.8 }}>SYSTEM_READY</Typography>
                            </ButtonBase>

 {/* stat box i have to figure out what do do wiht */}
                            <Box sx={{ ...cleanBorderStyle, p: 3, flexGrow: 1 }}>
                                <Typography variant="overline" sx={{ color: 'text.secondary', fontWeight: 900 }}>Telemetry</Typography>
                                <Divider sx={{ my: 1 }} />
                                <Stack spacing={1}>
                                    {['STREAMS: ACTIVE', 'SERVER: GLOBAL', 'ENCODE: RAW'].map(text => (
                                        <Typography key={text} sx={{ fontFamily: 'monospace', fontSize: '0.75rem', color: 'text.secondary' }}>{`> ${text}`}</Typography>
                                    ))}
                                </Stack>
                            </Box>
                        </Stack>
                    </Grid>

{/* bottom video rail */}
                    <Grid item xs={12} sx={{ mt: 4 }}>
                        <Typography variant="h6" sx={{ fontWeight: 900, mb: 2, letterSpacing: 1 }}>ARCHIVE_FILES</Typography>
                        <Box sx={{ 
                            display: 'flex', gap: 2, 
                            overflowX: 'auto', // Enables horizontal scrolling
                            pb: 2,
                            '&::-webkit-scrollbar': { height: '4px' }, // Scrollbar thickness
                            '&::-webkit-scrollbar-thumb': { bgcolor: 'primary.main' } // Scrollbar color
                        }}>
                            {videoUploads.map((video) => (
                                <Box key={video.id} sx={{ minWidth: 220, width: 220 }}>
                                    <ButtonBase component="a" href={getYTLink(video.id)} target="_blank" sx={{ 
                                        display: 'block', textAlign: 'left', width: '100%', p: 1, ...cleanBorderStyle
                                    }}>
                                        <Box sx={{ aspectRatio: '16/9', bgcolor: '#000', mb: 1, position: 'relative' }}>
                                            <Box component="img" src={getThumb(video.id)} sx={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }} />
                                        </Box>
                                        <Typography variant="caption" sx={{ fontWeight: 800, display: 'block', lineHeight: 1.2, height: '2.4em', overflow: 'hidden' }}>
                                            {video.title.toUpperCase()}
                                        </Typography>
                                        <Typography variant="caption" sx={{ color: 'primary.main', fontSize: '0.65rem', fontWeight: 900 }}>
                                            {video.views.toLocaleString()} REVS
                                        </Typography>
                                    </ButtonBase>
                                </Box>
                            ))}
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default DriveMedia;