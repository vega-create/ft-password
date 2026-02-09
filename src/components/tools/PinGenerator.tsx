import { useState } from 'react';

export default function PinGenerator() {
  const [length, setLength] = useState(6);
  const [count, setCount] = useState(5);
  const [pins, setPins] = useState<string[]>([]);

  const generate = () => {
    const result: string[] = [];
    for (let i = 0; i < count; i++) {
      const arr = new Uint32Array(length);
      crypto.getRandomValues(arr);
      result.push(Array.from(arr, v => (v % 10).toString()).join(''));
    }
    setPins(result);
  };

  if (pins.length === 0) generate();

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
        <div className="grid sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">PIN Length</label>
            <input type="number" value={length} onChange={e => setLength(Math.max(3, Math.min(12, parseInt(e.target.value) || 4)))} min="3" max="12" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">How many</label>
            <input type="number" value={count} onChange={e => setCount(Math.max(1, Math.min(20, parseInt(e.target.value) || 1)))} min="1" max="20" />
          </div>
        </div>
        <button onClick={generate} className="w-full py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700">Generate PINs</button>
      </div>
      {pins.length > 0 && (
        <div className="space-y-2">
          {pins.map((p, i) => (
            <div key={i} className="flex items-center justify-between bg-gray-900 rounded-xl p-4">
              <code className="text-2xl font-mono text-green-400 tracking-[0.3em]">{p}</code>
              <button onClick={() => navigator.clipboard.writeText(p)} className="text-xs text-gray-400 hover:text-white">Copy</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
