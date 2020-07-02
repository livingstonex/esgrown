const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const { initClientDbConnection } = require('./util/dbutil');


require('dotenv').config();

//setup express
const app = express();
const port = process.env.PORT || 5000;

//Serve Static React Files
app.use(express.static("../build"));
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../build", "index.html"));
});


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
mongoose.connect(`mongodb://127.0.0.1:27017`,
    { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));

//connect to mongoDB using mongoose
// mongoose.connect(`mongodb://127.0.0.1:27017`, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }).then(() => console.log("MongoDB successfully connected"))
//     .catch(err => console.log(err));


// connect to mongoDB using mongoose : Online connection String: `mongodb+srv://larnapp:larnapp@cluster0-w4hmf.mongodb.net/test?retryWrites=true&w=majority`
// mongoose.connect(`mongodb+srv://larnapp:larnaprsp@cluster0-w4hmf.mongodb.net/test?retryWrites=true&w=majority`,
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
const staffRating = require('./routes/ratings/staff-rating');
const comptMgtRoute = require('./routes/corporate/competence/compt_mgt');
const comptMgtService = require('./routes/service-content/servicecontent-compt-mgt');
const CorpServiceContent = require('./routes/corporate/corp_service_content/corp_service_content');




app.use('/api/individuals', individualsRouter);
app.use('/api/corporates', corporatesRouter);
app.use('/api/subscriptioneas', subscriptioneasRouter);
app.use('/api/subscriptionefa', subscriptionefaRouter);
app.use('/api/subscriptionrm', subscriptionrmRouter);
app.use('/api/subscriptionlm', subscriptionlmRouter);
app.use('/api/excercise', excerciseRouter);
app.use('/api/question', questionRouter);
app.use('/api/answer', answerRouter);
app.use('/api/servicecontenteas', serviceeasContentRouter);
app.use('/api/servicecontentefa', serviceefaContentRouter);
app.use('/api/servicecontentlm', servicelmContentRouter);
app.use('/api/servicecontentrm', servicermContentRouter);
app.use('/api/admin', adminRouter);
app.use('/api/jobs', jobRouter);
app.use('/api/applications', applicationRouter);
app.use('/api/corporatesubscriptions', corporateSubRouter);
app.use('/api/senior/mathematics', mathsRouter);
app.use('/api/senior/physics', physicsRouter);
app.use('/api/senior/general-Knowledge', generalKnowledgeRouter);
app.use('/api/senior/chemistry', chemistryRouter);
app.use('/api/senior/biology', biologyRouter);
app.use('/api/senior/geography', geographyRouter);
app.use('/api/senior/economics', economicsRouter);
app.use('/api/senior/accounting', accountingRouter);
app.use('/api/senior/history', historyRouter);
app.use('/api/junior/business-studies', businessStudiesRouter);
app.use('/api/junior/integrated-science', integratedScienceRouter);
app.use('/api/junior/general-knowledge', juniorGeneralKnowledgeRouter);
app.use('/api/junior/history', juniorHistoryRouter);
app.use('/api/junior/mathematics', juniorMathsRouter);
app.use('/api/junior/social-studies', socialStudiesRouter);
app.use('/api/rate/teacher', teacherRating);
app.use('/api/rate/staff', staffRating);
app.use('/api/competence/management', comptMgtRoute);
app.use('/api/competence/service', comptMgtService);
app.use('/api/corpservicecontent', CorpServiceContent);






app.listen(port, () => {
    console.log(`App is running successfully on port ${port}`);
});