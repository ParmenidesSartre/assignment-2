'use client';

import { useEffect, useState } from 'react';
import withAuth from '@/components/withAuth';
import EditModal from '../../components/EditModal';

const AppointmentPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [patientsLoading, setPatientsLoading] = useState(true);
  const [doctorsLoading, setDoctorsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }
        const [appointmentsRes, patientsRes, doctorsRes] = await Promise.all([
          fetch('/api/appointments?role=doctor', {
            headers: {
              'Authorization': `Bearer ${token}`,
            }
          }),
          fetch('/api/patients'),
          fetch('/api/doctors')
        ]);

        const [appointmentsData, patientsData, doctorsData] = await Promise.all([
          appointmentsRes.json(),
          patientsRes.json(),
          doctorsRes.json()
        ]);

        setAppointments(appointmentsData);
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

  const handleEditClick = (appointment) => {
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAppointment(null);
  };

  const handleSave = async (updatedAppointment) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await fetch('/api/appointments/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updatedAppointment),
      });

      if (response.ok) {
        setAppointments((prevAppointments) =>
          prevAppointments.map((appointment) =>
            appointment.id === updatedAppointment.id ? updatedAppointment : appointment
          )
        );
        setIsModalOpen(false);
        setSelectedAppointment(null);
      } else {
        throw new Error('Failed to save appointment');
      }
    } catch (error) {
      console.error('An error occurred while saving the appointment:', error);
      alert('Failed to save appointment');
    }
  };

  if (loading || patientsLoading || doctorsLoading) {
    return <div className="flex items-center justify-center min-h-screen bg-gray-900 p-6 text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl">
        <div className="bg-gray-900 py-10">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h1 className="text-base font-semibold leading-6 text-white">Appointments</h1>
                <p className="mt-2 text-sm text-gray-300">
                  A list of all the appointments in your account including patient name, doctor name, date, diagnosis, treatment plan, and medications.
                </p>
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
                          Date
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                          Followup Date
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
                      {appointments.length > 0 ? (
                        appointments.map((appointment) => (
                          <tr key={appointment.id}>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">
                              { appointment?.patient?.name || 'N/A'}
                            </td>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">
                              { appointment?.doctor?.name || 'N/A' }
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{new Date(appointment.date).toLocaleDateString()}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{appointment.followUp ? new Date(appointment.followUp).toLocaleDateString() : 'N/A'}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{appointment.diagnosis || 'N/A'}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{appointment.treatmentPlan || 'N/A'}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{appointment.medications || 'N/A'}</td>
                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                              <button
                                onClick={() => handleEditClick(appointment)}
                                className="text-teal-400 hover:text-teal-300"
                              >
                                Edit<span className="sr-only">, {appointment.patient?.name}</span>
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="8" className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0 text-center">
                            No appointments found
                          </td>
                        </tr>
                      )}
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
          record={selectedAppointment}
          doctors={doctors}
          onClose={handleCloseModal}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default withAuth(AppointmentPage);
