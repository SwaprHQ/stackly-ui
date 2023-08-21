"use client";

import {
  createContext,
  useContext,
  ReactNode,
  useMemo,
  useReducer,
} from "react";

export enum ModalId {
  CONFIRM_STACK = "confirm_stack",
  STACK = "stack",
  TOKEN_PICKER = "token_picker",
  CANCEL_STACK_CONFIRM = "cancel_stack_confirm",
  CANCEL_STACK_PROCESSING = "cancel_stack_processing",
  CANCEL_STACK_SUCCESS = "cancel_stack_success",
  SUCCESS_STACK_TOAST = "success_stack_toast",
  STACK_APPROVE_PROCESSING = "stack_approve_processing",
  STACK_CREATION_PROCESSING = "stack_creation_processing",
}

enum ActionType {
  ADD = "add",
  REMOVE = "remove",
}

export interface ModalContextProps {
  closeModal: (id: ModalId) => void;
  openModal: (id: ModalId) => void;
  isModalOpen: (id: ModalId) => boolean;
}

export const ModalContext = createContext<ModalContextProps>({
  closeModal: (id: ModalId) => {},
  openModal: (id: ModalId) => {},
  isModalOpen: (id: ModalId) => false,
});

export interface ModalContextProviderProps {
  children: ReactNode;
}

type Action = { id: ModalId; type: ActionType };

function ModalReducer(openModals: ModalId[], action: Action) {
  switch (action.type) {
    case ActionType.ADD: {
      return [...openModals, action.id];
    }
    case ActionType.REMOVE: {
      return openModals.filter((modal: string) => modal !== action.id);
    }
    default: {
      console.error("Unknown modal action: " + action.type);
      return openModals;
    }
  }
}

export const ModalContextProvider = ({
  children,
}: ModalContextProviderProps) => {
  const [openModals, dispatch] = useReducer(ModalReducer, []);

  const openModal = (modalId: ModalId) => {
    dispatch({
      type: ActionType.ADD,
      id: modalId,
    });
  };

  const closeModal = (modalId: ModalId) => {
    dispatch({
      type: ActionType.REMOVE,
      id: modalId,
    });
  };

  const modalContext = useMemo(() => {
    const isModalOpen = (modalId: ModalId) => openModals.includes(modalId);

    return {
      closeModal,
      openModal,
      isModalOpen,
    };
  }, [openModals]);

  return (
    <ModalContext.Provider value={modalContext}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => useContext(ModalContext);
