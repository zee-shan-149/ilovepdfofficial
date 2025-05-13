import { useState, useMemo } from 'react';
import { tools, categories, type Tool } from '@/data/pdfTools';

export function usePdfTools() {
  // Get all tools and categories
  const allTools = useMemo(() => tools, []);
  const allCategories = useMemo(() => categories, []);
  
  /**
   * Get tools by category
   */
  const getToolsByCategory = (categoryId: string): Tool[] => {
    return allTools.filter(tool => tool.category === categoryId);
  };
  
  /**
   * Get popular tools
   */
  const getPopularTools = (count: number, type: 'overall' | 'weekly' = 'overall'): Tool[] => {
    const sortKey = type === 'weekly' ? 'weeklyUses' : 'popularity';
    return [...allTools]
      .sort((a, b) => 
        type === 'weekly' 
          ? (b.weeklyUses || 0) - (a.weeklyUses || 0)
          : b.popularity - a.popularity
      )
      .slice(0, count);
  };
  
  /**
   * Get a tool by ID
   */
  const getToolById = (id: string): Tool | undefined => {
    return allTools.find(tool => tool.id === id);
  };
  
  /**
   * Get related tools (same category, excluding the current tool)
   */
  const getRelatedTools = (id: string, count: number): Tool[] => {
    const tool = getToolById(id);
    if (!tool) return [];
    
    return allTools
      .filter(t => t.category === tool.category && t.id !== id)
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, count);
  };
  
  /**
   * Search tools by name or description
   */
  const searchTools = (query: string): Tool[] => {
    if (!query) return [];
    
    const lowerQuery = query.toLowerCase();
    return allTools
      .filter(tool => 
        tool.name.toLowerCase().includes(lowerQuery) || 
        tool.description.toLowerCase().includes(lowerQuery)
      )
      .sort((a, b) => {
        // Prioritize exact name matches
        const aNameMatch = a.name.toLowerCase().includes(lowerQuery);
        const bNameMatch = b.name.toLowerCase().includes(lowerQuery);
        
        if (aNameMatch && !bNameMatch) return -1;
        if (!aNameMatch && bNameMatch) return 1;
        
        // Then by popularity
        return b.popularity - a.popularity;
      })
      .slice(0, 10); // Limit results
  };
  
  return {
    tools: allTools,
    categories: allCategories,
    getToolsByCategory,
    getPopularTools,
    getToolById,
    getRelatedTools,
    searchTools
  };
}
