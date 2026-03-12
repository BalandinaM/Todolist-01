import TextField from "@mui/material/TextField";
import { useState } from "react"

type Props = {
    value: string;
    onChange: (title: string) => void;
}

export const EditableTitle = ({value, onChange}: Props) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [title, setTitle] = useState(value);
  const [error, setError] = useState<string | null>(null);

  const turnOnEditMode = () => {
    setIsEditMode(true)
  }

  const turnOffEditMode = () => {
    if (title.trim() !== "") {
      onChange(title);
      setIsEditMode(false)
    } else {
      setError("Title is required");
    }
  }

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Enter") {
      turnOffEditMode();
    }
  };

  const changeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null)
    setTitle(e.currentTarget.value);
  };

  return (
    <>
      {isEditMode ? (
        <TextField label={'Enter a title'}
                variant={'standard'}
                value={title}
                size={'small'}
                error={!!error}
                helperText={error}
                onBlur={turnOffEditMode}
                onChange={changeInputHandler}
                onKeyDown={handleKeyDown}
        />
      ) : (
        <span onDoubleClick={turnOnEditMode}>{title}</span>
      )}
    </>
  );
}
