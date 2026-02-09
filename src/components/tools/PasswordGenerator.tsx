import { useState, useCallback } from 'react';

export default function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [opts, setOpts] = useState({ upper: true, lower: true, digits: true, symbols: true });
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);

  const generate = useCallback(() => {
    let chars = '';
    if (opts.upper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (opts.lower) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (opts.digits) chars += '0123456789';
    if (opts.symbols) chars += '!@#$%^&*()-_=+[]{}|;:,.<>?/~`';
    if (!chars) chars = 'abcdefghijklmnopqrstuvwxyz';
    const arr = new Uint32Array(length);
    crypto.getRandomValues(arr);
    const pw = Array.from(arr, v => chars[v % chars.length]).join('');
    setPassword(pw);
    setCopied(false);
  }, [length, opts]);

  if (!password) generate();

  const copy = () => { navigator.clipboard.writeText(password); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  const strength = (() => {
    let chars = 0;
    if (opts.upper) chars += 26;
    if (opts.lower) chars += 26;
    if (opts.digits) chars += 10;
    if (opts.symbols) chars += 30;
    const entropy = Math.log2(Math.pow(chars || 1, length));
    if (entropy >= 80) return { label: 'Very Strong', color: 'bg-green-500', pct: 100 };
    if (entropy >= 60) return { label: 'Strong', color: 'bg-green-400', pct: 75 };
    if (entropy >= 40) return { label: 'Fair', color: 'bg-yellow-400', pct: 50 };
    return { label: 'Weak', color: 'bg-red-500', pct: 25 };
  })();

  return (
    <div className="space-y-6">
      <div className="bg-gray-900 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-gray-400 font-medium">Generated Password</span>
          <div className="flex gap-2">
            <button onClick={copy} className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${copied ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>
              {copied ? '✓ Copied' : 'Copy'}
            </button>
            <button onClick={generate} className="px-3 py-1 bg-green-600 text-white rounded-lg text-xs font-medium hover:bg-green-700">
              ↻ New
            </button>
          </div>
        </div>
        <code className="text-2xl md:text-3xl font-mono text-green-400 break-all leading-relaxed">{password}</code>
        <div className="mt-4 flex items-center gap-3">
          <div className="flex-1 bg-gray-700 rounded-full h-2">
            <div className={`h-2 rounded-full ${strength.color} transition-all`} style={{width: `${strength.pct}%`}}></div>
          </div>
          <span className="text-sm text-gray-300 font-medium">{strength.label}</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm font-medium text-gray-700">Length: {length}</label>
          </div>
          <input type="range" min="4" max="128" value={length} onChange={e => { setLength(parseInt(e.target.value)); }}
            onMouseUp={generate} onTouchEnd={generate}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600" />
          <div className="flex justify-between text-xs text-gray-400 mt-1"><span>4</span><span>128</span></div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {([['upper','A-Z','Uppercase'],['lower','a-z','Lowercase'],['digits','0-9','Numbers'],['symbols','!@#','Symbols']] as const).map(([key, ex, label]) => (
            <label key={key} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${opts[key] ? 'border-green-200 bg-green-50' : 'border-gray-100 bg-gray-50'}`}>
              <input type="checkbox" checked={opts[key]} onChange={() => { const n = {...opts, [key]: !opts[key]}; setOpts(n); }} className="rounded accent-green-600" />
              <div>
                <div className="text-sm font-medium text-gray-900">{label}</div>
                <div className="text-xs text-gray-400 font-mono">{ex}</div>
              </div>
            </label>
          ))}
        </div>
        <button onClick={generate} className="w-full py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors text-lg">
          Generate Password
        </button>
      </div>
    </div>
  );
}
