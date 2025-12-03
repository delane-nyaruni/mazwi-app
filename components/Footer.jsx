import { Link } from 'react-router-dom'

const Footer = () => {
 const currentYear =  new Date().getFullYear();
  return (
    <footer>
    <div className="footer-copyright small MT12 mb-0">
        <p className='text-gray-500'>Powered by
          <Link className='ml-1' to="https://ninesoftstudio.github.io" target="_blank" rel="noreferrer">
           ninesoftstudio&copy;
          </Link>
          <p className='small'>{currentYear}</p>
        </p>
    </div>
    </footer>
  )
}

export default Footer