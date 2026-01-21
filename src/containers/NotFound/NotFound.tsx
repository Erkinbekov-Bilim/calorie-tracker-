import './NotFound.css';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <>
      <div className='not-found'>
        <p className="not-found-text">not found 404</p>
        <Link to='/' className='not-found-link'>Go Home</Link>
      </div>
    </>
  );
};

export default NotFound;
