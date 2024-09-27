import { memo, useCallback } from "react";
import {
  Status,
  useTodosContext,
  type TodoItem,
} from "../hooks/TodosContext.provider";
import { Mochiy_Pop_One } from "next/font/google";
import { RxCross2 } from "react-icons/rx";

const mochiy = Mochiy_Pop_One({ weight: "400", subsets: ["latin"] });

function TodoItem({ data, id, status }: TodoItem) {
  const { removeItem, markComplete } = useTodosContext();

  const removeTodo = useCallback(() => {
    removeItem(id);
  }, [id, removeItem]);

  const completeTodo = useCallback(() => {
    markComplete(id);
  }, [id, markComplete]);

  return (
    <div
      className={`${mochiy.className} ${
        status === Status.COMPLETED ? "line-through bg-[#5A639C]" : ""
      } ${
        status === Status.PENDING ? "bg-cyan-700" : ""
      }  rounded-tl-[30px] rounded-br-[30px] my-3 p-5 flex justify-between items-center hover:cursor-pointer gap-3`}
      onClick={completeTodo}
    >
      <p className="break-words grow max-w-[80%]">{data}</p>

      <button
        onClick={removeTodo}
        className={`h-10 w-10 grid place-content-center rounded-full ${
          status === Status.PENDING ? "bg-[#6295A2]" : ""
        } ${status === Status.COMPLETED ? "bg-[#624E88]" : ""}`}
      >
        <RxCross2 size={25} color="black" />
      </button>
    </div>
  );
}

export default memo(TodoItem);
