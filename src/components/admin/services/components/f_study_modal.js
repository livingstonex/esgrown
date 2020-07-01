import React, {useState} from 'react';
import {Modal} from 'react-bootstrap';
import Pill from './pills/pill';
import axios from 'axios';
import toast from '../../../../util/toast';
// import { data } from 'jquery';


export default function IntendedFieldOfStudyField(){
    const [show, setShow] = useState(false);
    const [data, setData] = useState({
                                      level_of_edu: "",
                                      field_of_study:"",
                                    });
    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(false);


    // Function handling text input for Intended field of study
    const onChangeHandler = (e) => {
        var name = e.target.name;
        var value = e.target.value;
        setData({...data, [name]:value});
    }

    // Function called when subjects field is changed
    const onChangeSubjects = (e) => {
        var value = e.target.value;
        if (value == 'null') return;
        setSubjects([...subjects, value]);
    }

    // Remove element from subjects state array
    const remove = (item) => {
        const index = subjects.indexOf(item)
        subjects.splice(subjects, 1);
        setSubjects([...subjects])
    }

    // Submit function
    const onSubmit = async (e) => {
        e.preventDefault();
        // Make sure an empty array is not submitted
        if ((subjects.length == 0) || (data.level_of_edu == "") || (data.level_of_edu == "null")) return;
        // Construct your object
        const obj = {
            level_of_edu: data.level_of_edu,
            field: data.field_of_study,
            subjects: subjects
        }
        console.log(obj)
        // Attempt to make request
        try{
            setLoading(true);
            const res = await axios.post(`http://172.31.25.52/admin/fis/add`, obj);
            console.log(res);
            if(res.status == 200) {
                setLoading(false);
                toast('Field Created', 'success');
                setShow(false);
                setSubjects([]);
                setData({
                    level_of_edu: "",
                    field_of_study:"",
                  })
            }
        } catch (error) {
            setLoading(false);
            toast('something is wrong', 'warn');
            console.log('Error: ' + error);
        }
        console.log(subjects);
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
                            <form onSubmit={onSubmit}>
                                <div className="d-flex justify-content-center">
                                    <p style={{fontFamily:'quicksand', fontSize:'14px', fontWeight:'bold'}}>Create Intended Field of Study</p>
                                </div>
                                <label>Level:</label>
                                {/* <input onChange={onChangeHandler} type="text" name="level_of_edu" value={data.level_of_edu} className="form-control text-small mb-2" placeholder="Level of Education..." required/> */}
                                <select onChange={onChangeHandler} type="text" name="level_of_edu" value={data.level_of_edu} className="form-control text-small mb-2" required>
                                    <option value="null">Select Level</option>
                                    <option value="basic">Basic</option>
                                    <option value="post-basic">Post Basic</option>
                                    <option value="undergraduate">Undergraduate</option>
                                </select>
                                <label>Name of Field:</label>
                                <input onChange={onChangeHandler} type="text" name="field_of_study" value={data.field_of_study} className="form-control text-small" placeholder="Intended field of Study" required/>
                                <label className="mt-2">Select Subjects:</label>
                                <select onChange={onChangeSubjects} name="subjects" className="form-control text-small mb-3" required>
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
                                    <option value="integrated science">Integrated Science</option>
                                    <option value="social studies">Social Studies</option>
                                    <option value="introductory technology">Introductory Technology</option>
                                    <option value="Business Studies">Introductory </option>
                                </select>

                                    {/* Submit Button */}
                                <button className="btn btn-primary mb-3" type="submit" disabled={loading} style={{width:'100%'}}> Create { loading ? <i className="fa fa-spinner fa-spin"></i> : "" }</button>
                                <div className="container mb-4">
                                    <div className="row mx-3 mt-2">
                                        {/* Place pills here */}
                                        { renderPill() }
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </React.Fragment>
    );

    // Render the pills
    function renderPill(){
       return subjects.map(item => (
            <Pill text={item} pop={remove}/>
        ));
    }
}

