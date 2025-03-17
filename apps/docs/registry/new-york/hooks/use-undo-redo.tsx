import { useCallback, useReducer } from "react";

interface HistoryState<T> {
  past: T[];
  present: T;
  future: T[];
}

type HistoryAction<T> =
  | { type: "UNDO" }
  | { type: "REDO" }
  | { type: "SET"; newPresent: T }
  | { type: "CLEAR"; initialPresent: T };

/**
 * A hook that provides undo and redo functionality
 *
 * @param initialPresent The initial value
 * @returns An object with the current state, undo and redo functions, and a setter
 */
export function useUndoRedo<T>(initialPresent: T) {
  const initialState: HistoryState<T> = {
    past: [],
    present: initialPresent,
    future: [],
  };

  const [state, dispatch] = useReducer(
    (state: HistoryState<T>, action: HistoryAction<T>): HistoryState<T> => {
      const { past, present, future } = state;

      switch (action.type) {
        case "UNDO": {
          if (past.length === 0) return state;

          const previous = past[past.length - 1];
          const newPast = past.slice(0, past.length - 1);

          return {
            past: newPast,
            present: previous,
            future: [present, ...future],
          };
        }

        case "REDO": {
          if (future.length === 0) return state;

          const next = future[0];
          const newFuture = future.slice(1);

          return {
            past: [...past, present],
            present: next,
            future: newFuture,
          };
        }

        case "SET": {
          const { newPresent } = action;

          if (newPresent === present) return state;

          return {
            past: [...past, present],
            present: newPresent,
            future: [],
          };
        }

        case "CLEAR": {
          return {
            ...initialState,
            present: action.initialPresent,
          };
        }
      }
    },
    initialState
  );

  const canUndo = state.past.length !== 0;
  const canRedo = state.future.length !== 0;

  const undo = useCallback(() => {
    if (canUndo) {
      dispatch({ type: "UNDO" });
    }
  }, [canUndo]);

  const redo = useCallback(() => {
    if (canRedo) {
      dispatch({ type: "REDO" });
    }
  }, [canRedo]);

  const set = useCallback((newPresent: T) => {
    dispatch({ type: "SET", newPresent });
  }, []);

  const clear = useCallback(() => {
    dispatch({ type: "CLEAR", initialPresent });
  }, [initialPresent]);

  return {
    state: state.present,
    set,
    undo,
    redo,
    clear,
    canUndo,
    canRedo,
    history: state,
  };
}
