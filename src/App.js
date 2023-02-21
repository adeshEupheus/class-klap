import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Loader from "./components/Material/Loader";
// import Home from "./pages/Home";
// import Login from "./pages/Login";
const Login = lazy(() => import("./pages/Login"));
// import OverView from "./pages/assessment/Overview";
const OverView = lazy(() => import("./pages/assessment/Overview"));
// import ExamSetUp from "./pages/assessment/ExamSetUp";
const ExamSetUp = lazy(() => import("./pages/assessment/ExamSetUp"));
// import ExamTimeTable from "./pages/assessment/ExamTimeTable";
const ExamTimeTable = lazy(() => import("./pages/assessment/ExamTimeTable"));
// import PRSOverview from "./pages/assessment/PRS";
const PRSOverview = lazy(() => import("./pages/assessment/PRS"));
// import MarksEntryOverview from "./pages/assessment/marksEntry/MarksEntryOverview";
const MarksEntryOverview = lazy(() =>
  import("./pages/assessment/marksEntry/MarksEntryOverview")
);
// import ScoreBoard from "./pages/assessment/Scoreboard";
const ScoreBoard = lazy(() => import("./pages/assessment/Scoreboard"));
// import ReportDownload from "./pages/assessment/ReportDownload";
const ReportDownload = lazy(() => import("./pages/assessment/ReportDownload"));
// import SubjectMarksEntry from "./pages/assessment/marksEntry/SubjectMarksEntry";
const SubjectMarksEntry = lazy(() =>
  import("./pages/assessment/marksEntry/SubjectMarksEntry")
);
// import SelectSchool from "./pages/SelectSchool";
const SelectSchool = lazy(() => import("./pages/SelectSchool"));
// import AddExam from "./pages/assessment/AddExam";
const AddExam = lazy(() => import("./pages/assessment/AddExam"));

function App() {
  const client = new QueryClient();
  const user = useSelector((state) => state.auth.user);
  const Id = useSelector((state) => state.auth.id);
  const isAuth = user ? (Id ? true : false) : false;
  const queryParameters = new URLSearchParams(window.location.search);
  return (
    <div className="font-Roboto">
      <QueryClientProvider client={client}>
        <BrowserRouter>
          <Suspense fallback={<Loader loading={true} />}>
            <Routes>
              <Route path="/" element={isAuth ? <OverView /> : <Login />} />
              {/* <Route path="/dashboard" element={<Home />} /> */}
              {/* assessment */}
              <Route
                path="/assessment/overview"
                element={
                  queryParameters.get("auth") ? (
                    <OverView />
                  ) : isAuth ? (
                    <OverView />
                  ) : (
                    <Login />
                  )
                }
              />
              <Route
                path="/assessment/exam_set_up"
                element={
                  queryParameters.get("auth") ? (
                    <ExamSetUp />
                  ) : isAuth ? (
                    <ExamSetUp />
                  ) : (
                    <Login />
                  )
                }
              />
              <Route
                path="/select_school"
                element={user ? <SelectSchool /> : <Login />}
              />
              <Route
                path="/assessment/exam_timetable"
                element={
                  queryParameters.get("auth") ? (
                    <ExamTimeTable />
                  ) : isAuth ? (
                    <ExamTimeTable />
                  ) : (
                    <Login />
                  )
                }
              />
              <Route
                path="/assessment/scoreboard"
                element={
                  queryParameters.get("auth") ? (
                    <ScoreBoard />
                  ) : isAuth ? (
                    <ScoreBoard />
                  ) : (
                    <Login />
                  )
                }
              />
              <Route
                path="/assessment/prs_overview"
                element={
                  queryParameters.get("auth") ? (
                    <PRSOverview />
                  ) : isAuth ? (
                    <PRSOverview />
                  ) : (
                    <Login />
                  )
                }
              />
              <Route
                path="/marks_entry_overview"
                element={
                  queryParameters.get("auth") ? (
                    <MarksEntryOverview />
                  ) : isAuth ? (
                    <MarksEntryOverview />
                  ) : (
                    <Login />
                  )
                }
              />
              <Route
                path="/additional_exam_setUp"
                element={
                  queryParameters.get("auth") ? (
                    <AddExam />
                  ) : isAuth ? (
                    <AddExam />
                  ) : (
                    <Login />
                  )
                }
              />

              <Route
                path="/report_download"
                element={
                  queryParameters.get("auth") ? (
                    <ReportDownload />
                  ) : isAuth ? (
                    <ReportDownload />
                  ) : (
                    <Login />
                  )
                }
              />
              {/* <Route path="/verify" element={<VerfiyToken />} /> */}

              <Route
                path="/marks_entry_subject_marks_entry"
                element={
                  queryParameters.get("auth") ? (
                    <SubjectMarksEntry />
                  ) : isAuth ? (
                    <SubjectMarksEntry />
                  ) : (
                    <Login />
                  )
                }
              />

              <Route path="*" element={<h1>Page Not Found ... 404</h1>} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;
