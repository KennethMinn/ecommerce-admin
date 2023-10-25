import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const body = await req.json();
    const { label, imageUrl } = body;

    const { userId } = auth();
    if (!userId) return new NextResponse('Unauthenticated', { status: 401 });

    if (!label) return new NextResponse('Label is required', { status: 204 });
    if (!imageUrl)
      return new NextResponse('Label is required', { status: 204 });

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

    const billboard = await prismadb.billboard.create({
      data: {
        label,
        imageUrl,
        storeId: params.storeId, // billboard can only exist inside a specific store
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log('BILLBOARD_POST', error);
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

    const billboards = await prismadb.billboard.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    return NextResponse.json(billboards);
  } catch (error) {
    console.log('BILLBOARD_GET', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
