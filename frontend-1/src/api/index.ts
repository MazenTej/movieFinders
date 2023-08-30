import axios , { AxiosResponse }from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const TMDB_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzODcxZjhkZmJkZjM2NzQ4NmZhNDQ0ODdjNmNhNGNhZCIsInN1YiI6IjY0YzgxMzRlMDk3YzQ5MDEzOWI0MmQ1YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nThSICxkdrlfcA11WfLJ6ZU5IpRsaYuK2Co-eghNeLs';
const headers = {
    Authorization: "bearer " + TMDB_TOKEN,
};
type FetchParams = {
    [key: string]: any;
};

export const fetchDataFromApi = async (url: string, params?: FetchParams): Promise<any> => {
    try {
        const response: AxiosResponse = await axios.get(BASE_URL + url, {
            headers,
            params,
        });
        return response.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export const API_URL = "http://localhost:4000";