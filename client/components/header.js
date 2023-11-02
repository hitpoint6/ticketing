import Link from 'next/link';

const Header = ({ currentUser }) => {

    return <nav className="navbar navbar-light bg-light">
        <div className="container">
            <Link className='navbar-brand' href="/">
                TicketSphere
            </Link>

            <div className="d-flex justify-content-end">
                <ul className='navbar-nav ml-auto'>
                    {currentUser &&
                        <li className="nav-item">
                            <Link className="nav-link" href="/auth/signout">Sign out</Link>
                        </li>}
                    {!currentUser &&
                        <div className="d-flex">
                            <li className="nav-item">
                                <Link className="nav-link" href="/auth/signup">Sign up</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" href="/auth/signin">Sign in</Link>
                            </li>
                        </div>
                    }
                </ul>
            </div>
        </div>
    </nav>

}


export default Header;