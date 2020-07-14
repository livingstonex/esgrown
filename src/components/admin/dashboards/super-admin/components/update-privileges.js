import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardActionArea, Typography, CardActions } from '@material-ui/core';
import { Spinner } from 'react-bootstrap';
import Modal from './update-modal';
import DeleteModal from './delete-modal';



const UpdatePrivileges = () => {

    const [admins, setAdmins] = useState([]);
    const [spinner, setSpinner] = useState(false);
    const [adminforupdate, setAdminForUpdate] = useState([]);
    const [show, setShow] = useState(false);
    const [deleteUserModal, setDeleteUserModal] = useState(false);
    const [deleteUser, setDeleteUser] = useState(false);
    const [privilege, setPrivilege] = useState();
    const [Updatespinner, setUpdateSpinner] = useState(false);







    const showUpdateModal = (e) => {
        const adminId = e.target.getAttribute('data-id');

        const adminObj = admins.filter(ad => {
            return ad._id === adminId
        })

        setAdminForUpdate(adminObj[0])
        setShow(true)
    }


    const getDelDetails = (e) => {

        const adminId = e.target.getAttribute('data-id');

        const deladminObj = admins.filter(ad => {
            return ad._id === adminId
        })
        setDeleteUser(deladminObj[0]);
        setDeleteUserModal(true);


    }

    //get privileges to update
    const getPrivileges = (e) => {

        setPrivilege(e.target.value);
    }

    // update CA privileges
    const updateUser = () => {


        setUpdateSpinner(true)

        const userId = adminforupdate._id;

        const data = {
            privilege: privilege.split('/')
        }

        axios.post(`http://localhost:5000/admin/update/${userId}`, data)
            .then(res => {
                if (res.data) {
                    axios.get(`http://localhost:5000/admin/country_admins`)
                        .then(res => {
                            if (res.data) {
                                setAdmins(res.data);
                            }
                        })
                        .catch(err => console.log(err))
                }
                setUpdateSpinner(false);
                setShow(false);
            })
            .catch(err => console.log(err));
    }






    const deleteCA = () => {

        axios.post(`http://localhost:5000/admin/delete/${deleteUser._id}`)
            .then(res => {
                if (res.data) {

                    //fetch admins after delete
                    axios.get(`http://localhost:5000/admin/country_admins`)
                        .then(res => {
                            if (res.data) {
                                setAdmins(res.data);
                                setDeleteUserModal(false);
                            }
                        })
                        .catch(err => console.log(err))
                }
            })
            .catch(err => console.log(err))

    }

    console.log(privilege);

    useEffect(() => {

        setSpinner(true)
        axios.get(`http://localhost:5000/admin/country_admins`)
            .then(res => {
                if (res.data) {
                    setAdmins(res.data);
                    setSpinner(false)

                }
            })
            .catch(err => console.log(err))
    }, []);


    return (
        <>
            {
                spinner ? <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
                    :
                    <div className="container mt-5">
                        <div className="row">

                            {admins.map(ad => {
                                return (

                                    <div className="col col-lg-4 col-sm-6">
                                        <Card style={{ height: '310px', background: '#F7F7F7', marginBottom: '10px' }}>
                                            <CardContent >
                                                <Typography gutterBottom variant="" component="h5" style={{ textAlign: 'center' }}>
                                                    <span >{ad.name}</span>
                                                </Typography>

                                                <div style={{ paddingLeft: '20px', fontSize: '16px' }}>
                                                    <div className="row" >
                                                        <div>Country:</div>

                                                        <div style={{ paddingLeft: '20px' }}>{ad.country}</div>
                                                    </div><br />

                                                    <div className="row" >
                                                        <div>Email:</div>

                                                        <div style={{ paddingLeft: '20px' }}>{ad.email}</div>
                                                    </div><br />

                                                    <div className="row" >
                                                        <div>Username:</div>

                                                        <div style={{ paddingLeft: '20px' }}>{ad.username}</div>
                                                    </div><br />

                                                    <div className="row" >
                                                        <div>Privileges:
                                                                <ul>
                                                                {ad.privilege.map(pri => {
                                                                    return (
                                                                        <li>{pri}</li>

                                                                    );
                                                                })}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div style={{ textAlign: 'center' }}>
                                                    <button className="btn btn-sm btn-default pull-left" style={{ fontStyle: 'italic', boxShadow: '1px 1px 1px 1px rgb(0,0,0,.3)', marginRight: '20px' }} data-id={ad._id} onClick={showUpdateModal}>Update</button>
                                                    <button className="btn btn-sm btn-default pull-right" style={{ fontStyle: 'italic', boxShadow: '1px 1px 1px 1px rgb(0,0,0,.3)' }} data-id={ad._id} onClick={getDelDetails}>Delete</button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>

                                );
                            })}
                        </div>
                    </div>
            }
            <Modal show={show} hide={() => setShow(!show)} admin={adminforupdate} getprivilege={getPrivileges} update={updateUser} spinner={Updatespinner} />
            <DeleteModal show={deleteUserModal} hide={() => setDeleteUserModal(!deleteUserModal)} user={deleteUser} del={deleteCA} />
        </>
    );
}
export default UpdatePrivileges;