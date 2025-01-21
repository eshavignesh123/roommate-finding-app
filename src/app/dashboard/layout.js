import NavBar from '../components/navbar';
import React from 'react';
 
export default function Layout({ children }) {
    return (
      <div className="flex md:flex-row md:overflow-hidden">
          <NavBar />
        <div className="flex-grow md:overflow-y-auto">{children}</div>
      </div>
    );
  }
  