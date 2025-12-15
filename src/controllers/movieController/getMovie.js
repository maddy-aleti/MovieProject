import Movie from '../../models/MovieModel.js';

const getMovies = async(req, res) => {
    try{
        const movies = await Movie.find({});
        res.status(200).json(movies);
    }catch(error){
        res.status(500).json({message: error.message});
    }
};

export default getMovies;