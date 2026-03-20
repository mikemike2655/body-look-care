import { useEffect } from 'react';

const SITE_URL = process.env.REACT_APP_BACKEND_URL || '';

function injectJsonLd(id, data) {
  let el = document.getElementById(id);
  if (!el) {
    el = document.createElement('script');
    el.id = id;
    el.type = 'application/ld+json';
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

function removeJsonLd(id) {
  const el = document.getElementById(id);
  if (el) el.remove();
}

// Organization schema (global)
export function useOrganizationSchema() {
  useEffect(() => {
    injectJsonLd('ld-organization', {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'Body Look Care',
      url: SITE_URL,
      logo: `${SITE_URL}/logo.svg`,
      description: 'Drainage lymphatique et soins anti-cellulite naturels. Fabriqué en France, 100% naturel & vegan.',
      email: 'contact@bodylookcare.com',
      telephone: '+33123456789',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Metz',
        addressRegion: 'Grand Est',
        postalCode: '57000',
        addressCountry: 'FR'
      },
      areaServed: [
        { '@type': 'Country', name: 'France' },
        { '@type': 'Country', name: 'Luxembourg' },
        { '@type': 'Country', name: 'Belgique' }
      ],
      sameAs: [
        'https://www.instagram.com/bodylookcare',
        'https://www.instagram.com/bodylookcare.la.gamme',
        'https://www.facebook.com/bodylookcare'
      ],
      foundingDate: '2020',
      founder: { '@type': 'Person', name: 'Marie-Julie' },
      slogan: 'Retrouvez des jambes légères naturellement'
    });

    injectJsonLd('ld-website', {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'Body Look Care',
      description: 'Drainage lymphatique et soins anti-cellulite naturels.',
      publisher: { '@id': `${SITE_URL}/#organization` },
      potentialAction: {
        '@type': 'SearchAction',
        target: { '@type': 'EntryPoint', urlTemplate: `${SITE_URL}/recherche?q={search_term_string}` },
        'query-input': 'required name=search_term_string'
      },
      inLanguage: 'fr-FR'
    });

    return () => {
      removeJsonLd('ld-organization');
      removeJsonLd('ld-website');
    };
  }, []);
}

// Product schema
export function useProductSchema(product) {
  useEffect(() => {
    if (!product) return;

    injectJsonLd('ld-product', {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name,
      description: product.shortDescription || product.tagline,
      image: product.images,
      sku: product.sku || product.id,
      brand: { '@type': 'Brand', name: 'Body Look Care' },
      url: `${SITE_URL}/produit/${product.id}`,
      offers: {
        '@type': 'Offer',
        url: `${SITE_URL}/produit/${product.id}`,
        priceCurrency: 'EUR',
        price: product.price.toFixed(2),
        priceValidUntil: '2027-12-31',
        availability: 'https://schema.org/InStock',
        itemCondition: 'https://schema.org/NewCondition',
        seller: { '@type': 'Organization', name: 'Body Look Care' },
        shippingDetails: {
          '@type': 'OfferShippingDetails',
          shippingRate: { '@type': 'MonetaryAmount', value: '0', currency: 'EUR' },
          shippingDestination: { '@type': 'DefinedRegion', addressCountry: ['FR', 'BE', 'LU'] },
          deliveryTime: {
            '@type': 'ShippingDeliveryTime',
            handlingTime: { '@type': 'QuantitativeValue', minValue: 1, maxValue: 2, unitCode: 'DAY' },
            transitTime: { '@type': 'QuantitativeValue', minValue: 2, maxValue: 4, unitCode: 'DAY' }
          }
        },
        hasMerchantReturnPolicy: {
          '@type': 'MerchantReturnPolicy',
          applicableCountry: 'FR',
          returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
          merchantReturnDays: 30,
          returnMethod: 'https://schema.org/ReturnByMail',
          returnFees: 'https://schema.org/FreeReturn'
        }
      },
      ...(product.rating && {
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: String(product.rating),
          reviewCount: String(product.reviewCount),
          bestRating: '5',
          worstRating: '1'
        }
      }),
      ...(product.reviews && product.reviews.length > 0 && {
        review: product.reviews.map(r => ({
          '@type': 'Review',
          author: { '@type': 'Person', name: r.name },
          reviewRating: { '@type': 'Rating', ratingValue: String(r.rating), bestRating: '5' },
          reviewBody: r.text
        }))
      })
    });

    injectJsonLd('ld-breadcrumb', {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Boutique', item: `${SITE_URL}/boutique` },
        { '@type': 'ListItem', position: 3, name: product.name, item: `${SITE_URL}/produit/${product.id}` }
      ]
    });

    return () => {
      removeJsonLd('ld-product');
      removeJsonLd('ld-breadcrumb');
    };
  }, [product]);
}

// FAQ schema
export function useFAQSchema(faqs) {
  useEffect(() => {
    if (!faqs || faqs.length === 0) return;

    injectJsonLd('ld-faq', {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer }
      }))
    });

    return () => removeJsonLd('ld-faq');
  }, [faqs]);
}

// Breadcrumb schema (generic)
export function useBreadcrumbSchema(items) {
  useEffect(() => {
    if (!items || items.length === 0) return;

    injectJsonLd('ld-breadcrumb', {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: item.name,
        item: item.url ? `${SITE_URL}${item.url}` : undefined
      }))
    });

    return () => removeJsonLd('ld-breadcrumb');
  }, [items]);
}
