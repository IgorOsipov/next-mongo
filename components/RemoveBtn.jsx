"use client";
import { useRouter } from "next/navigation";
import { HiOutlineTrash } from "react-icons/hi";

const RemoveBtn = ({ id }) => {
  const router = useRouter();
  const removeTopic = async () => {
    const confirmed = confirm("Are you sure?");
    if (!confirmed) return;
    const res = await fetch(`http://localhost:3000/api/topics?id=${id}`, {
      method: "delete",
      headers: { "Content-type": "application/json" },
    });
    if (res.ok) router.refresh();
  };
  return (
    <button onClick={removeTopic} className="text-red-500">
      <HiOutlineTrash size={24} />
    </button>
  );
};

export default RemoveBtn;
