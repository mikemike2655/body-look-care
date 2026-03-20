import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price) {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR'
  }).format(price);
}

export function generateSessionId() {
  const stored = localStorage.getItem('blc_session_id');
  if (stored) return stored;
  
  const newId = 'blc_' + Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
  localStorage.setItem('blc_session_id', newId);
  return newId;
}

export function getStoredToken() {
  return localStorage.getItem('blc_token');
}

export function setStoredToken(token) {
  localStorage.setItem('blc_token', token);
}

export function removeStoredToken() {
  localStorage.removeItem('blc_token');
}

export function getStoredUser() {
  const user = localStorage.getItem('blc_user');
  return user ? JSON.parse(user) : null;
}

export function setStoredUser(user) {
  localStorage.setItem('blc_user', JSON.stringify(user));
}

export function removeStoredUser() {
  localStorage.removeItem('blc_user');
}

export function truncateText(text, maxLength = 100) {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}

export function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}
