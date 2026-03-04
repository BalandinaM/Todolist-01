import { useState } from "react";
import { Button } from "./Button";

export type CreateItemFormProps = {
  onCreateItem: (title: string) => void;
};

export const CreateItemForm = (props: CreateItemFormProps) => {
  const [itemTitle, setItemTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  const createItemHandler = () => {
    if (itemTitle.trim() !== "") {
      props.onCreateItem(itemTitle);
      setItemTitle("");
    } else {
      setError("Title is required");
    }
  };

  const changeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItemTitle(e.currentTarget.value);
    setError(null);
  };

  const createItemOnEnterHandler = (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Enter") {
      createItemHandler();
    }
  };

  return (
    <div>
      <input
        value={itemTitle}
        onChange={changeInputHandler}
        onKeyDown={createItemOnEnterHandler}
        className={error ? "error" : ""}
      />
      <Button title="+" onClick={createItemHandler} />
      {error && <div className={"error-message"}>{error}</div>}
    </div>
  );
};
