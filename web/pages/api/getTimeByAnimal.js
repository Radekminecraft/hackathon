import prisma from "@/utils/prisma.client";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
    if(req.method != "POST") {
        res.status(400).json({ message: "Wrong request type"})
        return;
    }
    let body = JSON.parse(JSON.stringify(req.body));
    if(!body.animal) return res.status(401).json({ message: "Animal missing"})
    let data = await prisma.data.findMany({
        where: {
            animalType: body.animal
        }
    })
    let animalsInValue = 100000;
    let id = 0;
    let time;
    for(let dat of data) {
        if(dat.animalsIn < animalsInValue) {
            animalsInValue = dat.animalsIn
            id = dat.id
            time = dat.updateAt
        }
    }
    return res.status(200).json({ expected: animalsInValue, time: time })
}
  