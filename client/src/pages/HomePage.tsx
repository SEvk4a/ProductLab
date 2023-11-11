import { FC } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import CardList from '../components/CardList';
import { userAPI } from '../services/UserService';

const HomePage: FC = () => {
  const navigate = useNavigate();
  const {
    data: user,
    isLoading,
    isError,
  } = userAPI.useCheckTokenQuery(null, {
    refetchOnMountOrArgChange: true,
  });

  const handleLogout = () => {
    navigate('/login');
    localStorage.removeItem('token');
  };

  if (isError) {
    navigate('/login');
    return;
  }

  return (
    <>
      <header className="min-h-[60px] bg-[#1C1B20] flex items-center justify-between px-[40px] text-white">
        <div>
          <h1 className="text-xl font-[500]">ProductLab</h1>
        </div>
        <div className="flex items-center gap-x-[10px]">
          <h3>{user?.mail}</h3>
          <button
            onClick={handleLogout}
            className="py-1.5 px-2.5 text-[14px] border border-white rounded-[5px]"
          >
            logout
          </button>
        </div>
      </header>
      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <>
          <main className="px-[40px] py-[20px]">
            <CardList />
          </main>
          <Outlet></Outlet>
        </>
      )}
    </>
  );
};

export default HomePage;
