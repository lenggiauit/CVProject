import React, { ReactElement, Suspense, lazy } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import GlobalSpinner from "../components/globalSpinner";
import NagistarLoading from "../components/nagistarLoading";
import history from "../utils/history";
var delayTime = 500;
const Home = lazy(() => {
    return Promise.all([
        import("../views/home"),
        new Promise(resolve => setTimeout(resolve, delayTime))
    ])
        .then(([moduleExports]) => moduleExports);
});


const TemplateType = lazy(() => {
    return Promise.all([
        import("../views/admin/templateType"),
        new Promise(resolve => setTimeout(resolve, delayTime))
    ])
        .then(([moduleExports]) => moduleExports);
});

const Template = lazy(() => {
    return Promise.all([
        import("../views/admin/template"),
        new Promise(resolve => setTimeout(resolve, delayTime))
    ])
        .then(([moduleExports]) => moduleExports);
});

const Resumes = lazy(() => {
    return Promise.all([
        import("../views/admin/resumes"),
        new Promise(resolve => setTimeout(resolve, delayTime))
    ])
        .then(([moduleExports]) => moduleExports);
});

const Templates = lazy(() => {
    return Promise.all([
        import("../views/templates"),
        new Promise(resolve => setTimeout(resolve, delayTime))
    ])
        .then(([moduleExports]) => moduleExports);
});

const YourResume = lazy(() => {
    return Promise.all([
        import("../views/yourResume"),
        new Promise(resolve => setTimeout(resolve, delayTime))
    ])
        .then(([moduleExports]) => moduleExports);
});

const CreateResume = lazy(() => {
    return Promise.all([
        import("../views/createResume"),
        new Promise(resolve => setTimeout(resolve, delayTime))
    ])
        .then(([moduleExports]) => moduleExports);
});

const Dashboard = lazy(() => {
    return Promise.all([
        import("../views/dashboard"),
        new Promise(resolve => setTimeout(resolve, delayTime))
    ])
        .then(([moduleExports]) => moduleExports);
});

const Projects = lazy(() => {
    return Promise.all([
        import("../views/projects"),
        new Promise(resolve => setTimeout(resolve, delayTime))
    ])
        .then(([moduleExports]) => moduleExports);
});

const ProjectDetailView = lazy(() => {
    return Promise.all([
        import("../views/projects/detail"),
        new Promise(resolve => setTimeout(resolve, delayTime))
    ])
        .then(([moduleExports]) => moduleExports);
});

const Teams = lazy(() => {
    return Promise.all([
        import("../views/teams"),
        new Promise(resolve => setTimeout(resolve, delayTime))
    ])
        .then(([moduleExports]) => moduleExports);
});

const Messages = lazy(() => {
    return Promise.all([
        import("../views/messages"),
        new Promise(resolve => setTimeout(resolve, delayTime))
    ])
        .then(([moduleExports]) => moduleExports);
});

const Profile = lazy(() => {
    return Promise.all([
        import("../views/profile"),
        new Promise(resolve => setTimeout(resolve, delayTime))
    ])
        .then(([moduleExports]) => moduleExports);
});

const Login = lazy(() => {
    return Promise.all([
        import("../views/login"),
        new Promise(resolve => setTimeout(resolve, delayTime))
    ])
        .then(([moduleExports]) => moduleExports);
});

const Register = lazy(() => {
    return Promise.all([
        import("../views/register"),
        new Promise(resolve => setTimeout(resolve, delayTime))
    ])
        .then(([moduleExports]) => moduleExports);
});

const ForgotPassword = lazy(() => {
    return Promise.all([
        import("../views/forgotPassword"),
        new Promise(resolve => setTimeout(resolve, delayTime))
    ])
        .then(([moduleExports]) => moduleExports);
});
const ResetPassword = lazy(() => {
    return Promise.all([
        import("../views/resetPassword"),
        new Promise(resolve => setTimeout(resolve, delayTime))
    ])
        .then(([moduleExports]) => moduleExports);
});

const Page404 = lazy(() => {
    return Promise.all([
        import("../views/pageNotFound"),
        new Promise(resolve => setTimeout(resolve, delayTime))
    ])
        .then(([moduleExports]) => moduleExports);
});

const IndexRouter: React.FC = (): ReactElement => {
    return (
        <>
            <Router history={history}>
                <Suspense fallback={<NagistarLoading />}>
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/createresume" exact component={CreateResume} />
                        <Route path="/yourresume" exact component={YourResume} />
                        <Route path="/dashboard" exact component={Dashboard} />
                        <Route path="/projects" exact component={Projects} />
                        <Route path="/projects/:id" exact component={ProjectDetailView} />
                        <Route path="/teams" exact component={Teams} />
                        <Route path="/messages" exact component={Messages} />
                        <Route path="/profile" exact component={Profile} />
                        <Route path="/login" exact component={Login} />
                        <Route path="/register" exact component={Register} />
                        <Route path="/forgotpassword" exact component={ForgotPassword} />
                        <Route path="/resetPassword" exact component={ResetPassword} />
                        <Route path="/admin/template" exact component={Template} />
                        <Route path="/admin/templatetype" exact component={TemplateType} />
                        <Route path="/admin/resumes" exact component={Resumes} />
                        <Route path="/404" component={Page404} />
                        <Redirect to="/404" />
                    </Switch>
                </Suspense>
            </Router>
            <GlobalSpinner />
        </>
    );
};

export default IndexRouter;