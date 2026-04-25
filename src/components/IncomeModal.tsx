import { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import { Modal } from './Modal';

interface IncomeModalProps {
  onClose: () => void;
}

export function IncomeModal({ onClose }: IncomeModalProps) {
  const { state, addWorkLog } = useFinance();
  const [jobId, setJobId] = useState(state.jobs[0]?.id || '');
  const [hours, setHours] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (jobId && hours && parseFloat(hours) > 0) {
      addWorkLog(jobId, parseFloat(hours), date);
      onClose();
    }
  };

  return (
    <Modal title="Log Work" onClose={onClose}>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form__group">
          <label className="form__label">Job</label>
          <select
            className="form__input"
            value={jobId}
            onChange={(e) => setJobId(e.target.value)}
          >
            {state.jobs.map(job => (
              <option key={job.id} value={job.id}>
                {job.name} (${job.hourlyRate}/hr)
              </option>
            ))}
          </select>
        </div>
        <div className="form__group">
          <label className="form__label">Hours</label>
          <input
            className="form__input"
            type="number"
            step="0.5"
            min="0.5"
            placeholder="e.g. 3.5"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
          />
        </div>
        <div className="form__group">
          <label className="form__label">Date</label>
          <input
            className="form__input"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="form__actions">
          <button type="button" className="form__button form__button--cancel" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="form__button form__button--primary">
            Log Work
          </button>
        </div>
      </form>
    </Modal>
  );
}
