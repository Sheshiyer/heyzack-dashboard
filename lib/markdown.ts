// Client-side version that doesn't use Node.js fs module

// Pre-computed category data
const categoryData = [
  {
    group: 'Core Business',
    items: ['1-Brand', '6-Marketing', '7-Customer-Experience']
  },
  {
    group: 'Operations',
    items: ['3-Team-Ops', '5-Logistics']
  },
  {
    group: 'Financial',
    items: ['4-Finance']
  },
  {
    group: 'Product',
    items: ['2-Product-Tech']
  },
  {
    group: 'Planning',
    items: ['10-Stretch-Goals', '11-Dashboard-Metrics']
  },
  {
    group: 'Legal & Community',
    items: ['8-Legal', '9-Community-Feedback']
  }
];

export function getAllCategories() {
  return categoryData;
}

export function getCategoryDisplayName(category: string): string {
  return category.replace(/^\d+-/, '').replace(/-/g, ' ');
}

// These functions should be used server-side only
export function getDocumentBySlug(category: string, slug: string) {
  throw new Error('getDocumentBySlug should only be used server-side');
}

export function getAllDocuments(category: string) {
  throw new Error('getAllDocuments should only be used server-side');
}
