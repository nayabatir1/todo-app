import { memo, useCallback, useState } from "react";
import { FaFilter } from "react-icons/fa";
import { Sofadi_One } from "next/font/google";
import { RxCross2 } from "react-icons/rx";
import { Status, useTodosContext } from "../hooks/TodosContext.provider";

const sofadiOne = Sofadi_One({ weight: "400", subsets: ["latin"] });

const StatusType = [
  { type: "All" },
  {
    type: "Completed",
    value: Status.COMPLETED,
  },
  { type: "Pending", value: Status.PENDING },
];

function Filter() {
  const [showFilter, setShowFilter] = useState(false);
  const { filter } = useTodosContext();

  const toggleFilterPopup = useCallback(() => {
    setShowFilter((p) => !p);
  }, []);

  const filterTodo = useCallback(
    (status?: Status) => {
      filter(status);
      toggleFilterPopup();
    },
    [filter, toggleFilterPopup]
  );

  return (
    <div
      className={`${sofadiOne.className} flex justify-between items-center py-3 px-10 rounded-lg rounded-t-none bg-[#3652AD] relative`}
    >
      <p className="text-2xl">Todo List</p>
      <button
        className="h-[30px] w-[30px] grid place-content-center"
        onClick={toggleFilterPopup}
      >
        <FaFilter size={20} color="#D2E0FB" className="" />
      </button>

      {showFilter && (
        <div className="absolute bg-white right-10  w-[250px] top-3 rounded-lg flex flex-col p-5">
          <div>
            <button
              className="h=[30px] w-[30px] float-end grid place-content-center"
              onClick={toggleFilterPopup}
            >
              <RxCross2 color="black" size={20} />
            </button>
          </div>
          {StatusType.map((s, i) => (
            <p
              key={s.type}
              className={`${
                i !== 0 ? "border-t-2" : ""
              } text-black  py-4 uppercase hover:cursor-pointer`}
              onClick={() => filterTodo(s.value)}
            >
              {s.type}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

export default memo(Filter);
