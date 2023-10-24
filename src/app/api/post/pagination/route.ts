import prisma from "@/lib/prisma";

export async function GET(request: Request) {

    const { searchParams } = new URL(request.url);

    const pgnum: number = +(searchParams.get("pgnum") ?? 0)
    const pgsize: number = +(searchParams.get("pgsize") ?? 0)
    const search: string = searchParams.get("search") ?? ""

    const paginatedPosts = await prisma.post.findMany({
        where: {
            OR: [
                {
                    title: {
                        contains: `${search}`,
                        mode: "insensitive"
                    }
                },
                {
                    author: {
                        name: {
                            contains: `${search}`,
                            mode: "insensitive"
                        } 
                    }
                }
            ]
        },
        orderBy: {
            id: 'asc'
        },
        skip: pgnum * pgsize,
        take: pgsize,
        select: {
            id: true,
            title: true,
            description: true, 
            likeNum: true,
            published: true,
            author: {
                select: {
                    id: true,
                    name: true,
                    role: true
                }
            }
        }
    })

    return new Response(JSON.stringify(paginatedPosts));

}