"use client";
import { useEffect, useState } from "react";
import CreatePage from "./components/CreatePage";
import EditPage from "./components/EditPage";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [productId, setProductId] = useState(null);

  async function handleEdit(uuid) {
    setProductId(uuid);
    setIsEditModalOpen(true);
  }

  async function handleDelete(uuid) {
    await fetch(`/api/products/${uuid}`, {
      method: "DELETE",
    });
    fetchProducts();
  }

  async function fetchProducts() {
    try {
      const response = await fetch("/api/products", {
        method: "GET",
        cache: "no-store",
      });
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="bg-gray-900 h-screen">
      {isCreateModalOpen && (
        <CreatePage
          onSubmit={() => {
            setIsCreateModalOpen(false), fetchProducts();
          }}
          onClose={() => setIsCreateModalOpen(false)}
        />
      )}
      {isEditModalOpen && (
        <EditPage
          uuid={productId}
          onClose={() => {
            setIsEditModalOpen(false), setProductId(null);
          }}
          onSubmit={() => {
            setIsEditModalOpen(false), setProductId(null), fetchProducts();
          }}
        />
      )}
      <div className="w-screen flex justify-end">
        <button
          onClick={() => setIsCreateModalOpen(true)}
          type="button"
          className="mt-5 mb-5  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Create New
        </button>
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="w-screen text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              No
            </th>
            <th scope="col" className="px-6 py-3">
              Product name
            </th>
            <th scope="col" className="px-6 py-3">
              Color
            </th>
            <th scope="col" className="px-6 py-3">
              Category
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3 col-span-2 text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((item, index) => (
            <tr
              key={item.uuid}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {index + 1}
              </th>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {item.name}
              </th>
              <td className="px-6 py-4">{item.description} </td>
              <td className="px-6 py-4">{item.price}</td>
              <td className="px-6 py-4">{item.quantity} </td>
              <td className="px-6 py-4 flex justify-center">
                <button
                  onClick={() => handleEdit(item.uuid)}
                  type="button"
                  className="mr-5 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.uuid)}
                  type="button"
                  className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
