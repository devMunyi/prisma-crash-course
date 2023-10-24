import prisma from "@/lib/prisma";

export async function GET(request: Request) {
    // let searchTerm: string = "sAM".toLowerCase();

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

    // const users = await prisma.user.findMany({
    //     where: {
    //         posts: {
    //             none: {
    //                 published: true,
    //             },
    //             some: {
    //                 id: {
    //                   gt: 0,
    //                 },
    //             }
    //         }
    //     },       
    //     include: {
    //         posts: {
    //             where: {
    //                 id: {
    //                     gt: 0
    //                 }
    //             }
    //         },
    //     }
        
    // })

    return new Response(JSON.stringify(users));
}