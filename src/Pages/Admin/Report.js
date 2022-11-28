import React, { useEffect, useState } from 'react';
import axios, { isCancel, AxiosError } from 'axios';

const Report = () => {
    const [reports, setReports] = useState([])
    useEffect(() => {
        // axios
        axios.get(`http://localhost:5000/reportItem`)
            .then(data => {
                setReports(data.data)
            })

    }, [])
    console.log(reports)
    return (

        <div className='w-full'>


            <div className="w-full overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>S.N.</th>
                            <th>Product Name</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            reports?.map((order, i) =>
                                <tr key={i}>
                                    <th>
                                        {i + 1}
                                    </th>
                                    <td>
                                        <div className="flex items-center space-x-3">

                                            <div>
                                                <div className="font-bold">{order.name}</div>

                                            </div>
                                        </div>
                                    </td>

                                    <td>{order.resalePrice}</td>
                                    <th>
                                        <p>{order.meetingLocation}</p>
                                    </th>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div >
    );
};

export default Report;