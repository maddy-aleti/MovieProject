import Movie from '../../models/MovieModel.js';

const getMovieById = async (req, res) => {
    try{
        const movie = await Movie.findById(req.params.id);
        res.status(200).json(movie);
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

export default getMovieById;