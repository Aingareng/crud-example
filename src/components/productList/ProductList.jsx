import { useEffect, useState } from "react";
import Card from "../Card/Card";
import "./productList.css";
import { useProduct } from "../../context/product";
import { useToggle } from "../../context/togglePopUp";
import { useSearch } from "../../context/searchContext";

const ProductList = () => {
  const product = useProduct();
  const [products, setProducts] = useState([]);
  const toggle = useToggle();
  const search = useSearch();

  const searchProducts = (products, searchKeyword) => {
    return products.filter((product) => {
      return product.productName.toLowerCase() === searchKeyword.toLowerCase();
    });
  };

  useEffect(() => {
    const handleProduct = () => {
      const existingData =
        JSON.parse(localStorage.getItem("productStorage")) || [];
      const searching = searchProducts(existingData, search);
      return searching.length > 0 ? searching : existingData;
    };

    const res = handleProduct();
    setProducts(res);
  }, [search, toggle, product]);

  return (
    <section className="overflow-auto custom-scrollbar  shadow-inner rounded-lg w-[60%] h-[85%] mx-auto my-[10px]  p-[10px]">
      <ul className="flex gap-[24px] flex-wrap justify-start">
        {products.map((prod, index) => {
          return (
            <li key={index} className="flex gap-[24px]  w-[30%] ">
              <Card
                productName={prod.productName}
                purchasePrice={prod.purchasePrice}
                sellingPrice={prod.sellingPrice}
                productStock={String(prod.productStock)}
                productImage={prod.productImage.imageURL}
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default ProductList;
