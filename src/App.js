import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import OverView from "./pages/assessment/Overview";
import ExamSetUp from "./pages/assessment/ExamSetUp";
import ExamTimeTable from "./pages/assessment/ExamTimeTable";
import PRSOverview from "./pages/assessment/PRS";
import MarksEntryOverview from "./pages/assessment/MarksEntryOverview";

function App() {
  const client = new QueryClient();
  return (
    <div className="font-Roboto">
      <QueryClientProvider client={client}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Home />} />
            {/* assessment */}
            <Route path="/assessment/overview" element={<OverView />} />
            <Route path="/assessment/exam_set_up" element={<ExamSetUp />} />
            <Route
              path="/assessment/exam_timetable"
              element={<ExamTimeTable />}
            />
            <Route path="/assessment/prs_overview" element={<PRSOverview />} />
            <Route
              path="/marks_entry_overview"
              element={<MarksEntryOverview />}
            />
            <Route path="*" element={<h1>Page Not Found ... 404</h1>} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;
