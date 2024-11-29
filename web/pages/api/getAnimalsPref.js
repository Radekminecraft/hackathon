import prisma from "@/utils/prisma.client";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  if (req.method != "POST") {
    res.status(400).json({ message: "Wrong request type" });
    return;
  }

  let body = JSON.parse(JSON.stringify(req.body)); //1 == kid
  console.log(body)
  if (!body.time || !body.animal || !body.isKid) return res.status(401).json({ message: "nah get out" });
  const now = new Date();
  const yesterday = new Date(now);
  const hour = parseInt(body.time, 10) || 0
  yesterday.setDate(now.getDate() - 1);
  const dayBeforeYesterday = new Date(now);
  dayBeforeYesterday.setDate(now.getDate() - 2);
  
  console.log(body.isKid)
  const filteredUpdates = (updates, targetDate) =>
    updates.filter((update) => {
      const updateDate = new Date(update.updateAt);
      return (
        updateDate.getDate() == targetDate.getDate() &&
        updateDate.getHours() == hour
      );
    });
  let animals = await prisma.animal.findMany({
    include: {
        articles: true,
        updates: true
    }
  })
  const averages = animals.map((animal, index) => {
    if(index > 2 && body.isKid == "1") {
        return null;
    }
    const updates = animal.updates;
    const yesterdayUpdates = filteredUpdates(updates, yesterday);
    const dayBeforeUpdates = filteredUpdates(updates, dayBeforeYesterday);
    const values = [
      ...yesterdayUpdates.map((u) => u.animalsIn),
      ...dayBeforeUpdates.map((u) => u.animalsIn),
    ];
    if (values.length === 0) return null;
    const avg =
      values.reduce((sum, count) => sum + count, 0) / values.length;
    return { type: animal.type, average: avg, max: animal.max };
  });
  console.log(averages)
  // Sort the array
  const sortedAverages = averages
    .filter((item) => item !== null) // Remove null values
    .sort((a, b) => {
      if (a.type === body.animal) return -1; // Place the body animal first
      if (b.type === body.animal) return 1;  // Ensure consistent sorting
      return b.average - a.average; // Sort by average in descending order
    });
  console.log("APIIIIIIIIIIIIIIIIIIIIIIIIIIIII")
  console.log(sortedAverages)
  return res.status(200).json({ animals: sortedAverages });
}
