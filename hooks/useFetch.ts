import { useEffect, useState } from 'react';

const init = {
  headers: {
    'X-RapidAPI-Key': '2QMXSehDLSmshDmRQcKUIAiQjIZAp1UvKUrjsnewgqSP6F5oBX',
    'X-RapidAPI-Host': 'free-nba.p.rapidapi.com',
  },
};

function useFetch(url: string, defaultValue = null) {
  const [result, setResult] = useState(defaultValue);

  useEffect(() => {
    fetch(url, init)
      .then((response) => response.json())
      .then((response) => setResult(response.data ?? response));
  }, [url]);
  return result;
}

export default useFetch;
