const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { initClientDbConnection } = require('./util/dbutil');


require('dotenv').config();

//setup express
const app = express();
const port = process.env.PORT || 5000;


//setup middleware
app.use(cors());
app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true, parameterLimit: 100000 }));

//define your connection uri
const uri = process.env.URI;

// connect to mongoDB using mongoose : Online connection String: `mongodb+srv://larnapp:larnapp@cluster0-w4hmf.mongodb.net/test?retryWrites=true&w=majority`
// mongoose.connect(`mongodb://127.0.0.1:27017/test`,
//     { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })


// connect to mongoDB using mongoose
// mongoose.connect(`mongodb+srv://larnapp:larnapp@cluster0-w4hmf.mongodb.net/test?retryWrites=true&w=majority`,
//     { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
//     .then(() => console.log("MongoDB successfully connected"))
//     .catch(err => console.log(err));

//connect to mongoDB using mongoose
mongoose.connect(`mongodb://127.0.0.1:27017`, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })


// connect to mongoDB using mongoose : Online connection String: `mongodb+srv://larnapp:larnapp@cluster0-w4hmf.mongodb.net/test?retryWrites=true&w=majority`
// mongoose.connect(`mongodb+srv://larnapp:larnapp@cluster0-w4hmf.mongodb.net/test?retryWrites=true&w=majority`,
//     { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
// mongoose.connect(`mongodb+srv://larnapp:larnapp@cluster0-w4hmf.mongodb.net/test?retryWrites=true&w=majority`, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
//     .then(() => console.log("MongoDB successfully connected"))
//     .catch(err => console.log(err));

//here we assign connection object to the global js object
global.clientConnection = initClientDbConnection();



// //connect to mongoDB using mongoose : Online connection String: `mongodb+srv://larnapp:larnapp@cluster0-w4hmf.mongodb.net/test?retryWrites=true&w=majority`
// mongoose.connect(`mongodb+srv://larnapp:larnapp@cluster0-w4hmf.mongodb.net/test?retryWrites=true&w=majority`,
//     { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
//     .then(() => console.log("MongoDB successfully connected"))
//     .catch(err => console.log(err));


const individualsRouter = require('./routes/individuals');
const corporatesRouter = require('./routes/corporates');
const subscriptioneasRouter = require('./routes/subscriptioneas');
const subscriptionefaRouter = require('./routes/subscriptionefa');
const subscriptionrmRouter = require('./routes/subscriptionrm');
const subscriptionlmRouter = require('./routes/subscriptionlm');
const excerciseRouter = require('./routes/excercise/excercise');
const questionRouter = require('./routes/question/question');
const answerRouter = require('./routes/answer/answer');
const serviceeasContentRouter = require('./routes/service-content/serviceconteneas');
const serviceefaContentRouter = require('./routes/service-content/servicecontentefa');
const servicelmContentRouter = require('./routes/service-content/servicecontentlm');
const servicermContentRouter = require('./routes/service-content/servicecontentrm');
const adminRouter = require('./routes/admin/admin');
const jobRouter = require('./routes/corporate/job');
const applicationRouter = require('./routes/corporate/application/application');
const corporateSubRouter = require('./routes/corporate/subscription/subscription');
const mathsRouter = require('./routes/tutor/senior/maths');
const physicsRouter = require('./routes/tutor/senior/physics');
const generalKnowledgeRouter = require('./routes/tutor/senior/general_knowledge');
const chemistryRouter = require('./routes/tutor/senior/chemistry');
const biologyRouter = require('./routes/tutor/senior/biology');
const geographyRouter = require('./routes/tutor/senior/geography');
const economicsRouter = require('./routes/tutor/senior/economics');
const accountingRouter = require('./routes/tutor/senior/accounting');
const historyRouter = require('./routes/tutor/senior/history');
const businessStudiesRouter = require('./routes/tutor/junior/business_studies');
const integratedScienceRouter = require('./routes/tutor/junior/integrated_science');
const juniorGeneralKnowledgeRouter = require('./routes/tutor/junior/junior_general_knowledge');
const juniorHistoryRouter = require('./routes/tutor/junior/juniorhistory');
const juniorMathsRouter = require('./routes/tutor/junior/junior_maths');
const socialStudiesRouter = require('./routes/tutor/junior/social_studies');
const teacherRating = require('./routes/ratings/teacher-ratings');
const comptMgtRoute = require('./routes/corporate/competence/compt_mgt');



app.use('/individuals', individualsRouter);
app.use('/corporates', corporatesRouter);
app.use('/subscriptioneas', subscriptioneasRouter);
app.use('/subscriptionefa', subscriptionefaRouter);
app.use('/subscriptionrm', subscriptionrmRouter);
app.use('/subscriptionlm', subscriptionlmRouter);
app.use('/excercise', excerciseRouter);
app.use('/question', questionRouter);
app.use('/answer', answerRouter);
app.use('/servicecontenteas', serviceeasContentRouter);
app.use('/servicecontentefa', serviceefaContentRouter);
app.use('/servicecontentlm', servicelmContentRouter);
app.use('/servicecontentrm', servicermContentRouter);
app.use('/admin', adminRouter);
app.use('/jobs', jobRouter);
app.use('/applications', applicationRouter);
app.use('/corporatesubscriptions', corporateSubRouter);
app.use('/senior/mathematics', mathsRouter);
app.use('/senior/physics', physicsRouter);
app.use('/senior/general-Knowledge', generalKnowledgeRouter);
app.use('/senior/chemistry', chemistryRouter);
app.use('/senior/biology', biologyRouter);
app.use('/senior/geography', geographyRouter);
app.use('/senior/economics', economicsRouter);
app.use('/senior/accounting', accountingRouter);
app.use('/senior/history', historyRouter);
app.use('/junior/business-studies', businessStudiesRouter);
app.use('/junior/integrated-science', integratedScienceRouter);
app.use('/junior/general-knowledge', juniorGeneralKnowledgeRouter);
app.use('/junior/history', juniorHistoryRouter);
app.use('/junior/mathematics', juniorMathsRouter);
app.use('/junior/social-studies', socialStudiesRouter);
app.use('/rate/teacher', teacherRating);
app.use('/competence/management', comptMgtRoute);






app.listen(port, () => {
    console.log(`App is running successfully on port ${port}`);
});