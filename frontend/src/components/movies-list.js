import React, {useState, useEffect } from 'react'
import MovieDataService from "../services/movies"
import { Link } from "react-router-dom"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

function MoviesList(props) {

    const [movies, setMovies] = useState([]);
    const [searchTitle, setSearchTitle] = useState("");
    const [searchRating, setSearchRating] = useState("");
    const [ratings, setRatings] = useState(["All Ratings"]);

    useEffect(() => {
        retrieveMovies();
        retrieveRatings();
    }, []);
    //useEffect hook called after component renders, empty array telling it to run once
    
    function retrieveMovies() {
        MovieDataService.getAll() //get all returns a promise with movies from database
            .then(response => {
                console.log(response.data);
                setMovies(response.data.movies); // assign to movies state
            })
            .catch(e => {
                console.log(e);
            });
    }

    function retrieveRatings() {
        MovieDataService.getRatings()
            .then(response => {
                console.log(response.data);
                setRatings(["All Ratings"].concat(response.data));
            })
            .catch(e => {
                console.log(e);
            });
    }

    function onChangeSearchTitle(e) {
        const searchTitle = e.target.value;
        setSearchTitle(searchTitle);
    }
    //will be called whenever a user types into search field, will take entered value and set it to component state

    function onChangeSearchRating(e) {
        const searchRating = e.target.value;
        setSearchRating(searchRating);
    }



    function find(query, by) {
        MovieDataService.find(query, by)
            .then(response => {
                console.log(response.data);
                setMovies(response.data.movies);
            })
            .catch(e => {
                console.log(e);
            });
    }
    // find function sypported by below two methods
    function findByTitle() {
        find(searchTitle, "title");
    }
    function findByRating() {
        if (searchRating === "All Ratings") {
            retrieveMovies();
        }
        else {
            find(searchRating, "rated");
        }
    }

    return (
        <div className="App">
            <Container>
                <Form>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Control
                                    type="text"
                                    placeholder="Search by title"
                                    value={searchTitle}
                                    onChange={onChangeSearchTitle} />
                            </Form.Group>
                            <Button
                                variant="primary"
                                type="button"
                                onClick={findByTitle}
                            >
                                Search
                            </Button>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Control as="select" onChange={onChangeSearchRating}>
                                    {ratings.map(rating => {
                                        return (
                                            <option value={rating}>{rating}</option>
                                        );
                                    })}
                                </Form.Control>
                            </Form.Group>
                            <Button
                                variant="primary"
                                type="button"
                                onClick={findByRating}
                            >
                                Search
                            </Button>
                        </Col>
                    </Row>
                </Form>

                <Row>
                    {movies.map((movie) => {
                        return (
                            <Col>
                                <Card style={{ width: '18rem' }}>
                                    <Card.Img src={movie.poster + "/100px180"} />
                                    <Card.Body>
                                        <Card.Title>{movie.title}</Card.Title>
                                        <Card.Text>
                                            Rating: {movie.rated}
                                        </Card.Text>
                                        <Card.Text>
                                            {movie.plot}
                                        </Card.Text>
                                        <Link to={"/movies/" + movie._id}>View Reviews</Link>
                                    </Card.Body>
                                </Card>
                            </Col>
                        );
                    })}
                </Row>

            </Container>
        </div>
    );
}

export default MoviesList;

