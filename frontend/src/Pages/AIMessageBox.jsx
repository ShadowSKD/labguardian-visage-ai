import React, { useEffect, useRef } from "react";

const saveTextFile = (filename, content) => {
    const blob = new Blob([content], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href);
};

const saveJsonFile = (filename, jsonObj) => {
    const blob = new Blob([JSON.stringify(jsonObj, null, 2)], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href);
};

const AIMessageBox = ({ labCode, log_file, message }) => {
    const boxRef = useRef(null);

    useEffect(() => {
        if (boxRef.current) {
            boxRef.current.classList.add("aibox-pop");
        }
    }, []);

    return (
        <div className="aibox-overlay">
            <div className="aibox-container" ref={boxRef}>
                <h2 className="aibox-title">
                    <span className="aibox-animated-text">Generative Summary from AI</span>
                </h2>
                <div className="aibox-message">{message}</div>
                <div className="aibox-buttons">
                    <button
                        className="aibox-btn"
                        onClick={() => saveTextFile(`${labCode}_summary.txt`, message)}
                    >
                        Save Summary
                    </button>
                    <button
                        className="aibox-btn"
                        onClick={() => saveJsonFile(`${labCode}_log.json`, log_file)}
                    >
                        Save Log File
                    </button>
                    <button
                        className="aibox-btn"
                        onClick={() => window.location.assign('/user')}
                    >
                        Back to Dashboard
                    </button>

                </div>
            </div>
            <style>{`
                .aibox-overlay {
                    position: fixed;
                    top: 0; left: 0; right: 0; bottom: 0;
                    background: rgba(0,0,0,0.35);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 9999;
                }
                .aibox-container {
                    background: #fff;
                    border-radius: 18px;
                    box-shadow: 0 8px 32px rgba(0,0,0,0.18);
                    padding: 2rem 1.5rem;
                    min-width: 320px;
                    max-width: 95vw;
                    width: 100%;
                    max-height: 90vh;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    animation: aibox-popin 0.4s cubic-bezier(.68,-0.55,.27,1.55);
                }
                @keyframes aibox-popin {
                    0% { transform: scale(0.7) translateY(40px); opacity: 0; }
                    100% { transform: scale(1) translateY(0); opacity: 1; }
                }
                .aibox-title {
                    margin: 0 0 1rem 0;
                    font-size: 1.3rem;
                    font-weight: 700;
                    text-align: center;
                }
                .aibox-animated-text {
                    background: linear-gradient(90deg, #4f8cff, #00e6d0, #ffb347, #ff5e62, #4f8cff);
                    background-size: 300% 300%;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    animation: aibox-gradient 2.5s linear infinite;
                }
                @keyframes aibox-gradient {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                .aibox-message {
                    font-size: 1.05rem;
                    color: #222;
                    margin-bottom: 1.5rem;
                    text-align: center;
                    word-break: break-word;
                }
                .aibox-buttons {
                    display: flex;
                    gap: 1rem;
                    width: 100%;
                    justify-content: center;
                }
                .aibox-btn {
                    background: #4f8cff;
                    color: #fff;
                    border: none;
                    border-radius: 8px;
                    padding: 0.6rem 1.2rem;
                    font-size: 1rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: background 0.2s;
                }
                .aibox-btn:hover {
                    background: #2563eb;
                }
                @media (max-width: 600px) {
                    .aibox-container {
                        min-width: 0;
                        padding: 1.2rem 0.5rem;
                    }
                    .aibox-title {
                        font-size: 1.05rem;
                    }
                    .aibox-message {
                        font-size: 0.98rem;
                    }
                }
            `}</style>
        </div>
    );
};

export default AIMessageBox;