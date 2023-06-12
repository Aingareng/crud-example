import { useEffect, useState } from "react";
import Card from "../Card/Card";
import "./productList.css";
import { useProduct } from "../../context/product";
import { useToggle } from "../../context/togglePopUp";
import { useSearch } from "../../context/searchContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { arrowIcon, emptyBoxIcon } from "../../assets/icons";
import handleSVG from "../../utils/handleSVG";

const ProductList = () => {
  const product = useProduct();
  const [products, setProducts] = useState([]);
  const toggle = useToggle();
  const search = useSearch();
  const [displayProduct, setDisplayProduct] = useState({
    image: "",
    icon: "",
    hidden: "",
  });

  const searchProducts = (products, searchKeyword) => {
    return products.filter((product) => {
      return product.productName.toLowerCase() === searchKeyword.toLowerCase();
    });
  };

  useEffect(() => {
    const handleProduct = () => {
      const existingData =
        JSON.parse(localStorage.getItem("productStorage")) || [];
      if (Array.isArray(existingData)) {
        existingData.length === 0
          ? setDisplayProduct({
              image: emptyBoxIcon,
              icon: "none",
              hidden: "",
            })
          : setDisplayProduct({
              image: "",
              icon: "",
              hidden: "hidden",
            });
      }

      const searching = searchProducts(existingData, search);
      return searching.length > 0 ? searching : existingData;
    };

    const res = handleProduct();
    setProducts(res);
  }, [search, toggle, product]);

  return (
    <section className="overflow-hidden relative custom-scrollbar  shadow-inner rounded-lg w-[60%] h-[70%] mx-auto my-[10px]  p-[10px]">
      {handleSVG(displayProduct.hidden)}
      <Swiper
        modules={[Pagination, Navigation]}
        slidesPerView={3}
        spaceBetween={20}
        pagination={{ clickable: true }}
        navigation={{
          prevEl: ".swiper-button-prev",
          nextEl: ".swiper-button-next",
        }}
        className=" flex flex-wrap justify-start w-full h-full"
        style={{ zIndex: "0", display: displayProduct.icon }}
      >
        {products.map((prod, index) => {
          return (
            <SwiperSlide
              key={index}
              className="flex gap-[24px] border-2 w-[30%] h-[70%]  "
            >
              <Card
                productName={prod.productName}
                purchasePrice={prod.purchasePrice}
                sellingPrice={prod.sellingPrice}
                productStock={String(prod.productStock)}
                productImage={prod.productImage.imageURL}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <button
        style={{ display: displayProduct.icon }}
        className="swiper-button-prev absolute  backdrop-blur-sm p-[5px] rounded-md top-[150px] left-0 ease-in duration-300 hover:translate-x-3"
      >
        <img
          className="w-[40px] h-[40px] cursor-pointer "
          src={arrowIcon}
          alt="left arrow"
        />
      </button>
      <button
        style={{ display: displayProduct.icon }}
        className="swiper-button-next absolute p-[5px] rounded-md top-[150px] right-0  backdrop-blur-sm ease-in duration-300 hover:-translate-x-3"
      >
        <img
          className="w-[40px] rotate-180 h-[40px] cursor-pointer "
          src={arrowIcon}
          alt="left arrow"
        />
      </button>
    </section>
  );
};

export default ProductList;
