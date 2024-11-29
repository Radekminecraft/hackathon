import prisma from "@/utils/prisma.client";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
    if(req.method != "POST") {
        res.status(400).json({ message: "Wrong request type"})
        return;
    }
    let body = JSON.parse(JSON.stringify(req.body));
    if(!body.animal || !body.inside) return res.status(401).json({ message: "Animal missing"})
    let animal = await prisma.animal.update({
        where: {
            type: body.animal
        },
        data: {
            inside: parseInt(body.inside)
        }
    })
    console.log("Updating animal!")
    return res.status(200).json({ message: "Animal updated!" })
}
  