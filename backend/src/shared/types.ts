export type HotelType = {
    _id: string;
    userId: string;
    name: string;
    city: string;
    country: string;
    description: string;
    type: string;
    adultCount: string;
    childCount: string;
    facilities: string;
    pricePerNight: string;
    starRating: number;
    imageUrls: string[];
    lastUpdated: Date;
}