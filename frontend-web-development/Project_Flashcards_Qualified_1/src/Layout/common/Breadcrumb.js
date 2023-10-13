import React from "react";
import {Link} from "react-router-dom";

function Breadcrumb({items = []}) {
    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                </li>
                {items.map((item, index) => (
                    item.link
                        ? <li key={index} className="breadcrumb-item">
                            <Link to={item.link}>{item.text}</Link>
                        </li>
                        : <li key={index} className="breadcrumb-item active" aria-current="page">
                            {item.text}
                        </li>

                ))
                }
            </ol>
        </nav>
    );
}

export default Breadcrumb;
