import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import GenServiceCard from './gen_service_card';




const RMService = () => {

    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])
    const [user, setUser] = useState('');
    const [jobs, setJobs] = useState([]);
    const [page, setPage] = useState(0);



    //get data from api
    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem('key'));
        setUser(user);
        console.log(user)

        if (user.sub_status_rm === 'active') {
            setJobs(user.jobs);
        }


        // axios.get(`http://13.59.192.18/api/servicecontentrm/`)
        //     .then(res => {
        //         if (user.status === "individual" && user.org_type === "school" && user.sub_status === "active") {

        //             const teacherData = res.data.filter(d => {
        //                 return d.user_class === 'teacher'
        //             })
        //             setData(teacherData);

        //         } else if (user.status === 'individual' && user.org_type === "company" && user.sub_status === "active") {

        //             const staffData = res.data.filter(d => {
        //                 return d.user_class === 'company-staff'
        //             })
        //             setData(staffData);

        //         } else if (user.status === 'individual' && user.org_type === null) {

        //             const indiv = res.data.filter(d => {
        //                 return d.user_class === 'individual'
        //             })
        //             setData(indiv);
        //         }
        //         setSpinner(false);
        //     })
        //     .catch(err => console.log(err))
    }, []);



    return (
        // <div className="container">
        //     <div className="row">
        //         <div className="col col-lg-12 col-sm-6" style={{ width: '100%', height: 500, boxShadow: '0px 0px 5px 5px rgba(0,0,0,0.15)', background: '#ffffff', padding: '20px', borderRadius: '10px', overflow: 'scroll' }}>
        //             <div className="">
        //                 <div>
        //                     {spinner ? <Spinner animation="grow" /> : data.map((data) => {

        //                         return (
        //                             <div className="container">
        //                                 <div className="row">
        //                                     <div className="col-md-8 offset-md-2" >
        //                                         <div className="card" style={{ fontFamily: 'Roboto,sans-serif', boxShadow: '0px 0px 5px 5px rgba(0,0,0,0.15)', marginBottom: '10px' }}>
        //                                             <div className="card-content" style={{ padding: '10px' }}>
        //                                                 {/* <img className="img-responsive" src="http://lorempixel.com/555/300/sports" alt="placeholder" style={{ width: '100%' }} /> */}
        //                                                 {
        //                                                     data.media ? data.media.split('/')[0] === "data:image" ? <img src={data.media} style={{ width: '100%' }} alt="" /> : <video src={data.media} controls style={{ width: '100%' }}></video> : ''
        //                                                 }
        //                                                 <h6>{data.title}</h6>
        //                                                 <p>{data.body}</p>
        //                                             </div>
        //                                         </div>

        //                                     </div>
        //                                 </div>
        //                             </div>
        //                         )
        //                     })}
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>

        <div>
            {
                // spinner ? <div className="d-flex justify-content-center"><i className="fa fa-spinner fa-spin"></i></div> : data.map((data) => {
                //         return (
                //             <GenServiceCard data={data}/>
                //         )})
                (page === 0) ?
                    (jobs.length === 0) ? <p>you have not applied for any jobs yet</p>
                        :
                        jobs.map(item => {
                            return (
                                <Card className="mt-5" style={{ width: '50%' }}>
                                    <CardActionArea>
                                        <CardContent >
                                            <Typography gutterBottom variant="" component="p">
                                                {item.job_title}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                                <div className="btn btn-info bt-sm" onClick={getContent(item.job_id)} disabled={loading}>View Content {loading ? <i className="fa fa-spinner fa-spin"></i> : ""}</div>
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions>
                                    </CardActions>
                                </Card>
                            );
                        }) :
                    (page === 1) ?
                        <GenServiceCard data={data} goBack={goBack()} />
                        : 'default empty'

            }
        </div>

    );

    function getContent(id) {
        // get contents from rm service content endpoint, based on job id
        try {
            setLoading(true);
            axios.get(`http://13.59.192.18/api/corpservicecontent/${id}`)
                .then(res => {
                    setLoading(false);
                    setData(res.data);
                    setPage(1)
                })
                .catch(err => {
                    console.log(err);
                    setLoading(false);
                })
        } catch (error) {

        }
    }

    function goBack() {
        setPage(0);
    }
}

export default RMService;
