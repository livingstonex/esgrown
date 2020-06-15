import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Spinner, Dropdown, EditModal } from 'react-bootstrap';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import SearchBar from '../job/components/search';
import AddStaff from './components/add-staff';
import StaffDetails from './components/details';
import Rating from './components/rate';
import Edit from './components/edit';
import SchoolWeeks from './components/school-weeks';
import toast from '../../../util/toast';
import './styles.css';



const Staff = ({ex_rankingpage}) => {


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

        axios.get(`http://localhost:5000/rate/teacher/check/ftures`)
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
        
        
         displayDetails(target,e)

    }
    
    //display modal based on selected action
    const displayDetails = (target,e) => {

        const id = e ? e.target.getAttribute('data-id') : target.getAttribute('data-id');
        const current = e ? e.target.getAttribute('data-current') :target.getAttribute('data-current');

        const loadModal = () => current === "view" ? setShowDetails(true) : current === "rate" ? setShowRating(true) : current === "edit" ? setShowEdit(true) : current === "delete" ? "delete" : ""

        //get staff details from individuals
        axios.get(`http://localhost:5000/individuals/details/${id}`)
            .then(res => {
                if (res.data) {
                    setSpinner(false);
                    setDetails(res.data);
                    loadModal()
                }
            })
            .catch(() => toast('An error occurred while trying to locate staff.Please try again', 'error'))
    
}


    const closeRating = () => {
        setShowRating(false)
    }

    return (
        <>
            <div className="container" style={{marginTop:"70px"}}>

                <div className="container">
                    <div className="row d-flex align-items-center justify-content-center" style={{ background: '#C4C4C4', padding:'10px'}}>

                        <div className="col-lg-8" ><SearchBar /></div>

                        <div className="col-lg-4" style={{ cursor: 'pointer' }} >
                            {/* <span style={{ float: 'right', lineHeight: '50px', marginLeft: '10px', color: '#3F51B5', fontSize: '16px', fontWeight: 'bolder' }}> */}
                                <div className="d-flex justify-content-between">
                                <div className="btn" style={{background:'#53a6e7'}} onClick={ex_rankingpage}>Excercise Ranking</div>
                                <div onClick={() => setShow(!show)}><AddCircleIcon fontSize="large" /> Add {user && user.org_type === "school" ? "teacher" : "staff"}</div>
                                </div>
                            {/* </span> */}
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
                                <div className="wrapper-list py-2 mt-2" style={{backgroundColor:'#f5f5f5'}}>
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
                                                    <Dropdown alignRight color={'red'} style={{backgroundColor:'#f5f5f5'}}>
                                                        <Dropdown.Toggle id="dropdown-basic" style={{ color: 'black', fontWeight: 'bolder'}}>
                                                            ....
                                                        </Dropdown.Toggle>
                                                        <Dropdown.Menu>
                                                            <Dropdown.Item onClick={getDetails} data-id={st._id} data-current="view">View Details</Dropdown.Item>
                                                            <Dropdown.Item onClick={getDetails} data-id={st._id} data-current="edit">Edit {user && user.org_type === "school" ? "teacher" : "staff"}</Dropdown.Item>
                                                            <Dropdown.Item onClick={getDetails} data-id={st._id} data-current="rate">Rate {user && user.org_type === "school" ? "teacher" : "staff"}</Dropdown.Item>
                                                            <Dropdown.Item onClick={() => alert('Hello')} data-current="delete">Delete {user && user.org_type === "school" ? "teacher" : "staff"}</Dropdown.Item>
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
                details={details}
                spinner={spinner}
                user={user}
            />
            <SchoolWeeks
                show={schoolWeeksmodal}
                onHide={() => setSchoolWeeksModal(!schoolWeeksmodal)}
                getSchoolWeeks={getSchoolWeeks}
            />
        </>
    );
}
export default Staff;

