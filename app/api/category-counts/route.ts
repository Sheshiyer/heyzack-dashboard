import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const dataDirectory = path.join(process.cwd(), 'data');
    
    // Check if directory exists
    if (!fs.existsSync(dataDirectory)) {
      return NextResponse.json({ categoryCounts: {} });
    }
    
    const categories = fs.readdirSync(dataDirectory, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);
    
    const categoryCounts: Record<string, number> = {};
    
    for (const category of categories) {
      const categoryPath = path.join(dataDirectory, category);
      if (fs.existsSync(categoryPath)) {
        const files = fs.readdirSync(categoryPath)
          .filter(fileName => fileName.endsWith('.md'));
        categoryCounts[category] = files.length;
      } else {
        categoryCounts[category] = 0;
      }
    }
    
    return NextResponse.json({ categoryCounts });
  } catch (error) {
    console.error('Error fetching category counts:', error);
    return NextResponse.json({ error: 'Failed to fetch category counts' }, { status: 500 });
  }
}
