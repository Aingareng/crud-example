/* eslint-disable react-refresh/only-export-components */
import { createContext, useReducer, useContext } from "react";
import PropTypes from "prop-types";

const SearchContext = createContext(null);
const SearchDispatchContext = createContext(null);

const initialSearchState = "";

function searchReducer(state, action) {
  switch (action.type) {
    case "SEARCH":
      return (state = action.payload);

    default:
      break;
  }
}

const SearchProvider = ({ children }) => {
  const [Search, dispatch] = useReducer(searchReducer, initialSearchState);
  // console.log(Search);
  return (
    <SearchContext.Provider value={Search}>
      <SearchDispatchContext.Provider value={dispatch}>
        {children}
      </SearchDispatchContext.Provider>
    </SearchContext.Provider>
  );
};

export default SearchProvider;

SearchProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export function useSearch() {
  return useContext(SearchContext);
}
export function useSearchDispatch() {
  return useContext(SearchDispatchContext);
}
