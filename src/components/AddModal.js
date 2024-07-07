import { useState } from 'react';

const AddModal = ({ patients, doctors, onClose, onSave }) => {
  const [newRecord, setNewRecord] = useState({
    patientId: '',
    doctorId: '',
    diagnosis: '',
    treatmentPlan: '',
    medications: '',
    followUp: '',
    notes: '',
    allergies: '',
  });
  const [saving, setSaving] = useState(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setNewRecord((prev) => ({ ...prev, [id]: value }));
  };

  const handlePatientChange = (e) => {
    const patientId = parseInt(e.target.value, 10);
    setNewRecord((prev) => ({ ...prev, patientId }));
  };

  const handleDoctorChange = (e) => {
    const doctorId = parseInt(e.target.value, 10);
    setNewRecord((prev) => ({ ...prev, doctorId }));
  };

  const handleSaveClick = async () => {
    setSaving(true);
    try {
      await onSave(newRecord);
      onClose();
    } catch (error) {
      console.error('Failed to save record', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-lg font-semibold mb-4">Add Medical Record</h2>
        <form className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="patientId">
                Patient
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="patientId"
                value={newRecord.patientId}
                onChange={handlePatientChange}
              >
                <option value="">Select Patient</option>
                {patients.map((patient) => (
                  <option key={patient.id} value={patient.id}>
                    {patient.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="doctorId">
                Doctor
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="doctorId"
                value={newRecord.doctorId}
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
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="diagnosis">
                Diagnosis
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="diagnosis"
                type="text"
                value={newRecord.diagnosis}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="treatmentPlan">
                Treatment Plan
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="treatmentPlan"
                type="text"
                value={newRecord.treatmentPlan}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="medications">
                Medications
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="medications"
                type="text"
                value={newRecord.medications}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="followUp">
                Follow-Up Date
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="followUp"
                type="date"
                value={newRecord.followUp}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="h-full">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="notes">
                Notes
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full h-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="notes"
                value={newRecord.notes}
                onChange={handleInputChange}
              />
            </div>
            <div className="h-full">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="allergies">
                Allergies
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full h-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="allergies"
                value={newRecord.allergies}
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

export default AddModal;
