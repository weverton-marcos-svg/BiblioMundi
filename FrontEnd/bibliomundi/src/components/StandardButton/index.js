import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from'./styled.js';

export default function StandardButton ({texto, redirecionarUrl }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(redirecionarUrl);
    };

    return (
        <Button onClick={handleClick}>
            {texto}
        </Button>
    );
};