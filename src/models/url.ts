import mongoose, { Schema } from "mongoose";
import { IUrl } from "../types/url";

const shortUrlSchema: Schema = new Schema<IUrl>(
  {
    originalUrl: { type: String, required: true },
    shortUrl: { type: String, required: true },
    createdBy: { type: String, required: true },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
    visitCount: { type: Number, default: 0 },
  },
  { timestamps: true }
).index({ shortURL: 1 });

const shortUrlModel = mongoose.model(
  "ShortURL",
  shortUrlSchema,
  "shortenedURLs"
);
export { shortUrlModel };
