import React from 'react'

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-blue-950 text-white flex items-center justify-center px-4  h-12">
      <p className="text-center"> Copyright &copy; {currentYear} Creator's Flame - All rights reserve</p>
    </footer>
  )
}

export default Footer