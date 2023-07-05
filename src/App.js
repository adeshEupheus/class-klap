import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Loader from "./components/Material/Loader";
const Login = lazy(() => import("./pages/Login"));
const OverView = lazy(() => import("./pages/assessment/Overview"));
const ExamSetUp = lazy(() => import("./pages/assessment/ExamSetUp"));
const ExamTimeTable = lazy(() => import("./pages/assessment/ExamTimeTable"));
const PRSOverview = lazy(() => import("./pages/assessment/PRS"));
const MarksEntryOverview = lazy(() =>
  import("./pages/assessment/marksEntry/MarksEntryOverview")
);
const ScoreBoard = lazy(() => import("./pages/assessment/Scoreboard"));
const ReportDownload = lazy(() => import("./pages/assessment/ReportDownload"));
const SubjectMarksEntry = lazy(() =>
  import("./pages/assessment/marksEntry/SubjectMarksEntry")
);
const SelectSchool = lazy(() => import("./pages/SelectSchool"));
const AddExam = lazy(() => import("./pages/assessment/AddExam"));

function App() {
  const client = new QueryClient();
  const user = useSelector((state) => state.auth.user);
  const Id = useSelector((state) => state.auth.id);
  const isAuth = user ? true : false;
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
