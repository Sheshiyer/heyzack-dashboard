import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const category = searchParams.get('category');
  const slug = searchParams.get('slug');
  
  if (!category || !slug) {
    return NextResponse.json({ error: 'Category and slug parameters are required' }, { status: 400 });
  }
  
  try {
    const dataDirectory = path.join(process.cwd(), 'data');
    const fullPath = path.join(dataDirectory, category, `${slug}.md`);
    
    // Check if file exists
    if (!fs.existsSync(fullPath)) {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 });
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    const displayName = category.replace(/^\d+-/, '').replace(/-/g, ' ');

    return NextResponse.json({ 
      document: {
        slug,
        category,
        content,
        displayName,
        ...data,
      }
    });
  } catch (error) {
    console.error('Error fetching document:', error);
    return NextResponse.json({ error: 'Failed to fetch document' }, { status: 500 });
  }
}
