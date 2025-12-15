import express from "express";
import createMovie  from "../controllers/movieController/createMovie.js";
import getMovies  from "../controllers/movieController/getMovie.js";
import getMovieById  from "../controllers/movieController/getMovieById.js";
import updateMovie  from "../controllers/movieController/updateMovie.js";
import deleteMovie  from "../controllers/movieController/deleteMovie.js";

const router=express.Router();

// create a movie record
router.post("/",createMovie);

// get all movie records
router.get("/",getMovies);

//get a single movie by its MongoDB ObjectId.
router.get("/:id",getMovieById);

//Update existing movie details — plot, genres, poster, or add new cast/crew members.
router.patch("/:id",updateMovie);

//delete a movie record by its ID.
router.delete("/:id",deleteMovie);

export default router;
