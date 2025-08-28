import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import AIMessageBox from './AIMessageBox';


export default function ExamAnalysis() {
  // Accept labCode from URL params, log_file and message from navigation state
  const { labCode } = useParams();
  const location = useLocation();
  const { log_file, message } = location.state || {};

  if (!log_file && !message) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-gray-500">
        <div className="text-xl font-semibold mb-2">No analysis data available.</div>
        <div className="text-sm">Please return to the exam dashboard and generate an analysis.</div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Exam Analysis</h1>
      <div className="mb-4">
        <span className="font-semibold">Lab Code:</span> {labCode}
      </div>
      <AIMessageBox
        labCode={labCode}
        log_file={log_file}
        message={message}
      />
    </div>
  );
}