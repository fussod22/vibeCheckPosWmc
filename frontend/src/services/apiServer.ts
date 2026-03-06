import apiClient from './apiClient';
import type {Artist, Event, Rating} from "../common/models.ts";

export const fetchEventsApi = async (): Promise<Event[]> => {
    try {
        const res = await apiClient.get<Event[]>('/events');
        return res.data;
    } catch (error) {
        console.error('Fehler beim Laden der Events', error);
        throw error;
    }
};

export const fetchEventByIdApi = async (id: number): Promise<Event> => {
    try {
        const res = await apiClient.get<Event>(`/events/${id}`);
        return res.data;
    } catch (error) {
        console.error('Event nicht gefunden', error);
        throw error;
    }
};

export const fetchRatingsForEventApi = async (eventId: number): Promise<Rating[]> => {
    try {
        const res = await apiClient.get<Rating[]>(`/ratings/event/${eventId}`);
        return res.data;
    } catch (error) {
        console.error('Fehler beim Laden der Ratings', error);
        throw error;
    }
};

export const fetchArtistByIdApi = async (artistId: number): Promise<Artist> => {
    try{
        const res = await apiClient.get<Artist>(`/artists/${artistId}`)
        return res.data;
    }catch (error){
        console.log('Fehler beim Laden der Ratings', error);
        throw error;
    }
}

export const fetchArtistsApi = async () :Promise<Artist[]> => {
    try{
        const res = await apiClient.get("/artists");
        return res.data;
    }catch(error){
        console.log("Fehler beim laden");
        throw error;
    }
}

export const fetchEventByArtistIdApi = async(artistId:number):Promise<Event[]> => {
    try{
        const res = await apiClient.get(`/events/artist/${artistId}`);
        return res.data;
    }catch (error){
        console.log("Fehler beim Laden");
        throw error;
    }
}

type NewRatingDto = {
    stars: number;
    comment: string;
    eventId?: number;
};

export const postRatingApi = async (eventId: number, rating: NewRatingDto): Promise<Rating> => {
    try {
        const res = await apiClient.post(`/ratings/${eventId}`, rating);
        return res.data;
    } catch (error) {
        console.log("Fehler beim Posting", error);
        throw error;
    }
};

export const fetchEventsPagedApi = async(page:number, size:number, orderBy:string, sortBy:string) => {
      try{
          const res = await apiClient.get(`/events_pageable?page=${page}&size=${size}&orderBy=${orderBy}&sortBy=${sortBy}`);
          return res.data.content;
      }catch(error){
          console.log(error);
      }
}


