import { useState } from 'react';
import { usePdfTools } from '@/hooks/usePdfTools';
import CategorySection from '@/components/CategorySection';
import ToolCard from '@/components/ToolCard';
import ToolCardSmall from '@/components/ToolCardSmall';
import AdBanner from '@/components/AdBanner';
import SearchBar from '@/components/SearchBar';

export default function Home() {
  const { tools, categories, getToolsByCategory, getPopularTools } = usePdfTools();
  const [activeCategory, setActiveCategory] = useState('all');

  const popularTools = getPopularTools(4);
  const weeklyPopularTools = getPopularTools(4, 'weekly');

  return (
    <>
      {/* Site Banner */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-10 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-6 md:mb-0">
              <h1 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl mb-4">AI-Powered PDF Tools</h1>
              <p className="text-lg md:text-xl opacity-90 mb-6">100+ free tools to edit, convert, and optimize your PDF documents with artificial intelligence.</p>
              <div className="flex flex-wrap gap-3">
                <a href="#tools" className="inline-block bg-white text-primary font-semibold px-6 py-3 rounded-lg hover:bg-opacity-90 transition">
                  Browse Tools
                </a>
                <a href="#popular" className="inline-block bg-transparent border-2 border-white text-white font-semibold px-6 py-3 rounded-lg hover:bg-white hover:bg-opacity-10 transition">
                  Popular Tools
                </a>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img src="https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=500&h=400" alt="PDF document workspace" className="rounded-lg shadow-lg max-w-full" width="500" height="400" />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Navigation */}
      <section className="py-6 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto pb-2 hide-scrollbar">
            <div className="flex space-x-2">
              <button 
                className={`whitespace-nowrap px-4 py-2 rounded-full font-medium ${activeCategory === 'all' ? 'bg-primary text-white' : 'bg-light text-dark hover:bg-gray-200'}`}
                onClick={() => setActiveCategory('all')}
              >
                All Tools
              </button>
              {categories.map(category => (
                <button 
                  key={category.id}
                  className={`whitespace-nowrap px-4 py-2 rounded-full font-medium ${activeCategory === category.id ? 'bg-primary text-white' : 'bg-light text-dark hover:bg-gray-200'}`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Popular Tools Section */}
        <section id="popular" className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-heading font-bold text-2xl text-dark">Popular PDF Tools</h2>
            <a href="#tools" className="text-primary font-medium hover:text-primary-dark">View All</a>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {popularTools.map(tool => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </section>
        
        {/* Ad Banner */}
        <AdBanner className="mb-12" />
        
        {/* All Tools Section */}
        <section id="tools" className="mb-12">
          <h2 className="font-heading font-bold text-2xl text-dark mb-6">All PDF Tools</h2>
          
          {categories.map(category => (
            <CategorySection 
              key={category.id}
              category={category}
              tools={getToolsByCategory(category.id)}
              isVisible={activeCategory === 'all' || activeCategory === category.id}
            />
          ))}
        </section>
        
        {/* Side-by-side Ad and Tool Section */}
        <div className="flex flex-col lg:flex-row gap-6 mb-12">
          <div className="lg:w-2/3">
            <h2 className="font-heading font-bold text-2xl text-dark mb-6">Most Popular PDF Tools This Week</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {weeklyPopularTools.map(tool => (
                <ToolCardSmall key={tool.id} tool={tool} usesCount={tool.weeklyUses} />
              ))}
            </div>
          </div>
          
          <AdBanner className="lg:w-1/3" tall={true} />
        </div>
      </main>
    </>
  );
}
