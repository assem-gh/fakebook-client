import { Paper, Container } from '@mantine/core';

import { ForgotPasswordForm } from '../components/Login/ForgotPasswordForm';
import { LoginForm } from '../components/Login/LoginForm';
import { RegisterForm } from '../components/Login/RegisterForm';
import { ResetPasswordForm } from '../components/Login/ResetPasswordForm';

const forms = {
  login: <LoginForm />,
  register: <RegisterForm />,
  forgot: <ForgotPasswordForm />,
  reset: <ResetPasswordForm />,
};

interface LoginPageProps {
  form: keyof typeof forms;
}

export const LoginPage = ({ form }: LoginPageProps) => {
  return (
    <Container size={420} my={40}>
      <Paper radius='md' p='xl' withBorder shadow='sm'>
        {forms[form]}
      </Paper>
    </Container>
  );
};
