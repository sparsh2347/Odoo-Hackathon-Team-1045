// import fetch from 'node-fetch';

// const API_KEY = 'AIzaSyDVajhOu5FSFiH0cXICpeRdi0l9-6w7vtk'; // Replace with your actual API key

// async function extractTagsFromQuestion(question) {
//   const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;
  
//   const requestBody = {
//     contents: [{
//       parts: [{
//         text: `Analyze the following question and extract ONLY the most relevant tags/keywords. Return them as a comma-separated list. Question: "${question}" Tags:`
//       }]
//     }]
//   };

//   try {
//     const response = await fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(requestBody)
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.error?.message || 'Failed to fetch from Gemini API');
//     }

//     const data = await response.json();
//     const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    
//     // Clean and split tags
//     const tags = generatedText.trim()
//       .split(',')
//       .map(tag => tag.trim())
//       .filter(tag => tag.length > 0);
    
//     return tags;
//   } catch (error) {
//     console.error('Error extracting tags:', error);
//     return []; // Return empty array on error
//   }
// }

// // Test the function
// // extractTagsFromQuestion("How do I implement a binary search tree in JavaScript?")
// //   .then(tags => console.log("Extracted Tags:", tags))
// //   .catch(err => console.error("Error:", err));


// export default extractTagsFromQuestion;


import fetch from 'node-fetch';

interface Part {
  text: string;
}

interface Content {
  parts: Part[];
}

interface Candidate {
  content: {
    parts: Part[];
  };
}

interface GeminiResponse {
  candidates?: Candidate[];
  error?: {
    message?: string;
  };
}

const API_KEY: string = 'AIzaSyDVajhOu5FSFiH0cXICpeRdi0l9-6w7vtk'; // Replace with your actual API key

async function extractTagsFromQuestion(question: string): Promise<string[]> {
  const url: string = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;
  
  const requestBody = {
    contents: [{
      parts: [{
        text: `Analyze the following question and extract ONLY the most relevant tags/keywords. Return them as a comma-separated list. Question: "${question}" Tags:`
      }]
    }]
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorData: GeminiResponse = await response.json();
      throw new Error(errorData.error?.message || 'Failed to fetch from Gemini API');
    }

    const data: GeminiResponse = await response.json();
    const generatedText: string = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    
    return generatedText.trim()
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);
      
  } catch (error) {
    console.error('Error extracting tags:', error instanceof Error ? error.message : error);
    return [];
  }
}

// Test
extractTagsFromQuestion("GOD of Cricket?")
  .then(tags => console.log("Extracted Tags:", tags))
  .catch(err => console.error("Error:", err));

export default extractTagsFromQuestion;