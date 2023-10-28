import { useState, createContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { UserCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase/index';

export const FirebaseContext = createContext<any | null>(null);

export type FirebaseProviderProps = {
  children: React.ReactNode
}

export const FirebaseProvider = ({ children }: FirebaseProviderProps) => {
  const navigate =  useNavigate();
  const [isError, setIsError] = useState<string>('');

  const Login = async (email: string, password: string) => {
    try {
      const response: UserCredential = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await response.user.getIdToken();
      localStorage.setItem("token", idToken);
      navigate('/');
      setIsError('');
    } catch (error) {
      if(error) {
        setIsError('Invalid credentials');
      }
    }
  }

  const Signup = async (email: string, password: string) => {
    try {
      const response: UserCredential = await createUserWithEmailAndPassword(auth, email, password);
      const idToken = await response.user.getIdToken();
      localStorage.setItem("token", idToken);
      navigate('/');
      setIsError('')
    } catch (error) {
      console.log(error);
    }
  }

  const SignInWithGoogle = async () => {
    try {
      const response = await signInWithPopup(auth, googleProvider);
      const idToken = await response.user.getIdToken();
      localStorage.setItem("token", idToken);
      setIsError('');
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };
  
  return <FirebaseContext.Provider value={{ Login, Signup, SignInWithGoogle, isError, setIsError }}>{children}</FirebaseContext.Provider>;

}

