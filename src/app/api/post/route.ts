import prisma from "@/lib/prisma";

export async function GET(){
    const posts = await prisma.post.findMany({
        where: {
            OR:[
                {
                    title: {
                        contains: "Twitter",
                        mode: "insensitive"
                    }
                },
                {
                    title: {
                        contains: "github",
                        mode: "insensitive"
                    }
                }
            ],
            AND: {
                published: true
            }
        }
    });
    return new Response(JSON.stringify(posts));
}