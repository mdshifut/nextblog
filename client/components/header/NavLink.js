import Link from 'next/link';

const NavLink = ({ href, title }) => {
  return (
    <li>
      <Link href={href}>
        <a>{title}</a>
      </Link>
      <style jsx>{`
        a {
          padding: 0 5px;
        }
        a :hover {
          text-decoration: none;
        }
      `}</style>
    </li>
  );
};

export default NavLink;
