import React from 'react';

interface TableCellProps {
  children: React.ReactNode;
  isHeader?: boolean;
}

export const TableCell: React.FC<TableCellProps> = ({ children, isHeader = false }) => {
  const content = String(children);
  const hasListItems = content.includes('- ') || content.includes('* ');
  
  const CellTag = isHeader ? 'th' : 'td';
  const baseClassName = `border border-gray-600 px-3 py-2 ${isHeader ? 'text-left font-semibold' : ''}`;
  
  if (hasListItems) {
    const items = content
      .split(/\n/)
      .filter(line => line.trim().startsWith('-') || line.trim().startsWith('*'))
      .map(item => item.replace(/^[\s-*]+/, '').trim());
    
    if (items.length > 0) {
      return (
        <CellTag className={baseClassName}>
          <ul className="list-disc list-inside space-y-1">
            {items.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </CellTag>
      );
    }
  }
  
  return <CellTag className={baseClassName}>{children}</CellTag>;
};
