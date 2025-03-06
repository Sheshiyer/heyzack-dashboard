import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const category = searchParams.get('category');
  
  if (!category) {
    return NextResponse.json({ error: 'Category parameter is required' }, { status: 400 });
  }
  
  try {
    const dataDirectory = path.join(process.cwd(), 'data');
    const categoryPath = path.join(dataDirectory, category);
    
    // Check if directory exists
    if (!fs.existsSync(categoryPath)) {
      return NextResponse.json({ documents: [] });
    }
    
    const fileNames = fs.readdirSync(categoryPath);
    
    const documents = fileNames
      .filter((fileName) => fileName.endsWith('.md'))
      .map((fileName) => {
        const slug = fileName.replace(/\.md$/, '');
        const fullPath = path.join(categoryPath, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data } = matter(fileContents);

        return {
          slug,
          category,
          ...data,
        };
      });
    
    return NextResponse.json({ documents });
  } catch (error) {
    console.error('Error fetching documents:', error);
    return NextResponse.json({ error: 'Failed to fetch documents' }, { status: 500 });
  }
}
