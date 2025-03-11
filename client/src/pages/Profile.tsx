import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../services/user";

interface User {
  id: string;
  username: string;
  email: string;
}

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userData = await getProfile();
        setUser(userData);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-50'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500'></div>
      </div>
    );
  }

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gray-50'>
      <div className='max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg'>
        <h1 className='text-3xl font-bold text-center text-gray-900'>
          Profile
        </h1>

        <div className='space-y-4'>
          <div className='border-b pb-4'>
            <p className='text-sm text-gray-500'>Username</p>
            <p className='text-md font-medium'>{user?.username}</p>
          </div>

          <div className='border-b pb-4'>
            <p className='text-sm text-gray-500'>Email</p>
            <p className='text-md font-medium'>{user?.email}</p>
          </div>
        </div>

        <div className='flex gap-4'>
          <button
            onClick={() => navigate("/")}
            className='flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
