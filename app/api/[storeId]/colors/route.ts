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

    const color = await prismadb.color.create({
      data: {
        name,
        value,
        storeId: params.storeId, // billboard can only exist inside a specific store
      },
    });

    return NextResponse.json(color);
  } catch (error) {
    console.log('COLOR_POST', error);
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

    const colors = await prismadb.color.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    return NextResponse.json(colors);
  } catch (error) {
    console.log('COLOR_GET', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
