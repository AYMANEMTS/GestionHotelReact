import {  Link, Outlet  } from "react-router-dom";
import Logout from "../Authentication/Logout";


export default function SideBar() {
    return(< >
        <div className="container-fluid">
    <div className="row flex-nowrap">
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                <a href="/" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    <span className="fs-5 d-none d-sm-inline">Menu</span>
                </a>
                <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                    <li className="nav-item">
                        <Link to="/">
                        <i className=" fa-solid fa-house"></i> <span className="ms-1 d-none d-sm-inline">Home</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/profile">
                        <i className=" fa-solid fa-house"></i> <span className="ms-1 d-none d-sm-inline">Profile</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/product">
                        <i className=" fa-solid fa-house"></i> <span className="ms-1 d-none d-sm-inline">Product</span>
                        </Link>
                    </li>
                    <li className="nav-item pb-4">
                        <Link to="/logout">
                        <i className=" fa-solid fa-house"></i> <span className="ms-1 d-none d-sm-inline">Logout</span>
                        </Link>
                    </li>
                  

                </ul>
                <hr/>
                        
                {/* profile */}
                <div className="dropdown pb-4">
                    <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src="https://github.com/mdo.png" alt="hugenerd" width="30" height="30" className="rounded-circle"/>
                        <span className="d-none d-sm-inline mx-1">loser</span>
                    </a>
                    <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
                        
                        <li><a className="dropdown-item" href="#">New project...</a></li>
                        <li><a className="dropdown-item" href="#">Settings</a></li>
                        <li><a className="dropdown-item" href="#">Profile</a></li>
                        <li>
                            <hr className="dropdown-divider"/>
                        </li>
                        <li><a className="dropdown-item" href="#">Sign out</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <div className="col py-1 m-0">
            <Outlet />
        </div>
    </div>
</div></>
 );
}

