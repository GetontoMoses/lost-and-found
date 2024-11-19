// app/api/items/[id]/route.ts
import { NextResponse } from "next/server";
import connectToDatabase from "../../../../lib/mongo"; // Adjust the path if needed
import Item from "../../../../models/items";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params; // Extract the 'id' from URL params

  // Connect to the database
  await connectToDatabase();

  try {
    // Find the item by its ID
    const item = await Item.findById(id);

    // Check if item exists
    if (!item) {
      return NextResponse.json({ message: "Item not found" }, { status: 404 });
    }

    // Return the item
    return NextResponse.json(
      {
        message: "Item found successfully",
        item: item,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching item by ID:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching the item" },
      { status: 500 }
    );
  }
}
