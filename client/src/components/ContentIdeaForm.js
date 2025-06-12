import React, { useState } from 'react';
import axios from 'axios';

function ContentIdeaForm() {
  const [topic, setTopic] = useState('');
  const [niche, setNiche] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult('');

    try {
      const res = await axios.post('http://localhost:5000/api/openai/generate', { topic, niche });
      setResult(res.data.result);
    } catch (err) {
      setError('Failed to generate content. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Content Idea Assistant</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Topic</label>
          <input
            type="text"
            className="form-control"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Niche</label>
          <select
            className="form-select"
            value={niche}
            onChange={(e) => setNiche(e.target.value)}
            required
          >
            <option value="">Choose a niche</option>
            <option value="fashion">Fashion</option>
            <option value="fitness">Fitness</option>
            <option value="finance">Finance</option>
            <option value="finance">Sports</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Generating...' : 'Generate Idea'}
        </button>
      </form>

      {error && <div className="alert alert-danger mt-3">{error}</div>}

      {result && (
        <div className="card mt-4">
          <div className="card-body">
            <h5 className="card-title">Generated Content</h5>
            <p className="card-text" style={{ whiteSpace: 'pre-line' }}>{result}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ContentIdeaForm;
