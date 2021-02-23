import React from "react";
import "./imageLinkForm.css"

const ImageLinkForm = ({ inputChange, keyPress, onPictureSubmit }) => {
    
    return (
        <div>
            <p className="f4">
                {"This magic brain will describe your pictures & recognize faces, give it a try..."}
            </p>
            <div className="center">
                <div className="form center pa4 br3 shadow-5">
                    <input className="f4 pa2 w-70 center" type="text" placeholder="url image link" 
                            onChange={inputChange} 
                            onKeyPress={keyPress}/>
                    <button className="w-30 f4 grow link ph3 pv2 dib white bg-light-purple" 
                            onClick={onPictureSubmit}>Detect</button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;