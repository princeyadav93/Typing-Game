import React, { useState, useEffect, useRef } from 'react';
import Typetext from './Typetext.jsx'

const Game = () => {
    const [text, setText] = useState("This is your text to type");
    const [level, setlevel] = useState("")
    const [userInput, setUserInput] = useState('');
    const [startTime, setStartTime] = useState(null);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    const inputRef = useRef(null);

    const LevelHanler = (e) => {
        setlevel(e.target.value)
        if (e.target.value === 'Easy') {
            setText("Black holes don't emit or reflect light, making them effectively invisible to telescopes")
        } else if (e.target.value === 'Medium') {
            setText("Scientists primarily detect and study them based on how they affect their surroundings: Black holes can be surrounded by rings of gas and dust, called accretion disks, that emit light across many wavelengths, including X-rays.")
        } else {
            setText("A supermassive black holes intense gravity can cause stars to orbit around it in a particular way. Astronomers tracked the orbits of several stars near the center of the Milky Way to prove it houses a supermassive black hole, a discovery that won the 2020 Nobel Prize. When very massive objects accelerate through space, they create ripples in the fabric of space-time called gravitational waves. Scientists can detect some of these by the ripples effect on detectors. Massive objects like black holes can bend and distort light from more distant objects. This effect, called gravitational lensing, can be used to find isolated black holes that are otherwise invisible.")

        }
    }

    const handleChange = (e) => {
        if (!startTime) {
            setStartTime(new Date().getTime());
        }
        setUserInput(e.target.value);
    };

    const handleRestart = () => {
        setUserInput('');
        setStartTime(null);
        setTimeElapsed(0);
        setGameOver(false);
        inputRef.current.focus();
    };

    useEffect(() => {
        if (userInput.length === text.length) {
            setGameOver(true);
            const endTime = new Date().getTime();
            const timeTaken = (endTime - startTime) / 1000;
            alert(`Congratulations! You finished in ${timeTaken} seconds.`);
        }
    }, [userInput, text, startTime]);

    return (
        <div>
            <div>
                <h1>Typing speed test game</h1>
                <h2>choose game's difficulty leve</h2>
                <label htmlFor="easy">Easy</label>
                <input
                    type="radio"
                    name="level"
                    id="easy"
                    value='Easy'
                    checked={level === "Easy"}
                    onChange={LevelHanler}
                />
                <label htmlFor="medium">Medium</label>
                <input
                    type="radio"
                    name="level"
                    id="medium"
                    value='Medium'
                    checked={level === "Medium"}
                    onChange={LevelHanler}
                />
                <label htmlFor="hard">Hard</label>
                <input
                    type="radio"
                    name="level"
                    id="hard"
                    value='Hard'
                    checked={level === "Hard"}
                    onChange={LevelHanler}
                />
            </div>

            <Typetext text={text} userInput={userInput} />
            <textarea
                ref={inputRef}
                value={userInput}
                onChange={handleChange}
                disabled={gameOver}
            />
            {gameOver && <button onClick={handleRestart}>Restart</button>}
        </div>
    );
};

export default Game;