import { Group, Title } from '@mantine/core';

const Navbar = () => {
  return (
    <header style={{ padding: '1rem', borderBottom: '1px solid #e0e0e0' }}>
      <Group justify="space-between">
        <Title order={3}>Aplikasi Saya</Title>
        {/* Tambahkan item navigasi atau user menu di sini */}
      </Group>
    </header>
  );
};

export default Navbar;
