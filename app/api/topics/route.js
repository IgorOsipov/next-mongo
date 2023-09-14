import { NextResponse } from "next/server";
import connectMongoDB from "../../../libs/mongodb";
import Topic from "../../../models/topic";

export async function POST(request) {
  const { title, description } = await request.json();
  await connectMongoDB();
  await Topic.create({ title, description });
  return NextResponse.json(
    { success: true, message: "Topic Created" },
    { status: 201 }
  );
}

export async function GET() {
  await connectMongoDB();
  const topics = await Topic.find();
  return NextResponse.json({ success: true, data: topics });
}

export async function DELETE(request) {
  const id = await request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Topic.findByIdAndDelete(id);
  return NextResponse.json(
    {
      success: true,
      message: "Topice Deleted",
    },
    {
      status: 200,
    }
  );
}
