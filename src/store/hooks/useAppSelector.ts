import { useSelector } from 'react-redux';
import { RootState } from '../';

const useAppSelector = <TSelected>(selector: (state: RootState) => TSelected) => {
  return useSelector.withTypes<RootState>()(selector);
};

export default useAppSelector;
