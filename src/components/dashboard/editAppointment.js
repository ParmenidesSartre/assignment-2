import { useState } from 'react';

const EditAppointmentModal = ({ doctors, appointment, onClose, onSave }) => {
  const [updatedAppointment, setUpdatedAppointment] = useState({
    date: appointment.date,
    doctorId: appointment.doctorId,
  });
  const [saving, setSaving] = useState(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setUpdatedAppointment((prev) => ({ ...prev, [id]: value }));
  };

  const handleDoctorChange = (e) => {
    const doctorId = parseInt(e.target.value, 10);
    setUpdatedAppointment((prev) => ({ ...prev, doctorId }));
  };

  const handleSaveClick = async () => {
    setSaving(true);
    try {
      await onSave({
        id: appointment.id, // Include the id in the save function
        ...updatedAppointment,
      });
      onClose();
    } catch (error) {
      console.error('Failed to save appointment', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-lg font-semibold mb-4">Edit Appointment</h2>
        <form className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="doctorId">
                Doctor
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="doctorId"
                value={updatedAppointment.doctorId}
                onChange={handleDoctorChange}
              >
                <option value="">Select Doctor</option>
                {doctors.map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
                Date
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="date"
                type="datetime-local"
                value={new Date(updatedAppointment.date).toISOString().slice(0, 16)}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-x-4 mt-6">
            <button
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleSaveClick}
              disabled={saving}
            >
              {saving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAppointmentModal;
