import { NextResponse } from "next/server";
import connectToDatabase from "../../../../lib/mongo";
import Item from "../../../../models/items";

export async function GET() {
  try {
    await connectToDatabase();

    // Fetch all items from the database
    const items = await Item.find();

    if (!items) {
      return NextResponse.json({ message: "No items found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Items fetched successfully", items },
      { status: 200 }
    );
  } catch (error) {
    console.error("Fetching items error:", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }
    );
  }
}
