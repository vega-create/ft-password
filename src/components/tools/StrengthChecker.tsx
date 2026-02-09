import { useState } from 'react';

export default function StrengthChecker() {
  const [password, setPassword] = useState('');

  const analyze = (pw: string) => {
    if (!pw) return { score: 0, label: 'Enter a password', color: 'bg-gray-300', tips: [] };
    let score = 0;
    const tips: string[] = [];
    if (pw.length >= 8) score += 1; else tips.push('Use at least 8 characters');
    if (pw.length >= 12) score += 1;
    if (pw.length >= 16) score += 1; else tips.push('16+ characters recommended');
    if (/[a-z]/.test(pw)) score += 1; else tips.push('Add lowercase letters');
    if (/[A-Z]/.test(pw)) score += 1; else tips.push('Add uppercase letters');
    if (/\d/.test(pw)) score += 1; else tips.push('Add numbers');
    if (/[^a-zA-Z0-9]/.test(pw)) score += 1; else tips.push('Add special characters');
    if (!/(.)\1{2,}/.test(pw)) score += 1; else tips.push('Avoid repeated characters');
    if (!/^(123|abc|qwerty|password|letmein)/i.test(pw)) score += 1; else tips.push('Avoid common patterns');
    const unique = new Set(pw).size;
    if (unique >= pw.length * 0.7) score += 1; else tips.push('Use more unique characters');

    if (score >= 9) return { score, label: 'Excellent', color: 'bg-green-500', pct: 100, tips };
    if (score >= 7) return { score, label: 'Strong', color: 'bg-green-400', pct: 80, tips };
    if (score >= 5) return { score, label: 'Fair', color: 'bg-yellow-400', pct: 60, tips };
    if (score >= 3) return { score, label: 'Weak', color: 'bg-orange-400', pct: 40, tips };
    return { score, label: 'Very Weak', color: 'bg-red-500', pct: 20, tips };
  };

  const result = analyze(password);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Enter Password to Check</label>
        <input type="text" value={password} onChange={e => setPassword(e.target.value)} placeholder="Type or paste a password..."
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-lg font-mono" />
        {password && (
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Strength: {result.label}</span>
              <span className="text-sm text-gray-500">{result.score}/10</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className={`h-3 rounded-full ${result.color} transition-all duration-300`} style={{width: `${result.pct}%`}}></div>
            </div>
          </div>
        )}
      </div>
      {password && (
        <>
          <div className="grid sm:grid-cols-3 gap-3">
            <div className="bg-white border border-gray-100 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-gray-900">{password.length}</div>
              <div className="text-xs text-gray-500">Characters</div>
            </div>
            <div className="bg-white border border-gray-100 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-gray-900">{new Set(password).size}</div>
              <div className="text-xs text-gray-500">Unique chars</div>
            </div>
            <div className="bg-white border border-gray-100 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-gray-900">{Math.floor(Math.log2(Math.pow(new Set(password).size || 1, password.length)))}</div>
              <div className="text-xs text-gray-500">Entropy bits</div>
            </div>
          </div>
          {result.tips.length > 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <h3 className="font-medium text-yellow-800 mb-2">💡 Suggestions</h3>
              <ul className="space-y-1">
                {result.tips.map((t, i) => <li key={i} className="text-sm text-yellow-700">• {t}</li>)}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
}
