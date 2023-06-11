function handleFieldValue(storage, trigger) {
  if (Array.isArray(storage)) {
    const findProduct = storage.find((item) => item.productName === trigger);
    return findProduct;
  }
}

export default handleFieldValue;
