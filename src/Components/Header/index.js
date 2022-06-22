import './header.css'
import {Link} from 'react-router-dom'

function Header (){
    return(
        <header>
            <Link className='logo' to='/'>UFilmes</Link>
            <Link className='favoritos' to='/favoritos'>FAVORITOS</Link>
        </header>
    )
}
export default Header;