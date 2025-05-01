import {styled} from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 80%;
    width: 80%;
    align-items: center;
    justify-content: center;
    text-align: center;
    border: 1px solid black;
    border-radius: 10px;
`;
export const Img = styled.img`
    width: 35%;
`;

export const Span = styled.span`
    fot-size: 2rem;
    font-weight: 600;
    font-style: italic;
`;