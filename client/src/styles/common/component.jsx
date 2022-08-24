import styled, { keyframes } from "styled-components";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const backgroundAnim = keyframes`
    0% { background-position: 0 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0 50%; }
`;

const textFloatingAnim = keyframes`
    0% { transform: translateY(0); }
    20% { transform: translateY(2px); }
    30% { transform: translateY(0); }
    50% { transform: translateY(2px); }
    60% { transform: translateY(0); }
    80% { transform: translateY(2px); }
    90% { transform: translateY(0); }
`;

export const AwesomeText = styled.div`
    font-size: 1.5rem;
    font-weight: 600;
    display: inline-block;
    animation: ${backgroundAnim} 5s ease-out infinite, ${textFloatingAnim} 5s ease-out infinite !important;
    background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
    background-size: 250% 500%;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
`;

export const FlexForm = styled(Form)`
    display: flex;
    flex-direction: column;
`;

export const ExtendButton = styled(Button)`
    width: 100%;
`;

export const ErrorText = styled.div`
    color: #d63031;
`;
