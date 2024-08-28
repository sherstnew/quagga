import { createContext, SetStateAction } from 'react';
import { IUser } from '../static/types/IUser';

interface IUserContext {
  user: IUser;
  setUser: React.Dispatch<SetStateAction<IUser>>;
}

export const UserContext = createContext<IUserContext>({
  user: {
    _id: '',
    name: '',
    sessions: [],
    files: [],
    isConfirmed: false,
    email: '',
    password: '',
    cardId: ''
  },
  setUser: () => {},
});
