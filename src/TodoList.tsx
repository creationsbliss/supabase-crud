import { HugeiconsIcon } from "@hugeicons/react";
import { Delete03Icon as DeleteIcon } from "@hugeicons/core-free-icons";

import supabase from "./supabase-client";
import { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./components/ui/button";
import { toast } from "sonner";
import { cn } from "./lib/utils";

interface TodoListsShpape {
  id: number;
  created_at: string;
  name: string;
  isCompleted: boolean;
}

const TodoList = () => {
  const [toDoLists, setToDoLists] = useState<TodoListsShpape[]>([]);

  // Fetch todo list from Supabase
  useEffect(() => {
    const fetchToDos = async () => {
      const { data, error } = await supabase.from("TodoList").select();

      if (error) {
        toast.error("Failed to fetch todos. Please try again.");
        return;
      }

      setToDoLists(data);
    };

    fetchToDos();
  }, [toDoLists]);

  // Handle status change of a todo
  const handleChangeStatus = async (id: number, isCompleted: boolean) => {
    const { error } = await supabase
      .from("TodoList")
      .update({ isCompleted: !isCompleted })
      .eq("id", id);

    if (error) {
      toast.error("Failed to update todo status. Please try again.");
    } else {
      toast.success("Todo status updated successfully!");
      setToDoLists((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, isCompleted: !isCompleted } : todo
        )
      );
    }
  };

  // Handle delete todo
  const handleDelete = async (id: number) => {
    const { error } = await supabase.from("TodoList").delete().eq("id", id);

    if (error) {
      toast.error("Failed to delete todo. Please try again.");
    } else {
      toast.success("Todo deleted successfully!");
      setToDoLists((prev) => prev.filter((todo) => todo.id !== id));
    }
  };

  if (!toDoLists) {
    return <p className="pt-10 text-center">Loading todos...</p>;
  }

  if (toDoLists.length === 0) {
    return <p className="pt-10 text-center">No todos found.</p>;
  }

  return (
    <div className="pt-10">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Todo</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {toDoLists.map(({ id, name, isCompleted }) => (
            <TableRow key={id} className={cn(isCompleted && "line-through")}>
              <TableCell>{name}</TableCell>
              <TableCell>{isCompleted ? "Completed" : "Pending"}</TableCell>
              <TableCell className="flex gap-2 justify-end">
                <Button
                  onClick={() => handleChangeStatus(id, isCompleted)}
                  variant="outline"
                  className="cursor-pointer"
                >
                  {isCompleted ? "Mark as Pending" : "Mark as Complete"}
                </Button>
                <Button
                  onClick={() => handleDelete(id)}
                  variant="destructive"
                  className="cursor-pointer"
                >
                  <HugeiconsIcon icon={DeleteIcon} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TodoList;
