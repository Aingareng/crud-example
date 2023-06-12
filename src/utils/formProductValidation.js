import { fetchProductList } from "./productAPI";
import _ from "lodash";

const validationForm = ({
  productName,
  purchasePrice,
  sellingPrice,
  productStock,
  productImage,
}) => {
  let isValid = true;
  let sizeImage = true;
  if (
    (productName === "" ||
      purchasePrice === "" ||
      sellingPrice === "" ||
      productStock === "",
    productImage.imageFile === "")
  ) {
    isValid = false;
  }

  const { imageFile } = productImage;
  let fileSize = imageFile.size;

  fileSize = fileSize / 1024;
  if (fileSize > 100) {
    alert("Ukuran gambar tidak boleh melebihi 100KB!");
    sizeImage = false;
  }

  return { isValid, sizeImage };
};

export default validationForm;

export function uniquenessValidation(productName) {
  let isUnique = false;
  const products = fetchProductList("productStorage");

  const validate = _.find(products, (item) => item.productName === productName);
  if (validate) {
    isUnique = true;
    alert("Penginputan Salah, Cek Produk yang ingin diinput");
  }
  return { isUnique };
}
