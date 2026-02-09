import { useState } from 'react';

export default function BcryptHash() {
  const [text, setText] = useState('');
  const [hash, setHash] = useState('');
  const [note] = useState('Note: True bcrypt requires a server-side library. This generates a SHA-256 hash as a demonstration. For production bcrypt, use a backend service.');

  const generate = async () => {
    if (!text) return;
    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text + Date.now()));
    const hex = Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
    setHash('$2b$10$' + hex.substring(0, 53));
  };

  return (
    <div className="space-y-4">
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-sm text-yellow-700">{note}</div>
      <div><label className="block text-sm font-medium text-gray-700 mb-1">Password to Hash</label>
        <input type="text" value={text} onChange={e => setText(e.target.value)} placeholder="Enter password..." className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none font-mono" /></div>
      <button onClick={generate} className="w-full py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700">Generate Hash</button>
      {hash && (
        <div className="bg-gray-900 rounded-xl p-4">
          <div className="flex justify-between items-center mb-2"><span className="text-xs text-gray-400">Bcrypt-style Hash</span>
            <button onClick={() => navigator.clipboard.writeText(hash)} className="text-xs text-green-400 font-medium">Copy</button></div>
          <code className="text-green-400 font-mono text-sm break-all">{hash}</code>
        </div>
      )}
    </div>
  );
}
