'use client'

import React, { createContext, useState, useContext, ReactNode } from 'react';

type SavedNumbersContextType = {
  savedSets: number[][];
  addSavedSet: (set: number[]) => void;
};

const SavedNumbersContext = createContext<SavedNumbersContextType | undefined>(undefined);

export function SavedNumbersProvider({ children }: { children: ReactNode }) {
  const [savedSets, setSavedSets] = useState<number[][]>([]);

  const addSavedSet = (set: number[]) => {
    setSavedSets(prevSets => [...prevSets, set]);
  };

  return (
    <SavedNumbersContext.Provider value={{ savedSets, addSavedSet }}>
      {children}
    </SavedNumbersContext.Provider>
  );
}

export function useSavedNumbers() {
  const context = useContext(SavedNumbersContext);
  if (context === undefined) {
    throw new Error('useSavedNumbers must be used within a SavedNumbersProvider');
  }
  return context;
}