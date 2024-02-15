import { prisma } from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET() {
  const res = await prisma.product.findMany();
  return NextResponse.json(res);
}

export async function POST(req) {
  const body = await req.json();
  const { name, description, price, quantity } = body.values;
  const newProduct = await prisma.product.create({
    data: {
      name: name,
      description: description,
      price: price,
      quantity: quantity,
    },
  });
  return NextResponse.json(newProduct);
}

