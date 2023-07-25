"use client";

import { createContext, useContext, ReactNode, useState, useMemo } from "react";

export enum ModalId {
  CONFIRM_STACK = "confirmStack",
  STACK = "stack",
  TOKEN_PICKER = "tokenPicker",
}

export interface ModalContextProps {
  openModalId: ModalId | null;
  closeModal: () => void;
  openModal: (id: ModalId) => void;
}

export const ModalContext = createContext<ModalContextProps>({
  openModalId: null,
  closeModal: () => {},
  openModal: (id: ModalId) => {},
});

export interface ModalContextProviderProps {
  children: ReactNode;
}

export const ModalContextProvider = ({
  children,
}: ModalContextProviderProps) => {
  const [openModalId, setOpenModalId] = useState<ModalId | null>(null);

  const modalContext = useMemo(
    () => ({
      closeModal: () => setOpenModalId(null),
      openModal: (id: ModalId) => setOpenModalId(id),
      openModalId,
    }),
    [openModalId]
  );

  return (
    <ModalContext.Provider value={modalContext}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => useContext(ModalContext);
