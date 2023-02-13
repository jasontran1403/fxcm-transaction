import Axios from "axios";
import qs from "qs";
import React, { useState } from "react";

import config from "../config";
import { toast } from "../helpers";
import env from "../helpers/env";
import AdminLayout from "../layouts/AdminLayout";

const Profile = () => {
    const currentUsername = config.AUTH.DRIVER.getItem("username");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [authen, setAuthen] = useState("");

    const handleSubmit = () => {
        if (currentPassword === "" || newPassword === "" || confirmPassword === "") {
            alert("All informations are required");
            return;
        } else if (newPassword !== confirmPassword) {
            alert("New password and confirm new password is not match");
            return;
        } else {
            let data = qs.stringify({
                username: currentUsername,
                currentPassword: currentPassword,
                authen: authen,
                newPassword: newPassword,
                confirmNewPassword: confirmPassword
            });
            let config = {
                method: "post",
                url: `${env}/api/user/changePassword`,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                data: data
            };

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
                    Axios(config).then(response => {
                        if (response.data === "Change password success") {
                            toast("success", "Change password success");
                        } else if (response.data === "2FA code is incorrect") {
                            toast("error", "2FA Code is incorrect");
                        } else if (response.data === "Old password is incorrect") {
                            toast("error", "Old password is incorrect");
                        }
                    });
                    window.Swal.fire("Confirmed!", "Your transaction has been created.", "success");
                }
            });
        }
    };

    return (
        <AdminLayout>
            <div className="px-4 py-3 bg-white border rounded-md shadow-xs col-span-full">
                <div className="flex justify-center col-span-6 mt-3 min-w-min">
                    <p className="flex text-2xl font-light text-orange-500 transition-all duration-300">
                        Current Password
                        <input
                            className="select"
                            type="password"
                            value={currentPassword}
                            onChange={e => {
                                setCurrentPassword(e.target.value);
                            }}
                        />
                    </p>
                </div>

                <div className="flex justify-center col-span-6 mt-3 min-w-min">
                    <p className="flex text-2xl font-light text-orange-500 transition-all duration-300">
                        New Password
                        <input
                            className="select"
                            type="password"
                            value={newPassword}
                            onChange={e => {
                                setNewPassword(e.target.value);
                            }}
                        />
                    </p>
                </div>

                <div className="flex justify-center col-span-6 mt-3 min-w-min">
                    <p className="flex text-2xl font-light text-orange-500 transition-all duration-300">
                        Confirm Password
                        <input
                            className="select"
                            type="password"
                            value={confirmPassword}
                            onChange={e => {
                                setConfirmPassword(e.target.value);
                            }}
                        />
                    </p>
                </div>

                <div className="flex justify-center col-span-6 mt-3 min-w-min">
                    <p className="flex text-2xl font-light text-orange-500 transition-all duration-300">
                        2FA Authentication
                        <input
                            className="select"
                            type="text"
                            value={authen}
                            onChange={e => {
                                setAuthen(e.target.value);
                            }}
                        />
                    </p>
                </div>

                <div className="flex justify-center col-span-1 mt-3">
                    <div className="px-2 py-1 font-semibold text-black-300 bg-emerald-400 rounded">
                        <button className="place-items-center" onClick={handleSubmit}>
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default Profile;
