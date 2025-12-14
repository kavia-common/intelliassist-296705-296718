import React, { createContext, useContext, useState, useMemo } from 'react';

/**
 * PUBLIC_INTERFACE
 * ProcessingContext
 * Provides application-wide state for processing flow:
 * - hasProcessed: whether initial processing has completed
 * - setHasProcessed: setter to update the value
 */
const ProcessingContext = createContext({
  hasProcessed: false,
  setHasProcessed: () => {},
});

/**
 * PUBLIC_INTERFACE
 * ProcessingProvider
 * Wrap children with processing state.
 */
export function ProcessingProvider({ children }) {
  const [hasProcessed, setHasProcessed] = useState(false);

  const value = useMemo(() => ({ hasProcessed, setHasProcessed }), [hasProcessed]);

  return (
    <ProcessingContext.Provider value={value}>
      {children}
    </ProcessingContext.Provider>
  );
}

/**
 * PUBLIC_INTERFACE
 * useProcessing
 * Hook to access processing context state.
 */
export function useProcessing() {
  return useContext(ProcessingContext);
}

export default ProcessingContext;
