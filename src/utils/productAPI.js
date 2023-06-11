function fetchProductList(storageName) {
  return JSON.parse(localStorage.getItem(storageName)) || [];
}

function postProductList(storageName, payload) {
  localStorage.setItem(storageName, JSON.stringify(payload));
}

function updateProductList(stateInput) {
  const existingData = fetchProductList("productStorage");
  const updatedData = existingData.map((item) => {
    if (item.productName === stateInput.productName) {
      return stateInput;
    }
    return item;
  });
  localStorage.setItem("productStorage", JSON.stringify(updatedData));
}

export { fetchProductList, postProductList, updateProductList };
