import ProductPageContainer from "@/src/app/products/_components/ProductPageContainer";

const Page: React.FC<any> = ({ params }) => {
  return <ProductPageContainer params={params} showPrice={false} />;
};

export default Page;
