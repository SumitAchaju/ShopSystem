import React from "react";
import {
  DiscountSvg,
  DownloadSvg,
  HomeSvg,
  InvoiceSvg,
  SigningSvg,
} from "../assets/icons/Icon";
import { NavLink, Outlet, ScrollRestoration } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <Outlet/>
      <section className="navbarsticky">
        <div className="container-fluid">
          <div className="d-flex justify-content-between align-items-end">
            <NavLink to="/import">
              <div>
                <DownloadSvg />
              </div>
            </NavLink>
            <NavLink to="/sales">
              <div>
                <DiscountSvg />
              </div>
            </NavLink>
            <NavLink to="/">
              <div>
                <div className="navbar-home-btn">
                  <HomeSvg />
                </div>
              </div>
            </NavLink>
            <NavLink to="/bill">
              <div>
                <InvoiceSvg />
              </div>
            </NavLink>
            <NavLink to="/loan">
              <div>
                <SigningSvg />
              </div>
            </NavLink>
          </div>
        </div>
      </section>
      <ScrollRestoration
        getKey={(location) => {
          return location.pathname;
        }}
      />
    </>
  );
}
