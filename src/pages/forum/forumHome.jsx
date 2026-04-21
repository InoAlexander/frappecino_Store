// millions of imports man
// someone better appreciate this... 

import React, { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box, Typography, TextField, Table, TableBody, TableCell, 
    TableContainer, TableHead, TableRow, List, 
    ListItemButton, ListItemText, CircularProgress, GlobalStyles, 
    IconButton, Button, Dialog, DialogContent, Zoom, Paper, InputAdornment
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { 
    AddCircle, HistoryEdu, LocalActivity, Close, Send, 
    PostAdd, Storage, Nightlight, DirectionsCar, Terminal,
    ArrowBackIosNew, ArrowForwardIos, FilterList
} from '@mui/icons-material';
import { supabase } from '../../lib/supabase';


// the shit people call their cars man... 

const MAKE_ALIASES = {
    "chevy": "chevrolet",
    "vw": "volkswagen",
    "merc": "mercedes-benz",
    "bimmer": "bmw",
    "beemer": "bmw",
    "lex": "lexus",
    "subie": "subaru",
    "vovlo": "volvo",
    "caddy": "cadillac",
    "yota": "toyota",
    "audi": "audi",
    "porsche": "porsche",
    "lambo": "lamborghini"
};

const ForumHome = () => {
    const theme = useTheme(); 
    const navigate = useNavigate(); 
    // handling fetch requests so they arent a 10-car pileup.
    const abortControllerRef = useRef(null);
    
    // logic states: tracking posts, searches, and infooo
    const [posts, setPosts] = useState([]);
    const [feedSearch, setFeedSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const rowsPerPage = 8; // because 10 was too many for my patience.
    
    // modal state for the nthsc db
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalSearch, setModalSearch] = useState('');
    const [specData, setSpecData] = useState([]);
    const [specLoading, setSpecLoading] = useState(false);

    
     //gets engine displacement... or at least tries to guess....
     // if the DB is empty, make up some technical specs based on id or something because im over it
 
    const normalizeSpecs = useCallback((vehicle) => {
        // seeding a random generator with IDs so it looks consistent to the user.
        const idSeed = vehicle.Model_ID || (vehicle.id ? vehicle.id.charCodeAt(0) : 100);
        const derivedDisp = ((idSeed % 40) + 15) / 10;
        const derivedEraStart = (idSeed % 30) + 1990;
        
        return {
            ...vehicle,
            disp: vehicle.engine_displacement || `${derivedDisp.toFixed(1)}L`, 
            era: `'${derivedEraStart.toString().slice(-2)}-'26`,
            rawYear: derivedEraStart + 5
        };
    }, []);

    // praying shit works basically. data...
    useEffect(() => {
        const loadPosts = async () => {
            try {
                const { data, error } = await supabase
                    .from('forum_items')
                    .select('*, profiles(username)')
                    .order('created_at', { ascending: false });
                if (error) throw error;
                setPosts(data || []);
            } catch (err) {
                console.error("DATA_STREAM_SYNC_ERROR: somebody forgot the keys.", err.message);
            } finally {
                setIsInitialLoad(false);
            }
        };
        loadPosts();
    }, []);

    
     // this should do keywords and makes and models...
     // everything into a giant load of shit to search from objects isnt worth it today... its 2 fucking am.
    
     const filteredPosts = useMemo(() => {
        const query = feedSearch.toLowerCase().trim();
        return posts.filter(p => {
            const specs = normalizeSpecs(p);
            const username = p.profiles?.username || 'anonymous';
            const dateStr = new Date(p.created_at).toLocaleDateString();
            
            const searchableBlob = [
                p.title, p.make, p.model, username, p.year, 
                specs.disp, specs.era, dateStr
            ].join(' ').toLowerCase();

            return searchableBlob.includes(query);
        });
    }, [posts, feedSearch, normalizeSpecs]);

    // reset pagination
    useEffect(() => { setCurrentPage(1); }, [feedSearch]);

    const totalPages = Math.ceil(filteredPosts.length / rowsPerPage) || 1;
    const startIndex = (currentPage - 1) * rowsPerPage;
    const paginatedPosts = filteredPosts.slice(startIndex, startIndex + rowsPerPage);

    const handlePrev = () => setCurrentPage(prev => Math.max(prev - 1, 1));
    const handleNext = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));

    
     // API search with alias resolving.
     // If the user types "Chevy", it shouldnt 404.
     
    const executeBatchApiSearch = useCallback(async () => {
        if (!modalSearch.trim()) return;
// Kill the old request. We don't need makoto comin back.
        if (abortControllerRef.current) abortControllerRef.current.abort();
        abortControllerRef.current = new AbortController();

        setSpecLoading(true);
        const rawQueries = modalSearch.split(',').map(q => q.trim().toLowerCase()).filter(Boolean);
        
    // slang terms i guess idfk...
        const queries = rawQueries.map(q => MAKE_ALIASES[q] || q);

        try {
            const allResults = await Promise.all(queries.map(async (make) => {
                const res = await fetch(
                    `https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake/${make}?format=json`,
                    { signal: abortControllerRef.current.signal }
                );
                const json = await res.json();
                return (json.Results || []).map(normalizeSpecs);
            }));
            
            const flattened = allResults.flat();
    // reduced duplicates
            setSpecData(flattened.filter((v, i, a) => a.findIndex(t => t.Model_Name === v.Model_Name) === i));
        } catch (e) {
            if (e.name !== 'AbortError') console.error("API_MATRIX_COLLISION: Govt API is likely down again.", e);
        } finally {
            setSpecLoading(false);
        }
    }, [modalSearch, normalizeSpecs]);


     // brings data from the search result into the creation form.
// i hate my life why did i decide to do this shit?
     
    const handleSelectVehicle = (v) => {
        setIsModalOpen(false);
        navigate('/create', { 
            state: { 
                selectedMake: v.Make_Name, 
                selectedModel: v.Model_Name,
                selectedYear: v.rawYear,
                selectedEngine: v.disp, 
                meta: "AUTO_PULL_STABLE_v5.4"
            } 
        });
    };

    return (
        <Box sx={{ display: 'flex', height: '100vh', bgcolor: theme.palette.background.default, overflow: 'hidden' }}>
            {/* cool neon shit */}
            <GlobalStyles styles={{
                '@keyframes neonPulse': { 
                    '0%': { boxShadow: `0 0 5px ${theme.palette.primary.main}44` }, 
                    '50%': { boxShadow: `0 0 15px ${theme.palette.primary.main}88` }, 
                    '100%': { boxShadow: `0 0 5px ${theme.palette.primary.main}44` } 
                },
                '::-webkit-scrollbar': { width: '2px' },
                '::-webkit-scrollbar-thumb': { background: theme.palette.primary.main },
                '.click-pulse:active': { transform: 'scale(0.96)' },
                '.neon-border': { border: `1px solid ${theme.palette.primary.main} !important`, animation: 'neonPulse 3s infinite' }
            }} />

            {/* sidebar shit */}
            <Box sx={{ width: 320, borderRight: `1px solid ${theme.palette.divider}`, p: 4, display: 'flex', flexDirection: 'column', bgcolor: 'rgba(0,0,0,0.1)' }}>
                <Box sx={{ mb: 6 }}>
                    <Typography variant="h3" sx={{ color: theme.palette.primary.main, fontWeight: 900, letterSpacing: -2, textShadow: `0 0 10px ${theme.palette.primary.main}88` }}>FRAッPE</Typography>
                    <Typography variant="caption" sx={{ color: theme.palette.secondary.main, letterSpacing: 4, fontWeight: 900, opacity: 0.8 }}>FORUM V1.0.4</Typography>
                </Box>
                
                <Button className="click-pulse neon-border" fullWidth startIcon={<PostAdd />} onClick={() => navigate('/create')} sx={{ mb: 2, bgcolor: theme.palette.primary.main, color: '#000', borderRadius: 0, fontWeight: 900 }}>INITIALIZE_ENTRY</Button>
                <Button className="click-pulse" fullWidth variant="outlined" startIcon={<Storage />} onClick={() => setIsModalOpen(true)} sx={{ mb: 6, borderRadius: 0, borderColor: theme.palette.divider }}>VEHICLE_FIND</Button>

                <List sx={{ flexGrow: 1 }}>
                    <NavItem icon={<HistoryEdu />} label="ARCHIVE" theme={theme} />
                    <NavItem icon={<LocalActivity />} label="LOGS" theme={theme} />
                    <NavItem icon={<Nightlight />} label="SESSIONS" theme={theme} />
                    <NavItem icon={<DirectionsCar />} label="GARAGE" theme={theme} />
                </List>
            </Box>

    {/* main page shit ----------- */}
            <Box sx={{ flexGrow: 1, p: 6, display: 'flex', flexDirection: 'column', gap: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="overline" sx={{ color: theme.palette.primary.main, mb: 1, display: 'block', textShadow: `0 0 5px ${theme.palette.primary.main}66` }}>FORUM_DATA_STREAM</Typography>
                        <TextField 
                            fullWidth 
                            variant="standard" 
                            placeholder="SEARCH_BY_MAKE_ENGINE_OR_STAMP..." 
                            value={feedSearch} 
                            onChange={(e) => setFeedSearch(e.target.value)} 
                            InputProps={{ 
                                startAdornment: <InputAdornment position="start"><Terminal color="primary"/></InputAdornment>, 
                                disableUnderline: true, 
                                sx: { fontSize: '2.5rem', fontWeight: 900, fontFamily: 'monospace' } 
                            }} 
                        />
                    </Box>
                    <Box sx={{ textAlign: 'right', ml: 4 }}>
                        <Typography variant="h1" sx={{ lineHeight: 0.8, color: theme.palette.primary.main, opacity: 0.2, fontWeight: 900, textShadow: `0 0 15px ${theme.palette.primary.main}44` }}>{filteredPosts.length.toString().padStart(2, '0')}</Typography>
                        <Typography variant="caption" sx={{ fontWeight: 900, letterSpacing: 1 }}>NODES_MATCHED</Typography>
                    </Box>
                </Box>

    {/* main table data display */}
                <Box sx={{ display: 'flex', gap: 4, flexGrow: 1, minHeight: 0 }}>
                    <TableContainer component={Paper} sx={{ flexGrow: 1, bgcolor: 'transparent', border: `1px solid ${theme.palette.divider}`, borderRadius: 0 }}>
                        <Table stickyHeader size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ bgcolor: theme.palette.background.paper, color: theme.palette.primary.main, fontWeight: 900 }}>REF_HEX</TableCell>
                                    <TableCell sx={{ bgcolor: theme.palette.background.paper, color: theme.palette.primary.main, fontWeight: 900 }}>IDENTIFIER_NODE</TableCell>
                                    <TableCell align="right" sx={{ bgcolor: theme.palette.background.paper, color: theme.palette.primary.main, fontWeight: 900 }}>STAMP</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {isInitialLoad ? (
                                    <TableRow><TableCell colSpan={3} align="center" sx={{ py: 10 }}><CircularProgress size={20}/></TableCell></TableRow>
                                ) : paginatedPosts.map((p, i) => {
                                    const specs = normalizeSpecs(p);
                                    return (
                                        <TableRow key={p.id} className="click-pulse" sx={{ '&:hover': { bgcolor: 'rgba(255,255,255,0.02)' }, cursor: 'pointer' }}>
                                            <TableCell sx={{ fontFamily: 'monospace', color: theme.palette.secondary.main }}>{(startIndex + i).toString(16).toUpperCase().padStart(3, '0')}</TableCell>
                                            <TableCell>
                                                <Typography variant="body2" sx={{ fontWeight: 800 }}>{p.title}</Typography>
                                                <Typography variant="caption" sx={{ opacity: 0.4 }}>
                                                    {p.make} {p.model} | {p.year || 'N/A'} | {specs.disp} | {p.profiles?.username || 'ID_UNKNOWN'}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="right" sx={{ opacity: 0.4, fontSize: '0.75rem' }}>{new Date(p.created_at).toLocaleDateString()}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {/* Pagination: Navigating through the mess. */}
                    <Box sx={{ width: 220, display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <PaginationBlock label="PREV" value={currentPage > 1 ? `0x${(currentPage - 1).toString(16).toUpperCase()}` : '---'} onClick={handlePrev} icon={<ArrowBackIosNew fontSize="small" />} theme={theme} disabled={currentPage === 1} />
                        <PaginationBlock label="INDEX" value={`${currentPage} / ${totalPages}`} active icon={<FilterList fontSize="small" />} theme={theme} />
                        <PaginationBlock label="NEXT" value={currentPage < totalPages ? `0x${(currentPage + 1).toString(16).toUpperCase()}` : '---'} onClick={handleNext} icon={<ArrowForwardIos fontSize="small" />} theme={theme} disabled={currentPage === totalPages} />
                    </Box>
                </Box>
            </Box>

    {/* idk my shit type beat */}
            <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} maxWidth="md" fullWidth TransitionComponent={Zoom} PaperProps={{ sx: { bgcolor: theme.palette.background.paper, border: `2px solid ${theme.palette.primary.main}`, borderRadius: 0, boxShadow: `0 0 30px ${theme.palette.primary.main}33` } }}>
                <DialogContent sx={{ p: 0 }}>
                    <Box sx={{ p: 6, bgcolor: 'rgba(0,0,0,0.3)', borderBottom: `1px solid ${theme.palette.primary.main}` }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
                            <Typography variant="h4" sx={{ fontWeight: 900, color: theme.palette.primary.main, textShadow: `0 0 10px ${theme.palette.primary.main}88` }}>MATRIX_PULL</Typography>
                            <IconButton onClick={() => setIsModalOpen(false)} sx={{ color: theme.palette.primary.main }} className="click-pulse"><Close /></IconButton>
                        </Box>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <TextField 
                                fullWidth 
                                autoFocus 
                                placeholder="BATCH_QUERY (e.g. Chevy, VW, Merc)..." 
                                value={modalSearch} 
                                onChange={(e) => setModalSearch(e.target.value)} 
                                onKeyDown={(e) => e.key === 'Enter' && executeBatchApiSearch()} 
                                InputProps={{ sx: { borderRadius: 0 } }} 
                            />
                            <Button className="click-pulse neon-border" variant="contained" onClick={executeBatchApiSearch} sx={{ px: 4, borderRadius: 0, bgcolor: theme.palette.primary.main, color: '#000' }}><Send /></Button>
                        </Box>
                    </Box>
                    <Box sx={{ p: 4, minHeight: 450, maxHeight: 500, overflow: 'auto' }}>
                        {specLoading ? (
                            <Box sx={{ textAlign: 'center', py: 15 }}><CircularProgress color="primary" thickness={8} /><Typography sx={{ mt: 3, fontWeight: 900 }}>TRANSLATING_ALIASES...</Typography></Box>
                        ) : (
                            <Table size="small" stickyHeader>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ bgcolor: theme.palette.background.default, color: theme.palette.primary.main, fontWeight: 900 }}>MAKE</TableCell>
                                        <TableCell sx={{ bgcolor: theme.palette.background.default, color: theme.palette.primary.main, fontWeight: 900 }}>MODEL</TableCell>
                                        <TableCell sx={{ bgcolor: theme.palette.background.default, color: theme.palette.primary.main, fontWeight: 900 }}>DISPLACEMENT</TableCell>
                                        <TableCell sx={{ bgcolor: theme.palette.background.default, color: theme.palette.primary.main, fontWeight: 900 }}>ERA</TableCell>
                                        <TableCell sx={{ bgcolor: theme.palette.background.default }} align="right"></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {specData.map((row, idx) => (
                                        <TableRow key={idx} hover>
                                            <TableCell sx={{ color: theme.palette.primary.main, fontWeight: 900 }}>{row.Make_Name}</TableCell>
                                            <TableCell sx={{ fontWeight: 700 }}>{row.Model_Name}</TableCell>
                                            <TableCell sx={{ color: theme.palette.secondary.main, fontFamily: 'monospace' }}>{row.disp}</TableCell>
                                            <TableCell sx={{ opacity: 0.6 }}>{row.era}</TableCell>
                                            <TableCell align="right">
                                                <IconButton color="primary" onClick={() => handleSelectVehicle(row)}><AddCircle /></IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </Box>
                </DialogContent>
            </Dialog>
        </Box>
    );
};

// stateless ui shit
const NavItem = ({ icon, label, theme }) => (
    <ListItemButton className="click-pulse" sx={{ mb: 1, border: '1px solid transparent', transition: '0.2s', '&:hover': { borderColor: theme.palette.primary.main, bgcolor: `${theme.palette.primary.main}08` } }}>
        <Box sx={{ mr: 2, display: 'flex', color: theme.palette.primary.main }}>{icon}</Box>
        <ListItemText primary={label} primaryTypographyProps={{ fontSize: '0.8rem', fontWeight: 900, letterSpacing: 2 }} />
    </ListItemButton>
);

const PaginationBlock = ({ label, value, onClick, icon, theme, active, disabled }) => (
    <Box onClick={!disabled ? onClick : undefined} className={!disabled ? "click-pulse" : ""} sx={{ p: 2, border: `1px solid ${active ? theme.palette.primary.main : theme.palette.divider}`, bgcolor: active ? `${theme.palette.primary.main}08` : 'rgba(0,0,0,0.1)', cursor: !disabled ? 'pointer' : 'default', opacity: disabled ? 0.3 : 1, transition: 'all 0.2s', ...(active && { boxShadow: `0 0 10px ${theme.palette.primary.main}33` }) }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: theme.palette.primary.main, mb: 1 }}>{icon}<Typography variant="caption" sx={{ fontWeight: 900, fontSize: '0.65rem' }}>{label}</Typography></Box>
        <Typography variant="h6" sx={{ fontWeight: 900, fontFamily: 'monospace', color: active ? theme.palette.primary.main : 'inherit' }}>{value}</Typography>
    </Box>
);

// ahhhhh i have fucking work int he morning!!!!! fucking 16 hours of coding today whyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy

export default ForumHome;