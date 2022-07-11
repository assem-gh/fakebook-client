import { Text, Paper, PaperProps, Divider, Container } from '@mantine/core';

import { LoginForm } from '../components/Login/LoginForm';
import { RegisterForm } from '../components/Login/RegisterForm';

interface LoginProps extends PaperProps<'div'> {
  page: 'login' | 'register';
}

export const LoginPage = ({ page, ...props }: LoginProps) => {
  return (
    <Container size='xs'>
      <Paper radius='md' p='xl' withBorder {...props} shadow='xs'>
        <Text size='xl' weight={600} align='center' color='blue'>
          Welcome to Fakebook
        </Text>

        <Divider labelPosition='center' my='lg' />

        {page === 'login' ? <LoginForm /> : <RegisterForm />}
      </Paper>
    </Container>
  );
};
