import React from "react"

const Rank = ({name, entries}) => {
    let userEntries = null;
    if(entries.entries){
        userEntries = entries.entries;
    } else {
        userEntries = entries;
    }

    return (
        <div>
            <div className="white f3">
                {`${name}, your current entry count is...`}
            </div>
            <div className="white f1">
                {userEntries}
            </div>
        </div>
    )
}

export default Rank;


