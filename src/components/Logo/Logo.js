import React from "react";
import Tilt from 'react-tilt'
import "./logo.css"
import brain from "./brainBlack.png";

const Logo = () => {
    return (
        <div className="ma4 mt0 mb1">
            <Tilt className="Tilt br2 shadow-2" options={{ 
                                            reverse:        true,  // reverse the tilt direction
                                            max:            75,     // max tilt rotation (degrees)
                                            perspective:    1000,   // Transform perspective, the lower the more extreme the tilt gets.
                                            scale:          1,      // 2 = 200%, 1.5 = 150%, etc..
                                            speed:          200,    // Speed of the enter/exit transition
                                            transition:     true,   // Set a transition on enter/exit.
                                            axis:           null,   // What axis should be disabled. Can be X or Y.
                                            reset:          true,   // If the tilt effect has to be reset on exit.
                                            easing:         "cubic-bezier(1, .98, 1, .99)",    // Easing on enter/exit.
                                            }} style={{ height: 100, width: 100 }} >
                <div className="Tilt-inner pa3"> 
                    <img src={brain} alt="logo" style={{paddingTop: "1px"}}/> 
                </div>
            </Tilt>
        </div>
    );
}

export default Logo;