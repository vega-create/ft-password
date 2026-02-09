import { useState } from 'react';

const ADJ = ['swift','brave','cool','dark','epic','fast','gold','hyper','iron','keen','lunar','mega','neo','pro','rad','star','true','ultra','vivid','zen','cyber','flash','noble','prime','royal'];
const NOUNS = ['wolf','hawk','lion','fox','bear','lynx','sage','rider','blade','storm','spark','nexus','pixel','code','byte','node','pulse','vector','orbit','helix','phantom','cipher','atlas','forge','ace'];

export default function UsernameGenerator() {
  const [count, setCount] = useState(10);
  const [addNum, setAddNum] = useState(true);
  const [results, setResults] = useState<string[]>([]);

  const generate = () => {
    const arr = new Uint32Array(count * 3);
    crypto.getRandomValues(arr);
    const usernames: string[] = [];
    for (let i = 0; i < count; i++) {
      const adj = ADJ[arr[i*3] % ADJ.length];
      const noun = NOUNS[arr[i*3+1] % NOUNS.length];
      const num = addNum ? (arr[i*3+2] % 900 + 100).toString() : '';
      usernames.push(adj + noun + num);
    }
    setResults(usernames);
  };

  if (results.length === 0) generate();

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
        <div className="flex gap-4 items-end">
          <div className="flex-1"><label className="block text-sm font-medium text-gray-700 mb-1">Count</label><input type="number" value={count} onChange={e => setCount(Math.max(1, Math.min(20, parseInt(e.target.value) || 1)))} min="1" max="20" /></div>
          <label className="flex items-center gap-2 text-sm text-gray-600 pb-3"><input type="checkbox" checked={addNum} onChange={e => setAddNum(e.target.checked)} className="rounded accent-green-600" />Add numbers</label>
        </div>
        <button onClick={generate} className="w-full py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700">Generate Usernames</button>
      </div>
      {results.length > 0 && (
        <div className="grid sm:grid-cols-2 gap-2">
          {results.map((u, i) => (
            <div key={i} className="flex items-center justify-between bg-white border border-gray-100 rounded-xl p-3">
              <span className="font-mono text-gray-900">{u}</span>
              <button onClick={() => navigator.clipboard.writeText(u)} className="text-xs text-green-600 hover:text-green-700 font-medium">Copy</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
