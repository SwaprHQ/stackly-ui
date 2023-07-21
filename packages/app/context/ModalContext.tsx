"use client";

import { createContext, useContext, ReactNode, useState } from "react";

type ModalId = "stack" | "tokenPicker";

export interface ModalContextProps {
  modalToOpen: ModalId | null;
  closeModal: () => void;
  openModal: (id: ModalId) => void;
}

export const ModalContext = createContext<ModalContextProps>({
  modalToOpen: null,
  closeModal: () => {},
  openModal: (id: ModalId) => {},
});

export interface ModalContextProviderProps {
  children: ReactNode;
}

export const ModalContextProvider = ({
  children,
}: ModalContextProviderProps) => {
  const [modalToOpen, setModalToOpen] = useState<ModalId | null>(null);

  const closeModal = () => {
    setModalToOpen(null);
  };

  const openModal = (id: ModalId) => {
    setModalToOpen(id);
  };

  return (
    <ModalContext.Provider value={{ modalToOpen, closeModal, openModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => useContext(ModalContext);
