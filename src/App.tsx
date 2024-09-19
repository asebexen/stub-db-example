import { useState } from 'react';
import './App.css';
import { useCandidate } from './hooks/useCandidate';

function App() {
  const {currentCandidate, fetchCandidateByName, createCandidate, updateCandidate, deleteCandidate} = useCandidate();
  const [message, setMessage] = useState<string>('');
  const [candidateName, setCandidateName] = useState<string>('');

  const onSearchClick = async () => {
    setMessage(`Attempting to fetch candidate: ${candidateName}`);
    await fetchCandidateByName(candidateName);
    setMessage(`Attempted to fetch candidate: ${candidateName}`);
  }

  const onCreateClick = async () => {
    setMessage(`Creating candidate: ${candidateName}`);
    await createCandidate(candidateName);
    setMessage(`Created candidate: ${candidateName}`);
  }

  const onUpdateClick = async () => {
    if (!currentCandidate) {
      setMessage('No candidate currently selected');
      return;
    }
    const oldName = currentCandidate.name;
    setMessage(`Updating candidate: ${oldName}`);
    await updateCandidate(currentCandidate.id, candidateName);
    setMessage(`Updated candidate: ${oldName} -> ${candidateName}`);
  }

  const onDeleteClick = async () => {
    if (!currentCandidate) {
      setMessage('No candidate currently selected');
      return;
    }
    const oldName = currentCandidate.name;
    setMessage(`Deleting candidate: ${oldName}`);
    deleteCandidate(currentCandidate.id);
    setMessage(`Deleted candidate: ${oldName}`);
  }

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
      <h1>Fake DB thing</h1>
      <p>Current candidate: {currentCandidate?.name ?? 'None'}</p>
      <p>Message: {message ?? 'None'}</p>
      <input placeholder='Enter a name' onChange={e => setCandidateName(e.target.value)} />
      <button onClick={onSearchClick}>Search</button>
      <button onClick={onCreateClick}>Create</button>
      <button onClick={onUpdateClick}>Update Current</button>
      <button onClick={onDeleteClick}>Delete Current</button>
    </div>
  )
}

export default App;
