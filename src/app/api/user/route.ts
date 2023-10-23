import prisma from "@/lib/prisma";

export async function GET(request: Request) {
    let searchTerm: string = "sAM".toLowerCase();

    const users = await prisma.user.findMany(
    {
        where: {
            id: {
                not: {
                    in: [1, 2]
                }
            }
        }
    }
    );

    return new Response(JSON.stringify(users));
}