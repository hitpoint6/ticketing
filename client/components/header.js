import Link from 'next/link';

const Header = ({ currentUser }) => {

    return <nav className="navbar navbar-light bg-light">
        <div className="container">
            <Link className='navbar-brand' href="/">
                Ticket Sphere
            </Link>

            <div className="d-flex justify-content-end">
                <ul className='navbar-nav ml-auto'>
                    <li className="nav-item">
                        <Link className="nav-link" href="/orders">My Orders</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" href="/tickets/new ">Sell Ticket</Link>
                    </li>
                    {currentUser &&
                        <li className="nav-item">
                            <Link className="nav-link" href="/auth/signout">Sign out</Link>
                        </li>}
                    {!currentUser &&
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" href="/auth/signup">Sign up</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" href="/auth/signin">Sign in</Link>
                            </li>
                        </>
                    }

                </ul>
            </div>
        </div>
    </nav>

}


export default Header;