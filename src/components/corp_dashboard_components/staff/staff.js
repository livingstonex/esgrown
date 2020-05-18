import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Spinner, Dropdown, EditModal } from 'react-bootstrap';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import SearchBar from '../job/components/search';
import AddStaff from './components/add-staff';
import StaffDetails from './components/details';
import Rating from './components/rate';
import toast from '../../../util/toast';
import './styles.css';



const Staff = () => {


    const [user, setUser] = useState();
    const [show, setShow] = useState(false);
    const [staff, setStaff] = useState([]);

    const [showDetails, setShowDetails] = useState(false);
    const [showrating, setShowRating] = useState(false)
    const [details, setDetails] = useState([]);
    const [spinner, setSpinner] = useState(true);

    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem('key'));
        setUser(user);

        axios.get(`http://localhost:5000/individuals/staff/${user.id}`)
            .then(res => {
                if (res.data.length > 0) {
                    setStaff(res.data);
                }
            })
            .catch(err => console.log(err));
    }, [])

    //close add modal and reload staff
    const closeModal = () => {
        setShow(false);

        axios.get(`http://localhost:5000/individuals/staff/${user.id}`)
            .then(res => {
                if (res.data.length > 0) {
                    setStaff(res.data);
                }
            })
            .catch(err => console.log(err));
    };

    const getDetails = (e) => {

        const id = e.target.getAttribute('data-id');
        const current = e.target.getAttribute('data-current');

        const loadModal = current === "view" ? setShowDetails(true) : setShowRating(true)


        //get staff details from individuals
        axios.get(`http://localhost:5000/individuals/details/${id}`)
            .then(res => {
                if (res.data) {
                    setSpinner(false);
                    setDetails(res.data);
                    console.log(res.data)
                }
        })
        .catch(() => toast('An error occurred while trying to locate staff.Please try again','error'))
    }

  const  closeRating = () => {
        setShowRating(false)
    }

    return (
        <>
            <div className="container">

                <div className="container">
                    <div className="row" style={{ background: '#C4C4C4', height: '60px', paddingBottom: '20px', paddingTop: '10px', paddingLeft: '40px' }}>

                        <div className="col-lg-8" ><SearchBar /></div>

                        <div className="col-lg-4" style={{cursor:'pointer'}}  onClick={() => setShow(!show)}>
                            <span style={{ float: 'right', lineHeight: '50px', marginLeft: '10px', marginBottom: '20px', color: '#3F51B5', fontSize: '16px', fontWeight: 'bolder' }}>
                                <AddCircleIcon fontSize="large" /> Add {user && user.org_type === "school" ? "teacher" : "staff"}
                            </span>
                        </div>
                    </div>
                </div><br /><br />

                {/* header for the rows    */}
                <div className="container">
                    <div className="row">
                        <div className="col d-flex d-inline-flex">

                            <div className=" pl-3 d-flex flex-fill align-items-center">
                                <p className="mb-0 text-color-2">Name</p>
                            </div>


                            <div className="d-flex flex-fill align-items-center">
                                <p className="mb-0">Email</p>
                            </div>


                            <div className=" d-flex flex-fill align-items-center">
                                <p className="mb-0">Phone</p>
                            </div>

                        </div>
                    </div>
                </div>

                {
                    staff.map(st => {
                        return (
                            <>
                                <div className="wrapper-list py-2 mt-2">
                                    <div className="container-fluid">
                                        <div className="row">
                                            <div className="col d-flex justify-content-between">

                                                <div className="d-flex flex-fill align-items-center">
                                                    <p className="ml-2 mb-0 text-color-2">{st.fullname}</p>
                                                </div>

                                                <div className="d-flex flex-fill align-items-center">
                                                    <p className="ml-3 mb-0 ">{st.email}</p>
                                                </div>

                                                <div className="pr-2 d-flex flex-fill align-items-center">
                                                    <p className="ml-3 mb-0 text-color-2">{st.phone}</p>
                                                </div>
                                                <div className="pr-2 d-flex flex-fill align-items-center">
                                                    <p className="ml-3 mb-0 text-color-2">{st.tic}</p>
                                                </div>

                                                <div className="d-flex align-items-center ml-auto">
                                                    <Dropdown alignRight>
                                                        <Dropdown.Toggle id="dropdown-basic" style={{ color: 'black', fontWeight: 'bolder' }}>
                                                            ....
                                                        </Dropdown.Toggle>
                                                        <Dropdown.Menu>
                                                            <Dropdown.Item onClick={getDetails} data-id={st._id} data-current="view">View Details</Dropdown.Item>
                                                            <Dropdown.Item onClick={() => alert('Hello')}>Edit {user && user.org_type === "school" ? "teacher" : "staff"}</Dropdown.Item>
                                                            <Dropdown.Item onClick={getDetails} data-id={st._id} data-current="rate">Rate {user && user.org_type === "school" ? "teacher" : "staff"}</Dropdown.Item>
                                                            <Dropdown.Item onClick={() => alert('Hello')}>Delete {user && user.org_type === "school" ? "teacher" : "staff"}</Dropdown.Item>
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        );
                    })
                }

                
            </div>
            <AddStaff show={show} onHide={() => setShow(!show)} closeModal={closeModal} />
            <StaffDetails
                show={showDetails}
                onHide={() => setShowDetails(!showDetails)}
                details={details}
                spinner={spinner}
            />
            <Rating
                show={showrating}
                onHide={() => setShowRating(!showrating)}
                details={details}
                spinner={spinner}
                closeModal={closeRating}
            />
        </>
    );
}
export default Staff;

