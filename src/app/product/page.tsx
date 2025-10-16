"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductPage() {
  const searchParams = useSearchParams();
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [productId, setProductId] = useState<string | null>(null);

    // const handleGetData = async () =>{
    //     try {
            
    //         const res = await getProduct()

    //     } catch (error) {
            
    //     }
    // }

  useEffect(() => {
    const catId = searchParams.get("catId");
    const pId = searchParams.get("pId");

    

    setCategoryId(catId);
    setProductId(pId);
    
    console.log("Category ID:", catId);
    console.log("Product ID:", pId);
  }, [searchParams]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Product Page</h1>
      <div className="bg-gray-100 p-4 rounded-lg">
        <p><strong>Category ID:</strong> {categoryId || "Loading..."}</p>
        <p><strong>Product ID:</strong> {productId || "Loading..."}</p>
      </div>
      
      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-4">Product Details</h2>
        <p>This is where your product details would be displayed.</p>
      </div>
    </div>
  );
}