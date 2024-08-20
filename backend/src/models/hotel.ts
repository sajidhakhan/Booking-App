import mongoose from "mongoose";

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

const hotelSchema = new mongoose.Schema<HotelType>({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, required: true },
    adultCount: { type: String, required: true },
    childCount: { type: String, required: true },
    facilities: [{ type: String, required: true }],
    pricePerNight: { type: String, required: true },
    starRating: { type: Number, required: true, min:1, max:5 },
    imageUrls: [{ type: String, required: true }],
    lastUpdated: { type: Date, required: true },

});

const Hotel = mongoose.model<HotelType>("Hotel", hotelSchema);
export default Hotel;