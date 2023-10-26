import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();

    const body = await req.json();
    const { name, billboardId } = body;

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 });

    if (!name) return new NextResponse('name is required', { status: 204 });
    if (!billboardId)
      return new NextResponse('billboardId is required', { status: 204 });

    if (!params.storeId)
      return new NextResponse('storeId not found', { status: 302 });

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId, //to prevent other users from accessing the store
      },
    });

    if (!storeByUserId)
      return new NextResponse('Unauthorized', { status: 401 });

    const category = await prismadb.category.create({
      data: {
        name,
        billboardId,
        storeId: params.storeId, // billboard can only exist inside a specific store
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log('CATEGORIES_POST', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId)
      return new NextResponse('storeId not found', { status: 302 });

    const categories = await prismadb.category.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.log('CATEGORIES_GET', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
