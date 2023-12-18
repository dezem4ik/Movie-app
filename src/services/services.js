export default class MovieService {
  apiKey = 'bc2251a80aabd67689db5ad196917dcc';
  apiUrl = 'https://api.themoviedb.org/3';

  async getResource(query, page) {
    const response = await fetch(`${this.apiUrl}/search/movie?api_key=${this.apiKey}&query=${query}&page=${page}`);

    if (!response.ok) {
      throw new Error(`Could not fetch ${this.apiUrl}`);
    }

    return response.json();
  }

  async createGuestSession() {
    const response = await fetch(`${this.apiUrl}/authentication/guest_session/new?api_key=${this.apiKey}`);

    if (!response.ok) {
      throw new Error(`Could not create guest session`);
    }

    const data = await response.json();

    return data;
  }

  async rateMovie(movieId, rating, guestSessionId) {
  
    if (!guestSessionId) {
      console.error('Invalid guestSessionId');
      throw new Error('Invalid guestSessionId');
    }
  
    const url = `${this.apiUrl}/movie/${movieId}/rating?api_key=${this.apiKey}&guest_session_id=${guestSessionId}`;
  
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        value: rating,
      }),
    };
  
    try {
      const response = await fetch(url, requestOptions);
  
      if (!response.ok) {
        throw new Error(`Could not rate movie`);
      }
  
      const data = await response.json();
  
      return data;
    } catch (error) {
      console.error('Error rating movie:', error);
      throw error;
    }
  }
  

  async getRated(guestSessionId, page) {
    const url = `${this.apiUrl}/guest_session/${guestSessionId}/rated/movies?api_key=${this.apiKey}&language=en-US&page=${page}&sort_by=created_at.asc`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Could not fetch rated movies`);
      }

      const data = await response.json();

      return data;
    } catch (error) {
      console.error('Error fetching rated movies:', error);
      throw error;
    }
  }  

  async fetchRatedMovies(guestSessionId, page) {
    return this.getRated(guestSessionId, page);
  }

  async fetchGenres() {
    try {
      const response = await fetch(`${this.apiUrl}/genre/movie/list?api_key=${this.apiKey}`);
  
      if (!response.ok) {
        throw new Error('Failed to fetch genres');
      }
  
      const data = await response.json();
      return data.genres;
    } catch (error) {
      throw new Error(`Error fetching genres: ${error.message}`);
    }
  }
  
  
}



