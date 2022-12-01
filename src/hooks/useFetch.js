import { useEffect, useState } from 'react';

export default function useFetch(url, endpoint) {
  const [fetchLoading, setFetchLoading] = useState(true);
  const [fetchData, setFetchData] = useState([]);
  const [memeryData, setMemeryData] = useState([]);
  useEffect(() => {
    const fetchResponse = async () => {
      if (endpoint) {
        const request = await fetch(`${url}${endpoint}`);
        const response = await request.json();
        setFetchLoading(false);
        setFetchData(response);
      } else {
        const request = await fetch(url);
        const response = await request.json();
        setFetchLoading(false);
        setFetchData(response);
      }
    };
    fetchResponse();
  }, [url, endpoint]);

  return { fetchLoading, fetchData, setFetchData, memeryData, setMemeryData };
}
