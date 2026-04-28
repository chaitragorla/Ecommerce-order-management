import { NextResponse } from 'next/server';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// GET all orders (Admin) or user orders
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const customerId = searchParams.get('customerId');
    
    let where = {};
    if (customerId) {
      where = { customerId };
    }

    // Uncomment when DB is connected
    /*
    const orders = await prisma.order.findMany({
      where,
      include: {
        customer: true,
        orderDetails: {
          include: {
            product: true
          }
        },
        payment: true
      },
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(orders);
    */
    
    return NextResponse.json({ message: "Orders endpoint ready. Connect DB to see real data." });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}

// POST new order
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customerId, items, shippingAddress, paymentMethod } = body;
    
    if (!customerId || !items || !items.length || !shippingAddress) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Uncomment when DB is connected
    /*
    // Calculate total
    let totalAmount = 0;
    // In a real app, you would fetch the prices from DB to avoid client spoofing
    for (const item of items) {
       totalAmount += item.priceAtTime * item.quantity;
    }

    // Create order transaction
    const order = await prisma.$transaction(async (tx) => {
      // 1. Create order
      const newOrder = await tx.order.create({
        data: {
          customerId,
          totalAmount,
          shippingAddress,
          status: 'PENDING',
          orderDetails: {
            create: items.map((item: any) => ({
              productId: item.productId,
              quantity: item.quantity,
              priceAtTime: item.priceAtTime
            }))
          },
          payment: {
            create: {
              amount: totalAmount,
              method: paymentMethod || 'CREDIT_CARD',
              status: 'COMPLETED' // Simplified for demo
            }
          }
        },
        include: {
          orderDetails: true,
          payment: true
        }
      });
      
      // 2. Update stock
      for (const item of items) {
        await tx.product.update({
          where: { id: item.productId },
          data: { stock: { decrement: item.quantity } }
        });
      }
      
      return newOrder;
    });

    return NextResponse.json(order, { status: 201 });
    */

    return NextResponse.json({ message: "Order created (mock)", data: body }, { status: 201 });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}
