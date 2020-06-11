import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Spinner, Dropdown, EditModal } from 'react-bootstrap';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import SearchBar from '../job/components/search';
import AddStaff from './components/add-staff';
import StaffDetails from './components/details';
import Rating from './components/teacher-rateing';
import Edit from './components/edit';
import SchoolWeeks from './components/school-weeks';
import CompanyStaffRating from './components/staff-rating';
import toast from '../../../util/toast';
import './styles.css';
import DeleteStaff from './components/delete';



const Staff = () => {


    const [user, setUser] = useState();
    const [show, setShow] = useState(false);
    const [staff, setStaff] = useState([]);

    //modals
    const [showDetails, setShowDetails] = useState(false);
    const [showrating, setShowRating] = useState(false)
    const [showEdit, setShowEdit] = useState(false);
    const [schoolWeeksmodal, setSchoolWeeksModal] = useState(false);


    const [details, setDetails] = useState([]);
    const [spinner, setSpinner] = useState(true);
    const [weeks, setWeeks] = useState();
    const [lastDoc, setLastDoc] = useState([])
    const [target, setTarget] = useState();
    const [showDelete, setShowDelete] = useState(false)


    const [ratecompany, setRateCompany] = useState(false);

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

        //check if this is the beginning of the term and get the total weeks for the term

        axios.get(`http://localhost:5000/rate/teacher/check/${user.org_name}`)
            .then(res => {

                setLastDoc(res.data.reverse()[0])
            })
            .catch(err => console.log(err));

    }, [])

    //get the new school week and show rating modal
    const getSchoolWeeks = (w) => {
        setWeeks(w);
        setSchoolWeeksModal(false);
        displayDetails(target)

    }


    //close add modal and reload staff
    const closeModal = () => {
        setShow(false);
        setShowEdit(false)

        axios.get(`http://localhost:5000/individuals/staff/${user.id}`)
            .then(res => {
                if (res.data.length > 0) {
                    setStaff(res.data);
                }
            })
            .catch(err => console.log(err));
    };


    //get currently clicked staff
    const getDetails = (e) => {
        setTarget(e.currentTarget)
        const current = e.target.getAttribute('data-current');


        //show company rating modal
        if (current === 'rate' && user.org_type === 'company') {

            const id = e.target.getAttribute('data-id');

            const staffDetails = staff.filter(st => {
                return st._id === id
            })

            setDetails(staffDetails[0]);
            setRateCompany(true)


        } else {

            if (current === 'rate') {
                if (lastDoc === undefined) {
                    setTarget(e.currentTarget)
                    setSchoolWeeksModal(true)
                    toast("Please tell us how many weeks are in your calendar this term", "info");
                    return;

                } else if (lastDoc.total_weeks === lastDoc.current_week) {
                    setTarget(e.currentTarget)
                    setSchoolWeeksModal(true);
                    toast("your Current Term has ended. Please start a new term", "info");
                    return;
                }
            }


            displayDetails(target, e)
        }
    }

    //display modal based on selected action
    const displayDetails = (target, e) => {

        const id = e ? e.target.getAttribute('data-id') : target.getAttribute('data-id');
        const current = e ? e.target.getAttribute('data-current') : target.getAttribute('data-current');

        const loadModal = () => current === "view" ? setShowDetails(true) : current === "rate" ? setShowRating(true) : current === "edit" ? setShowEdit(true) : current === "delete" ? setShowDelete(true) : ""

        const staffDetails = staff.filter(st => {
            return st._id === id
        })
        setDetails(staffDetails[0]);
        loadModal();
    }

    const closeRating = () => {
        setShowRating(false)
        setRateCompany(false)
    }
    console.log(details)

    return (
        <>
            <div className="container">

                <div className="container">
                    <div className="row" style={{ background: '#C4C4C4', height: '60px', paddingBottom: '20px', paddingTop: '10px', paddingLeft: '40px' }}>

                        <div className="col-lg-8" ><SearchBar /></div>

                        <div className="col-lg-4" style={{ cursor: 'pointer' }} onClick={() => setShow(!show)}>
                            <span style={{ float: 'right', lineHeight: '50px', marginLeft: '10px', marginBottom: '20px', color: '#3F51B5', fontSize: '16px', fontWeight: 'bolder' }}>
                                <AddCircleIcon fontSize="large" /> Add {user && user.org_type === "school" ? "teacher" : "staff"}
                            </span>
                        </div>
                    </div>
                </div><br /><br />

                {/* header for the rows    */}
                {/* <div className="container"> */}
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
                {/* </div> */}

                {
                    staff.map(st => {
                        return (
                            <>
                                <div className="wrapper-list py-2 mt-2" style={{ backgroundColor: '#f5f5f5' }}>
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
                                                    <Dropdown alignRight color={'red'} style={{ backgroundColor: '#f5f5f5' }}>
                                                        <Dropdown.Toggle id="dropdown-basic" style={{ color: 'black', fontWeight: 'bolder' }}>
                                                            ....
                                                        </Dropdown.Toggle>
                                                        <Dropdown.Menu>
                                                            <Dropdown.Item onClick={getDetails} data-id={st._id} data-current="view">View Details</Dropdown.Item>
                                                            <Dropdown.Item onClick={getDetails} data-id={st._id} data-current="edit">Edit {user && user.org_type === "school" ? "teacher" : "staff"}</Dropdown.Item>
                                                            <Dropdown.Item onClick={getDetails} data-id={st._id} data-current="rate">Rate {user && user.org_type === "school" ? "teacher" : "staff"}</Dropdown.Item>
                                                            <Dropdown.Item onClick={getDetails} data-id={st._id} data-current="delete">Delete {user && user.org_type === "school" ? "teacher" : "staff"}</Dropdown.Item>
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
                weeks={weeks}
                lastDoc={lastDoc}
            />
            <Edit
                show={showEdit}
                onHide={() => setShowEdit(!showEdit)}
                id={details._id}
                spinner={spinner}
                user={user}
                closeModal={closeModal}
            />
            <SchoolWeeks
                show={schoolWeeksmodal}
                onHide={() => setSchoolWeeksModal(!schoolWeeksmodal)}
                getSchoolWeeks={getSchoolWeeks}
            />
            <CompanyStaffRating
                show={ratecompany}
                onHide={() => setRateCompany(!ratecompany)}
                details={details}
                closeModal={closeRating}
            />
            <DeleteStaff
                show={showDelete}
                onHide={() => setShowDelete(!showDelete)}
                details={details}
                user={user}
            />
            
        </>
    );
}
export default Staff;

