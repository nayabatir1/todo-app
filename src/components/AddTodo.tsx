import React, { memo, useCallback, useState } from "react";
import { IoSend } from "react-icons/io5";
import { Roboto_Mono } from "next/font/google";
import { useTodosContext } from "../hooks/TodosContext.provider";

const roboto = Roboto_Mono({ weight: "400", subsets: ["latin"] });

function AddTodo() {
  const [input, setInput] = useState("");

  const { addItem } = useTodosContext();

  const handleOnChange: React.ChangeEventHandler<HTMLInputElement> =
    useCallback((e) => {
      setInput(e.target.value);
    }, []);

  const submit: React.FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();

      if (!input) return;

      addItem(input);
      setInput("");
    },
    [addItem, input]
  );

  return (
    <div className=" flex items-stretch py-3 px-5  rounded-lg rounded-b-none bg-[#3468C0] h-[70px] gap-5">
      <form className="w-full flex justify-between items-end" onSubmit={submit}>
        <input
          className={`${roboto.className} w-full bg-inherit outline-none border-b-2 text-lg`}
          placeholder="Add toto items"
          value={input}
          onChange={handleOnChange}
          maxLength={40}
        />
        <button className="self-center" type="submit">
          <IoSend size={20} color="#D2E0FB" />
        </button>
      </form>
    </div>
  );
}

export default memo(AddTodo);
