import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://fakestoreapi.com/' }),
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: (count) => `products?limit=${count}`,
    }),
    getAllProductsAsCategory: builder.query({
      query: (name) => `products/category/${name}`,
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllProductsQuery,useGetAllProductsAsCategoryQuery } = productApi;