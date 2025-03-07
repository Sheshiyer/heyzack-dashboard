import ClientDocumentPage from './client-page';
import fs from 'fs';
import path from 'path';

interface DocumentData {
  content: string;
  displayName: string;
}

async function getDocument(category: string, slug: string): Promise<DocumentData | null> {
  try {
    const dataDirectory = path.join(process.cwd(), 'data');
    const categoryPath = path.join(dataDirectory, category);
    const filePath = path.join(categoryPath, `${slug}.md`);
    
    if (!fs.existsSync(filePath)) {
      return null;
    }
    
    const content = fs.readFileSync(filePath, 'utf8');
    const displayName = category.replace(/^\d+-/, '').replace(/-/g, ' ');
    
    return {
      content,
      displayName
    };
  } catch (error) {
    console.error('Error reading document:', error);
    return null;
  }
}

export default async function DocumentPage({ params }: { params: { category: string; slug: string } }) {
  const category = params.category;
  const slug = params.slug;
  
  const document = await getDocument(category, slug);
  
  // For server-side rendering, we'll pass the initial document data to the client component
  return <ClientDocumentPage category={category} slug={slug} initialDocument={document} />;
}
