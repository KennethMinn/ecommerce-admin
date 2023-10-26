import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; sizeId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse('Unauthenticated', { status: 401 });

    const body = await req.json();
    const { name, value } = body;

    if (!name) return new NextResponse('Name is required', { status: 204 });
    if (!value) return new NextResponse('Value is required', { status: 204 });

    if (!params.sizeId)
      return new NextResponse('SIze Id not found', { status: 302 });

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId, //to prevent other users from accessing the store
      },
    });

    if (!storeByUserId)
      return new NextResponse('Unauthorized', { status: 401 });

    const size = await prismadb.size.updateMany({
      where: {
        id: params.sizeId,
      },
      data: {
        name,
        value,
      },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log('SIZE_PATCH', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; sizeId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse('Unauthenticated', { status: 401 });

    if (!params.sizeId)
      return new NextResponse('Size Id not found', { status: 302 });

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId, //to prevent other users from accessing the store
      },
    });

    if (!storeByUserId)
      return new NextResponse('Unauthorized', { status: 401 });

    const size = await prismadb.size.deleteMany({
      where: {
        id: params.sizeId,
      },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log('SIZE_DELETE', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { sizeId: string } }
) {
  try {
    if (!params.sizeId)
      return new NextResponse('Size Id not found', { status: 302 });

    const size = await prismadb.size.findUnique({
      where: {
        id: params.sizeId,
      },
    });
    return NextResponse.json(size);
  } catch (error) {
    console.log('SIZE_GET', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
