import { create } from "zustand";
import type { Artist, Event, Rating } from "../common/models";

import {
    fetchArtistByIdApi,
    fetchArtistsApi,
    fetchEventByArtistIdApi,
    fetchEventByIdApi,
    fetchEventsApi,
    fetchRatingsForEventApi,
    postRatingApi,
  fetchEventsPagedApi
} from "../services/apiServer";

type VibeCheckStore = {
    artists: Artist[];
    events: Event[];
    ratings: Rating[];
    eventsFromArtist: Event[];

    sortOrder: string,
    size: number,

    orderBy: string,
    setOrderBy: (order:string) => void,

    page: number,
    addPage: () => void,
    minusPage:() => void,

    pagedEvents: Event[];

    artist: Artist | null;
    event: Event | null;
    rating: Rating | null;

    loading: boolean;
    error: string | null;

    fetchArtists: () => Promise<void>;
    fetchEvents: () => Promise<void>;
    fetchRating: (eventId: number) => Promise<void>;
    addRating: (eventId: number, stars: number, comment: string) => Promise<void>;

    fetchArtistById: (artistId: number) => Promise<void>;
    fetchEventById: (eventId: number) => Promise<void>;
    fetchEventByArtistId: (artistId: number) => Promise<void>;
    fetchEventsPaged: (page:number, size:number, sortBy:String, sortOrder:String) => Promise<void>;


    setEvents: (events: Event[]) => void;
};

const calculateAvgRating = (ratings: Rating[]): number => {
    if (!ratings || ratings.length === 0) return 0;
    const sum = ratings.reduce((acc, r) => acc + r.stars, 0);
    return parseFloat((sum / ratings.length).toFixed(1));
};

export const useVibeCheckStore = create<VibeCheckStore>((set, get) => ({
    artists: [],
    events: [],
    ratings: [],
    eventsFromArtist: [],
    pagedEvents: [],

    sortBy: "asc",
    size: 3,
    page: 1,
    orderBy: "title",
    setOrderBy : (order) => {
        set({orderBy:order});
    },

    addPage: () =>
        set((state) => ({
            page: state.page + 1
        })),

    minusPage: () =>
        set((state) => ({
            page: Math.max(1, state.page - 1)
        })),

    artist: null,
    event: null,
    rating: null,

    loading: false,
    error: null,

    fetchArtists: async () => {
        set({ loading: true, error: null });
        try {
            const data = await fetchArtistsApi();
            set({ artists: data });
        } catch (err: any) {
            set({ error: err.message });
        } finally {
            set({ loading: false });
        }
    },

    fetchEvents: async () => {
        set({ loading: true, error: null });
        try {
            const data = await fetchEventsApi();
            const eventsWithRating = data.map(event => ({
                ...event,
                avgRating: calculateAvgRating(event.ratings)
            }));
            set({ events: eventsWithRating });
        } catch (err: any) {
            set({ error: err.message });
            console.error(err);
        } finally {
            set({ loading: false });
        }
    },

    fetchRating: async (eventId: number) => {
        set({ loading: true, error: null });
        try {
            const data = await fetchRatingsForEventApi(eventId);
            set({ ratings: data });
            const avgRating = calculateAvgRating(data);
            set({ event: (prev) => prev ? { ...prev, avgRating } : null });
        } catch (err: any) {
            set({ error: err.message });
        } finally {
            set({ loading: false });
        }
    },

    addRating: async (eventId: number, stars: number, comment: string) => {
        set({ loading: true, error: null });
        try {
            await postRatingApi(eventId, { stars, comment, eventId });
            const updatedRating = await fetchRatingsForEventApi(eventId);
            set({ ratings: updatedRating });
            const avgRating = calculateAvgRating(updatedRating);
            set({ event: (prev) => prev ? { ...prev, avgRating } : null });
        } catch (err: any) {
            set({ error: err.message });
        } finally {
            set({ loading: false });
        }
    },

    fetchEventById: async (eventId: number) => {
        set({ loading: true, error: null });
        try {
            const data = await fetchEventByIdApi(eventId);
            const ratings = await fetchRatingsForEventApi(data.id);
            const avgRating = calculateAvgRating(ratings);
            set({ event: { ...data, ratings, avgRating } });
        } catch (err: any) {
            set({ error: err.message });
        } finally {
            set({ loading: false });
        }
    },

    fetchArtistById: async (artistId: number) => {
        set({ loading: true, error: null });
        try {
            const data = await fetchArtistByIdApi(artistId);
            set({ artist: data });
        } catch (err: any) {
            set({ error: err.message });
        } finally {
            set({ loading: false });
        }
    },

    fetchEventByArtistId: async (artistId: number) => {
        set({ loading: true, error: null });
        try {
            const data = await fetchEventByArtistIdApi(artistId);
            const eventsWithRating = data.map(event => ({
                ...event,
                avgRating: calculateAvgRating(event.ratings)
            }));
            set({ eventsFromArtist: eventsWithRating });
        } catch (err: any) {
            set({ error: err.message });
        } finally {
            set({ loading: false });
        }
    },

    fetchEventsPaged: async() =>{
        const {page, size, orderBy, sortOrder} = get();
        set({loading:true})
        try{
            const data = await fetchEventsPagedApi(page, size, orderBy, sortOrder);
            const eventsWithRating = data.map(event => ({
                ...event,
                avgRating: calculateAvgRating(event.ratings)
            }));
            set({pagedEvents:eventsWithRating});
        }catch(err){
            set({error:err})
        }finally {
            set({loading:false})
        }
    },


}));