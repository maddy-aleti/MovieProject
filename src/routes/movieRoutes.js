import express from "express";
import createMovie from "../controllers/movieController/createMovie.js";
import getMovies from "../controllers/movieController/getMovie.js";
import getMovieById from "../controllers/movieController/getMovieById.js";
import updateMovie from "../controllers/movieController/updateMovie.js";
import deleteMovie from "../controllers/movieController/deleteMovie.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * USER ROUTES (Authenticated users)
 */

// get all movie records
router.get("/", protect, getMovies);

// get a single movie by its MongoDB ObjectId
router.get("/:id", protect, getMovieById);

/**
 * ADMIN ROUTES (Authenticated + Admin)
 */

// create a movie record
router.post("/", protect, adminOnly, createMovie);

// update existing movie details
router.patch("/:id", protect, adminOnly, updateMovie);

// delete a movie record by its ID
router.delete("/:id", protect, adminOnly, deleteMovie);

export default router;
