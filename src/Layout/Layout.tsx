import type React from 'react';
import Header from '../components/Header/Header';
import './Layout.css';
import type { PropsWithChildren } from 'react';

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="layout container">
      <Header />
      <main className="main">{children}</main>
    </div>
  );
};

export default Layout;
