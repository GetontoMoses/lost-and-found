import { NextResponse } from "next/server";
import connectToDatabase from "../../../../lib/mongo";
import User from "../../../../models/user";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
 try {
   await connectToDatabase();

   const { email, password } = await request.json(); // Parse the request body
   const hashedPassword = await bcrypt.hash(password, 10);

   const user = new User({ email, password: hashedPassword });
   await user.save();

   return NextResponse.json(
     { message: "User created successfully" },
     { status: 201 }
   );
 } catch (error) {
   console.error("Error:", error);
   return NextResponse.json(
     { error: (error as Error).message },
     { status: 400 }
   );
 }
}
