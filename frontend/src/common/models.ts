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
    createdAt: string;
    eventId: number;
};

export type Event = {
    id: number;
    title: string;
    location: string;
    eventDate: string;
    imageUrl: string;
    artistIds: number[];
    avgRating: number;
    ratings: Rating[];
};