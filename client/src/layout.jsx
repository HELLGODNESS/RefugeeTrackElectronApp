import React from 'react'
import { Outlet } from 'react-router-dom'
import SideDrawer from './components/SideDrawer';
import Navbar from './components/Header';


export default function Layout() {
  return (
    <>
      <main className="flex   bg-zinc-50">
        <SideDrawer />
        <section className="w-full ">
          <Navbar/>
          <Outlet />
        </section>
      </main>


    </>
  )
}

