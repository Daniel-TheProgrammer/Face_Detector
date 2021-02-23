import React from "react"
import "./textOutput.css";

const TextOutput = ({text}) => {

    return (
        <div>
            <div className="white f3 textOutput">
                {text}
            </div>
        </div>
    )
}

export default TextOutput;


