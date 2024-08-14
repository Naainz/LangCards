import type { APIRoute } from 'astro';
import axios from 'axios';

interface MyMemoryResponse {
  responseData: {
    translatedText: string;
  };
}

const englishWords = [
  "apple", "banana", "grape", "orange", "lemon",
  "car", "truck", "bus", "bicycle", "train",
  "dog", "cat", "fish", "bird", "elephant",
  "red", "blue", "green", "yellow", "purple",
  "house", "apartment", "building", "office", "school",
  "sun", "moon", "star", "planet", "galaxy",
  "happy", "sad", "angry", "excited", "nervous",
  "water", "juice", "milk", "coffee", "tea",
  "computer", "phone", "tablet", "keyboard", "mouse",
  "book", "magazine", "newspaper", "journal", "notebook",
  "walk", "run", "jump", "swim", "climb",
  "morning", "afternoon", "evening", "night", "day",
  "friend", "family", "colleague", "neighbor", "stranger",
  "love", "hate", "like", "dislike", "admire",
  "table", "chair", "sofa", "bed", "desk",
  "shirt", "pants", "shoes", "hat", "jacket",
  "hot", "cold", "warm", "cool", "chilly",
  "large", "small", "big", "tiny", "huge",
  "fast", "slow", "quick", "hasty", "sluggish",
  "clean", "dirty", "neat", "messy", "tidy",
  "strong", "weak", "powerful", "frail", "sturdy",
  "food", "meal", "breakfast", "lunch", "dinner",
  "work", "job", "career", "profession", "occupation",
  "money", "cash", "check", "credit", "debit",
  "country", "city", "town", "village", "state",
  "music", "song", "melody", "rhythm", "harmony",
  "movie", "film", "show", "episode", "series",
  "flower", "tree", "plant", "grass", "bush",
  "earth", "wind", "fire", "water", "element",
  "health", "sick", "ill", "well", "fit",
  "laugh", "cry", "smile", "frown", "giggle",
  "read", "write", "speak", "listen", "hear",
  "light", "dark", "bright", "dim", "shiny",
  "hard", "soft", "rough", "smooth", "firm",
  "young", "old", "new", "ancient", "modern",
  "rich", "poor", "wealthy", "needy", "affluent",
  "safe", "dangerous", "secure", "risky", "protected",
  "game", "play", "win", "lose", "draw",
  "peace", "war", "battle", "fight", "conflict",
  "truth", "lie", "fact", "fiction", "reality",
  "dream", "wish", "hope", "desire", "goal",
  "begin", "end", "start", "finish", "conclude",
  "child", "adult", "teen", "baby", "elder",
  "road", "street", "path", "highway", "trail",
  "hand", "foot", "head", "eye", "ear",
  "fish", "meat", "bread", "vegetable", "fruit",
  "paper", "pen", "pencil", "eraser", "notebook",
  "knife", "fork", "spoon", "plate", "bowl",
  "doctor", "nurse", "teacher", "engineer", "artist",
  "winter", "summer", "spring", "fall", "season",
  "north", "south", "east", "west", "direction",
  "happy", "sad", "angry", "joyful", "scared",
  "mountain", "hill", "valley", "river", "lake",
  "idea", "thought", "concept", "theory", "notion",
  "brick", "stone", "wood", "metal", "glass",
  "truth", "lie", "deception", "honesty", "integrity",
  "government", "politics", "law", "order", "justice",
  "freedom", "liberty", "democracy", "republic", "monarchy",
  "animal", "mammal", "reptile", "amphibian", "bird",
  "literature", "poetry", "story", "novel", "essay",
  "building", "structure", "construction", "house", "edifice",
  "sea", "ocean", "wave", "tide", "current",
  "teacher", "student", "professor", "instructor", "educator",
  "farm", "ranch", "field", "pasture", "barn",
  "money", "wealth", "currency", "cash", "coin",
  "food", "cuisine", "meal", "dish", "recipe",
  "language", "dialect", "accent", "slang", "vocabulary",
  "time", "hour", "minute", "second", "moment",
  "peace", "tranquility", "calm", "serenity", "harmony",
  "love", "affection", "passion", "devotion", "romance",
  "family", "kin", "clan", "tribe", "lineage",
  "happiness", "joy", "pleasure", "delight", "contentment"
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
