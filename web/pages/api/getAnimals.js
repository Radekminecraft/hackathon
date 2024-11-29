import prisma from "@/utils/prisma.client";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
    if(req.method != "GET") {
        res.status(400).json({ message: "Wrong request type"})
        return;
    }
    let body = JSON.parse(JSON.stringify(req.body));
    let animal = await prisma.animal.findMany()
    return res.status(200).json({ animals: animal })
}
  