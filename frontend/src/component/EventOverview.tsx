import React, { useEffect } from 'react';
import EventCard from "./EventCard.tsx";
import { useVibeCheckStore } from "../store/useStore.ts";
import type { Event } from "../common/models";
import { Grid } from "@mui/material";
import OrderBy from "./OrderBy.tsx";
import {fetchEventsPagedApi} from "../services/apiServer.ts";


const EventOverview: React.FC = () => {

    const { pagedEvents, fetchEventsPaged, page, orderBy, fetchEvents } = useVibeCheckStore();

    useEffect(() => {
        fetchEvents();
        fetchEventsPaged();
    }, [page, orderBy]);
    console.log(pagedEvents);

    return (
        <>
            <OrderBy></OrderBy>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {pagedEvents.map((event: Event) => (
                    <Grid key={event.id} item xs={2} sm={4} md={4}>
                        <EventCard event={event} />
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

export default EventOverview;