import { useSelector } from 'react-redux';
import PropTypes from "prop-types"

export default function ThemeProvider({children}) {
  const { theme } = useSelector((state) => state.theme);
  return (

     <div className={theme}>
       <div className='bg-white text-gray-900 dark:text-gray-200 dark:bg-[rgb(12,15,27)] min-h-screen'>
         {children}
       </div>
     </div>
  );
}
ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};