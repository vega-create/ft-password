import { useState } from 'react';

const WORDS = ['apple','brave','coral','delta','eagle','flame','grace','honey','ivory','jewel','karma','lunar','maple','noble','ocean','pearl','quest','river','solar','tiger','ultra','vivid','whale','xenon','yield','zephyr','amber','blaze','cedar','dream','ember','frost','gleam','haven','inlet','jazzy','knack','light','mirth','north','oasis','plume','quilt','ridge','storm','tryst','unity','vapor','wired','xenon','yacht','zingy','acorn','brook','cliff','drift','epoch','forge','grain','haste','irony','joust','kiosk','latch','moose','nexus','orbit','prism','quail','roost','spine','torch','usher','vault','waltz','pixel','bloom','crisp','dwell','evoke','flint','glyph','hound','ivory','jumbo','kneel','lodge','mango','niche','oxide','pouch','quirk','relic','swift','tunic','urban','venom','winch','azure','blink','charm','ducal','elbow','frost'];

export default function PassphraseGenerator() {
  const [wordCount, setWordCount] = useState(4);
  const [separator, setSeparator] = useState('-');
  const [capitalize, setCapitalize] = useState(true);
  const [addNumber, setAddNumber] = useState(true);
  const [phrase, setPhrase] = useState('');
  const [copied, setCopied] = useState(false);

  const generate = () => {
    const arr = new Uint32Array(wordCount);
    crypto.getRandomValues(arr);
    let words = Array.from(arr, v => WORDS[v % WORDS.length]);
    if (capitalize) words = words.map(w => w.charAt(0).toUpperCase() + w.slice(1));
    let result = words.join(separator);
    if (addNumber) {
      const numArr = new Uint32Array(1);
      crypto.getRandomValues(numArr);
      result += separator + (numArr[0] % 900 + 100);
    }
    setPhrase(result);
    setCopied(false);
  };

  if (!phrase) generate();

  const copy = () => { navigator.clipboard.writeText(phrase); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <div className="space-y-6">
      <div className="bg-gray-900 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-gray-400">Generated Passphrase</span>
          <div className="flex gap-2">
            <button onClick={copy} className={`px-3 py-1 rounded-lg text-xs font-medium ${copied ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>{copied ? '✓ Copied' : 'Copy'}</button>
            <button onClick={generate} className="px-3 py-1 bg-green-600 text-white rounded-lg text-xs font-medium hover:bg-green-700">↻ New</button>
          </div>
        </div>
        <code className="text-2xl font-mono text-green-400 break-all">{phrase}</code>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">Words: {wordCount}</label>
          <input type="range" min="3" max="8" value={wordCount} onChange={e => setWordCount(parseInt(e.target.value))} onMouseUp={generate} onTouchEnd={generate} className="w-full accent-green-600" />
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Separator:</span>
            {['-','_','.','  '].map(s => (
              <button key={s} onClick={() => { setSeparator(s === '  ' ? ' ' : s); }} className={`px-3 py-1 rounded-lg text-sm font-mono ${separator === (s === '  ' ? ' ' : s) ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600'}`}>{s === '  ' ? 'space' : s}</button>
            ))}
          </div>
        </div>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 text-sm text-gray-600"><input type="checkbox" checked={capitalize} onChange={e => setCapitalize(e.target.checked)} className="rounded accent-green-600" />Capitalize</label>
          <label className="flex items-center gap-2 text-sm text-gray-600"><input type="checkbox" checked={addNumber} onChange={e => setAddNumber(e.target.checked)} className="rounded accent-green-600" />Add number</label>
        </div>
        <button onClick={generate} className="w-full py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700">Generate Passphrase</button>
      </div>
    </div>
  );
}
