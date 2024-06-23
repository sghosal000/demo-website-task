import { useContext } from 'react';
import { WindowWidthContext } from '../contexts/windowWidthContext';

const useWindowWidth = () => {
  return useContext(WindowWidthContext)
}

export default useWindowWidth;
