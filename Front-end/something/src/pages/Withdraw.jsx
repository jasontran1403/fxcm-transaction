import Axios from "axios";
import React, { useState, useEffect } from "react";

import Datatable from "../components/datatables/Datatable";
import config from "../config";
import { formatToCurrency } from "../helpers";
import env from "../helpers/env";
import AdminLayout from "../layouts/AdminLayout";
import "../assets/ProgressBar.css";

const Withdraw = () => {
    const [crypto, setCrypto] = useState("");
    const [network] = useState([
        { name: "Binance Smart Chain" },
        { name: "Ethereum" },
        { name: "Bitcoin" }
    ]);
    const [networkChoose, setNetworkChoose] = useState("");
    const [amount, setAmount] = useState("");
    const currentUsername = config.AUTH.DRIVER.getItem("username");
    const [maxOutLeft, setMaxOutLeft] = useState(0);
    const [progress, setProgress] = useState("0%");
    const [cashBalance, setCashBalance] = useState("");
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let config = {
            method: "get",
            url: `${env}/api/user/${currentUsername}`
        };

        Axios(config).then(response => {
            setCashBalance(response.data.cashbalance);
            setMaxOutLeft(response.data.user.maxoutleft);
            setProgress(
                `${Math.floor(
                    ((response.data.user.maxout - response.data.user.maxoutleft) /
                        response.data.user.maxout) *
                        100
                )}%`
            );
        });
    }, [currentUsername]);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            let configCommissionHistory = {
                method: "get",
                url: `${env}/api/history/withdraw/${currentUsername}`
            };

            const fetchData = async () => {
                const response = await Axios(configCommissionHistory);
                setData(
                    response.data.map(item => {
                        return {
                            id: item.code,
                            code: {
                                text: item.code,
                                jsx: (
                                    <div className="text-lg text-purple-500 cursor-pointer hover:cursor-pointer">
                                        {item.code}
                                    </div>
                                )
                            },
                            date: {
                                text: item.time,
                                jsx: (
                                    <div className="flex items-center">
                                        <span className="font-light">{item.time}</span>
                                    </div>
                                )
                            },
                            amount: {
                                text: item.amount,
                                jsx: (
                                    <span className="font-light">
                                        {formatToCurrency(item.amount)}
                                    </span>
                                )
                            },
                            type: {
                                text: item.type,
                                jsx: (
                                    <div className="flex items-center">
                                        <span className="font-light">{item.type}</span>
                                    </div>
                                )
                            },
                            status: {
                                text: item.status,
                                jsx: (
                                    <div
                                        className={`outline-offset-4 inline-block font-bold px-2 py-1 text-xs font-light text-${
                                            item.status === "success"
                                                ? "green"
                                                : item.status === "pending"
                                                ? "yellow"
                                                : "red"
                                        }-500 bg-${
                                            item.status === "success"
                                                ? "green"
                                                : item.status === "pending"
                                                ? "yellow"
                                                : "red"
                                        }-100 rounded`}
                                    >
                                        {item.status}
                                        {item.status === "pending" ? (
                                            <button> (Cancel)</button>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                )
                            },
                            hash: {
                                text: item.hash,
                                jsx: (
                                    <div className="flex items-center">
                                        <span className="font-light">{item.hash}</span>
                                    </div>
                                )
                            }
                        };
                    })
                );
            };

            fetchData();

            setLoading(false);
        }, 500);
    }, [currentUsername]);

    const handleSubmit = () => {
        if (crypto === "" || networkChoose === "" || amount === "") {
            alert("Required input");
            return;
        } else if (parseFloat(amount) < 0) {
            alert("Input must be greater than 0");
            return;
        } else if (isNaN(amount)) {
            alert("Input must be a number");
            return;
        } else {
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
                    console.log({ crypto, networkChoose, amount });
                    window.Swal.fire("Confirmed!", "Your transaction has been created.", "success");
                }
            });
        }
    };
    return (
        <AdminLayout>
            <div className="px-4 py-3 bg-white border rounded-md shadow-xs col-span-full">
                <div className="flex justify-between col-span-6 mt-3 min-w-min">
                    <p className="flex text-2xl font-light text-orange-500 transition-all duration-300 w-3/4">
                        Network
                    </p>
                    <select
                        className="select w-3/4"
                        name="network"
                        onChange={e => {
                            setNetworkChoose(e.target.value);
                        }}
                    >
                        <option value="default">Vui lòng chọn mạng</option>
                        <option value={network[0].name}>{network[0].name}</option>
                        <option value={network[1].name}>{network[1].name}</option>
                        <option value={network[2].name}>{network[2].name}</option>
                    </select>
                </div>

                <div className="flex justify-between col-span-6 mt-3 min-w-min">
                    <p className="flex w-3/4 text-2xl font-light text-orange-500 transition-all duration-300">
                        Wallet Address
                    </p>
                    <input
                        className="select w-3/4"
                        type="text"
                        value={crypto}
                        placeholder="Cryptocurrency"
                        onChange={e => {
                            setCrypto(e.target.value);
                        }}
                    />
                </div>

                <div className="flex justify-between col-span-6 mt-3 min-w-min">
                    <p className="flex w-3/4 text-2xl font-light text-orange-500 transition-all duration-300">
                        Amount
                    </p>
                    <input
                        type="number"
                        className="select w-3/4"
                        value={amount}
                        min="0"
                        placeholder="Amount"
                        onChange={e => {
                            setAmount(e.target.value);
                        }}
                    />
                </div>

                <div className="flex justify-between col-span-6 mt-3 min-w-min">
                    <p className="flex text-2xl font-light text-orange-500 transition-all duration-300">
                        Balance
                    </p>
                    <p className="flex text-2xl font-light text-orange-500 transition-all duration-300">
                        {formatToCurrency(cashBalance)}
                    </p>
                </div>

                <div className="flex justify-center col-span-6 mt-3 min-w-min">
                    <div className="loading-bar bg-white border rounded-md w-full">
                        <div
                            className="progress-bar"
                            style={{
                                width: progress,
                                height: "100%",
                                background: "rgb(255 58 58)",
                                borderRadius: "5px",
                                border: "0 solid #0abde3"
                            }}
                        >
                            <div className="progress-bar-content font-semibold">
                                {formatToCurrency(maxOutLeft)}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center col-span-1 mt-3">
                    <div className="px-2 py-1 font-semibold text-black-300 bg-emerald-400 rounded">
                        <button className="place-items-center" onClick={handleSubmit}>
                            Withdraw
                        </button>
                    </div>
                </div>
            </div>

            <div className="mt-5">
                <Datatable
                    head={["Code", "Time", "Amount", "Type", "Status", "Hash"]}
                    dataProperty={["code", "date", "amount", "type", "status", "hash"]}
                    list={data}
                    loading={loading}
                />
            </div>
        </AdminLayout>
    );
};

export default Withdraw;
