import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import TextField from '@mui/material/TextField';
import { Box } from "@mui/material";

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
    <Box sx={{display: "flex", justifyContent: "space-between", columnGap: 2}}>
      <TextField
        sx={{flexGrow: 1}}
        label={'Enter a title'}
        variant={'outlined'}
        value={itemTitle}
        size={'small'}
        error={!!error}
        helperText={error}
        onChange={changeInputHandler}
        onKeyDown={createItemOnEnterHandler}/>
      <IconButton
        aria-label="delete"
        size="small"
        color="primary"
        onClick={createItemHandler}
      >
        <AddCircleIcon fontSize="small" />
      </IconButton>
    </Box>
  );
};
