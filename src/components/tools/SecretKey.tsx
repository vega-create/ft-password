import { useState } from 'react';

export default function SecretKey() {
  const [length, setLength] = useState(64);
  const [format, setFormat] = useState<'hex'|'base64'|'alphanumeric'>('hex');
  const [key, setKey] = useState('');

  const generate = () => {
    const bytes = new Uint8Array(Math.ceil(length / 2));
    crypto.getRandomValues(bytes);
    let result = '';
    if (format === 'hex') {
      result = Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('').substring(0, length);
    } else if (format === 'base64') {
      result = btoa(String.fromCharCode(...bytes)).substring(0, length);
    } else {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const arr = new Uint32Array(length);
      crypto.getRandomValues(arr);
      result = Array.from(arr, v => chars[v % chars.length]).join('');
    }
    setKey(result);
  };

  if (!key) generate();

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Length: {length}</label>
          <input type="range" min="16" max="256" value={length} onChange={e => setLength(parseInt(e.target.value))} className="w-full accent-green-600" /></div>
        <div className="flex gap-2">
          {(['hex','base64','alphanumeric'] as const).map(f => (
            <button key={f} onClick={() => setFormat(f)} className={`px-4 py-2 rounded-lg text-sm font-medium ${format === f ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{f}</button>
          ))}
        </div>
        <button onClick={generate} className="w-full py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700">Generate Secret Key</button>
      </div>
      {key && (
        <div className="bg-gray-900 rounded-2xl p-4">
          <div className="flex justify-between items-center mb-2"><span className="text-xs text-gray-400">Secret Key ({format})</span>
            <button onClick={() => navigator.clipboard.writeText(key)} className="text-xs text-green-400 font-medium">Copy</button></div>
          <code className="text-green-400 font-mono text-sm break-all">{key}</code>
        </div>
      )}
    </div>
  );
}
