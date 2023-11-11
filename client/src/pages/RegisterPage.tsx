import { FC } from 'react';
import FormWrapper from '../components/FormWrapper';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/AuthService';
import { toast } from 'react-toastify';

const RegisterPage: FC = () => {
  const navigate = useNavigate();
  const [registerUser, {}] = authAPI.useRegisterUserMutation();

  const handleRegister = async (mail: string, password: string) => {
    const result = await registerUser({
      mail,
      password,
    });

    if ('error' in result) {
      const error = result.error as { data: { message: string } };
      toast.error(error.data.message);
    } else {
      toast.success('Успешная регистрация');
      navigate('/');
      localStorage.setItem('token', result.data!.token);
    }
  };

  return (
    <FormWrapper
      title="sign up"
      linkTitle="sign in"
      link="/login"
      text="Already have an account?"
      handleAuth={handleRegister}
    />
  );
};

export default RegisterPage;
