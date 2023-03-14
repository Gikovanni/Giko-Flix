import axios from 'axios';
// Base da URL: https://api.themoviedb.org/3/
//URL da API: https://api.themoviedb.org/3/movie/now_playing?api_key=d1506eaeddfd2d5fdfcd8f8e1c51722b&language=pt-BR

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

export default api;