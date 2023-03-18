import React from "react";
import { Img } from "react-image";

interface Props {
    src: string;
}

const ImageByReact: React.FC<Props> = ({ src }) => {
    return (
        <Img
            src={src}
            alt="My Image"
            decode={true}
            style={{ width: "100%", height: "auto" }}
            loader={<span>loading...</span>}
        />
    );
};

export default ImageByReact;
