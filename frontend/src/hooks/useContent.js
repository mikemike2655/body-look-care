import { useState, useEffect } from 'react';

const API = process.env.REACT_APP_BACKEND_URL;
const cache = {};

export default function useContent(pageId) {
  const [data, setData] = useState(cache[pageId] || null);
  const [loading, setLoading] = useState(!cache[pageId]);

  useEffect(() => {
    if (cache[pageId]) { setData(cache[pageId]); setLoading(false); return; }
    fetch(`${API}/api/content/${pageId}`)
      .then(r => r.json())
      .then(json => {
        const d = json?.data || {};
        cache[pageId] = d;
        setData(d);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [pageId]);

  return { data, loading };
}
