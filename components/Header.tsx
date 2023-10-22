import React from 'react';

interface HeaderProps {
  title: string;
  description: string;
}

const Header = ({ title, description }: HeaderProps) => {
  return (
    <div>
      <h1 className=" font-bold text-2xl">{title}</h1>
      <p className=" text-sm text-muted-foreground">{description}</p>
    </div>
  );
};

export default Header;
