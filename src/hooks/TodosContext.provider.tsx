import {
  createContext,
  ReactNode,
  startTransition,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const KEY = "TODOS";

function getId() {
  return Math.random().toString(32).substring(2, 8);
}

export enum Status {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
}

export type TodoItem = { data: string; id: string; status: Status };

interface TodosContextType {
  todos: Array<TodoItem>;
  addItem: (item: string) => void;
  removeItem: (id: string) => void;
  markComplete: (id: string) => void;
  filter: (status?: Status) => void;
}

const TodosContext = createContext<TodosContextType | undefined>(undefined);

export const TodosProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Array<TodoItem>>([]);
  const [status, setStatus] = useState<Status>();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const savedTodos = localStorage.getItem(KEY);

    if (savedTodos) setTodos(JSON.parse(savedTodos));
  }, []);

  const syncLocalStorage = useCallback((todos: Array<TodoItem>) => {
    localStorage.setItem(KEY, JSON.stringify(todos));

    return todos;
  }, []);

  const addItem = useCallback(
    (item: string) => {
      startTransition(() => {
        setTodos((items) =>
          syncLocalStorage([
            ...items,
            { data: item, id: getId(), status: Status.PENDING },
          ])
        );
      });
    },
    [syncLocalStorage]
  );

  const removeItem = useCallback(
    (id: string) => {
      startTransition(() => {
        setTodos((items) => syncLocalStorage(items.filter((i) => id !== i.id)));
      });
    },
    [syncLocalStorage]
  );

  const markComplete = useCallback((id: string) => {
    startTransition(() => {
      setTodos((items) =>
        items.map((item) =>
          item.id === id ? { ...item, status: Status.COMPLETED } : item
        )
      );
    });
  }, []);

  const filter = useCallback((status?: Status) => {
    console.log(status);
    startTransition(() => {
      setStatus(status);
    });
  }, []);

  const memoizedValue = useMemo(
    () => (status ? todos.filter((item) => item.status === status) : todos),
    [todos, status]
  );

  return (
    <TodosContext.Provider
      value={{
        todos: memoizedValue,
        addItem,
        removeItem,
        markComplete,
        filter,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};

export const useTodosContext = () => {
  const context = useContext(TodosContext);
  if (!context) {
    throw new Error("useTodosContext must be used within a TodosProvider");
  }
  return context;
};
