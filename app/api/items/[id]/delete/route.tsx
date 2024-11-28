import { NextResponse } from "next/server";
import connectToDatabase from "../../../../../lib/mongo";
import Item from "../../../../../models/items";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  // Await the params before accessing the `id`
  const { id } = await params; // Ensure `params` are properly awaited

  // Validate the ID
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return NextResponse.json({ error: "Invalid item ID" }, { status: 400 });
  }

  // Connect to the database
  await connectToDatabase();

  try {
    // Delete the item by ID
    const result = await Item.findByIdAndDelete(id);

    // Check if the item existed
    if (!result) {
      return NextResponse.json(
        { error: "Item not found or already deleted" },
        { status: 404 }
      );
    }

    // Return success response
    return NextResponse.json({
      message: "Item deleted successfully",
      item: result, // Return the deleted item for reference
    });
  } catch (error) {
    console.error("Error deleting item:", error);
    return NextResponse.json(
      { error: "An error occurred while deleting the item" },
      { status: 500 }
    );
  }
}
