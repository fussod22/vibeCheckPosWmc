import React from 'react';
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MusicNoteIcon from '@mui/icons-material/MusicNote';

const HomePage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ bgcolor: '#1e1e1e', boxShadow: 6, m: 2,
                borderRadius: 2 }} >
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MusicNoteIcon />
                    </IconButton>

                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, fontWeight: 'bold', color: 'white', letterSpacing: 1 }}
                    >
                        EventLookUp
                    </Typography>

                    <Button
                        color="secondary"
                        variant="contained"
                        sx={{ mr: 1, borderRadius: 2 }}
                        onClick={() => navigate("/artistPage")}
                    >
                        Artists
                    </Button>
                    <Button
                        color="secondary"
                        variant="contained"
                        sx={{ borderRadius: 2 }}
                        onClick={() => navigate("/eventPage")}
                    >
                        Events
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default HomePage;