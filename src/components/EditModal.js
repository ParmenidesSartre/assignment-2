import { useState } from 'react';

const EditModal = ({ record, doctors, onClose, onSave }) => {
  const [selectedRecord, setSelectedRecord] = useState(record);
  const [saving, setSaving] = useState(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setSelectedRecord((prev) => ({ ...prev, [id]: value }));
  };

  const handleSaveClick = async () => {
    setSaving(true);
    try {
      await onSave(selectedRecord);
    } catch (error) {
      console.error('Failed to save record', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-lg font-semibold mb-4">Edit Medical Record</h2>
        <form className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="patient">
                Patient
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="patient"
                type="text"
                value={selectedRecord.patient?.name || ''}
                readOnly
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="doctor">
                Doctor
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="doctor"
                value={selectedRecord.doctorId || ''}
                onChange={(e) => {
                  const doctorId = parseInt(e.target.value);
                  setSelectedRecord((prev) => ({ ...prev, doctorId }));
                }}
              >
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
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
                Date
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="date"
                type="date"
                value={selectedRecord.date ? new Date(selectedRecord.date).toISOString().substr(0, 10) : ''}
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
                value={selectedRecord.followUp ? new Date(selectedRecord.followUp).toISOString().substr(0, 10) : ''}
                onChange={handleInputChange}
              />
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
                value={selectedRecord.diagnosis || ''}
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
                value={selectedRecord.treatmentPlan || ''}
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
                value={selectedRecord.medications || ''}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-x-4">
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

export default EditModal;
