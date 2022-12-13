import React from "react";
import contPicture from "../../../static/cold.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function() {
    return ( 
        <div className="content-page-wrap">
            <div className="left-column" style={{
                background: "url(" + contPicture + ") no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center"}} />
            <div className="right-column">
                <div className="contact-bullet-points">
                    <div className="bullet-point-group">
                        <div className="cont-bullet-points">
                            <div className="icon">
                                <FontAwesomeIcon icon="phone" />
                            </div>
                            <div className="text">
                                555-555-5555
                            </div>
                        </div>
                    </div>
                    <div className="bullet-point-group">
                        <div className="cont-bullet-points">
                            <div className="icon">
                                <FontAwesomeIcon icon="phone" />
                            </div>
                            <div className="text">
                                555-555-5555
                            </div>
                        </div>
                    </div>
                    <div className="bullet-point-group">
                        <div className="cont-bullet-points">
                            <div className="icon">
                                <FontAwesomeIcon icon="phone" />
                            </div>
                            <div className="text">
                                555-555-5555
                            </div>
                        </div>
                    </div>    
                </div>
            </div>        
        </div>
)}
