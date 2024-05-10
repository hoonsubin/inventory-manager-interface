import { Product, UUID } from "../types";

const products: Product[] = [
  {
    id: "1372a11b-db4b-4e44-878f-0836ce43af5d",
    name: "Ice breaker 2000",
    stock: 10,
    cost: 0.5,
    price: 1.5,
  },
  {
    id: "eab6e8be-268b-45b7-be8d-193683be6c85",
    name: "My Home Tissue",
    stock: 100,
    cost: 0.05,
    price: 0.5,
  },
  {
    id: "4cce82d1-acff-403a-b302-8e2e028deb3c",
    name: "Lager",
    stock: 4000,
    cost: 0.5,
    price: 3.5,
  },
  {
    id: "9a6d3c36-a94e-428f-abc6-1dfd82a61741",
    name: "Good Bag",
    stock: 5020,
    cost: 15.2,
    price: 30,
  },
  {
    id: "dc47cfc0-fffd-4843-8a17-91cd0d846b58",
    name: "MacBook Pro 13",
    stock: 6030,
    cost: 2000,
    price: 3500,
  },
  {
    id: "08147c1d-d11c-4b0f-84ee-0fe8b5ea5558",
    name: "Fresh Fish",
    stock: 600,
    cost: 0.03,
    price: 1.5,
  },
  {
    id: "6168b7ed-6c67-4c5c-9fd8-d47b0cee39f6",
    name: "Rump Steak",
    stock: 510,
    cost: 0.5,
    price: 5.99,
  },
  {
    id: "95eb8bd8-31c9-4d0c-a7d9-d1bc507d7cb7",
    name: "Fake iPod Nano Pro M4 Max",
    stock: 210,
    cost: 15,
    price: 35.99,
  },
  {
    id: "02c89108-e2d7-496e-a853-c6ec8b274526",
    name: "IPA",
    stock: 5000,
    cost: 0.99,
    price: 2.99,
  },
  {
    id: "3eeb3b85-0aa8-48a8-9d2c-32c2a9a470ae",
    name: "Kids toy",
    stock: 2000,
    cost: 3,
    price: 9.99,
  },
];

export const getProducts = () => products;

export const getProduct = (id: UUID) => products.find((p) => p.id === id);
