import express from 'express';

export function createApp() {
  const app = express();
  app.use(express.json());

  const movies = [
    { id: 1, title: 'Inception', genre: 'Sci-Fi', year: 2010 },
    { id: 2, title: 'The Dark Knight', genre: 'Action', year: 2008 },
    { id: 3, title: 'Parasite', genre: 'Thriller', year: 2019 },
    { id: 4, title: 'Mad Max: Fury Road', genre: 'Action', year: 2015 },
  ];

  app.get('/movies', (req, res) => {
    const { genre } = req.query;

    // FIX: Apply the filter if the 'genre' query parameter exists.
    if (genre) {
      const filteredMovies = movies.filter(
        movie => movie.genre.toLowerCase() === genre.toLowerCase()
      );
      return res.json(filteredMovies);
    }

    res.json(movies);
  });

  return app;
}
