

import { Button, Card, Input } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Product = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const getAllProducts = async () => {
    try {
      const response = await axios.get(
        "https://656eef0a6529ec1c6236f71b.mockapi.io/api/api"
      );
      setProducts(response.data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const goToDetail = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Input
        placeholder="Search by name"
        onChange={(e) => handleSearch(e.target.value)}
        style={{ marginBottom: 16 }}
      />
      {filteredProducts.map((product) => (
        <Card key={product.id}  title={product.id}>
          
          <h1>{product.name}</h1>
          <h1>
          <Button type="primary" onClick={() => goToDetail(product.id)  }>
            Go detail
          </Button></h1>
        </Card>
      ))}
    </div>
  );
};

export default Product;
