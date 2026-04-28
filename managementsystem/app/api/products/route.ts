import { NextResponse } from 'next/server';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// GET all products
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    
    let where = {};
    if (category) {
      where = { category };
    }

    // Uncomment when DB is connected
    /*
    const products = await prisma.product.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(products);
    */
    
    // Mock return for UI demonstration
    return NextResponse.json({ message: "Products endpoint ready. Connect DB to see real data." });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

// POST new product (Admin)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Basic validation
    if (!body.name || !body.price) {
      return NextResponse.json({ error: 'Name and price are required' }, { status: 400 });
    }

    // Uncomment when DB is connected
    /*
    const product = await prisma.product.create({
      data: {
        name: body.name,
        description: body.description,
        price: body.price,
        stock: body.stock || 0,
        category: body.category,
        imageUrl: body.imageUrl,
      }
    });
    return NextResponse.json(product, { status: 201 });
    */

    return NextResponse.json({ message: "Product created (mock)", data: body }, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
