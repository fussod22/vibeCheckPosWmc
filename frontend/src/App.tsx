
import { Routes, Route } from 'react-router-dom';
import HomePage from "./component/HomePage.tsx";
import ArtistOverview from "./component/ArtistOverview.tsx";
import EventOverview from "./component/EventOverview.tsx";
import { Box } from '@mui/material';

function App() {
    return (
        <Box
            sx={{
                minHeight: '100vh',
                bgcolor: '#2c2c2c',
                color: 'white',
                p: 2,
            }}
        >
            <HomePage />
            <Routes>
                <Route path="/artistPage" element={<ArtistOverview />} />
                <Route path="/eventPage" element={<EventOverview />} />
            </Routes>
        </Box>
    )
}

export default App