import { useAppDispatch } from '../app/hooks';
import { clearToken } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const UserPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearToken());
    navigate('/login');
  };

  return (
    <>
      user
    </>
  );
};

export default UserPage;
