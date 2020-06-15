import React, {useState} from 'react';
import {Modal} from 'react-bootstrap';
import Pill from './pills/pill';


export default function IntendedFieldOfStudyField(){
    const [show, setShow] = useState(false);
    const [ifis, setIFoS] = useState({
                                      field_of_study:"",
                                    });
    const [subjects, setSubjects] = useState([]);

    const onChangeIFoS = (e) => {
        var name = e.target.name;
        var value = e.target.value;
        setIFoS({[name]:value});
    }

    const onChangeSubjects = (e) => {
        var value = e.target.value;
        setSubjects([...subjects, value]);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(subjects)
    }

    // console.log(data.field_of_study)
    // console.log(subjects)
    return(
        <React.Fragment>
                
                <div className="btn btn-primary btn-sm" onClick={ ()=>setShow(true) }><i className="fa fa-user-plus mr-2"></i>Field of Study</div>

            <Modal
                show={show}
                onHide={()=>setShow(false)}
                aria-labelledby="example-custom-modal-styling-title"
                centered
            >
                <Modal.Body>
                    {/* <input /> */}
                    <div className="">
                        <div className="container-fluid">
                            <div className="d-flex justify-content-center">
                                <p style={{fontFamily:'quicksand', fontSize:'14px', fontWeight:'bold'}}>Create Intended Field of Study</p>
                            </div>
                            <label>Name of Field:</label>
                            <input onChange={onChangeIFoS} type="text" name="field_of_study" value={ifis.field_of_study} className="form-control text-small"/>
                            <label className="mt-2">Select Subjects:</label>
                            <select onChange={onChangeSubjects} name="subjects" className="form-control text-small mb-3">
                                <option value="null">Select</option>
                                <option value="mathematics">Mathematics</option>
                                <option value="physics">Physics</option>
                                <option value="chemistry">Chemistry</option>
                                <option value="biology">Biology</option>
                                <option value="geography">Geography</option>
                                <option value="economics">Economics</option>
                                <option value="accounting">Accounting</option>
                                <option value="history">History</option>
                                <option value="general knowledge & personal development">General Knowledge & Personal Development</option>
                            </select>

                            {/* Submit */}
                            <div className="btn btn-primary d-flex justify-content-center mb-3" onClick={onSubmit}>Create</div>
                            <div className="container mb-4">
                                <div className="row mx-3 mt-2">
                                    {/* Place pills here */}
                                    { renderPill() }
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </React.Fragment>
    );

    function renderPill(){
       return subjects.map(item => (
            <Pill text={item}/>
        ));
    }
}

