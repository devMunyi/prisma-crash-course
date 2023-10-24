import prisma from "@/lib/prisma";

export async function GET(){
    // const posts = await prisma.post.findMany({
    //     where: {
    //         OR:[
    //             {
    //                 title: {
    //                     contains: "Twitter",
    //                     mode: "insensitive"
    //                 }
    //             },
    //             {
    //                 title: {
    //                     contains: "github",
    //                     mode: "insensitive"
    //                 }
    //             }
    //         ],
    //         AND: {
    //             published: true
    //         }
    //     }
    // });

    const posts = await prisma.post.findMany({
        where: {
            author: {
                isNot: {
                    name: {
                        contains: "jack",
                        mode: "insensitive"
                    }
                },
                is: {
                    role: "ADMIN"
                }
            },
        },
        select: {
            id: true,
            title: true,
            author: {
                select: {
                    id: true, 
                    name: true
                }
            }
        }
    })

    return new Response(JSON.stringify(posts));
}