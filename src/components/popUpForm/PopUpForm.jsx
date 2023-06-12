/* eslint-disable no-unused-vars */
import { useCallback, useEffect, useState } from "react";
import CurrencyInput from "react-currency-input-field";
import { useToggle, useToggleDispatch } from "../../context/togglePopUp";
import validationForm, {
  uniquenessValidation,
} from "../../utils/formProductValidation";
import { useProductDispatch } from "../../context/product";
import {
  fetchProductList,
  postProductList,
  updateProductList,
} from "../../utils/productAPI";
import { useToggleMode, useToggleModeDispatch } from "../../context/toggleMode";
import { useFieldValue } from "../../context/fieldValue";
import { convertToNumber } from "../../utils/convertToNumber";

const PopUpForm = () => {
  const [stateInput, setStateInput] = useState({
    productName: "",
    purchasePrice: "",
    sellingPrice: "",
    productStock: 0,
    productImage: {
      imageFile: null || "",
      imageURL: "",
    },
  });
  const fieldValue = useFieldValue();
  const toggleMode = useToggleMode();
  const toggleModeDispatch = useToggleModeDispatch();
  const toggle = useToggle();
  const toggleDispatch = useToggleDispatch();
  const productDispatch = useProductDispatch();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageDataURL = event.target.result;
        setStateInput({
          ...stateInput,
          productImage: {
            imageFile: file,
            imageURL: imageDataURL,
          },
        });
        setTimeout(() => {
          e.target.value = "";
        }, 5000);
      };
      reader.readAsDataURL(file);
    }
  };
  const resetForm = () => {
    setStateInput({
      productName: "",
      purchasePrice: "",
      sellingPrice: "",
      productStock: 0,
      productImage: {
        imageFile: null,
        imageURL: "",
      },
    });
  };

  const createProduct = () => {
    if (stateInput.productImage.imageFile) {
      const validate = validationForm(stateInput);

      if (validate.isValid) {
        const data = { ...stateInput };
        const existingData = fetchProductList("productStorage");
        const newData = [...existingData, data];

        const uniqueValidate = uniquenessValidation(stateInput.productName);
        if (uniqueValidate.isUnique) {
          resetForm();
          alert("Produk sudah tersediah !");
          toggleDispatch({
            type: "ON",
            payload: "none",
          });
          return;
        } else {
          if (validate.sizeImage) {
            postProductList("productStorage", newData);
            productDispatch({
              type: "ADD",
              payload: data,
            });
            toggleDispatch({
              type: "ON",
              payload: "none",
            });
            resetForm();
          } else {
            toggleDispatch({
              type: "OFF",
              payload: "",
            });
          }
        }
      } else {
        alert("Tolong lengkapi penginputan");
      }
    } else {
      alert("Tidak ada gambar yang dipilih");
    }
  };
  const updateProduct = () => {
    if (stateInput.productImage.imageFile) {
      const validate = validationForm(stateInput);

      if (validate.isValid) {
        const data = { ...stateInput };
        const existingData = fetchProductList("productStorage");
        // const newData = [...existingData, data];

        const uniqueValidate = uniquenessValidation(
          stateInput.productName,
          stateInput
        );
        if (uniqueValidate.isUnique) {
          resetForm();
          alert("UPDATE");
          toggleDispatch({
            type: "ON",
            payload: "none",
          });
          const findObj = existingData.find(
            (item) => item.productName === stateInput.productName
          );
          console.log(findObj);
          console.log(stateInput.productName);
          if (findObj) {
            updateProductList({ ...existingData[findObj], ...stateInput });
          } else {
            alert("Penginputan Salah, Cek Produk yang ingin diinput");
          }
          return toggleModeDispatch({
            type: "DEFAULT",
            payload: "none",
          });
        }
      } else {
        alert("Tolong lengkapi penginputan");
      }
    } else {
      alert("Tidak ada gambar yang dipilih");
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (toggleMode === "create") {
      createProduct();
    }
    if (toggleMode === "update") {
      updateProduct();
    }
  };
  function handleCancelButton(event) {
    event.preventDefault();
    toggleDispatch({
      type: "OFF",
      payload: "none",
    });
    toggleModeDispatch({
      type: "DEFAULT",
      payload: "none",
    });
  }

  const handleToggleMode = useCallback(() => {
    if (toggleMode === "update") {
      toggleDispatch({
        type: "ON",
        payload: "",
      });
    } else {
      return;
    }
  }, [toggleDispatch, toggleMode]);

  // const handleFieldValue = () => {
  //   const product = {
  //     productName: "",
  //     purchasePrice: "",
  //     sellingPrice: "",
  //     productStock: 0,
  //     productImage: {},
  //   };

  //   if (fieldValue) {
  //     product.productName = fieldValue.productName;
  //     product.purchasePrice = fieldValue.purchasePrice;
  //     product.sellingPrice = fieldValue.sellingPrice;
  //     product.productStock = fieldValue.productStock;
  //     product.productImage = fieldValue.productImage;
  //   }

  //   const {
  //     productName,
  //     purchasePrice,
  //     sellingPrice,
  //     productStock,
  //     productImage,
  //   } = product;
  //   const purchasePriceConvert = convertToNumber(purchasePrice);
  //   const sellingPriceConvert = convertToNumber(sellingPrice);
  //   setTimeout(() => {
  //     return {
  //       productName: "",
  //       purchasePriceConvert: 0,
  //       sellingPriceConvert: 0,
  //       productStock: 0,
  //       productImage: "",
  //     };
  //   }, 1000);
  //   return {
  //     productName,
  //     purchasePriceConvert,
  //     sellingPriceConvert,
  //     productStock,
  //     productImage,
  //   };
  // };

  useEffect(() => {
    handleToggleMode();
  }, [handleToggleMode, stateInput, toggle]);

  return (
    <div
      className="absolute top-0  h-full w-full backdrop-blur-md"
      style={{ display: toggle }}
    >
      <form className=" flex flex-col rounded-md bg-white  items-center justify-center gap-[24px] border-2 h-[60%] w-[50%] mx-auto my-[50px] p-[10px]">
        <label htmlFor="productNameInput" className="flex justify-between">
          <p className="mr-[20px]">Nama Produk</p>
          <input
            className="pl-[5px] border-2 outline-none"
            type="text"
            name="productNameInput"
            id="productNameInput"
            value={stateInput.productName || ""}
            onChange={(e) =>
              setStateInput({ ...stateInput, productName: e.target.value })
            }
          />
        </label>
        <label htmlFor="purchasePrice" className="flex ">
          <p className="mr-[10px] ">Harga beli</p>
          <div className=" ml-[30px]  ">
            <CurrencyInput
              className="border-2 outline-none"
              prefix="Rp. "
              decimalsLimit={0}
              allowNegativeValue={false}
              decimalSeparator="."
              groupSeparator=","
              decimalScale={2}
              fixedDecimalLength={true}
              onValueChange={""}
              name="purchasePrice"
              id="purchasePrice"
              value={convertToNumber(stateInput.purchasePrice) || ""}
              onChange={(e) =>
                setStateInput({ ...stateInput, purchasePrice: e.target.value })
              }
            />
          </div>
        </label>
        <label htmlFor="sellingPrice" className="flex ">
          <p className="mr-[10px] ">Harga jual</p>
          <div className=" ml-[30px]  ">
            <CurrencyInput
              className="border-2 outline-none"
              prefix="Rp. "
              decimalsLimit={0}
              allowNegativeValue={false}
              decimalSeparator="."
              groupSeparator=","
              decimalScale={2}
              fixedDecimalLength={true}
              onValueChange={""}
              name="sellingPrice"
              id="sellingPrice"
              value={convertToNumber(stateInput.sellingPrice) || ""}
              onChange={(e) =>
                setStateInput({ ...stateInput, sellingPrice: e.target.value })
              }
            />
          </div>
        </label>
        <label htmlFor="stockProduct" className="flex justify-between">
          <p className="mr-[20px]">Stock product</p>
          <input
            className="border-2 outline-none"
            type="number"
            name="stockProduct"
            id="stockProduct"
            value={stateInput.productStock || ""}
            onChange={(e) =>
              setStateInput({ ...stateInput, productStock: e.target.value })
            }
          />
        </label>
        <label htmlFor="imageInput" className="">
          <input
            type="file"
            name="imageInput"
            id="imageInput"
            accept=".png, .jpeg"
            placeholder="Masukan gambar"
            onChange={handleImageChange}
          />
        </label>
        <div className="w-full flex justify-evenly mt-[20px]">
          <button
            onClick={handleCancelButton}
            className="px-[10px] py-[5px] w-[130px] rounded-md bg-rose-500"
          >
            Batal
          </button>
          <button
            type="submit"
            className="px-[10px] py-[5px] w-[130px] rounded-md bg-lime-500"
            onClick={handleSubmit}
          >
            Kirim
          </button>
        </div>
      </form>
    </div>
  );
};

export default PopUpForm;
