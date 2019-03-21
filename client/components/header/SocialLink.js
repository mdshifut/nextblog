import Link from 'next/link';

const NavLink = ({ href, children }) => {
  return (
    <li>
      <a href={href}>{children}</a>
      <style jsx>{`
        a {
          padding: 0 5px;
        }
      `}</style>
    </li>
  );
};

export default NavLink;
