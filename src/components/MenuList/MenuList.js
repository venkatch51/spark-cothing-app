import React from 'react';
import MenuItem from '../MenuItem/MenuItem';

const MenuList = () => {
  const menus = [
    { id: 1, name: 'Home', path: '/' },
    { id: 2, name: 'products', path: '/products' },
    { id: 3, name: 'About', path: '/about' },
    { id: 4, name: 'contact', path: '/contact' }
  ];
  return (
    <ul className="navbar-nav ms-auto mb-2 mb-md-0">
      {menus.map((item) => (
        <MenuItem key={item.id} name={item.name} path={item.path} />
      ))}
    </ul>
  );
};

export default MenuList;
