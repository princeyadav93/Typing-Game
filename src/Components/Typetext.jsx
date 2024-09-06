import React from 'react';

const Typetext = ({ text, userInput }) => {
    const highlightedText = text.split('').map((char, index) => {
        const isMatching = userInput[index] === char;
        return (
            <span key={index} style={{ color: isMatching ? 'lightgray' : 'Black' }}>
                {char}
            </span>
        );
    });

    return <div>{highlightedText}</div>;
};

export default Typetext;