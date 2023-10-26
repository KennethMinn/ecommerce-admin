import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const body = await req.json();
    const { name, value } = body;

    const { userId } = auth();
    if (!userId) return new NextResponse('Unauthenticated', { status: 401 });

    if (!name) return new NextResponse('Name is required', { status: 204 });
    if (!value) return new NextResponse('Value is required', { status: 204 });

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

    const size = await prismadb.size.create({
      data: {
        name,
        value,
        storeId: params.storeId, // billboard can only exist inside a specific store
      },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log('SIZE_POST', error);
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

    const sizes = await prismadb.size.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    return NextResponse.json(sizes);
  } catch (error) {
    console.log('BILLBOARD_GET', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
