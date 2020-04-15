import React, { useEffect, useState } from 'react';
import SuperAdmin from './admin/dashboards/super-admin/dashboard'

const AdminDashboard = () => {

    const [page, setPage] = useState(1);

    useEffect(() => {
        const admin = JSON.parse(sessionStorage.getItem("key"));
        console.log(admin)
        if (admin.role == "Supper Admin") {
            setPage(1)
        }
    }, []);

    return (
        <>
            {(page == 1) ? <SuperAdmin /> : ""}
        </>

    );
}

export default AdminDashboard;