import React, { useState } from 'react';
import type { Event } from "../common/models";
import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Button,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    List,
    ListItem,
    Divider,
    ListItemText,
    Box
} from '@mui/material';
import Rating from '@mui/material/Rating';
import CloseIcon from '@mui/icons-material/Close';
import { useVibeCheckStore } from "../store/useStore.ts";
import EventForms from "./EventForms.tsx";
import DialogListRating from "./DialogListRating.tsx";

interface EventCardProps {
    event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
    const { fetchRating, ratings } = useVibeCheckStore();
    const [open, setOpen] = useState(false);

    const handleClickOpen = async () => {
        await fetchRating(event.id);
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    return (
        <>
            <Card sx={{ maxWidth: 345, borderRadius: 3, boxShadow: 6, overflow: 'hidden' }}>
                <CardMedia
                    component="img"
                    height="180"
                    image={event.imageUrl}
                    sx={{ objectFit: 'cover', filter: 'brightness(0.85)' }}
                />
                <CardContent sx={{ textAlign: 'center', bgcolor: '#1e1e1e', color: 'white' }}>
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                        {event.title}
                    </Typography>
                    <Rating
                        value={event.avgRating ?? 0}
                        precision={0.5}
                        readOnly
                        size="small"
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            {event.location || 'Unknown'}
                        </Typography>
                    </Box>



                    <Typography variant="body2" color="text.secondary" sx={{color:'white'}}>
                        {new Date(event.eventDate).toLocaleDateString()}
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
                        Rating
                    </Button>
                </CardActions>
            </Card>


            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm" PaperProps={{ sx: { bgcolor: '#1e1e1e', color: 'white', borderRadius: 3 } }}>
                <DialogTitle sx={{ bgcolor: '#121212', color: 'white', fontWeight: 'bold' }}>
                    Ratings of {event.title}
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{ position: 'absolute', right: 8, top: 8, color: 'white' }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <DialogContent dividers sx={{ bgcolor: '#1e1e1e' }}>
                    <DialogListRating ratings={ratings}></DialogListRating>
                    <EventForms eventId={event.id}></EventForms>
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

export default EventCard;