"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function EditTopicForm({ topic }) {
  const [title, setTitle] = useState(topic.title);
  const [description, setDescription] = useState(topic.description);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      alert("Title and Description are required");
    }

    try {
      await fetch(`http://localhost:3000/api/topics/${topic.id}`, {
        method: "put",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ title, description }),
      });
      router.refresh();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        className=" border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Topic Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className=" border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Topic Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button
        type="submit"
        className="bg-green-600 font-bold text-white py-3 px-6 w-fit"
      >
        Update Topic
      </button>
    </form>
  );
}
