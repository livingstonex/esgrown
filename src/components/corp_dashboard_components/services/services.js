import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardActionArea, CardMedia, CardActions, CardContent, Typography } from '@material-ui/core';
import Img from '../../../img/recruitment.png';




const CorpServices = ({ job}) => {

    const [LMsrv, setLMsrv] = useState([]);
    const [RMsrv, setRMsrv] = useState([]);
    const [company, setCompany] = useState();
    const [page, setPage] = useState(0);
    const [spinner,setSpinner] = useState(true)

    useEffect(() => {
        const com = JSON.parse(sessionStorage.getItem('key'));
        setCompany(com);


    }, []);

    return (

<>
<div className="container" style={{marginTop:'70px'}}>
                <div className="row justify-content-center" >

                    {/* show RM based on sub status */}
            {company && company.sub_status_rm === 'active' ? 
            <div className="col col-lg-4 col-sm-6">
                <br />
                <Card className="">
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            alt="Contemplative Reptile"
                            height="140"
                            image={Img}
                            title="Contemplative Reptile"
                        />
                        <CardContent onClick={job}>
                            <Typography gutterBottom variant="" component="h5">
                                Corporate Recruitment  Management
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
            : "" }

            <div className="col col-lg-4 col-sm-6">
                <br />
                <Card className="">
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            alt="Contemplative Reptile"
                            height="140"
                            image="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSlDxYMQX6TQvAHVADOD5FEsrrV6iqAguLxYIVRZ6Y42B-5tV1R"
                            title="Contemplative Reptile"
                        />
                        <CardContent onClick={{}}>
                            <Typography gutterBottom variant="" component="h5">
                                Corporate Leadership <br /> Management
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
    );
}
export default CorpServices;