import React, { useEffect, useState } from 'react';
import SuperAdmin from './admin/dashboards/super-admin/dashboard';
import CountryAdmin from './admin/dashboards/country-admin/dashboard';
import Admin from './admin/dashboards/admin/dashboard';

const AdminDashboard = () => {

    const [page, setPage] = useState(1);

    useEffect(() => {
        const admin = JSON.parse(sessionStorage.getItem("key"));
        console.log(admin)
        if (admin.role == "Supper Admin") {
            setPage(1)
        } else if (admin.role == 'Country Admin') {
            setPage(2)
        } else if (admin.role == 'Admin') {
            setPage(3)
        }
    }, []);

    return (
        <>
            {(page == 1) ? <SuperAdmin /> : (page == 2) ? <CountryAdmin /> : (page == 3) ? <Admin /> : ""}
        </>

    );
}

export default AdminDashboard;