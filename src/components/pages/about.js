import React from "react";
import profilePicture from "../../../static/hat.jpg";

export default function() {
    return <div className="content-page-wrap">
                <div className="left-column" style={{
                background: "url(" + profilePicture + ") no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center"
                 }} />
                <div className="right-column">
                blah blah blah
                </div>
            </div>;

    
}