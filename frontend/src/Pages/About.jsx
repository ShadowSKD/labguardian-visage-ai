import React from 'react';

export default function AboutPage() {
  const contributors = [
    {
      name: 'Suraj Kr Das',
      contribution: 'Backend API Development'
    },
    {
      name: 'Srinidhi Chappar',
      contribution: 'Frontend Development'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden border border-white/20">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-center">
            <h1 className="text-3xl font-bold text-white">About LabGuardian VisageAI</h1>
            <p className="text-blue-100 mt-2">Exam Monitoring System</p>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Project Description</h2>
              <p className="text-gray-600">
                LabGuardian VisageAI is a comprehensive exam monitoring system designed to maintain academic integrity during lab-based online examinations. 
                The system provides real-time monitoring of client activities, malpractice detection using AI, and centralized oversight for administrators.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Development Team</h2>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Contribution
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {contributors.map((person, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {person.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {person.contribution}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 text-center">
            <p className="text-xs text-gray-500">
              &copy; {new Date().getFullYear()} LabGuardian VisageAI. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}