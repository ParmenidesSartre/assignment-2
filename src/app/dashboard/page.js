'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import AddAppointmentModal from '../../components/dashboard/addAppointment';
import EditAppointmentModal from '../../components/dashboard/editAppointment';
import withAuth from '@/components/withAuth';


const citiesInMalaysia = [
  'Kuala Lumpur',
  'George Town',
  'Ipoh',
  'Shah Alam',
  'Petaling Jaya',
  'Johor Bahru',
  'Malacca City',
  'Alor Setar',
  'Kota Kinabalu',
  'Kuching',
  'Seremban',
  'Kuantan',
  'Kuala Terengganu',
  'Taiping',
  'Miri',
  'Sandakan',
  'Sibu',
  // Add more cities as needed
];


const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [emergencyContactName, setEmergencyContactName] = useState('');
  const [emergencyContactPhone, setEmergencyContactPhone] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [doctorsLoading, setDoctorsLoading] = useState(true);

  const router = useRouter();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }
        const res = await fetch('/api/users', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!res.ok) {
          throw new Error('User not found');
        }
        const data = await res.json();
        setUser(data);
        setName(data.name || '');
        setEmail(data.email || '');
        setDateOfBirth(data.dateOfBirth ? new Date(data.dateOfBirth).toISOString().split('T')[0] : '');
        setPhoneNumber(data.phoneNumber || '');
        setAddress(data.address || '');
        setCity(data.city || '');
        setState(data.state || '');
        setPostalCode(data.postalCode || '');
        setEmergencyContactName(data.emergencyContactName || '');
        setEmergencyContactPhone(data.emergencyContactPhone || '');
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const doctorsRes = await fetch('/api/doctors');
        const doctorsData = await doctorsRes.json();
        setDoctors(doctorsData);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      } finally {
        setDoctorsLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
      const res = await fetch('/api/appointments?role=patient', {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      if (!res.ok) {
        throw new Error('Failed to fetch appointments');
      }
      const data = await res.json();
      setAppointments(data);
    } catch (err) {
      console.error('Error fetching appointments:', err.message);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleUpdateProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
      const res = await fetch('/api/users/update', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          dateOfBirth,
          phoneNumber,
          address,
          city,
          state,
          postalCode,
          emergencyContactName,
          emergencyContactPhone
        }),
      });
      if (!res.ok) {
        throw new Error('Failed to update profile');
      }
      const updatedUser = await res.json();
      setUser(updatedUser);
      setSuccessMessage('Profile updated successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      console.error('Error updating user:', err.message);
      setError(err.message);
    }
  };

  const handleSaveAppointment = async (appointmentData) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
      const res = await fetch('/api/appointments/create', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentData),
      });
      if (!res.ok) {
        throw new Error('Failed to save appointment');
      }
      await fetchAppointments(); // Refresh the appointment list
      setShowAddModal(false);
    } catch (err) {
      console.error('Error saving appointment:', err.message);
      setError(err.message);
    }
  };

  const handleUpdateAppointment = async (updatedData) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
      const res = await fetch(`/api/appointments/update`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: updatedData.id,
          date: updatedData.date,
          doctorId: updatedData.doctorId,
        }),
      });
      if (!res.ok) {
        throw new Error('Failed to update appointment');
      }
      await fetchAppointments(); // Refresh the appointment list
      setShowEditModal(false);
    } catch (err) {
      console.error('Error updating appointment:', err.message);
      setError(err.message);
    }
  };

  const handleDeleteAppointment = async (appointmentId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
      const res = await fetch(`/api/appointments/delete`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: appointmentId }), // include the id in the body
      });
      if (!res.ok) {
        throw new Error('Failed to delete appointment');
      }
      await fetchAppointments(); // Refresh the appointment list
    } catch (err) {
      console.error('Error deleting appointment:', err.message);
      setError(err.message);
    }
  };


  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login'); 
  };

  if (loading || doctorsLoading) {
    return <div className="flex items-center justify-center min-h-screen bg-gray-900 p-6 text-white">Loading...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center min-h-screen bg-gray-900 p-6 text-white">Error: {error}</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-6">
      <div className="bg-teal-500 rounded-lg shadow-lg w-full max-w-6xl">
        <div className="p-6  border-gray-200">
          {successMessage && (
            <div className="mb-4 text-green-500 text-center">{successMessage}</div>
          )}
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="sm:flex sm:space-x-5">
              <div className="flex-shrink-0">
                <img src="https://thispersondoesnotexist.com/" alt={`${user.name}'s profile`} className="mx-auto h-20 w-20 rounded-full" />
              </div>
              <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                <p className="text-sm font-medium text-gray-600">Welcome back,</p>
                <p className="text-xl font-bold text-gray-900 sm:text-2xl">{user.name}</p>
              </div>
            </div>
            <div className="flex space-x-4 mt-4 sm:mt-0 sm:ml-6">
              <button
                type="button"
                onClick={handleUpdateProfile}
                className="inline-flex items-center rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Update Profile
              </button>
              <button
                type="button"
                onClick={handleLogout} 
                className="inline-flex items-center rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Logout
              </button>
            </div>

          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white">Applicant Information</h3>
          <form className="space-y-8 mt-4" onSubmit={e => e.preventDefault()}>
            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
              <div>
                <label htmlFor="full-name" className="block text-sm font-medium text-white">Full name</label>
                <input
                  type="text"
                  name="full-name"
                  id="full-name"
                  autoComplete="name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="mt-1 block w-full rounded-md bg-gray-700 text-white border-gray-600 focus:border-teal-500 focus:ring-teal-500"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white">Email address</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="mt-1 block w-full rounded-md bg-gray-700 text-white border-gray-600 focus:border-teal-500 focus:ring-teal-500"
                />
              </div>
              <div>
                <label htmlFor="date-of-birth" className="block text-sm font-medium text-white">Date of Birth</label>
                <input
                  type="date"
                  name="date-of-birth"
                  id="date-of-birth"
                  autoComplete="bday"
                  value={dateOfBirth}
                  onChange={e => setDateOfBirth(e.target.value)}
                  className="mt-1 block w-full rounded-md bg-gray-700 text-white border-gray-600 focus:border-teal-500 focus:ring-teal-500"
                />
              </div>
              <div>
                <label htmlFor="phone-number" className="block text-sm font-medium text-white">Phone Number</label>
                <input
                  type="tel"
                  name="phone-number"
                  id="phone-number"
                  autoComplete="tel"
                  value={phoneNumber}
                  onChange={e => setPhoneNumber(e.target.value)}
                  className="mt-1 block w-full rounded-md bg-gray-700 text-white border-gray-600 focus:border-teal-500 focus:ring-teal-500"
                />
              </div>
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-white">Address</label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  autoComplete="street-address"
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  className="mt-1 block w-full rounded-md bg-gray-700 text-white border-gray-600 focus:border-teal-500 focus:ring-teal-500"
                />
              </div>
              <div>
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-white">City</label>
                <select
                  name="city"
                  id="city"
                  value={city}
                  onChange={e => setCity(e.target.value)}
                  className="mt-1 block w-full rounded-md bg-gray-700 text-white border-gray-600 focus:border-teal-500 focus:ring-teal-500"
                >
                  <option value="" disabled>Select your city</option>
                  {citiesInMalaysia.map(city => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
              </div>
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-white">State</label>
                <input
                  type="text"
                  name="state"
                  id="state"
                  autoComplete="address-level1"
                  value={state}
                  onChange={e => setState(e.target.value)}
                  className="mt-1 block w-full rounded-md bg-gray-700 text-white border-gray-600 focus:border-teal-500 focus:ring-teal-500"
                />
              </div>
              <div>
                <label htmlFor="postal-code" className="block text-sm font-medium text-white">Postal Code</label>
                <input
                  type="text"
                  name="postal-code"
                  id="postal-code"
                  autoComplete="postal-code"
                  value={postalCode}
                  onChange={e => setPostalCode(e.target.value)}
                  className="mt-1 block w-full rounded-md bg-gray-700 text-white border-gray-600 focus:border-teal-500 focus:ring-teal-500"
                />
              </div>
            </div>
          </form>

          <div className="mt-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-white">Appointments Records</h3>
              <button
                type="button"
                className="inline-flex items-center rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500"
                onClick={() => setShowAddModal(true)}
              >
                Add Appointment
              </button>
            </div>
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead>
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0">#</th>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0">Doctor</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">Date</th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0"><span className="sr-only">Edit</span></th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0"><span className="sr-only">Delete</span></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {appointments.map((appointment, index) => (
                    <tr key={appointment.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">{index + 1}</td>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">{appointment.doctor.name}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{new Date(appointment.date).toLocaleString()}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                        <button
                          className="text-indigo-600 hover:text-indigo-900"
                          onClick={() => {
                            setSelectedAppointment(appointment);
                            setShowEditModal(true);
                          }}
                        >
                          Edit
                        </button>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                        <button
                          className="text-red-600 hover:text-red-900"
                          onClick={() => handleDeleteAppointment(appointment.id)}
                        >
                          Delete
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
      {showAddModal && (
        <AddAppointmentModal
          doctors={doctors}
          onClose={() => setShowAddModal(false)}
          onSave={handleSaveAppointment}
        />
      )}
      {showEditModal && (
        <EditAppointmentModal
          doctors={doctors}
          appointment={selectedAppointment}
          onClose={() => setShowEditModal(false)}
          onSave={handleUpdateAppointment}
        />
      )}
    </div>
  );
}


export default withAuth(Dashboard);