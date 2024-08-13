import type { APIRoute } from 'astro';
import axios from 'axios';

interface MyMemoryResponse {
  responseData: {
    translatedText: string;
  };
}

const englishWords = [
  "apple", "banana", "grape", "orange", "lemon",
];

export const POST: APIRoute = async ({ request }) => {
  try {
    const { target } = await request.json();

    if (typeof target !== 'string') {
      return new Response(JSON.stringify({ error: 'Invalid input' }), { status: 400 });
    }

    const translations = await Promise.all(
      englishWords.map(async (word) => {
        try {
          const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(word)}&langpair=en|${encodeURIComponent(target)}`;
          const res = await axios.get(url);

          const data: MyMemoryResponse = res.data;

          if (data && data.responseData && typeof data.responseData.translatedText === 'string') {
            return { original: word, translated: data.responseData.translatedText };
          } else {
            console.error(`Unexpected response format: ${JSON.stringify(data)}`);
            return { original: word, translated: null };
          }
        } catch (error) {
          console.error(`Translation error for word "${word}":`, error);
          return { original: word, translated: null };
        }
      })
    );

    return new Response(JSON.stringify({ translations }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error handling request:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
};
