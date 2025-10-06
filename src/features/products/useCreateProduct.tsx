import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

interface NewProduct {
  title: string
  price: number
}

export const useCreateProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: NewProduct) => {
      const res = await axios.post('https://fakestoreapi.com/products', data)
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })
}
