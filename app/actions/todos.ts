"use server";

import { auth } from "@/lib/auth";
import clientPromise from "@/lib/mongodb";
import { createTodoSchema, createTodoType } from "@/lib/validation";
import { ObjectId } from "mongodb";
import { headers } from "next/headers";

export async function fetchTodos() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    return { success: false, data: null };
  }
  const userId = session?.user.id;

  const client = await clientPromise;
  const db = client.db("drag-todos");

  const rawTodos = await db
    .collection("todos")
    .find({ userId: userId })
    .toArray();

  // Transform the array to make it "Safe" for Next.js Client Components
  const todos = rawTodos.map((todo) => ({
    ...todo,
    _id: todo._id.toString(), // ✅ Convert ObjectId to simple string
    // If you have dates, convert them too:
    // createdAt: todo.createdAt.toISOString()
  }));
  return { success: true, data: todos };
}

export async function insertTodo(todo: createTodoType) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    return { success: false };
  }
  const userId = session?.user.id;

  const safeData = createTodoSchema.safeParse(todo)
  if (!safeData.success) {
    return { success: false };
  }

  const client = await clientPromise;
  const db = client.db("drag-todos");

  const result = await db
    .collection("todos")
    .insertOne({ ...safeData.data, userId: userId });
  return { ...safeData.data, insertedId: result.insertedId.toString() };
}

export async function updateTodo(_id: string, edited: boolean | string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    return { success: false };
  }

  const client = await clientPromise;
  const db = client.db("drag-todos");

  if (typeof edited === "boolean") {
    await db
      .collection("todos")
      // 2. Fix ID and Value
      // Use _id with ObjectId(id) for standard MongoDB lookups
      // Remove '!' if 'edited' is already the new value
      .updateOne({ _id: new ObjectId(_id) }, { $set: { checked: !edited } });
  } else {
    // If it's not a boolean, we assume it's the status string
    await db
      .collection("todos")
      .updateOne({ _id: new ObjectId(_id) }, { $set: { status: edited } });
  }
  return { success: true };
}

export async function deleteTodo(_id: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    return { success: false };
  }

  const client = await clientPromise;
  const db = client.db("drag-todos");

  await db.collection("todos").deleteOne({ _id: new ObjectId(_id) });
  return { success: true };
}
