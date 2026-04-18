import React, { useState, useEffect, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductDetail from './pages/productDetails';
import About from './pages/About';
import Footer from './components/Footer'; 
import ProductListings from './pages/productListings';
import DriveMedia from './pages/driveMedia'

function App() {
  const [isDark, setIsDark] = useState(false);

  // the amount of css done here is ridiculous. i copy and pasted most of it because it was just too much to look up in docs. 
// the root.setattribute and stuff is pretty easy and the root.style.setproperty is ridiculous to remember
// i also dont know mui very well so docs are king
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.setAttribute('data-theme', 'dark');
      root.style.setProperty('--bg-color', '#050505');
      root.style.setProperty('--text-main', '#ffffff');
    } else {
      root.setAttribute('data-theme', 'light');
      root.style.setProperty('--bg-color', '#f5f5f5');
      root.style.setProperty('--text-main', '#000000');
    }
  }, [isDark]);

  const theme = useMemo(() => createTheme({
    palette: {
      mode: isDark ? 'dark' : 'light',
      primary: { main: '#FF0000' }, // TRD Red
      background: {
        default: isDark ? '#050505' : '#f5f5f5',
        paper: isDark ? '#0a0a0a' : '#ffffff',
      },
      text: {
        primary: isDark ? '#ffffff' : '#000000',
      }
    },
    typography: { fontFamily: 'monospace' },
  }), [isDark]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> 
      <Router>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100vw' }}>
          
          {/* We pass the state and the toggle function down */}
          <Navbar isDark={isDark} setIsDark={setIsDark} />

          <Box component='main' sx={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/products" element={<ProductListings />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/media" element={<DriveMedia/>} />
            </Routes>
          </Box>
          <Footer />
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;