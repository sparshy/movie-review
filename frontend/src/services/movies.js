import axios from "axios";
//axios library for sending get, post etc requests

class MovieDataService{
    //contains fuc=nctions for api calls

    getAll(page=0){
        return axios.get(`http://localhost:6000/api/v1/movies?page=${page}`)
    }
    //returns all movies for a particular page

    getId(id){
        return axios.get(`http://localhost:6000/api/v1/movies/id/${id}`);
    }

    find(query, by='title', page=0){
        return axios.get(
            `http://localhost:6000/api/v1/movies?${by}=${query}&page=${page}`
        )
    }
    //

}