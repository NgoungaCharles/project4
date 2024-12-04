import React from 'react';
import { getSuggestions } from '../services/api';

export function useSuggestions(input: string) {
  const [suggestions, setSuggestions] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const fetchSuggestions = async () => {
      if (!input.trim()) {
        setSuggestions([]);
        return;
      }

      try {
        setLoading(true);
        const data = await getSuggestions(input);
        setSuggestions(data.suggestions);
      } catch (error) {
        console.error('Failed to fetch suggestions:', error);
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timeoutId);
  }, [input]);

  return { suggestions, loading };
}