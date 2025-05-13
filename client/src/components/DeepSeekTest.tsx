import { useState } from 'react';
import { summarizeText } from '@/lib/deepseek';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { toast } from '@/hooks/use-toast';

export default function DeepSeekTest() {
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!inputText) {
      toast({
        title: "Input Required",
        description: "Please enter some text to summarize.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      // Test the DeepSeek API with a basic summarization
      const summary = await summarizeText(inputText, 'brief');
      setResult(summary);
    } catch (err) {
      console.error('DeepSeek test error:', err);
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle>DeepSeek API Test</CardTitle>
          <CardDescription>
            Test the DeepSeek API integration by summarizing some text.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label htmlFor="input-text" className="block text-sm font-medium mb-2">
                Enter some text to summarize
              </label>
              <Textarea
                id="input-text"
                placeholder="Enter a paragraph or more of text to summarize..."
                rows={5}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            
            {error && (
              <Alert variant="destructive">
                <AlertTitle>API Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {result && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Summary Result:</h3>
                <div className="p-4 bg-gray-50 rounded border">{result}</div>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button 
            onClick={handleSubmit} 
            disabled={isLoading || !inputText}
          >
            {isLoading ? 'Processing...' : 'Test Summarize'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}