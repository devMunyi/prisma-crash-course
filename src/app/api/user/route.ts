import prisma from "@/lib/prisma";

export async function GET(request: Request) {
    const skip  = 1;

    const users = await prisma.user.findMany({
        orderBy: {
            id: 'asc',
        },
        skip,
        take: 2,
    });

    return new Response(JSON.stringify(users));
}