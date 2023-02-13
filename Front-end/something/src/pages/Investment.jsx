import Axios from "axios";
import React, { useState } from "react";

import { toast } from "../helpers";
import env from "../helpers/env";
import AdminLayout from "../layouts/AdminLayout";
import "../assets/TreeView.css";

const Investment = () => {
    const [username, setUsername] = useState("");
    const [userTree, setUserTree] = useState([]);

    const handleFetchData = () => {
        let config = {
            method: "get",
            url: `${env}/api/userTreeUpToRoot/${username}`
        };

        if (username === "") {
            toast("warning", "Failed on fetch data, input is blanked.");
            return;
        }

        window.Swal.fire({
            title: "Are you sure?",
            text: "You wont be able to revert this transaction!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then(result => {
            if (result.isConfirmed) {
                Axios(config)
                    .then(response => {
                        response.data.reverse();
                        setUserTree(response.data);
                        toast("success", "Failed on fetch data, input is blanked.");
                    })
                    .catch(() => {
                        toast("error", "Failed on fetch data, this username is not exists.");
                        return;
                    });
                window.Swal.fire("Confirmed!", "Your transaction has been created.", "success");
            }
        });
    };

    return (
        <AdminLayout>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
            <button onClick={handleFetchData}>Click me</button>
            <div className="tree">
                {userTree.map((user, index) => {
                    return (
                        <ul key={index}>
                            <li>
                                <a>{user.username}</a>
                            </li>
                        </ul>
                    );
                })}
            </div>
        </AdminLayout>
    );
};

export default Investment;
