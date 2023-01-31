import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
// import Home from "./pages/Home";
import Login from "./pages/Login";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import OverView from "./pages/assessment/Overview";
import ExamSetUp from "./pages/assessment/ExamSetUp";
import ExamTimeTable from "./pages/assessment/ExamTimeTable";
import PRSOverview from "./pages/assessment/PRS";
import MarksEntryOverview from "./pages/assessment/marksEntry/MarksEntryOverview";
import ScoreBoard from "./pages/assessment/Scoreboard";
import ReportDownload from "./pages/assessment/ReportDownload";
import SubjectMarksEntry from "./pages/assessment/marksEntry/SubjectMarksEntry";
import SelectSchool from "./pages/SelectSchool";
import VerfiyToken from "./pages/VerfiyToken";

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
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;
