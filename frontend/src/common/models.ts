export type Artist = {
    id: number;
    firstName: string;
    lastName: string;
    description: string;
    imageUrl: string;
    eventIds: number[];
};

export type Rating = {
    id: number;
    stars: number;
    comment: string;
    createdAt: string; // ISO String vom Backend
    eventId: number;
};

export type Event = {
    id: number;
    title: string;
    location: string;
    eventDate: string; // ISO Date
    imageUrl: string;
    artistIds: number[];
    ratings: Rating[];
};