import { useUsers } from '../hooks/useUsers';
import { Container, Title, Card, Text, Loader, Alert, Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

const ListPage = () => {
  const navigate = useNavigate();
  const { data: users, isLoading, isError, error } = useUsers();

  return (
    <Container>
      <Button onClick={() => navigate('/home')} mb="md">Kembali ke Home</Button>
      <Title mb="lg">Daftar Pengguna</Title>

      {isLoading && <Loader />}

      {isError && (
        <Alert color="red" title="Error">
          {error.message}
        </Alert>
      )}

      {users && users.map(user => (
        <Card shadow="sm" p="lg" mb="md" key={user.id}>
          <Text fw={500}>{user.name}</Text>
          <Text size="sm" c="dimmed">{user.email}</Text>
        </Card>
      ))}
    </Container>
  );
};

export default ListPage;
