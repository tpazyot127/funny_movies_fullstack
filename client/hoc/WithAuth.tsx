import { useAuth } from '../hooks';

export const WithAuth: React.FC = ({ children } : any) => {
  useAuth();
  return <>{children}</>;
};
