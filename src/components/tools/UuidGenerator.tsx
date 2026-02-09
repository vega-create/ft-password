import { useState } from 'react';

export default function UuidGenerator() {
  const [count, setCount] = useState(5);
  const [uuids, setUuids] = useState<string[]>([]);
  const [uppercase, setUppercase] = useState(false);
  const [noDashes, setNoDashes] = useState(false);

  const generate = () => {
    const result: string[] = [];
    for (let i = 0; i < count; i++) {
      let uuid = crypto.randomUUID();
      if (uppercase) uuid = uuid.toUpperCase();
      if (noDashes) uuid = uuid.replace(/-/g, '');
      result.push(uuid);
    }
    setUuids(result);
  };

  if (uuids.length === 0) generate();

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Count</label>
          <input type="number" value={count} onChange={e => setCount(Math.max(1, Math.min(50, parseInt(e.target.value) || 1)))} min="1" max="50" /></div>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 text-sm text-gray-600"><input type="checkbox" checked={uppercase} onChange={e => setUppercase(e.target.checked)} className="rounded accent-green-600" />UPPERCASE</label>
          <label className="flex items-center gap-2 text-sm text-gray-600"><input type="checkbox" checked={noDashes} onChange={e => setNoDashes(e.target.checked)} className="rounded accent-green-600" />No dashes</label>
        </div>
        <div className="flex gap-3">
          <button onClick={generate} className="flex-1 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700">Generate</button>
          <button onClick={() => navigator.clipboard.writeText(uuids.join('\n'))} className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200">Copy All</button>
        </div>
      </div>
      <div className="space-y-2">
        {uuids.map((u, i) => (
          <div key={i} className="flex items-center justify-between bg-gray-900 rounded-xl p-3">
            <code className="text-sm font-mono text-green-400">{u}</code>
            <button onClick={() => navigator.clipboard.writeText(u)} className="text-xs text-gray-400 hover:text-white ml-2">Copy</button>
          </div>
        ))}
      </div>
    </div>
  );
}
