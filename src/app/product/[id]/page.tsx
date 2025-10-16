// app/product/[id]/page.tsx
interface ProductParams {
  params: {
    id: string;
  };
  searchParams: {
    catId?: string;
  };
}

export default function ProductDetailPage({
  params,
  searchParams,
}: ProductParams) {
  const { id } = params;
  const { catId } = searchParams;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Product Details</h1>
      <div className="bg-gray-100 p-4 rounded-lg">
        <p>
          <strong>Product ID:</strong> {id}
        </p>
        <p>
          <strong>Category ID:</strong> {catId || "Not provided"}
        </p>
      </div>
    </div>
  );
}