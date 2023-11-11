import { FC } from 'react';
import Form from './Form';
import { Link } from 'react-router-dom';

interface FormWrapperProps {
  title: string;
  linkTitle: string;
  link: string;
  text: string;
  handleAuth: (email: string, pass: string) => void;
}

const FormWrapper: FC<FormWrapperProps> = ({
  title,
  linkTitle,
  link,
  text,
  handleAuth,
}) => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="p-6 rounded-md shadow-xl shadow-rose-600/40 ring ring-2 ring-purple-600 min-w-[400px]">
        <h1 className="text-3xl font-semibold text-center text-purple-700 uppercase">
          {title}
        </h1>
        <Form title={title} handleFrom={handleAuth} />
        <p className="mt-8 text-xs font-light text-center text-gray-700">
          {text}
          <Link
            to={link}
            className="font-medium text-purple-600 hover:underline ml-1"
          >
            {linkTitle}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default FormWrapper;
