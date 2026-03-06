import React, {useEffect} from 'react';

import {useVibeCheckStore} from "../store/useStore.ts";
import type {Artist} from "../common/models.ts";
import EventCard from "./EventCard.tsx";
import ArtistCard from "./ArtistCard.tsx";
import Box from '@mui/material/Box';
import { Grid, CircularProgress, Typography } from "@mui/material";


const ArtistOverview: React.FC = () => {

    const {artists, fetchArtists} = useVibeCheckStore();

    useEffect(() => {
        fetchArtists();
    }, []);



    console.log(artists);
    return (
        <>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>

                {artists.map((artist:Artist) => (
                    <Grid key={artist.id} size={{ xs: 2, sm: 4, md: 4 }}>
                        <ArtistCard artist={artist}></ArtistCard>
                    </Grid>
                ))}

            </Grid>
        </>
    );
};

export default ArtistOverview;