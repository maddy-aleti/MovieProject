import Movie from "../../models/MovieModel.js";

const updateMovie = async (req, res) => {
  try {
    const movieId = req.params.id;
    const updateData = req.body;
    const updatedMovie = await Movie.findByIdAndUpdate(
      movieId,
      { $set: updateData },
      { new: true }
    );
    res.status(200).json(updatedMovie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default updateMovie;
    