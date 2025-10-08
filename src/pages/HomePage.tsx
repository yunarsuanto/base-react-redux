import { Container, Title, Button, Group } from '@mantine/core';
import { useAppDispatch } from '../app/hooks';
import { clearToken } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearToken());
    navigate('/login');
  };

  return (
    <Container>
      <Title>Selamat Datang di Beranda</Title>
      <p>Anda berhasil login.</p>
      <Group>
        <Button onClick={() => navigate('/list')}>Lihat Daftar Pengguna</Button>
        <Button variant="outline" onClick={handleLogout}>Logout</Button>
      </Group>
    </Container>
  );
};

export default HomePage;
