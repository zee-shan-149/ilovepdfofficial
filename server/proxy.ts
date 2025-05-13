import { Request, Response } from 'express';

// Handle DeepSeek API proxy requests
export async function proxyDeepSeekRequest(req: Request, res: Response) {
  try {
    const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
    
    // Log API key status (don't log the actual key)
    console.log('DeepSeek API Key available:', !!DEEPSEEK_API_KEY);
    
    if (!DEEPSEEK_API_KEY) {
      console.error('DeepSeek API key is missing in environment variables');
      return res.status(500).json({ 
        error: 'DeepSeek API key not configured on the server' 
      });
    }

    // Log the incoming request (for debugging)
    console.log('DeepSeek Proxy Request Body:', JSON.stringify(req.body));
    
    // Forward the request to DeepSeek API
    // Using the correct endpoint for DeepSeek's API
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: req.body.model || 'deepseek-chat',
        messages: req.body.messages,
        temperature: req.body.temperature || 0.7,
        max_tokens: req.body.max_tokens || 1000
      })
    });

    // Get the response from DeepSeek
    const data = await response.json();
    
    // Log the response data (for debugging)
    console.log('DeepSeek API Response:', JSON.stringify(data));
    
    // Return the response to the client
    return res.status(response.status).json(data);
  } catch (error) {
    console.error('Error proxying request to DeepSeek:', error);
    return res.status(500).json({ 
      error: 'Failed to proxy request to DeepSeek API',
      message: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
}