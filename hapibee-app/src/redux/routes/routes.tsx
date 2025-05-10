import { Component, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthContext } from "src/redux/contexts/authContext";
import Layout from "src/redux/routes/layout";
import LayoutAuthenticated from "src/redux/routes/layoutAuthenticated";
import Create from "src/views/apiary/createPage/createApiary";
import UpdateApiary from "src/views/apiary/createPage/updateApiary";
import UpdateCresta from "src/views/fieldBook/crest/createPage/updateCresta";
import ScheduleInspection from "src/views/fieldBook/inspectionPage/createPage/scheduleInspection";

const HomeSignedIn = lazy(() => import("src/views/home/signedIn/signedIn"));
const HomeSignUp = lazy(() => import("src/views/home/signUpForm/signUpForm"));
const HomeSignedOut = lazy(() => import("src/views/home/signedOut/signedOut"));
const Page404 = lazy(() => import("src/views/page404/page404"));

const HtmlComponents = lazy(() => import('src/views/htmlComponents/htmlComponents'));
const Apiaty = lazy(() => import('src/views/apiary/apiary'));
const Hive = lazy(() => import('src/views/hive/hive'));
const CreateHive = lazy(() => import('src/views/hive/createPage/createHive'));
const FieldBook = lazy(() => import('src/views/fieldBook/fieldBook'));
const Inspection = lazy(() => import('src/views/fieldBook/inspectionPage/inspection'));
const InspectionRegister = lazy(() => import('src/views/fieldBook/inspectionPage/createPage/createInspection'));
const Transfer = lazy(() => import('src/views/fieldBook/transfer/transfer'));
const CreateTransfer = lazy(() => import('src/views/fieldBook/transfer/createPage/createTransfer'));
const Crest = lazy(() => import('src/views/fieldBook/crest/crest'));
const CreateCrest = lazy(() => import('src/views/fieldBook/crest/createPage/createCrest'));
const HiveSplit = lazy(() => import('src/views/fieldBook/hivesplit/hivesplit')); 
const CreateHiveSplit = lazy(() => import('src/views/fieldBook/hivesplit/createPage/createHiveSplit'));
const Declarations = lazy(() => import('src/views/declarations/declarations'));
const DeclarationsCreateDocument = lazy(() => import('src/views/declarations/createDocument/createDocument'));
const DeclarationsCreateApiaryInfo = lazy(() => import('src/views/declarations/createApiaryInfo/createApiaryInfo'));
//const DocumentApiaryTotalInfo = lazy(() => import('src/views/declarations/viewPage/viewDeclaration'));


interface RouteData {
  path: string;
  component: React.ReactNode;
  layout: React.ReactNode;
}

const PUBLIC_ROUTES: RouteData[] = [
  { path: "/", component: <HomeSignedOut />, layout: <Layout /> },
  { path: `/sign-in`, component: <HomeSignedOut />, layout: <Layout /> },
  { path: `/sign-up`, component: <HomeSignUp />, layout: <Layout /> },
  // View lists on offline
  { path: `/apiario`, component: <Apiaty />, layout: <LayoutAuthenticated /> },
  { path: `/colmeias`, component: <Hive />, layout: <LayoutAuthenticated /> },
  { path: `/caderno-de-campo`, component: <FieldBook />, layout: <LayoutAuthenticated /> },
  { path: `/caderno-de-campo/inspecoes`, component: <Inspection />, layout: <LayoutAuthenticated /> },
  //{ path: `/caderno-de-campo/inspecoes/registar`, component: <InspectionRegister />, layout: <LayoutAuthenticated /> },
  { path: `/caderno-de-campo/inspecoes/agendar`, component: <ScheduleInspection />, layout: <LayoutAuthenticated /> },
  { path: `/caderno-de-campo/transumancias`, component: <Transfer />, layout: <LayoutAuthenticated /> },
  { path: `/caderno-de-campo/transumancias/criar-transumancia`, component: <CreateTransfer />, layout: <LayoutAuthenticated /> },
  { path: `/caderno-de-campo/desdobramento`, component: <HiveSplit />, layout: <LayoutAuthenticated /> },
  { path: `/caderno-de-campo/cresta`, component: <Crest />, layout: <LayoutAuthenticated /> },
  { path: `/caderno-de-campo/cresta/criar-cresta`, component: <CreateCrest />, layout: <LayoutAuthenticated /> },
  { path: `/declaracoes`, component: <Declarations />, layout: <LayoutAuthenticated /> },
];

const PRIVATE_ROUTES: RouteData[] = [
  { path: "/", component: <HomeSignedIn />, layout: <LayoutAuthenticated /> },
  { path: `/sign-in`, component: <HomeSignedOut />, layout: <LayoutAuthenticated /> },
  { path: `/sign-up`, component: <HomeSignUp />, layout: <Layout /> },
  { path: `/html-components`, component: <HtmlComponents />, layout: <LayoutAuthenticated /> },
  // View HapiBee
  { path: `/apiario`, component: <Apiaty />, layout: <LayoutAuthenticated /> },
  { path: `/apiario/criar-apiario`, component: <Create />, layout: <LayoutAuthenticated /> },
  { path: `/apiario/atualizar-apiario/:itemId`, component: <UpdateApiary />, layout: <LayoutAuthenticated /> },
  { path: `/colmeias`, component: <Hive />, layout: <LayoutAuthenticated /> },
  { path: `/colmeias/criar-colmeia`, component: <CreateHive />, layout: <LayoutAuthenticated /> },
  { path: `/caderno-de-campo`, component: <FieldBook />, layout: <LayoutAuthenticated /> },
  { path: `/caderno-de-campo/inspecoes`, component: <Inspection />, layout: <LayoutAuthenticated /> },
  { path: `/caderno-de-campo/inspecoes/registar`, component: <InspectionRegister />, layout: <LayoutAuthenticated /> },
  { path: `/caderno-de-campo/inspecoes/agendar`, component: <ScheduleInspection />, layout: <LayoutAuthenticated /> },
  { path: `/caderno-de-campo/transumancias`, component: <Transfer />, layout: <LayoutAuthenticated /> },
  { path: `/caderno-de-campo/transumancias/criar-transumancia`, component: <CreateTransfer />, layout: <LayoutAuthenticated /> },
  { path: `/caderno-de-campo/desdobramento`, component: <HiveSplit />, layout: <LayoutAuthenticated /> },
  { path: `/caderno-de-campo/desdobramento/criar-desdobramento`, component: <CreateHiveSplit />, layout: <LayoutAuthenticated /> },
  { path: `/caderno-de-campo/cresta`, component: <Crest />, layout: <LayoutAuthenticated /> },
  { path: `/caderno-de-campo/cresta/criar-cresta`, component: <CreateCrest />, layout: <LayoutAuthenticated /> },
  { path: `/caderno-de-campo/atualizar-cresta/:itemId`, component: <UpdateCresta />, layout: <LayoutAuthenticated /> },
  { path: `/declaracoes`, component: <Declarations />, layout: <LayoutAuthenticated /> },
  { path: `/declaracoes/registar-documento`, component: <DeclarationsCreateDocument />, layout: <LayoutAuthenticated /> },
  { path: `/declaracoes/registar-info-apiario`, component: <DeclarationsCreateApiaryInfo />, layout: <LayoutAuthenticated /> },
];

class OwnRoutes extends Component {
  render() {
    return (
      <AuthContext.Consumer>
        {(authContext) => {
          const routes = !authContext.isAuthenticated ? PUBLIC_ROUTES : PRIVATE_ROUTES;
          //console.log(authContext.isAuthenticated)
          return (
            <Routes>
              {routes.map((route, index) => (
                <Route key={index} element={route.layout}>
                  <Route
                    path={route.path}
                    element={route.component}
                  />
                </Route>
              ))}
              <Route path={"*"} element={<Page404 />} />
            </Routes>
          );
        }}
      </AuthContext.Consumer>
    );
  }
}

export default OwnRoutes;