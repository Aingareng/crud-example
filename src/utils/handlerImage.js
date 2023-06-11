function handlerImage(event) {
  const file = event;

  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      const imageDataURL = event.target.result; // Data URL gambar
      return { file, imageDataURL };
    };
    reader.readAsDataURL(file);
  }
}

export default handlerImage;
