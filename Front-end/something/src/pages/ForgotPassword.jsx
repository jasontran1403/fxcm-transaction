import Axios from "axios";
import qs from "qs";
import React, { useState } from "react";

import { PrimaryButton } from "../components/buttons";
import { Input } from "../components/field";
import { Link, Loader } from "../components/utils";
import { toast } from "../helpers";
import env from "../helpers/env";
import AuthLayout from "../layouts/AuthLayout";

const ForgotPassword = () => {
    const [validationMessage, setValidationMessage] = useState([]);
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    let regex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const onSubmit = () => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            if (email) {
                if (regex.test(email)) {
                    let data = qs.stringify({
                        email: email
                    });
                    let config = {
                        method: "post",
                        url: `${env}/api/user/forgotpassword`,
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        data: data
                    };

                    Axios(config).then(response => {
                        if (response.data === "Email is not existed") {
                            toast("error", "This email address is not existed, please try again.");
                        } else {
                            toast(
                                "success",
                                "An email has been sent to you to reset your password."
                            );
                            setEmail("");
                            setValidationMessage([]);
                        }
                    });
                } else {
                    toast("error", "Email address is invalid, please try again.");
                    setValidationMessage(["Email address is invalid"]);
                }
            } else {
                setValidationMessage(["Email is required"]);
            }
        }, 300);
    };

    return (
        <AuthLayout
            title={
                <>
                    Welcome to <br /> our community
                </>
            }
        >
            <h3 className="text-center text-xl font-semibold text-gray-700">Reset password</h3>
            <p className="text-center text-sm mt-2 mb-10">
                If you forgot your password, don't worry! we’ll email you <br /> instructions to
                reset your password.
            </p>

            <form className="space-y-5">
                <div>
                    <Input
                        label={"Email"}
                        id="email"
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={e => {
                            setEmail(e.target.value);
                        }}
                        error={validationMessage}
                    />
                </div>

                <PrimaryButton onClick={onSubmit} disabled={loading}>
                    {loading && <Loader color={"white"} />}
                    <span>Send Reset Link</span>
                </PrimaryButton>

                <p className="text-sm text-center">
                    <Link href="/login">Back to Login</Link>
                </p>
            </form>
        </AuthLayout>
    );
};

export default ForgotPassword;
