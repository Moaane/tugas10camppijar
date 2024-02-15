import { prisma } from "@/utils/db";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  const { uuid } = params;
  try {
    const res = await prisma.product.delete({ where: { uuid } });
    return NextResponse.json(res);
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(req, { params }) {
  const { uuid } = params;
  try {
    const res = await prisma.product.findUnique({ where: { uuid } });
    return NextResponse.json(res);
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PATCH(req, { params }) {
  const body = await req.json();
  const { uuid, name, description, price, quantity } = body;
  const newProduct = await prisma.product.update({
    where: { uuid },
    data: {
      name: name,
      description: description,
      price: price,
      quantity: quantity,
    },
  });
  return NextResponse.json(newProduct);
}
