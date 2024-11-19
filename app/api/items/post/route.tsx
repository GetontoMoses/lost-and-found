import { NextResponse } from "next/server";
import connectToDatabase from "../../../../lib/mongo";
import Item from "../../../../models/items";

export async function POST(request: Request) {
  try {
    await connectToDatabase();

    const { name, description, imageUrl, location } = await request.json(); // Parse the request body

    const item = new Item({ name, description, imageUrl, location });
    await item.save();

    return NextResponse.json(
      { message: "Item added successfully", item },
      { status: 201 }
    );
  } catch (error) {
    console.error("error: Item not added", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }
    );
  }
}
