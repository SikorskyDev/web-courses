import React from "react";
import { LinkProps } from "react-router-dom";
import { Link } from "react-router-dom";

type DisabledLinkProps = LinkProps & {
    disabled?: boolean;
};

const DisabledLink: React.FC<DisabledLinkProps> = ({
    to,
    disabled = false,
    ...rest
}) => {
    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        if (disabled) {
            event.preventDefault();
        }
    };

    return (
        <Link to={to} onClick={handleClick}>
            {rest.children}
        </Link>
    );
};

export default DisabledLink;
