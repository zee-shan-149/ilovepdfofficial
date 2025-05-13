import { useState, useEffect, useRef } from 'react';
import { Link } from 'wouter';
import SearchBar from './SearchBar';

export default function Header() {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Handle clicks outside the search component to close results
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center py-3">
          <div className="flex items-center mb-3 md:mb-0">
            <Link href="/" className="flex items-center">
              <i className="bi bi-file-earmark-pdf text-primary text-3xl mr-2"></i>
              <h1 className="font-heading font-bold text-xl md:text-2xl text-dark">PDF<span className="text-primary">Toolkit</span></h1>
            </Link>
          </div>
          
          <div className="w-full md:w-1/2 lg:w-1/3 mb-3 md:mb-0" ref={searchRef}>
            <SearchBar 
              onFocus={() => setIsSearchFocused(true)}
              isResultsVisible={isSearchFocused}
            />
          </div>
          
          <nav className="flex space-x-4">
            <Link href="/" className="text-dark hover:text-primary font-medium">Home</Link>
            <Link href="/#tools" className="text-dark hover:text-primary font-medium">All Tools</Link>
            <Link href="/test-deepseek" className="text-dark hover:text-primary font-medium">Test DeepSeek</Link>
            <Link href="/blog" className="text-dark hover:text-primary font-medium">Blog</Link>
            <Link href="/contact" className="text-dark hover:text-primary font-medium">Contact</Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
