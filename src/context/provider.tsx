import { GlobalContext } from "./context";

interface ContextProps {
  value?: Record<string, string>;
  children: JSX.Element | JSX.Element[];
  use?: React.Context<{}>;
}

/**
 * 提供context
 */
export function Context(props: ContextProps) {
  const { value, children, use } = props;
  const UseContext = use || GlobalContext;
  const providerValue = value || {};

  return (
    <UseContext.Provider value={providerValue}>{children}</UseContext.Provider>
  );
}
