/* eslint-disable react-refresh/only-export-components */
import { createContext, useReducer, useContext } from "react";
import PropTypes from "prop-types";

const ToggleModeContext = createContext(null);
const ToggleModeDispatchContext = createContext(null);

const initialToggleModeState = "";

const toggleModeReducer = (state, action) => {
  switch (action.type) {
    case "ISCREATE":
      return (state = action.payload);
    case "ISUPDATE":
      return (state = action.payload);
    case "DEFAULT":
      return (state = action.payload);
  }
};

const ToggleModeProvider = ({ children }) => {
  const [toggleMode, dispatch] = useReducer(
    toggleModeReducer,
    initialToggleModeState
  );
  return (
    <ToggleModeContext.Provider value={toggleMode}>
      <ToggleModeDispatchContext.Provider value={dispatch}>
        {children}
      </ToggleModeDispatchContext.Provider>
    </ToggleModeContext.Provider>
  );
};

ToggleModeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ToggleModeProvider;

export function useToggleMode() {
  return useContext(ToggleModeContext);
}
export function useToggleModeDispatch() {
  return useContext(ToggleModeDispatchContext);
}
