import React, { useState } from 'react';
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import type { Artist } from "../common/models";
import {
    Card,
    Button,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    CardActions
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useVibeCheckStore } from "../store/useStore.ts";
import EventList from "./EventList.tsx";

interface ArtistCardProps {
    artist: Artist;
}

const ArtistCard: React.FC<ArtistCardProps> = ({ artist }) => {
    const { fetchEventByArtistId, eventsFromArtist } = useVibeCheckStore();
    const [open, setOpen] = useState(false);

    const handleClickOpen = async () => {
        await fetchEventByArtistId(artist.id); // lädt events
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    return (
        <>
            <Card sx={{ maxWidth: 345, borderRadius: 3, boxShadow: 6, overflow: 'hidden' }}>
                <CardMedia
                    component="img"
                    height="140"
                    image={artist.imageUrl || ""}
                    sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ textAlign: 'center', bgcolor: '#1e1e1e', color: 'white' }}>
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                        {artist.firstName} {artist.lastName}
                    </Typography>
                    <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        {artist.description}
                    </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center', bgcolor: '#121212' }}>
                    <Button
                        size="medium"
                        variant="contained"
                        color="secondary"
                        onClick={handleClickOpen}
                        sx={{ borderRadius: 2, px: 3, py: 1 }}
                    >
                        Related Events
                    </Button>
                </CardActions>
            </Card>

            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
                maxWidth="sm"
                PaperProps={{
                    sx: {
                        bgcolor: '#1e1e1e',
                        color: 'white',
                        borderRadius: 3,
                    }
                }}
            >
                <DialogTitle sx={{ bgcolor: '#121212', color: 'white', fontWeight: 'bold' }}>
                    Events of {artist.firstName} {artist.lastName}
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: 'white',
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <DialogContent dividers sx={{ bgcolor: '#1e1e1e' }}>
                    <EventList events={eventsFromArtist} />
                </DialogContent>

                <DialogActions sx={{ bgcolor: '#121212' }}>
                    <Button onClick={handleClose} variant="contained" color="secondary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ArtistCard;