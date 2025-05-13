/**
 * DeepSeek AI API Client implementation
 * 
 * This file contains functions to interact with DeepSeek's API for text generation and analysis
 * 
 * This version uses a server-side proxy to handle API key management securely.
 * The API key is stored server-side and never exposed to the client.
 */

// DeepSeek API configuration
// Using our own proxy API to securely access DeepSeek
const DEEPSEEK_PROXY_URL = '/api/deepseek';

// Default model to use with DeepSeek
const DEFAULT_MODEL = 'deepseek-chat';

// Basic interface for API responses
interface DeepSeekResponse {
  text: string;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

/**
 * Generic function to call DeepSeek API
 */
async function callDeepSeekAPI(
  prompt: string, 
  model: string = DEFAULT_MODEL,
  temperature: number = 0.7,
  max_tokens: number = 1000
): Promise<DeepSeekResponse> {
  try {
    console.log(`Calling DeepSeek API via proxy with model: ${model}, temperature: ${temperature}, max_tokens: ${max_tokens}`);
    
    const requestBody = {
      model: model,
      messages: [
        { role: 'user', content: prompt }
      ],
      temperature: temperature,
      max_tokens: max_tokens
    };
    
    // Log the request for debugging (don't log in production)
    console.log('Request body:', JSON.stringify(requestBody));
    
    // Make sure to use the correct endpoint
    const response = await fetch(`${DEEPSEEK_PROXY_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody),
      // Make sure cookies are sent with the request
      credentials: 'same-origin'
    });

    console.log('DeepSeek API Response status:', response.status, response.statusText);
    
    if (!response.ok) {
      let errorMessage = `Status: ${response.status} ${response.statusText}`;
      
      try {
        const errorData = await response.json();
        console.error('API Error Response:', errorData);
        errorMessage = `DeepSeek API Error: ${errorData.error?.message || errorData.message || response.statusText}`;
      } catch (parseError) {
        console.error('Failed to parse error response:', parseError);
        errorMessage = `Failed to parse error response. Status: ${response.status}`;
      }
      
      throw new Error(errorMessage);
    }

    const data = await response.json();
    console.log('DeepSeek API Response data:', data);
    
    if (data && data.choices && data.choices[0] && data.choices[0].message) {
      return {
        text: data.choices[0].message.content,
        usage: data.usage
      };
    } else {
      console.error('Unexpected API response format:', data);
      throw new Error('Unexpected API response format. Missing choices or message content.');
    }
  } catch (error) {
    console.error('Error calling DeepSeek API:', error);
    throw error;
  }
}

/**
 * Summarizes text content with specified length
 */
export async function summarizeText(text: string, length: 'brief' | 'moderate' | 'detailed'): Promise<string> {
  let wordCount;
  
  switch (length) {
    case 'brief':
      wordCount = 100;
      break;
    case 'moderate':
      wordCount = 250;
      break;
    case 'detailed':
      wordCount = 500;
      break;
    default:
      wordCount = 250;
  }
  
  const prompt = `
    Please summarize the following text in approximately ${wordCount} words.
    Maintain the key points and main ideas while condensing the information.
    
    Text to summarize:
    ${text}
  `;
  
  try {
    const response = await callDeepSeekAPI(prompt, DEFAULT_MODEL, 0.3, 1000);
    return response.text.trim();
  } catch (error) {
    console.error('Error summarizing text with DeepSeek:', error);
    return "An error occurred while summarizing the text. Please try again.";
  }
}

/**
 * Extracts keywords from text content
 */
export async function extractKeywords(text: string, count: number = 10): Promise<string[]> {
  const prompt = `
    Extract exactly ${count} most important keywords or key phrases from the following text.
    Return only the keywords as a comma-separated list without numbering or bullet points.
    
    Text to analyze:
    ${text}
  `;
  
  try {
    const response = await callDeepSeekAPI(prompt, DEFAULT_MODEL, 0.3, 500);
    // Split by comma and trim whitespace
    return response.text.split(',').map(keyword => keyword.trim());
  } catch (error) {
    console.error('Error extracting keywords with DeepSeek:', error);
    return [];
  }
}

/**
 * Rewrites text content in a different tone
 */
export async function rewriteText(text: string, tone: 'formal' | 'casual' | 'simple' | 'technical'): Promise<string> {
  let toneDescription;
  
  switch (tone) {
    case 'formal':
      toneDescription = 'professional, business-appropriate language with proper grammar and vocabulary';
      break;
    case 'casual':
      toneDescription = 'friendly, conversational language as if speaking to a friend';
      break;
    case 'simple':
      toneDescription = 'easy to understand language with basic vocabulary and short sentences';
      break;
    case 'technical':
      toneDescription = 'specialized terminology and precise language appropriate for a technical audience';
      break;
    default:
      toneDescription = 'clear and concise language';
  }
  
  const prompt = `
    Rewrite the following text using a ${tone} tone (${toneDescription}).
    Maintain the original meaning and key information while changing the style and tone.
    
    Text to rewrite:
    ${text}
  `;
  
  try {
    const response = await callDeepSeekAPI(prompt, DEFAULT_MODEL, 0.5, 2000);
    return response.text.trim();
  } catch (error) {
    console.error('Error rewriting text with DeepSeek:', error);
    return "An error occurred while rewriting the text. Please try again.";
  }
}

/**
 * Chat with a PDF (answer questions based on PDF content)
 */
export async function chatWithPdf(pdfText: string, question: string): Promise<string> {
  const prompt = `
    I have a PDF document with the following content:
    
    ${pdfText.substring(0, 6000)}... [content truncated for length]
    
    Based on this document, please answer the following question with specific information from the document:
    
    Question: ${question}
  `;
  
  try {
    const response = await callDeepSeekAPI(prompt, DEFAULT_MODEL, 0.3, 1500);
    return response.text.trim();
  } catch (error) {
    console.error('Error chatting with PDF using DeepSeek:', error);
    return "I apologize, but I couldn't process your question. Please try asking in a different way or check the document content.";
  }
}

/**
 * Translates PDF content to another language
 */
export async function translateText(text: string, targetLanguage: string): Promise<string> {
  const prompt = `
    Translate the following text into ${targetLanguage}.
    Maintain the meaning, formatting, and tone as much as possible.
    
    Text to translate:
    ${text}
  `;
  
  try {
    const response = await callDeepSeekAPI(prompt, DEFAULT_MODEL, 0.3, 2000);
    return response.text.trim();
  } catch (error) {
    console.error('Error translating text with DeepSeek:', error);
    return "An error occurred while translating the text. Please try again.";
  }
}