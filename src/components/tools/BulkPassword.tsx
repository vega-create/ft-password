import { useState } from 'react';

export default function BulkPassword() {
  const [length, setLength] = useState(16);
  const [count, setCount] = useState(10);
  const [passwords, setPasswords] = useState<string[]>([]);

  const generate = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    const result: string[] = [];
    for (let i = 0; i < count; i++) {
      const arr = new Uint32Array(length);
      crypto.getRandomValues(arr);
      result.push(Array.from(arr, v => chars[v % chars.length]).join(''));
    }
    setPasswords(result);
  };

  if (passwords.length === 0) generate();
  const copyAll = () => navigator.clipboard.writeText(passwords.join('\n'));

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
        <div className="grid sm:grid-cols-2 gap-3">
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Length</label><input type="number" value={length} onChange={e => setLength(Math.max(8, parseInt(e.target.value) || 8))} min="8" max="128" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Count</label><input type="number" value={count} onChange={e => setCount(Math.max(1, Math.min(50, parseInt(e.target.value) || 1)))} min="1" max="50" /></div>
        </div>
        <div className="flex gap-3">
          <button onClick={generate} className="flex-1 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700">Generate</button>
          <button onClick={copyAll} className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200">Copy All</button>
        </div>
      </div>
      {passwords.length > 0 && (
        <div className="bg-gray-900 rounded-2xl p-4 max-h-96 overflow-y-auto">
          {passwords.map((p, i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b border-gray-800 last:border-0">
              <code className="text-sm font-mono text-green-400 break-all">{p}</code>
              <button onClick={() => navigator.clipboard.writeText(p)} className="text-xs text-gray-500 hover:text-white ml-2 flex-shrink-0">Copy</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
