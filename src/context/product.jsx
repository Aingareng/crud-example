/* eslint-disable react-refresh/only-export-components */
import { createContext, useReducer, useContext } from "react";
import PropTypes from "prop-types";

const ProductContext = createContext(null);
const ProductDispatchContext = createContext(null);

const initialProductState = [];

function productReducer(state, action) {
  if (action.type === "ADD") {
    return [...state, { ...action.payload }];
  }
  if (action.type === "DELETE") {
    return state.filter((item) => item.productName !== action.payload.id);
  }
}

const ProductProvider = ({ children }) => {
  const [product, dispatch] = useReducer(productReducer, initialProductState);
  return (
    <ProductContext.Provider value={product}>
      <ProductDispatchContext.Provider value={dispatch}>
        {children}
      </ProductDispatchContext.Provider>
    </ProductContext.Provider>
  );
};

export default ProductProvider;

ProductProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export function useProduct() {
  return useContext(ProductContext);
}
export function useProductDispatch() {
  return useContext(ProductDispatchContext);
}
