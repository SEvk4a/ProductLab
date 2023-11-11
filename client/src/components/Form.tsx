import { FC, useState } from 'react';

interface FormProps {
  title: string;
  handleFrom: (email: string, pass: string) => void;
}

const Form: FC<FormProps> = ({ title, handleFrom }) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleFrom(email, pass);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6">
      <div className="mb-2">
        <label
          htmlFor="email"
          className="block text-sm font-semibold text-gray-800"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-2">
        <label
          htmlFor="password"
          className="block text-sm font-semibold text-gray-800"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
      </div>
      <div className="mt-6">
        <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
          {title}
        </button>
      </div>
    </form>
  );
};

export default Form;
