import { useDispatch } from 'react-redux';
import { AppDispatch } from '../';

const useAppDispatch = () => {
  const dispatch = useDispatch<AppDispatch>();
  return dispatch;
};

export default useAppDispatch;
