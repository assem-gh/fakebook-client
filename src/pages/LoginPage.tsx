import { Text, Paper, PaperProps, Divider, Container } from '@mantine/core';
import { useToggle } from '@mantine/hooks';

import { LoginForm } from '../components/Login/LoginForm';
import { RegisterForm } from '../components/Login/RegisterForm';

export default function Login(props: PaperProps<'div'>) {
  const [type, toggle] = useToggle('login', ['login', 'register']);

  return (
    <Container size='xs'>
      <Paper radius='md' p='xl' withBorder {...props} shadow='xs'>
        <Text size='xl' weight={600} align='center' color='blue'>
          Welcome to Fakebook
        </Text>

        <Divider labelPosition='center' my='lg' />

        {type === 'login' ? (
          <LoginForm toggle={toggle} />
        ) : (
          <RegisterForm toggle={toggle} />
        )}
      </Paper>
    </Container>
  );
}
