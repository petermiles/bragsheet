import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id as string;

  const bragSheet = await prisma.bragSheet.findUnique({
    where: { id },
    include: {
      brags: true,
    },
  });

  if (!bragSheet) {
    res.status(404).json({ message: "Brag sheet not found" });
    return;
  }

  res.status(200).json(bragSheet);
}
