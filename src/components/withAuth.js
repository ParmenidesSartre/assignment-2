import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
    const [isLoading, setLoading] = useState(true);
    const [isAuthorized, setAuthorized] = useState(false);

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      setAuthorized(true);
      setLoading(false);
    }, []);

    if (isLoading) {
      return <div>Loading...</div>;
    }

    return isAuthorized ? <WrappedComponent {...props} /> : null;
  };
};

export default withAuth;