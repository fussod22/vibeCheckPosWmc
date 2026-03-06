import React from 'react';
import { ListItem, ListItemText, Typography } from "@mui/material";
import Rating from "@mui/material/Rating";
import type { Event } from "../common/models.ts";

interface EventItemProps {
    event: Event;
}

const EventItem: React.FC<EventItemProps> = ({ event }) => (
    <ListItem
        alignItems="flex-start"
        sx={{
            bgcolor: '#2a2a2a',
            borderRadius: 2,
            mb: 1,
            '&:hover': { bgcolor: '#333333' },
        }}
    >
        <ListItemText
            primary={
                <Rating
                    value={event.avgRating ?? 0}
                    precision={0.5}
                    readOnly
                    size="small"
                    sx={{ color: '#fbc02d' }}
                />
            }
            secondary={
                <>
                    <Typography component="span" variant="body2" sx={{ fontWeight: 'bold', color: 'white' }}>
                        {event.title}
                    </Typography>
                    <Typography component="span" variant="body2" sx={{ ml: 1, color: 'gray' }}>
                        {" — " + new Date(event.eventDate).toLocaleString()}
                    </Typography>
                </>
            }
        />
    </ListItem>
);

export default EventItem;