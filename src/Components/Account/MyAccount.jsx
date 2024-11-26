import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

function MyAccount() {
  const user = useSelector((state) => state.authentication.userData);
  const navitage = useNavigate();
  useEffect(() => {
    if (!user) {
      navitage("/login");
    }
  }, [user]);
  return (
    <>
      <h1 className="text-center text-3xl mt-6 font-bold">Account Dashboard</h1>

      <div className="w-full flex flex-col lg:flex-row">
        <div className="h-full lg:w-1/5 lg:p-3 lg:pl-5 p-5 dark:bg-gray-700 bg-gray-100 lg:ml-4 lg:mr-0 mx-5 mt-14 rounded-lg">
          <div className="w-full">
            <h1 className="text-lime-400 text-xl underline mb-5">My Account</h1>

            <ul>
              <li className="mb-1 text-gray-400 cursor-pointer">
                <NavLink
                  to="/account/dash"
                  className={({ isActive }) =>
                    isActive ? "text-amber-500" : ""
                  }
                >
                  Account Dashboard
                </NavLink>
              </li>
              <li className="mb-1 text-gray-400 cursor-pointer">
                <NavLink
                  to="/account/edit"
                  className={({ isActive }) =>
                    isActive ? "text-amber-500" : ""
                  }
                >
                  Edit User Details
                </NavLink>
              </li>
              <li className="mb-1 text-gray-400 cursor-pointer">
                <NavLink
                  to="/account/address"
                  className={({ isActive }) =>
                    isActive ? "text-amber-500" : ""
                  }
                >
                  Edit Address Details
                </NavLink>
              </li>
              <li className="mb-1 text-gray-400 cursor-pointer">
                <NavLink
                  to="/account/orders"
                  className={({ isActive }) =>
                    isActive ? "text-amber-500" : ""
                  }
                >
                  All Oders
                </NavLink>
              </li>
              <li className="mb-1 text-gray-400 cursor-pointer">
                <NavLink
                  to="/account/reviews"
                  className={({ isActive }) =>
                    isActive ? "text-amber-500" : ""
                  }
                >
                  Reveiws
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        <div className="h-full flex-1 lg:mx-10 p-5">
          <h1 className="mb-3">Hello! {user?.fullname || "user"}</h1>
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default MyAccount;
