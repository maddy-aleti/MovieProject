import Movie from "../../models/MovieModel.js";

const getMovies = async (req, res) => {
  try {
    const { genre, search } = req.query;

    let filter = {};

    // single-genre filter
    if (genre) {
      filter.genres = genre;
    }

    // title search (case-insensitive, partial match)
    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }

    const movies = await Movie.find(filter);

    res.status(200).json({
      count: movies.length,
      movies,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch movies" });
  }
};

export default getMovies;
