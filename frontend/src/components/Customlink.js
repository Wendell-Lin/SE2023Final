import React from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';

function CustomLink({ to, children, onLinkClick, ...props }) {
    const resolvedPath = useResolvedPath(to);

    const isActive = useMatch({ path: resolvedPath.pathname, end: true });

    const handleClick = (e) => {
        if (onLinkClick) {
            onLinkClick(e);
        }
    };

    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to} onClick={handleClick} {...props}>
                {children}
            </Link>
        </li>
    );
}

export default CustomLink;