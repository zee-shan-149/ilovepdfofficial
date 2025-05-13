import { Link } from 'wouter';
import { Tool } from '@/data/pdfTools';
import { Category } from '@/data/pdfTools';

interface CategorySectionProps {
  category: Category;
  tools: Tool[];
  isVisible: boolean;
}

export default function CategorySection({ category, tools, isVisible }: CategorySectionProps) {
  if (!isVisible || tools.length === 0) return null;

  return (
    <div className="mb-10">
      <h3 className="font-heading font-semibold text-xl text-dark mb-4">{category.name}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {tools.map(tool => (
          <Link 
            key={tool.id}
            href={`/tools/${tool.id}`} 
            className="flex items-center p-3 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow tool-card transition-all duration-300"
          >
            <div className={`w-8 h-8 rounded-lg ${tool.bgColorClass} flex items-center justify-center mr-3`}>
              <i className={`bi ${tool.icon} ${tool.iconColorClass}`}></i>
            </div>
            <span className="font-medium">{tool.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
