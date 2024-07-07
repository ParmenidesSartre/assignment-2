'use client';

import { useEffect, useState } from 'react';
import withAuth from '@/components/withAuth';
import EditModal from '../../components/EditModal';
import AddModal from '../../components/AddModal';

const MedicalRecordPage = () => {
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [patientsLoading, setPatientsLoading] = useState(true);
  const [doctorsLoading, setDoctorsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [medicalRecordsRes, patientsRes, doctorsRes] = await Promise.all([
          fetch('/api/medical-record'),
          fetch('/api/patients'),
          fetch('/api/doctors')
        ]);

        const [medicalRecordsData, patientsData, doctorsData] = await Promise.all([
          medicalRecordsRes.json(),
          patientsRes.json(),
          doctorsRes.json()
        ]);

        setMedicalRecords(medicalRecordsData);
        setPatients(patientsData);
        setDoctors(doctorsData);

        setLoading(false);
        setPatientsLoading(false);
        setDoctorsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleEditClick = (record) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRecord(null);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleSave = async (updatedRecord) => {
    try {
      const response = await fetch('/api/medical-record/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedRecord),
      });

      if (response.ok) {
        setMedicalRecords((prevRecords) =>
          prevRecords.map((record) =>
            record.id === updatedRecord.id ? updatedRecord : record
          )
        );
        setIsModalOpen(false);
        setSelectedRecord(null);
      } else {
        throw new Error('Failed to save record');
      }
    } catch (error) {
      console.error('An error occurred while saving the record:', error);
      alert('Failed to save record');
    }
  };

  const handleSaveNewRecord = async (newRecord) => {
    try {
      const response = await fetch('/api/medical-record/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRecord),
      });

      if (response.ok) {
        const createdRecord = await response.json();
        setMedicalRecords((prevRecords) => [...prevRecords, createdRecord]);
        setIsAddModalOpen(false);
      } else {
        throw new Error('Failed to add new record');
      }
    } catch (error) {
      console.error('An error occurred while adding the new record:', error);
      alert('Failed to add new record');
    }
  };

  if (loading || patientsLoading || doctorsLoading) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div className="bg-gray-900 min-h-screen">
      <div className="mx-auto max-w-7xl">
        <div className="bg-gray-900 py-10">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h1 className="text-base font-semibold leading-6 text-white">Medical Records</h1>
                <p className="mt-2 text-sm text-gray-300">
                  A list of all the medical records in your account including patient name, date, diagnosis, treatment plan, and medications.
                </p>
              </div>
              <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                <button
                  type="button"
                  className="block rounded-md bg-teal-500 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-teal-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500"
                  onClick={() => setIsAddModalOpen(true)}
                >
                  Add Record
                </button>
              </div>
            </div>
            <div className="mt-8 flow-root">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <table className="min-w-full divide-y divide-gray-700">
                    <thead>
                      <tr>
                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0">
                          Patient
                        </th>
                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0">
                          Doctor
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                          Date of Visit
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                          Date of Followup
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                          Diagnosis
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                          Treatment Plan
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                          Medications
                        </th>
                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                          <span className="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                      {medicalRecords.map((record) => (
                        <tr key={record.id}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">
                            {patients.find(patient => patient.id === record.patientId)?.name || 'N/A'}
                          </td>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">
                            {doctors.find(doctor => doctor.id === record.doctorId)?.name || 'N/A'}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{new Date(record.createdAt).toLocaleDateString()}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{record.followUp ? new Date(record.followUp).toLocaleDateString() : 'N/A'}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{record.diagnosis}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{record.treatmentPlan}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{record.medications}</td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                            <button
                              onClick={() => handleEditClick(record)}
                              className="text-teal-400 hover:text-teal-300"
                            >
                              Edit<span className="sr-only">, {record.patient?.name}</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <EditModal
          record={selectedRecord}
          patients={patients}
          doctors={doctors}
          onClose={handleCloseModal}
          onSave={handleSave}
        />
      )}
      {isAddModalOpen && (
        <AddModal
          patients={patients}
          doctors={doctors}
          onClose={handleCloseAddModal}
          onSave={handleSaveNewRecord}
        />
      )}
    </div>
  );
};

export default withAuth(MedicalRecordPage);
