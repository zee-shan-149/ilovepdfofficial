import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";

export default function Blog() {
  // Sample blog posts data
  const blogPosts = [
    {
      id: 1,
      title: "10 Ways to Optimize Your PDF Files",
      excerpt: "Learn how to reduce file size and improve the performance of your PDF documents with these simple techniques.",
      date: "April 25, 2025",
      category: "Optimization",
      image: "https://via.placeholder.com/800x450"
    },
    {
      id: 2,
      title: "The Future of AI-Powered Document Processing",
      excerpt: "Discover how artificial intelligence is transforming the way we interact with and extract information from PDFs.",
      date: "April 20, 2025",
      category: "AI & Technology",
      image: "https://via.placeholder.com/800x450"
    },
    {
      id: 3,
      title: "PDF Accessibility: Making Documents Available to Everyone",
      excerpt: "Why accessibility matters and how to ensure your PDF documents can be used by people with disabilities.",
      date: "April 15, 2025",
      category: "Accessibility",
      image: "https://via.placeholder.com/800x450"
    },
    {
      id: 4,
      title: "From Paper to Digital: The Complete Guide to PDF Conversion",
      excerpt: "A step-by-step guide to digitizing your paper documents and organizing them efficiently.",
      date: "April 10, 2025",
      category: "Conversion",
      image: "https://via.placeholder.com/800x450"
    }
  ];

  return (
    <div className="container max-w-6xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight">PDF Tools Blog</h1>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Tips, tutorials, and insights to help you get the most out of your PDF documents.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <Card key={post.id} className="overflow-hidden flex flex-col h-full">
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-48 object-cover"
            />
            <CardHeader className="pb-2">
              <div className="text-sm text-blue-600 font-medium mb-1">{post.category}</div>
              <CardTitle className="text-xl">{post.title}</CardTitle>
              <CardDescription className="text-sm text-gray-500">{post.date}</CardDescription>
            </CardHeader>
            <CardContent className="pb-4 flex-grow">
              <p className="text-gray-700">{post.excerpt}</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Read More
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-6">Subscribe to Our Newsletter</h2>
        <div className="max-w-md mx-auto flex">
          <input 
            type="email" 
            placeholder="Your email address" 
            className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Button className="rounded-l-none">
            Subscribe
          </Button>
        </div>
      </div>
    </div>
  );
}