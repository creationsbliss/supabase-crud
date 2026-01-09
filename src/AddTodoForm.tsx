import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";

const AddTodoForm = () => {
  return (
    <div className="flex gap-2">
      <Input type="text" placeholder="Add a new todo..." />
      <Button>Add</Button>
    </div>
  );
};

export default AddTodoForm;
