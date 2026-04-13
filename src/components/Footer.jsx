import React from 'react';
import { Box, Container, Typography, IconButton, Stack } from '@mui/material';
import { Instagram, YouTube, Email, Twitter } from '@mui/icons-material';

const Footer = () => {
    return (
        // this is all pretty self explanatory... i need to plug the urls in still
        <Box component="footer" sx={{ bgcolor: '#1a1a1a', color: '#fff', py: 6, mt: 'auto' }}>
            <Container maxWidth="lg">
                <Stack
                    direction={{ xs: 'column', md: 'row' }}
                    spacing={2}
                    sx={{
                        justifyContent: 'space-around',
                        alignItems: 'center'
                    }}
                >
                    <Box>
                        <Typography variant="h6" fontWeight="bold">
                            Frappe-industries
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.7 }}>
                            © {new Date().getFullYear()} All Rights Reserved. Frappe-corp.
                        </Typography>
                    </Box>

                    <Box textalign="center">
                        <Typography variant="subtitle2" sx={{ mb: 1, textTransform: 'uppercase', letterSpacing: 1 }}>
                            Contact & Socials
                        </Typography>
                        <Stack direction="row" spacing={1} justifycontent="center">
                            <IconButton color="inherit" href="https://www.instagram.com/frappec_ino_/" target="_blank">
                                <Instagram />
                            </IconButton>
                            <IconButton color="inherit" href="https://youtube.com" target="_blank">
                                <YouTube />
                            </IconButton>
                            <IconButton color="inherit" href="mailto:hello@hachirokumedia86@gmail.com">
                                <Email />
                            </IconButton>
                        </Stack>
                    </Box>
                </Stack>
            </Container>
        </Box>
    );
};

export default Footer;