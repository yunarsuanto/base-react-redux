import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, LoginSchema } from '../schemas/login.schema'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { loginUser } from '../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { loading, error } = useAppSelector((state) => state.auth)

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const onSubmit = async (data: LoginSchema) => {
    const payload = {
      ...data,
      platform: 'web',
    }

    try {
      const result = await dispatch(loginUser(payload)).unwrap()

      switch (result.data.role) {
        case 'admin':
        case 'superadmin':
          navigate('/admin')
          break
        case 'user':
          navigate('/user')
          break
        default:
          navigate('/')
      }
    } catch (err) {
      // error sudah ditangani di redux
    }
  }

  return (
  <div className="min-h-screen bg-red-400 flex items-center justify-center px-4">
    <div className="w-full max-w-sm bg-white rounded-lg shadow-md border">
      {/* Header */}
      <div className="px-6 py-4 border-b text-center">
        <h1 className="text-xl font-semibold text-gray-800">
          Login
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Silakan masuk ke akun Anda
        </p>
      </div>

      {/* Body */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="px-6 py-6 space-y-4"
      >
        {/* Username */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Username
          </label>
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="Masukkan username"
                className="w-full px-3 py-2 border rounded-md text-sm
                           focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                           outline-none"
              />
            )}
          />
          {errors.username && (
            <p className="text-xs text-red-500 mt-1">
              {errors.username.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="password"
                placeholder="Masukkan password"
                className="w-full px-3 py-2 border rounded-md text-sm
                           focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                           outline-none"
              />
            )}
          />
          {errors.password && (
            <p className="text-xs text-red-500 mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* API Error */}
        {error && (
          <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
            {error}
          </div>
        )}

        {/* Button */}
        <button
          type="submit"
          disabled={!isValid || loading === 'pending'}
          className="w-full py-2 text-sm font-semibold text-white bg-blue-600
                     rounded-md hover:bg-blue-700 transition
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading === 'pending' ? 'Loading...' : 'Login'}
        </button>
      </form>

      {/* Footer */}
      <div className="px-6 py-4 border-t text-center text-xs text-gray-500">
        © 2026 Aplikasi Anda
      </div>
    </div>
  </div>
)}

export default LoginPage;
