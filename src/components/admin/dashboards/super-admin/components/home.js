import React, { useState, useEffect } from 'react';
import { CardActionArea, Card, CardContent, Typography } from '@material-ui/core';
import AllAdmins from './all-admin';
import Activities from './activity';



const Home = ({admin, activity}) => {

    // const [page, setPage] = useState(0);

    // const setAdmins = () => {
    //     setPage(2);
    // }
    // const setActivityPage = () => {
    //     setPage(3);
    // }

    return (
        <>
            {
                // (page == 0)
                //     ? 
                    <div className="container">
                        <div className="row" style={{ marginTop: '10%' }}>
                            <div className="col col-lg-4 col-sm-6" style={{ marginLeft: '20%' }}>
                                <br />
                                <Card className="" style={{ width: '300px', height: '150px', background: '#F7F7F7' }}>
                                    <CardActionArea>
                                        <CardContent onClick={admin} style={{ textAlign: 'center', padding: '40px' }}>
                                            <Typography gutterBottom variant="" component="h5">
                                                All Country Admins
                                    </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                                View all country admin details
                                    </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </div>
                            <div className="col col-lg-4 col-sm-6">
                                <br />
                                <Card className="" style={{ width: '300px', height: '150px', background: '#F7F7F7' }}>
                                    <CardActionArea>

                                        <CardContent onClick={activity} style={{ textAlign: 'center', padding: '40px' }}>
                                            <Typography gutterBottom variant="" component="h5">
                                                Country Admin Activities
                                    </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                                View activities by country
                                    </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </div>
                        </div>
                    </div> 
                    // : (page == 2) ? <AllAdmins /> : (page == 3) ? <Activities /> : ""
            }

        </>
    );
}
export default Home;