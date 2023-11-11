import { FC } from 'react';
import FormWrapper from '../components/FormWrapper';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/AuthService';
import { toast } from 'react-toastify';

const LoginPage: FC = () => {
  const navigate = useNavigate();
  const [loginUser, {}] = authAPI.useLoginUserMutation();

  const handleLogin = async (mail: string, password: string) => {
    const result = await loginUser({
      mail,
      password,
    });

    if ('error' in result) {
      const error = result.error as { data: { message: string } };
      toast.error(error.data.message);
    } else {
      toast.success('Успешный вход');
      navigate('/');
      localStorage.setItem('token', result.data!.token);
    }
  };

  return (
    <FormWrapper
      title="sign in"
      linkTitle="sign up"
      link="/register"
      text="Dont have an account?"
      handleAuth={handleLogin}
    />
  );
};

export default LoginPage;
