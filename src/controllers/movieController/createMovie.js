import Movie from "../../models/MovieModel.js";

const createMovie = async(req,res)=>{
    try{
        const {
            title,
            plot,
            releaseYear,
            genres,
            cast,
            crew,    
        }=req.body;
        // VALIDATION
        if(!title || !releaseYear || !genres || !cast || !crew || !plot){
            return res.status(400).json({ message: "All fields are required" });
        }
        //  DUPLICATE CHECK
        const existingMovie = await Movie.findOne({ title, releaseYear });
        if (existingMovie) {
            return res.status(409).json({ message: "Movie already exists"});
        }
        // save using .save()
        const newMovie = new Movie({
            title,
            plot,
            releaseYear,
            genres,
            cast,
            crew,
        });
        await newMovie.save();
        res.status(201).json(newMovie);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export default createMovie;