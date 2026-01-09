import { useState } from "react";
import supabase from "./supabase-client";

import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { toast } from "sonner";

const AddTodoForm = () => {
  const [toDoItem, setDoToItem] = useState("");
  const [addToDo, setAddToDo] = useState(false);

  const handleAddToDo = async () => {
    setAddToDo(true);

    const newTodo = {
      name: toDoItem,
      isCompleted: false,
    };

    const { error } = await supabase.from("TodoList").insert(newTodo);

    if (error) {
      toast.error("Failed to add todo. Please try again.");
    } else {
      toast.success("Todo added successfully!");
    }

    setDoToItem("");
    setAddToDo(false);
  };

  return (
    <div className="flex gap-2">
      <Input
        type="text"
        placeholder="Add a new todo..."
        value={toDoItem}
        onChange={(e) => setDoToItem(e.target.value)}
      />

      <Button onClick={handleAddToDo} disabled={addToDo}>
        {addToDo ? "Adding..." : "Add"}
      </Button>
    </div>
  );
};

export default AddTodoForm;
