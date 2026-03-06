import React from 'react';
import EventItem from "./EventItem.tsx";
import { List, Typography } from "@mui/material";
import type { Event } from "../common/models.ts";

interface EventListProps {
    events: Event[];
}

const EventList: React.FC<EventListProps> = ({ events }) => {
    if (!events || events.length === 0) {
        return (
            <Typography variant="body2" sx={{ textAlign: 'center', mt: 1, color: 'white' }}>
                No events found.
            </Typography>
        );
    }

    return (
        <List>
            {events.map((event) => (
                <EventItem key={event.id} event={event} />
            ))}
        </List>
    );
};

export default EventList;