import { Link } from 'wouter';
import { Tool } from '@/data/pdfTools';

interface ToolCardSmallProps {
  tool: Tool;
  usesCount?: number;
}

export default function ToolCardSmall({ tool, usesCount }: ToolCardSmallProps) {
  return (
    <Link 
      href={`/tools/${tool.id}`} 
      className="flex items-center p-4 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow tool-card transition-all duration-300"
    >
      <div className={`w-10 h-10 rounded-lg ${tool.bgColorClass} flex items-center justify-center mr-3`}>
        <i className={`bi ${tool.icon} ${tool.iconColorClass} text-xl`}></i>
      </div>
      <div>
        <span className="font-medium block">{tool.name}</span>
        {usesCount && (
          <span className="text-gray-500 text-sm">{usesCount.toLocaleString()} uses this week</span>
        )}
      </div>
    </Link>
  );
}
