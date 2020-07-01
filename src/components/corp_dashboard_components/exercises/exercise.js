import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Spinner } from 'react-bootstrap';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import LMExercises from './lm/lm';
import RMExercises from './rm/rm';
import Img from '../../../img/exercise.jpeg';



const CorpExercise = () => {

    const [company, setCompany] = useState();
    const [spinner, setSpinner] = useState(true);
    const [RMex, setRMex] = useState(false)
    const [page, setPage] = useState(0)

    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem('key'));
        setCompany(user);

        if (user.sub_status_rm == 'active') {
            setPage(1)
        } else {
            setPage(0)
        }
        //get subscriptions
        // axios.get(`http://18.188.101.36:5000/corporatesubscriptions/${user.id}`)
        // .then(res => {
        //     if(res.data){
        //         const lm = res.data.filter(srv => {
        //             return srv.service === "LM";
        //         })
        //         const rm = res.data.filter(srv => {
        //             return srv.service === "RM"
        //         })

        //         setLMSrv(lm);
        //         setRMSrv(rm);
        //         setSpinner(false);
        //         console.log(res.data);
        //     }
        // })
        // .catch(err => console.log(err));

    }, []);

    // const setLmPage = () => {
    //     setPage(1)
    // }
    const setRmPage = () => {
        setPage(2)
    }


    return (
        <>

            {(page == 0) ? "" : (page == 1) ?
                <>
                    <div className="container" style={{ marginTop: '70px' }}>
                        <div className="row justify-content-center">
                            <div className="col col-lg-5 col-sm-6">
                                <Card className="">
                                    <CardActionArea onClick={setRmPage}>
                                        <CardMedia
                                            component="img"
                                            alt="Recruitment Management"
                                            height="140"
                                            image={Img}
                                            title="Recruitment Management"
                                        />
                                        <CardContent >
                                            <Typography gutterBottom variant="" component="h5">
                                                Corporate Recruitment Management Exercises
                                                </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                                Widespread group of squamate reptiles, with over 6,000 species, ranging
                                                across all continents except Antarctica
                                        </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions>

                                    </CardActions>
                                </Card>
                            </div>
                        </div>
                    </div>
                </>

                : (page === 2) ? <RMExercises /> : ""}
        </>
    );
    // return (
    //     <>
    //         {
    //             spinner ? <Spinner animation="grow" /> : (page === 0) ?
    //                 <>
    //                     <div className="container">
    //                         <div className="row justify-content-center">
    //                             {RMSrv ?
    //                                 <div className="col col-lg-5 col-sm-6">
    //                                     <br />
    //                                     <Card className="">
    //                                         <CardActionArea onClick={setRmPage}>
    //                                             <CardMedia
    //                                                 component="img"
    //                                                 alt="Recruitment Management"
    //                                                 height="140"
    //                                                 image="data:image/jpeg;base64,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"
    //                                                 title="Recruitment Management"
    //                                             />
    //                                             <CardContent >
    //                                                 <Typography gutterBottom variant="" component="h5">
    //                                                     Corporate Recruitment  Management
    //                                     </Typography>
    //                                                 <Typography variant="body2" color="textSecondary" component="p">
    //                                                     Widespread group of squamate reptiles, with over 6,000 species, ranging
    //                                                     across all continents except Antarctica
    //                                     </Typography>
    //                                             </CardContent>
    //                                         </CardActionArea>
    //                                         <CardActions>

    //                                         </CardActions>
    //                                     </Card>
    //                                 </div>
    //                                 : ""}
    //                             {LMSrv ?
    //                                 <div className="col col-lg-5 col-sm-6">
    //                                     <br />
    //                                     <Card className="">
    //                                         <CardActionArea onClick={setLmPage}>
    //                                             <CardMedia
    //                                                 component="img"
    //                                                 alt="Leadership management"
    //                                                 height="140"
    //                                                 image="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSlDxYMQX6TQvAHVADOD5FEsrrV6iqAguLxYIVRZ6Y42B-5tV1R"
    //                                                 title="Contemplative Reptile"
    //                                             />
    //                                             <CardContent >
    //                                                 <Typography gutterBottom variant="" component="h5">
    //                                                     Corporate Leadership <br /> Management
    //                                      </Typography>
    //                                                 <Typography variant="body2" color="textSecondary" component="p">
    //                                                     Widespread group of squamate reptiles, with over 6,000 species, ranging
    //                                                     across all continents except Antarctica
    //                                     </Typography>
    //                                             </CardContent>
    //                                         </CardActionArea>
    //                                         <CardActions>
    //                                         </CardActions>
    //                                     </Card>
    //                                 </div>
    //                                 : ""}
    //                         </div>
    //                     </div>
    //                 </>
    //                 : (page === 1) ? <LMExercises /> : (page === 2) ?  : ""}
    //     </>
    // );
}
export default CorpExercise;