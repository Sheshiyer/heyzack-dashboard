import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const dataDirectory = path.join(process.cwd(), 'data');

export function getDocumentBySlug(category: string, slug: string) {
  const fullPath = path.join(dataDirectory, category, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    content,
    ...data,
  };
}

export function getAllDocuments(category: string) {
  const categoryPath = path.join(dataDirectory, category);
  
  // Check if directory exists
  if (!fs.existsSync(categoryPath)) {
    return [];
  }
  
  const fileNames = fs.readdirSync(categoryPath);
  
  return fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(categoryPath, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);

      return {
        slug,
        ...data,
      };
    });
}

export function getAllCategories() {
  // Check if directory exists
  if (!fs.existsSync(dataDirectory)) {
    return [];
  }
  
  const categories = fs.readdirSync(dataDirectory, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  const groupedCategories = {
    'Core Business': ['1-Brand', '6-Marketing', '7-Customer-Experience'],
    'Operations': ['3-Team-Ops', '5-Logistics', 'procurement'],
    'Financial': ['4-Finance', 'financials'],
    'Product': ['2-Product-Tech', 'product-details'],
    'Planning': ['10-Stretch-Goals', '11-Dashboard-Metrics'],
    'Legal & Community': ['8-Legal', '9-Community-Feedback'],
    'Other': []
  };

  const result = Object.entries(groupedCategories).map(([group, items]) => ({
    group,
    items: items.filter(item => categories.includes(item))
  }));

  // Add any remaining categories to 'Other'
  const otherCategories = categories.filter(cat => 
    !Object.values(groupedCategories).flat().includes(cat)
  );
  if (otherCategories.length > 0) {
    result.push({ group: 'Other', items: otherCategories });
  }

  return result.filter(group => group.items.length > 0);
}

export function getCategoryDisplayName(category: string): string {
  return category.replace(/^\d+-/, '').replace(/-/g, ' ');
}
