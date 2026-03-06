import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Stack, Typography, Rating } from '@mui/material';
import { useVibeCheckStore } from "../store/useStore.ts";

interface EventFormsProps {
    eventId: number;
}

const EventForms: React.FC<EventFormsProps> = ({ eventId }) => {
    const { addRating, ratings } = useVibeCheckStore();

    const [comment, setComment] = useState("");
    const [stars, setStars] = useState(0);

    const handleSubmit = async () => {
        if (stars === 0) return;
        await addRating(eventId, stars, comment);
        setComment("");
        setStars(0);
        console.log(ratings);
    };

    return (
        <Box
            component="form"
            sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
            noValidate
            autoComplete="off"
        >
            <Typography component="legend" sx={{ mb: 1, color: 'white' }}>
                Rating
            </Typography>


            <Box
                sx={{
                    bgcolor: 'white',
                    p: 1.5,
                    borderRadius: 2,
                    display: 'inline-block',
                    mb: 2
                }}
            >
                <Rating
                    name="event-rating"
                    value={stars}
                    onChange={(event, newValue) => setStars(newValue ?? 0)}
                    sx={{ color: '#fbc02d' }} // goldene Sterne
                />
            </Box>

            <TextField
                id="comment-field"
                label="Comment"
                variant="standard"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                InputLabelProps={{
                    style: { color: 'white' }
                }}
                InputProps={{
                    style: { color: 'white' }
                }}
            />

            <Stack spacing={2} direction="row" sx={{ mt: 2 }}>
                <Button
                    variant="outlined"
                    onClick={handleSubmit}
                    disabled={stars === 0}
                    sx={{ color: 'white', borderColor: 'white' }}
                >
                    Submit
                </Button>
            </Stack>
        </Box>
    );
};

export default EventForms;