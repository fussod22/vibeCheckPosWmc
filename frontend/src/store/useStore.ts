import type {Artist, Rating} from "../common/models.ts";
import type {Event} from "../common/models.ts";
import {create} from "axios";
import apiClient from "../services/apiClient.ts";

type VibeCheckStore = {
    artists: Artist[],
    event: Event[],

    loading: boolean,
    error: string | null,

    fetchArtists: () => Promise<void>,
    fetchEvents: () => Promise<void>,
    fetchRating: (eventId: number) => Promise<void>,
    addRating: (eventId: number, stars: number, comment: string) => Promise<void>;

}

export const useVibeCheckStore = create<VibeCheckStore>((set, get) => ({
    artists: [],
    events:[],

    loading:false,
    error:null,

    fetchArtists: async () => {
        set({loading: true, error:null});

        try{
            const res = await apiClient.get<Artist[]>("/artists");
            set({artists : res.data});
        }catch(err:any){
            set({error: err.message});
        }finally{
            set({loading:false});
        }
    },

    fetchEvents : async() => {
        set({loading:true, error:null});

        try{
            const res = await apiClient.get<Event[]>("/events");
            const eventsAvg = res.data.map((event) => ({
                ...event,
                ratings: [],
                avgRating: 0,
            }));
            set({events: eventsAvg});
        }catch (err: any){
            set({error: err.message});
        }finally {
            set({loading:false});
        }
    },

    fetchRating: async(eventId: number) => {
        set({loading:true, error:null});
        try{
            const res = await apiClient.get<Rating[]>("/ratings");
            const ratings= res.data;

            const events = get().events.map(event =>
                event.id === eventId
                    ? {
                        ...event,
                        ratings,
                        avgRating: ratings.length
                            ? ratings.reduce((sum, r) => sum + r.stars, 0) / ratings.length
                            : 0
                    }
                    : event
            );

            set({events});


        }catch(err:any){
            set({error: err.message});
        }finally{
            set({loading:false})
        }
    }
});