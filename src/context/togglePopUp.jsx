/* eslint-disable react-refresh/only-export-components */
import { useReducer, createContext, useContext } from "react";
import PropTypes from "prop-types";

const ToggleContext = createContext(null);
const ToggleDispatchContext = createContext(null);

const initialToggleState = "none";

function toggleReducer(state, action) {
  switch (action.type) {
    case "ON":
      return (state = action.payload);
    case "OFF":
      return (state = action.payload);

    default:
      break;
  }
}

const ToggleProvider = ({ children }) => {
  const [toggle, disptach] = useReducer(toggleReducer, initialToggleState);
  return (
    <ToggleContext.Provider value={toggle}>
      <ToggleDispatchContext.Provider value={disptach}>
        {children}
      </ToggleDispatchContext.Provider>
    </ToggleContext.Provider>
  );
};

export default ToggleProvider;

ToggleProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useToggle() {
  return useContext(ToggleContext);
}
export function useToggleDispatch() {
  return useContext(ToggleDispatchContext);
}
