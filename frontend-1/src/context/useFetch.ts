import { useEffect, useState } from "react";
import { fetchDataFromApi } from "../api";

interface FetchState {
    data: any;
    loading: boolean | string;
    error: string | null;
}

const useFetch = (url: string): FetchState => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean | string>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading("loading...");
        setData(null);
        setError(null);

        fetchDataFromApi(url)
            .then((res) => {
                setLoading(false);
                setData(res);
            })
            .catch(() => {
                setLoading(false);
                setError("Something went wrong!");
            });
    }, [url]);

    return { data, loading, error };
};

export default useFetch;