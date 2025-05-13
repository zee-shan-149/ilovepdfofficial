import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { usePdfTools } from '@/hooks/usePdfTools';

interface SearchBarProps {
  onFocus?: () => void;
  isResultsVisible?: boolean;
}

export default function SearchBar({ onFocus, isResultsVisible = false }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [, navigate] = useLocation();
  const { searchTools } = usePdfTools();
  const searchResults = searchQuery.length > 2 ? searchTools(searchQuery) : [];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSelectTool = (toolId: string) => {
    navigate(`/tools/${toolId}`);
    setSearchQuery('');
  };

  return (
    <div className="relative">
      <input 
        type="text" 
        id="searchInput" 
        placeholder="Search for PDF tools..." 
        className="w-full py-2 px-4 pr-10 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        value={searchQuery}
        onChange={handleSearch}
        onFocus={onFocus}
      />
      <i className="bi bi-search absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
      
      {isResultsVisible && searchResults.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
          <ul className="py-2">
            {searchResults.map(tool => (
              <li key={tool.id} className="search-result">
                <button
                  className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center"
                  onClick={() => handleSelectTool(tool.id)}
                >
                  <div className={`w-6 h-6 rounded-md ${tool.bgColorClass} flex items-center justify-center mr-2`}>
                    <i className={`bi ${tool.icon} ${tool.iconColorClass} text-sm`}></i>
                  </div>
                  <span>{tool.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
