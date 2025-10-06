import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

interface UserFormData {
  name: string
  email: string
}

const schema = yup.object({
  name: yup.string().required('Nama wajib diisi'),
  email: yup.string().email('Email tidak valid').required('Email wajib diisi'),
})

export default function UserForm() {
  const queryClient = useQueryClient()
  const { register, handleSubmit, reset, formState: { errors } } = useForm<UserFormData>({
    resolver: yupResolver(schema),
  })

  const mutation = useMutation({
    mutationFn: (data: UserFormData) => axios.post('/api/users', data),
    onSuccess: () => {
      queryClient.invalidateQueries(['users'])
      reset()
    },
  })

  const onSubmit = (data: UserFormData) => {
    mutation.mutate(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Nama</label>
        <input {...register('name')} />
        {errors.name && <span>{errors.name.message}</span>}
      </div>
      <div>
        <label>Email</label>
        <input {...register('email')} />
        {errors.email && <span>{errors.email.message}</span>}
      </div>
      <button type="submit" disabled={mutation.isLoading}>
        {mutation.isLoading ? 'Menyimpan...' : 'Simpan'}
      </button>
    </form>
  )
}
