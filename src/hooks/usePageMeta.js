import { useEffect } from 'react';

const SITE_URL = process.env.REACT_APP_BACKEND_URL || '';
const SITE_NAME = 'Body Look Care';
const DEFAULT_IMAGE = 'https://static.prod-images.emergentagent.com/jobs/00ef226f-f000-474f-89cd-17256bce900b/images/40e3db7d2b9db6f82f29d84cb9e5809ffb3a4abe56557f067d459897e7eb4395.png';

function setMeta(attr, key, content) {
  if (!content) return;
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setCanonical(url) {
  let el = document.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', url);
}

export default function usePageMeta({ title, description, image, type = 'website', url, product }) {
  useEffect(() => {
    if (title) document.title = title;

    const fullUrl = url ? `${SITE_URL}${url}` : window.location.href;
    const ogImage = image || DEFAULT_IMAGE;

    // Basic meta
    setMeta('name', 'description', description);
    setCanonical(fullUrl);

    // OpenGraph
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:image', ogImage);
    setMeta('property', 'og:url', fullUrl);
    setMeta('property', 'og:type', type);
    setMeta('property', 'og:site_name', SITE_NAME);
    setMeta('property', 'og:locale', 'fr_FR');

    // Twitter Card
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', ogImage);

    // Product-specific OG tags
    if (product) {
      setMeta('property', 'og:type', 'product');
      setMeta('property', 'product:price:amount', String(product.price));
      setMeta('property', 'product:price:currency', 'EUR');
      setMeta('property', 'product:availability', 'in stock');
      setMeta('property', 'product:brand', SITE_NAME);
    }

    return () => {
      // Cleanup product-specific tags on unmount
      if (product) {
        ['product:price:amount', 'product:price:currency', 'product:availability', 'product:brand'].forEach(key => {
          const el = document.querySelector(`meta[property="${key}"]`);
          if (el) el.remove();
        });
      }
    };
  }, [title, description, image, type, url, product]);
}
