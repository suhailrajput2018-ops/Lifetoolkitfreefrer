import Link from 'next/link';
import { Tool } from '@/types';

interface ToolCardProps {
  tool: Tool;
  featured?: boolean;
}

export function ToolCard({ tool, featured = false }: ToolCardProps) {
  return (
    <Link
      href={`/tools/${tool.slug}`}
      className={`group block bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-700 ${
        featured ? 'md:col-span-2' : ''
      }`}
    >
      <div className="flex items-start space-x-4">
        <div className="text-4xl flex-shrink-0">{tool.icon}</div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {tool.name}
          </h3>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
            {tool.description}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {tool.keywords.slice(0, 3).map((keyword) => (
              <span
                key={keyword}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}

export function ToolCardCompact({ tool }: { tool: Tool }) {
  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="group flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
    >
      <span className="text-2xl">{tool.icon}</span>
      <div>
        <h4 className="text-sm font-medium text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {tool.name}
        </h4>
        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
          {tool.description}
        </p>
      </div>
    </Link>
  );
}
