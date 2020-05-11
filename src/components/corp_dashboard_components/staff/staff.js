import React, { useState, useEffect } from 'react';
import { Spinner, Dropdown, EditModal } from 'react-bootstrap';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import SerachBar from '../job/components/search';
import AddStaff from './components/add-staff';



const Staff = () => {

    const [user, setUser] = useState();
    const [show, setShow] = useState(false);

    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem('key'));
        setUser(user)
    }, [])

    const closeModal = () => {
        setShow(false);

        // axios.get(`http://localhost:5000/jobs`)
        //     .then(res => {
        //         if (res.data.length > 0) {
        //             setJobs(res.data);
        //             setSpinner(false);

        //         }
        //     })
        //     .catch(err => console.log(err));
    };

    return (
        <>
            <div className="container">

                <div className="container">
                    <div className="row" style={{ background: '#C4C4C4', height: '60px', paddingBottom: '20px', paddingTop: '10px', paddingLeft: '40px' }}>

                        <div style={{ width: '500px', float: 'left' }}><SerachBar /></div>

                        <div style={{ cursor: 'pointer', height: 'auto', float: 'right', marginLeft: '400px' }} onClick={() => setShow(!show)}>
                            <span style={{ float: 'right', lineHeight: '50px', marginLeft: '10px', marginBottom: '20px', color: '#3F51B5', fontSize: '16px', fontWeight: 'bolder' }}>
                                <AddCircleIcon fontSize="large" /> Add {user && user.corp_type === "school" ? "teacher" : "staff"}
                            </span>
                        </div>
                    </div>
                </div><br /><br />

                {/* header for the rows    */}
                <div className="container">
                    <div className="row ">
                        <div className="col d-flex d-inline-flex">
                            <div className=" pl-3 d-flex flex-fill align-items-center">
                                <p className="mb-0 text-color-2">Organization</p>
                            </div>

                            <div className=" pl-3 d-flex flex-fill align-items-center">
                                <p className="mb-0 text-color-2">Name</p>
                            </div>


                            <div className="d-flex flex-fill align-items-center">
                                <p className="mb-0">Email</p>
                            </div>


                            <div className=" d-flex flex-fill align-items-center">
                                <p className="mb-0">Phone</p>
                            </div>


                            <div className="d-flex flex-fill align-items-center">
                                <p className="mb-0">Service</p>
                            </div>

                            <div className="d-flex flex-fill align-items-center">
                                <p className="mb-0">TIC</p>
                            </div>
                            <div className="d-flex align-items-center ml-auto">
                                <p className="mb-0">tic</p>
                            </div>
                        </div>
                    </div>
                </div>



                <div className="wrapper-list py-2 mt-2">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col d-flex justify-content-between">

                                <div className="pr-2 d-flex flex-fill align-items-center">
                                    <p className="ml-5 text-color-2">wwww</p>
                                </div>

                                <div className="pr-2 d-flex flex-fill align-items-center">
                                    <p className="mb-0 text-capitalize">wwww</p>
                                </div>

                                <div className="pr-2 d-flex flex-fill align-items-center">
                                    <p className="mb-0 text-color-2">wwww</p>
                                </div>

                                <div className="pr-2 d-flex flex-fill align-items-center">
                                    <p className="mb-0">kkkk</p>
                                </div>

                                <div className="pr-2 d-flex flex-fill align-items-center">
                                    <p className="mb-0">kkkk</p>
                                </div>

                                <div className="pr-2 d-flex flex-fill align-items-center">
                                    <p className="mb-0">kkkk</p>
                                </div>

                                <div className="pl-4 d-flex align-items-center ml-auto">
                                    <Dropdown drop="left">
                                        <Dropdown.Toggle id="dropdown-basic" style={{ color: 'black', fontWeight: 'bolder' }}>
                                            ....
                                    </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={() => alert('Hello')}>Edit</Dropdown.Item>
                                            <Dropdown.Item onClick={() => alert('Hello')}>Delete</Dropdown.Item>
                                            <Dropdown.Item onClick={() => alert('Hello')}>Rate</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <AddStaff show={show} onHide={() => setShow(!show)} closeModal={closeModal} />
        </>
    );
}
export default Staff;

