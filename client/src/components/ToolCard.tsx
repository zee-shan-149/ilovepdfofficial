import { Link } from 'wouter';
import { Tool } from '@/data/pdfTools';

interface ToolCardProps {
  tool: Tool;
}

export default function ToolCard({ tool }: ToolCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden tool-card transition-all duration-300">
      <div className="p-5">
        <div className="flex items-center mb-4">
          <div className={`w-10 h-10 rounded-lg ${tool.bgColorClass} flex items-center justify-center mr-3`}>
            <i className={`bi ${tool.icon} ${tool.iconColorClass} text-xl`}></i>
          </div>
          <h3 className="font-heading font-semibold text-lg">{tool.name}</h3>
        </div>
        <p className="text-gray-600 text-sm mb-4">{tool.description}</p>
        <Link 
          href={`/tools/${tool.id}`} 
          className="block text-center bg-primary text-white py-2 rounded-lg font-medium hover:bg-blue-600 transition"
        >
          {tool.actionButtonText || tool.name}
        </Link>
      </div>
    </div>
  );
}
