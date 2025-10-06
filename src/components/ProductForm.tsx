import { useForm } from 'react-hook-form'
import { useCreateProduct } from '../features/products/useCreateProduct'

interface FormInput {
  title: string
  price: number
}

export const ProductForm = () => {
  const { register, handleSubmit, reset } = useForm<FormInput>()
  const createProduct = useCreateProduct()

  const onSubmit = (data: FormInput) => {
    createProduct.mutate(data)
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>Add Product</h3>
      <input {...register('title', { required: true })} placeholder="Product Name" />
      <input type="number" step="0.01" {...register('price', { required: true })} placeholder="Price" />
      <button type="submit" disabled={createProduct.isPending}>
        {createProduct.isPending ? 'Saving...' : 'Add'}
      </button>
    </form>
  )
}
