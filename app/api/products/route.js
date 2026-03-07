import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Product from '@/lib/models/Product';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const body = await req.json();
    
    // In a real app we'd validate the body schema (e.g. zod)
    const product = await Product.create(body);

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Product Creation Error:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    await dbConnect();
    const url = new URL(req.url);
    const category = url.searchParams.get('category');
    
    const query = category ? { category } : {};
    const products = await Product.find(query).sort({ createdAt: -1 });

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error('Fetch Products Error:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
