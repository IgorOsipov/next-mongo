import { NextResponse } from "next/server";
import connectMongoDb from "../../../../libs/mongodb";
import Topic from "../../../../models/topic";

export async function PUT(request, { params }) {
  const { id } = params;
  const { title, description } = await request.json();
  await connectMongoDb();
  await Topic.findByIdAndUpdate(id, { title, description });
  return NextResponse.json(
    { success: true, message: "Topic Updated" },
    { status: 200 }
  );
}

export async function GET(request, { params }) {
  const { id } = params;
  await connectMongoDb();
  const topic = await Topic.findOne({ _id: id });
  return NextResponse.json({ success: true, data: topic }, { status: 200 });
}
