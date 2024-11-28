import { NextResponse } from "next/server";
import connectToDatabase from "../../../../../lib/mongo"; 
import Item from "../../../../../models/items"; 

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  // Validate the ID
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return NextResponse.json({ error: "Invalid item ID" }, { status: 400 });
  }

  // Connect to the database
  await connectToDatabase();

  try {
    // Update the item's claimed status
    const result = await Item.findByIdAndUpdate(
      id,
      { $set: { claimed: true } },
      { new: true } // Return the updated document
    );

    // If no item was updated, return a 404 error
    if (!result) {
      return NextResponse.json(
        { error: "Item not found or already claimed" },
        { status: 404 }
      );
    }

    // Return success response
    return NextResponse.json({
      message: "Item marked as claimed successfully",
      item: result,
    });
  } catch (error) {
    console.error("Error claiming item:", error);
    return NextResponse.json(
      { error: "An error occurred while claiming the item" },
      { status: 500 }
    );
  }
}
