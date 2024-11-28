"use server";

import { NextResponse } from "next/server";
import connectToDatabase from "../../../../lib/mongo";
import Item from "../../../../models/items";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const searchQuery = url.searchParams.get("search") || ""; // Default to empty string if no query

  // Connect to the database
  await connectToDatabase();

  try {
    //case-insensitive search across multiple fields
    const items = await Item.find({
      $or: [
        { name: { $regex: searchQuery, $options: "i" } }, // Search in 'name' field
        { description: { $regex: searchQuery, $options: "i" } }, // Search in 'description' field
        { category: { $regex: searchQuery, $options: "i" } }, // Search in 'category' field
      ],
    });

    // Return response based on search result
    if (items.length === 0) {
      return NextResponse.json({ message: "No items found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        message: "Items found successfully",
        items: items,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching items:", error);
    return NextResponse.json(
      { error: "An error occurred while searching for items" },
      { status: 500 }
    );
  }
}
