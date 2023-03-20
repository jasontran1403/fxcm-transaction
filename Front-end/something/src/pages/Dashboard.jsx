import Axios from "axios";
import React, { useEffect, useState } from "react";

import Analytics from "../components/Analytics";
import Datatable from "../components/datatables/Datatable";
import config from "../config";
import { formatToCurrency } from "../helpers";
import env from "../helpers/env";
import AdminLayout from "../layouts/AdminLayout";
import "../assets/Loading.css";

const ReloadAccount = () => {
    const currentUsername = config.AUTH.DRIVER.getItem("username");
    const [cashBalance, setCashBalance] = useState("");
    const [commissionBalance, setCommissionBalance] = useState("");
    const [personalSale, setPersonalSale] = useState(0);
    const [leftGroupSale, setLeftGroupSale] = useState(0);
    const [rightGroupSale, setRightGroupSale] = useState(0);
    const [leftAccumulateSale] = useState(0);
    const [rightAccumulateSale] = useState(0);
    const [rank, setRank] = useState("");
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            let configGetInfo = {
                method: "get",
                maxBodyLength: Infinity,
                url: `${env}/api/user/${currentUsername}`
            };

            Axios(configGetInfo).then(response => {
                setRightGroupSale(response.data.rightrefsale);
                setLeftGroupSale(response.data.leftrefsale);
                setCashBalance(response.data.cashbalance);
                setCommissionBalance(response.data.commissionbalance);
                setRank(response.data.user.rank);
                setPersonalSale(response.data.user.sales);
            });

            let configCommissionHistory = {
                method: "get",
                url: `${env}/api/history/commission/${currentUsername}`
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
                            investmentcode: {
                                text: item.frominvestment,
                                jsx: (
                                    <div className="flex items-center">
                                        <span className="font-light">{item.frominvestment}</span>
                                    </div>
                                )
                            },
                            from: {
                                text: item.cashfrom,
                                jsx: (
                                    <div className="flex items-center">
                                        <span className="font-light">{item.cashfrom}</span>
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
                                            item.status === "success" ? "green" : "yellow"
                                        }-500 bg-${
                                            item.status === "success" ? "green" : "yellow"
                                        }-100 rounded`}
                                    >
                                        {item.status}
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

    return (
        <AdminLayout>
            <div className="mb-7">
                <Analytics
                    cashBalance={cashBalance}
                    commissionBalance={commissionBalance}
                    rank={rank}
                    personalSale={personalSale}
                    leftGroupSale={leftGroupSale}
                    rightGroupSale={rightGroupSale}
                    leftAccumulateSale={leftAccumulateSale}
                    rightAccumulateSale={rightAccumulateSale}
                />
            </div>

            <div className="grid grid-cols-1 mt-7">
                <Datatable
                    head={["Code", "Time", "Investment Code", "From", "Amount", "Type", "Status"]}
                    dataProperty={[
                        "code",
                        "date",
                        "investmentcode",
                        "from",
                        "amount",
                        "type",
                        "status"
                    ]}
                    list={data}
                    loading={loading}
                />
            </div>
        </AdminLayout>
    );
};

export default ReloadAccount;
