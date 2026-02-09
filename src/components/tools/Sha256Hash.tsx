import { useState, useEffect } from 'react';

export default function Sha256Hash() {
  const [text, setText] = useState('');
  const [hash, setHash] = useState('');

  useEffect(() => {
    if (!text) { setHash(''); return; }
    crypto.subtle.digest('SHA-256', new TextEncoder().encode(text))
      .then(buf => setHash(Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('')));
  }, [text]);

  return (
    <div className="space-y-4">
      <div><label className="block text-sm font-medium text-gray-700 mb-1">Input Text</label>
        <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Enter text to hash..."
          className="w-full h-32 p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none resize-y text-gray-900" /></div>
      {hash && (
        <div className="bg-gray-900 rounded-xl p-4">
          <div className="flex justify-between items-center mb-2"><span className="text-xs text-gray-400">SHA-256 Hash</span>
            <button onClick={() => navigator.clipboard.writeText(hash)} className="text-xs text-green-400 font-medium">Copy</button></div>
          <code className="text-green-400 font-mono text-sm break-all">{hash}</code>
        </div>
      )}
    </div>
  );
}
