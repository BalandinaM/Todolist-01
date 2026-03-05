import { useState } from "react"

type Props = {
    value: string;
    onChange: (title: string) => void;
}

export const EditableTitle = ({value, onChange}: Props) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [title, setTitle] = useState(value);

  const turnOnEditMode = () => {
    setIsEditMode(true)
  }

  const turnOffEditMode = () => {
    console.log('onBlur')
    setIsEditMode(false)
    onChange(title)
  }

  const changeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  return (
    <>
      {isEditMode ? (
        <input value={title} autoFocus onBlur={turnOffEditMode} onChange={changeInputHandler}/>
      ) : (
        <span onDoubleClick={turnOnEditMode}>{title}</span>
      )}
    </>
  );
}
