import React, { useState } from "react";
import { Alert, Button } from "react-bootstrap";

export function Alerty({ variant = "success", title, description, className = "pt-5 px-5", dismis = true }) {
    const [show, setShow] = useState(true);

    return (
        <div className={className}>
            {dismis != false ? (
                <Alert show={show} variant={variant} className="w-100" dismissible onClick={()=> setShow(false)}>
                    <Alert.Heading>{title}</Alert.Heading>
                    <p dangerouslySetInnerHTML={{__html: description}}/>
                </Alert>
            ): (
                <Alert show={show} variant={variant} className="w-100">
                    <Alert.Heading>{title}</Alert.Heading>
                    <p dangerouslySetInnerHTML={{__html: description}}/>
                </Alert>
            )}

        </div>
    );
}