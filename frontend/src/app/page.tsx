import Image from "next/image";
import ProductList from "../components/ProductList/ProductList";
import HomeSlider from "../components/HomeSlider/HomeSlider";
import Blogspage from "../components/Blogspage/Blogspage";
import RotationImages from "../components/RotationImages/RotationImages";

export default function Home() {
  return (
    <>
    <HomeSlider />
    <ProductList />
    <RotationImages />
    <Blogspage />
    </>
  );
}
