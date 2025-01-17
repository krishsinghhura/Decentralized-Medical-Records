import { useState } from 'react';
import './App.css';

interface HealthRecord {
  healthCondition: string;
  checkup: string;
  doctorVisited: string;
  prescription: string;
  date: string; // Add date field
}

function App() {
  const [patientAddress, setPatientAddress] = useState('');
  const [healthCondition, setHealthCondition] = useState('');
  const [checkup, setCheckup] = useState('');
  const [doctorVisited, setDoctorVisited] = useState('');
  const [prescription, setPrescription] = useState('');
  const [date, setDate] = useState(''); // State for date input
  const [viewRecords, setViewRecords] = useState<HealthRecord[]>([]);
  const [healthRecords, setHealthRecords] = useState<Record<string, HealthRecord[]>>({});
  const [startDate, setStartDate] = useState(''); // State for start date
  const [endDate, setEndDate] = useState(''); // State for end date

  const handleAddOrUpdateRecord = () => {
    const record: HealthRecord = {
      healthCondition,
      checkup,
      doctorVisited,
      prescription,
      date, // Include date in the record
    };

    if (patientAddress) {
      const updatedRecords = healthRecords[patientAddress]
        ? [...healthRecords[patientAddress], record]
        : [record];
      setHealthRecords({ ...healthRecords, [patientAddress]: updatedRecords });
      alert('Record added/updated successfully');
    } else {
      alert('Please enter a patient address.');
    }
  };

  const handleViewRecords = () => {
    if (healthRecords[patientAddress]) {
      const records = healthRecords[patientAddress];

      // Filter records by date range
      const filteredRecords = records.filter((record) => {
        const recordDate = new Date(record.date).getTime();
        const start = new Date(startDate).getTime();
        const end = new Date(endDate).getTime();
        return recordDate >= start && recordDate <= end;
      });

      if (filteredRecords.length > 0) {
        setViewRecords(filteredRecords);
      } else {
        alert('No records found for the selected date range.');
      }
    } else {
      alert('No records found for this patient.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-blue-600 to-indigo-700 flex items-center justify-center py-10 px-4">
      <div className="w-full max-w-6xl bg-white rounded-lg shadow-2xl p-8 sm:p-12">
        <h1 className="text-5xl font-extrabold text-center text-gray-800 mb-12">
          Health Record Management
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Add or Update Record Section */}
          <div className="bg-gray-50 rounded-lg p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-700 mb-6">Add or Update Record</h2>
            <div className="space-y-6">
              <input
                type="text"
                placeholder="Patient Address"
                value={patientAddress}
                onChange={(e) => setPatientAddress(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="text"
                placeholder="Health Condition"
                value={healthCondition}
                onChange={(e) => setHealthCondition(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="text"
                placeholder="Checkup"
                value={checkup}
                onChange={(e) => setCheckup(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="text"
                placeholder="Doctor Visited"
                value={doctorVisited}
                onChange={(e) => setDoctorVisited(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="text"
                placeholder="Prescription"
                value={prescription}
                onChange={(e) => setPrescription(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                onClick={handleAddOrUpdateRecord}
                className="w-full bg-indigo-600 text-white py-4 rounded-lg hover:bg-indigo-700 transition duration-300"
              >
                Submit
              </button>
            </div>
          </div>

          {/* View Records Section */}
          <div className="bg-gray-50 rounded-lg p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-700 mb-6">View Records</h2>
            <div className="space-y-6">
              <input
                type="text"
                placeholder="Patient Address"
                value={patientAddress}
                onChange={(e) => setPatientAddress(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="date"
                placeholder="Start Date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="date"
                placeholder="End Date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                onClick={handleViewRecords}
                className="w-full bg-purple-600 text-white py-4 rounded-lg hover:bg-purple-700 transition duration-300"
              >
                View Records
              </button>
            </div>

            {viewRecords.length > 0 && (
              <div className="mt-8 space-y-4">
                {viewRecords.map((record, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                    <p className="text-gray-700 mb-2">
                      <span className="font-bold">Date:</span> {record.date}
                    </p>
                    <p className="text-gray-700 mb-2">
                      <span className="font-bold">Condition:</span> {record.healthCondition}
                    </p>
                    <p className="text-gray-700 mb-2">
                      <span className="font-bold">Checkup:</span> {record.checkup}
                    </p>
                    <p className="text-gray-700 mb-2">
                      <span className="font-bold">Doctor:</span> {record.doctorVisited}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-bold">Prescription:</span> {record.prescription}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;