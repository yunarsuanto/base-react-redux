import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useEffect } from 'react'

export interface Product {
  id: number
  title: string
  price: number
}

export const useProducts = () => {
  const query = useQuery<Product[], Error>({
    queryKey: ['products'],
    queryFn: async () => {
      console.log('%c[FETCH API] calling fakestoreapi.com/products', 'color: orange')
      const res = await axios.get('https://fakestoreapi.com/products')
      return res.data
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  })

  useEffect(() => {
    if (query.isSuccess) {
      console.log('%c[SUCCESS] data berhasil diambil/cached', 'color: green', query.data)
    }
  }, [query.data, query.isSuccess])

  return query
}
