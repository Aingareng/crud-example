/* eslint-disable no-unused-vars */
// import React from 'react'

import { editIcon, deleteIcon } from "../../assets/icons";
import PropTypes from "prop-types";
import { formatCurrency } from "../../utils/formatCurrency";
import { fetchProductList, postProductList } from "../../utils/productAPI";
import _ from "lodash";
import { useEffect } from "react";
import { useProductDispatch, useProduct } from "../../context/product";
import { useToggleModeDispatch, useToggleMode } from "../../context/toggleMode";
import handleFieldValue from "../../utils/handleFieldValue";
import { useFieldValueDispatch } from "../../context/fieldValue";

const Card = ({
  productName,
  purchasePrice,
  sellingPrice,
  productStock,
  productImage,
}) => {
  const fieldValueDispatch = useFieldValueDispatch();
  const product = useProduct();
  const productDispatch = useProductDispatch();
  const toggleModeDispatch = useToggleModeDispatch();

  function handleDeleteProduct() {
    const confirm = window.confirm("Anda yakin dihapus ?");
    if (confirm) {
      const products = fetchProductList("productStorage");
      const findProduct = _.find(
        products,
        (item) => item.productName === productName
      );
      if (findProduct) {
        const indexRemove = products.indexOf(findProduct);
        products.splice(indexRemove, 1);
      }
      productDispatch({
        type: "DELETE",
        payload: products,
      });
      postProductList("productStorage", products);
    }
  }
  function handleEditProduct() {
    toggleModeDispatch({ type: "ISUPDATE", payload: "update" });
    const productStorage = fetchProductList("productStorage");
    const result = handleFieldValue(productStorage, productName);
    fieldValueDispatch({
      type: "FIND",
      payload: result,
    });
  }

  useEffect(() => {}, [product]);

  return (
    <section className="group relative shadow-lg rounded-lg w-full h-full p-[10px] box-border ">
      <div className="w-full relative h-[200px] overflow-hidden">
        <img
          className="object-cover object-center rounded-lg w-full h-full  overflow-hidden"
          src={productImage}
          alt="Foto product"
        />
        <p className="truncate bottom-0 backdrop-opacity-10 font-medium   absolute hover:text-clip pl-[5px]">
          {productName}
        </p>
      </div>
      <div className="pl-[5px] py-[10px]">
        <p className="truncate hover:text-clip">
          Hagra beli : {formatCurrency(purchasePrice)}
        </p>
        <p className="truncate hover:text-clip">
          Hagra jual : {formatCurrency(sellingPrice)}
        </p>
      </div>
      <div className="absolute top-2 right-2 h-full flex flex-col gap-[10px] p-[5px] opacity-0 ease-in duration-[300ms] group-hover:opacity-100">
        <button onClick={handleDeleteProduct}>
          <img className="w-[30px]" src={deleteIcon} alt="delete icon" />
        </button>
        <button onClick={handleEditProduct}>
          <img className="w-[30px] " src={editIcon} alt="edit icon" />
        </button>
      </div>
      <p className="bg-white absolute top-3 p-[4px] rounded-md text-sm left-3">
        STOK {productStock}
      </p>
    </section>
  );
};
Card.propTypes = {
  productName: PropTypes.string.isRequired,
  purchasePrice: PropTypes.string.isRequired,
  sellingPrice: PropTypes.string.isRequired,
  productStock: PropTypes.string.isRequired,
  productImage: PropTypes.string.isRequired,
};

export default Card;
