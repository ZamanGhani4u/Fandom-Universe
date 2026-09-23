import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { CategoryId } from '../data/types.ts';
import { CATEGORIES } from '../data/categories.ts';

interface BreadcrumbsProps {
  items: {
    label: string;
    view?: string;
    categoryId?: CategoryId;
  }[];
  onNavigate: (view: string, categoryId?: CategoryId) => void;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, onNavigate }) => {
  return (
    <nav className="flex items-center gap-1.5 text-xs text-neutral-400 py-3 overflow-x-auto whitespace-nowrap" aria-label="Breadcrumb">
      <button
        onClick={() => onNavigate('home')}
        className="flex items-center gap-1 hover:text-white transition-colors"
      >
        <Home className="w-3.5 h-3.5" />
        <span>Home</span>
      </button>

      {items.map((crumb, idx) => (
        <React.Fragment key={idx}>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-600 shrink-0" />
          {crumb.view || crumb.categoryId ? (
            <button
              onClick={() => onNavigate(crumb.view || 'category', crumb.categoryId)}
              className="hover:text-white transition-colors"
            >
              {crumb.categoryId ? CATEGORIES[crumb.categoryId]?.name || crumb.label : crumb.label}
            </button>
          ) : (
            <span className="text-neutral-200 font-medium truncate max-w-[200px] sm:max-w-xs">
              {crumb.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};
