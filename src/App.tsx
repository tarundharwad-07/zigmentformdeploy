import React, { useState } from 'react';
import DynamicForm from './DynamicForm';

const App: React.FC = () => {
  const [schema, setSchema] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleJSONChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = event.target.value;

    try {
      const parsed = JSON.parse(input);
      setSchema(parsed);
      setError(null);
    } catch (err: any) {
      console.error("JSON Parsing Error:", err);
      setError(`Invalid JSON: ${err.message}`);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* JSON Editor */}
      <div className="w-full md:w-1/2 p-4">
        <h2 className="text-xl font-bold mb-2">JSON Editor</h2>
        <textarea
          className="w-full h-[calc(100%-3rem)] border p-2"
          onChange={handleJSONChange}
          placeholder="Enter your JSON schema here"
        />
        {error && (
          <div className="text-red-600 mt-2">
            <p>{error}</p>
          </div>
        )}
      </div>

      {/* Form Preview */}
      <div className="w-full md:w-1/2 p-4">
        <h2 className="text-xl font-bold mb-2">Form Preview</h2>
        {schema ? <DynamicForm schema={schema} /> : <p>No valid schema provided.</p>}
      </div>
    </div>
  );
};

export default App;
