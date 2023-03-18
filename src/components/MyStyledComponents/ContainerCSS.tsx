import styled from "styled-components";

interface ContainerProps {
    width?: string;
}

export const ContainerCSS = styled.div<ContainerProps>`
    max-width: 1050px;
    margin: 0 auto;
    padding: 0 15px;
    width: ${(props) => (props.width ? props.width : "100%")};
`;
