import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function Navbar() {
    const allUsers = useSelector((state) => state.app.users);

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{ "marginLeft": "30px" }} >
                <span className="navbar-brand">React Redux</span>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        {/* <li className="nav-item">
                            <Link to="/" className="nav-link">Create Post</Link>
                        </li> */}
                        <li className="nav-item active">
                            <Link to="/" className="nav-link">All Post: <strong>{allUsers.length}</strong></Link>
                        </li>


                    </ul>
                    {/* <form className="form-inline my-2 my-lg-0 w-50" style={{"float":"right"}} >
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />

                    </form> */}
                </div>
            </nav>
        </div>
    )
}

export default Navbar