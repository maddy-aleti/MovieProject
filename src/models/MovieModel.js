import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    // 🎬 BASIC MOVIE DETAILS
    title: {
      type: String,
      required: true,
      trim: true
    },

    plot: {
      type: String
    },

    releaseYear: {
      type: Number
    },

    // 🎭 GENRES (Array of Strings)
    genres: [
      {
        type: String,
        trim: true
      }
    ],

    // ⭐ CAST (Actors Only)
    cast: [
      {
        personId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Person",
          required: true
        },
        name: {
          type: String, // snapshot of actor name
          required: true
        },
        character: {
          type: String, // role they played
          required: true
        }
      }
    ],

    // 🎥 CREW (Director, Writer, Producer, Composer, etc.)
    crew: [
      {
        personId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Person",
          required: true
        },
        name: {
          type: String, // snapshot of crew name
          required: true
        },
        job: {
          type: String, // Director, Writer, Producer, etc.
          required: true
        }
      }
    ],
    // ⭐ MOVIE RATINGS
    ratings: {
      avg: {
        type: Number,
        default: 0
      },
      count: {
        type: Number,
        default: 0
      }
    }
  },
  { timestamps: true }
);

// UNIQUE INDEX: Prevent duplicate movies with same title + release year
movieSchema.index({ title: 1, releaseYear: 1 }, { unique: true });

export default mongoose.model("Movie", movieSchema);
