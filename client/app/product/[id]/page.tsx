import { notFound } from "next/navigation";

type Props = {
  params: { id: string };
};

const ProductPage = async ({ params: { id: productId } }: Props) => {
  // Fetch product
  const res = await (
    await fetch(`https://jsonplaceholder.typicode.com/todos/${productId}`)
  ).json();

  // Return not-found page if no such product exists
  if (!res?.id) return notFound();

  return <div>{res.title}</div>;
};

export default ProductPage;
