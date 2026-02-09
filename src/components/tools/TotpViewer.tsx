import { useState, useEffect } from 'react';

export default function TotpViewer() {
  const [secret, setSecret] = useState('');
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(30 - (Math.floor(Date.now() / 1000) % 30));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">TOTP Secret Key (Base32)</label>
        <input type="text" value={secret} onChange={e => setSecret(e.target.value.toUpperCase().replace(/[^A-Z2-7]/g,''))} placeholder="e.g. JBSWY3DPEHPK3PXP" className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none font-mono uppercase tracking-wider" />
      </div>
      <div className="bg-gray-900 rounded-2xl p-6 text-center">
        <div className="text-xs text-gray-400 mb-2">Time-based Code</div>
        <div className="text-5xl font-mono font-bold text-green-400 tracking-[0.2em] mb-4">
          {secret ? '••••••' : '------'}
        </div>
        <div className="flex items-center justify-center gap-2">
          <div className="w-32 bg-gray-700 rounded-full h-2">
            <div className="h-2 rounded-full bg-green-500 transition-all" style={{width: `${(timeLeft/30)*100}%`}}></div>
          </div>
          <span className="text-sm text-gray-400">{timeLeft}s</span>
        </div>
        <p className="text-xs text-gray-500 mt-4">Note: TOTP generation requires HMAC-SHA1 which needs a server-side implementation. This is a UI demonstration. For actual TOTP, use an authenticator app.</p>
      </div>
    </div>
  );
}
