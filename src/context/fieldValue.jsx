/* eslint-disable react-refresh/only-export-components */
import { createContext, useReducer, useContext } from "react";
import PropTypes from "prop-types";

const FieldValueContext = createContext(null);
const FieldValueDispatchContext = createContext(null);

const intitialState = {};

const fieldValueReducer = (state, action) => {
  switch (action.type) {
    case "FIND":
      return { ...state, ...action.payload };
  }
};

const FieldValueProvider = ({ children }) => {
  const [fieldValue, dispatch] = useReducer(fieldValueReducer, intitialState);
  return (
    <FieldValueContext.Provider value={fieldValue}>
      <FieldValueDispatchContext.Provider value={dispatch}>
        {children}
      </FieldValueDispatchContext.Provider>
    </FieldValueContext.Provider>
  );
};

FieldValueProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FieldValueProvider;

export function useFieldValue() {
  return useContext(FieldValueContext);
}
export function useFieldValueDispatch() {
  return useContext(FieldValueDispatchContext);
}
