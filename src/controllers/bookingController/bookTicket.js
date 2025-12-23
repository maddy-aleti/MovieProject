import Booking from "../../models/BookingModel.js";
import Movie from "../../models/MovieModel.js";

const bookTicket = async (req, res) => {
  try {
    const { movieId, tickets } = req.body;

    if (!movieId || !tickets) {
      return res.status(400).json({ message: "Movie ID and tickets required" });
    }

    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    const booking = await Booking.create({
      user: req.user.id,   // from auth middleware
      movie: movieId,
      tickets,
    });

    res.status(201).json({
      message: "Tickets booked successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({ message: "Ticket booking failed" });
  }
};

export default bookTicket;
