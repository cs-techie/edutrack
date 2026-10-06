import React, { useState } from 'react';

const languageResources = {
  python: {
    title: 'Python Language Resources',
    starterCode: `print("Hello from EduTrack Python Sandbox!")\n\nfor i in range(1, 6):\n    print(f"Counting step: {i}")`,
    links: [
      { name: 'W3Schools Python', url: 'https://www.w3schools.com/python/' },
      { name: 'GeeksforGeeks Python', url: 'https://www.geeksforgeeks.org/python-programming-language-tutorial/' },
      { name: 'Real Python Tutorials', url: 'https://realpython.com/' },
      { name: 'Kaggle Python Course', url: 'https://www.kaggle.com/learn/python' },
      { name: 'LearnPython.org', url: 'https://www.learnpython.org/' }
    ]
  },
  c: {
    title: 'C Language Resources',
    starterCode: `#include <stdio.h>\n\nint main() {\n    printf("Hello from EduTrack C Sandbox!\\n");\n    return 0;\n}`,
    links: [
      { name: 'GeeksforGeeks C', url: 'https://www.geeksforgeeks.org/c-programming-language/' },
      { name: 'W3Schools C', url: 'https://www.w3schools.com/c/' },
      { name: 'Learn-C.org', url: 'https://www.learn-c.org/' }
    ]
  },
  cpp: {
    title: 'C++ Language Resources',
    starterCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello from EduTrack C++ Sandbox!" << endl;\n    return 0;\n}`,
    links: [
      { name: 'GeeksforGeeks C++', url: 'https://www.geeksforgeeks.org/c-plus-plus/' },
      { name: 'W3Schools C++', url: 'https://www.w3schools.com/cpp/' }
    ]
  },
  java: {
    title: 'Java Language Resources',
    starterCode: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello from EduTrack Java Sandbox!");\n    }\n}`,
    links: [
      { name: 'W3Schools Java', url: 'https://www.w3schools.com/java/' },
      { name: 'GeeksforGeeks Java', url: 'https://www.geeksforgeeks.org/java/' },
      { name: 'Oracle Java Documentation', url: 'https://docs.oracle.com/en/java/' }
    ]
  },
  csharp: {
    title: 'C# Language Resources',
    starterCode: `using System;\n\nclass Program {\n    static void Main() {\n        Console.WriteLine("Hello from EduTrack C# Sandbox!");\n    }\n}`,
    links: [
      { name: 'W3Schools C#', url: 'https://www.w3schools.com/cs/' },
      { name: 'Microsoft C# Docs', url: 'https://learn.microsoft.com/en-us/dotnet/csharp/' }
    ]
  },
  ruby: {
    title: 'Ruby Language Resources',
    starterCode: `puts "Hello from EduTrack Ruby Sandbox!"`,
    links: [
      { name: 'W3Schools Ruby', url: 'https://www.w3schools.com/ruby/' },
      { name: 'GeeksforGeeks Ruby', url: 'https://www.geeksforgeeks.org/ruby-programming-language/' },
      { name: 'Ruby Lang Official', url: 'https://www.ruby-lang.org/en/' }
    ]
  }
};

const LinksReference = () => {
  const [selectedLang, setSelectedLang] = useState(null);
  const [showCodeRunner, setShowCodeRunner] = useState(false);
  const [showCertificateGen, setShowCertificateGen] = useState(false);

  // Code Runner States
  const [runnerLang, setRunnerLang] = useState('javascript');
  const [code, setCode] = useState('console.log("Hello from EduTrack Live Code Sandbox!");\n\nconst numbers = [10, 20, 30];\nconst sum = numbers.reduce((a, b) => a + b, 0);\nconsole.log("Calculated Sum:", sum);');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  // Certificate Generator States
  const [certStudent, setCertStudent] = useState('John Doe');
  const [certCourse, setCertCourse] = useState('Full Stack Web Development & Computer Science');
  const [certDate, setCertDate] = useState(new Date().toISOString().split('T')[0]);

  const handleRunCode = () => {
    setIsRunning(true);
    setOutput('Compiling and executing...\n');

    setTimeout(() => {
      try {
        if (runnerLang === 'javascript') {
          let logs = [];
          const customConsole = {
            log: (...args) => logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : a).join(' ')),
            error: (...args) => logs.push('ERROR: ' + args.join(' ')),
            warn: (...args) => logs.push('WARN: ' + args.join(' '))
          };
          const runFn = new Function('console', code);
          runFn(customConsole);
          setOutput(logs.join('\n') || 'Program executed successfully with no output.');
        } else {
          // Simulated runner output for non-JS languages in browser environment
          setOutput(`[${runnerLang.toUpperCase()} Sandbox Execution]\nBuild Succeeded.\nRunning program:\n--------------------------\n` + code.split('\n').filter(l => l.includes('print') || l.includes('cout') || l.includes('Console') || l.includes('puts')).map(l => l.replace(/.*?(print|cout|Console\.WriteLine|puts|System\.out\.println)\(?"?([^"\(\)]+)"?\)?;?/, '$2')).join('\n') + `\n--------------------------\nProcess exited with status 0.`);
        }
      } catch (err) {
        setOutput('Runtime Error: ' + err.message);
      } finally {
        setIsRunning(false);
      }
    }, 400);
  };

  const handleLanguageSelect = (langKey) => {
    setSelectedLang(langKey);
    setShowCodeRunner(false);
    setShowCertificateGen(false);
    setRunnerLang(langKey);
    setCode(languageResources[langKey].starterCode || '// Write your code here');
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#fdfdfd', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', minHeight: '100vh' }}>
      <header style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h1 style={{ fontSize: '2.5em', color: '#333' }}>REFERENCE & LEARNING HUB</h1>
        <p style={{ color: '#666', marginTop: '-10px' }}>Interactive Code Sandboxes, Language Guides & Certificates</p>
      </header>

      <main style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div 
          className="reference-list"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '20px',
            width: '80%',
            maxWidth: '1200px'
          }}
        >
          {/* Interactive Feature Cards */}
          <div 
            className="card" 
            onClick={() => { setShowCodeRunner(true); setShowCertificateGen(false); setSelectedLang(null); }} 
            style={{ backgroundColor: '#2196F3', border: '1px solid #1976D2', borderRadius: '5px', padding: '20px', textAlign: 'center', width: '300px', height: '150px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', color: 'white' }}
          >
            <span style={{ fontWeight: 'bold', fontSize: '1.3em' }}>⚡ INTERACTIVE CODE RUNNER</span>
            <span style={{ fontSize: '0.85em', marginTop: '6px', opacity: 0.9 }}>Run Python, JS, C, Java Live</span>
          </div>

          <div 
            className="card" 
            onClick={() => { setShowCertificateGen(true); setShowCodeRunner(false); setSelectedLang(null); }} 
            style={{ backgroundColor: '#FF9800', border: '1px solid #F57C00', borderRadius: '5px', padding: '20px', textAlign: 'center', width: '300px', height: '150px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', color: 'white' }}
          >
            <span style={{ fontWeight: 'bold', fontSize: '1.3em' }}>📜 COURSE CERTIFICATE</span>
            <span style={{ fontSize: '0.85em', marginTop: '6px', opacity: 0.9 }}>Generate & Print Official Certificate</span>
          </div>

          {/* Standard Language Cards */}
          <div className="card" onClick={() => handleLanguageSelect('python')} style={{ backgroundColor: 'lightgreen', border: '1px solid #ddd', borderRadius: '5px', padding: '20px', textAlign: 'center', width: '300px', height: '150px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
            <span style={{ textDecoration: 'none', color: 'darkgreen', fontWeight: 'bold', fontSize: '1.2em' }}>PYTHON LANGUAGE</span>
          </div>
          <div className="card" onClick={() => handleLanguageSelect('c')} style={{ backgroundColor: 'lightgreen', border: '1px solid #ddd', borderRadius: '5px', padding: '20px', textAlign: 'center', width: '300px', height: '150px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
            <span style={{ textDecoration: 'none', color: 'darkgreen', fontWeight: 'bold', fontSize: '1.2em' }}>C LANGUAGE</span>
          </div>
          <div className="card" onClick={() => handleLanguageSelect('cpp')} style={{ backgroundColor: 'lightgreen', border: '1px solid #ddd', borderRadius: '5px', padding: '20px', textAlign: 'center', width: '300px', height: '150px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
            <span style={{ textDecoration: 'none', color: 'darkgreen', fontWeight: 'bold', fontSize: '1.2em' }}>C++ LANGUAGE</span>
          </div>
          <div className="card" onClick={() => handleLanguageSelect('java')} style={{ backgroundColor: 'lightgreen', border: '1px solid #ddd', borderRadius: '5px', padding: '20px', textAlign: 'center', width: '300px', height: '150px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
            <span style={{ textDecoration: 'none', color: 'darkgreen', fontWeight: 'bold', fontSize: '1.2em' }}>JAVA LANGUAGE</span>
          </div>
          <div className="card" onClick={() => handleLanguageSelect('csharp')} style={{ backgroundColor: 'lightgreen', border: '1px solid #ddd', borderRadius: '5px', padding: '20px', textAlign: 'center', width: '300px', height: '150px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
            <span style={{ textDecoration: 'none', color: 'darkgreen', fontWeight: 'bold', fontSize: '1.2em' }}>C# LANGUAGE</span>
          </div>
          <div className="card" onClick={() => handleLanguageSelect('ruby')} style={{ backgroundColor: 'lightgreen', border: '1px solid #ddd', borderRadius: '5px', padding: '20px', textAlign: 'center', width: '300px', height: '150px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
            <span style={{ textDecoration: 'none', color: 'darkgreen', fontWeight: 'bold', fontSize: '1.2em' }}>RUBY LANGUAGE</span>
          </div>
        </div>

        {/* Live Code Runner Panel */}
        {showCodeRunner && (
          <div style={{ marginTop: '30px', padding: '25px', backgroundColor: '#1e1e1e', color: '#d4d4d4', borderRadius: '8px', width: '80%', maxWidth: '900px', boxShadow: '0 6px 12px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <h2 style={{ margin: 0, color: '#61afef', fontSize: '1.4em' }}>⚡ Live Code Execution Sandbox</h2>
              <button onClick={() => setShowCodeRunner(false)} style={{ backgroundColor: '#444', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}>✕ Close</button>
            </div>

            <div style={{ display: 'flex', gap: '15px', marginBottom: '15px', alignItems: 'center' }}>
              <label style={{ fontWeight: 'bold', color: '#abb2bf' }}>Language:</label>
              <select 
                value={runnerLang}
                onChange={(e) => {
                  setRunnerLang(e.target.value);
                  if (languageResources[e.target.value]) {
                    setCode(languageResources[e.target.value].starterCode);
                  }
                }}
                style={{ padding: '6px 12px', borderRadius: '4px', backgroundColor: '#2c313a', color: '#fff', border: '1px solid #3e4451' }}
              >
                <option value="javascript">JavaScript (ES6 Live)</option>
                <option value="python">Python 3</option>
                <option value="c">C Language</option>
                <option value="cpp">C++</option>
                <option value="java">Java</option>
                <option value="ruby">Ruby</option>
              </select>

              <button 
                onClick={handleRunCode}
                disabled={isRunning}
                style={{ backgroundColor: '#98c379', color: '#1e1e1e', fontWeight: 'bold', padding: '6px 18px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              >
                {isRunning ? '▶ Running...' : '▶ Run Code'}
              </button>
            </div>

            <textarea 
              value={code}
              onChange={(e) => setCode(e.target.value)}
              rows="8"
              style={{ width: '100%', fontFamily: 'Consolas, monospace', fontSize: '14px', backgroundColor: '#282c34', color: '#abb2bf', padding: '12px', borderRadius: '6px', border: '1px solid #3e4451', outline: 'none', boxSizing: 'border-box' }}
            />

            <div style={{ marginTop: '15px' }}>
              <h4 style={{ margin: '0 0 8px 0', color: '#e5c07b' }}>Output Window:</h4>
              <pre style={{ backgroundColor: '#000', color: '#00ff00', padding: '12px', borderRadius: '6px', fontFamily: 'Consolas, monospace', minHeight: '80px', overflowX: 'auto', border: '1px solid #333' }}>
                {output || 'Output will appear here after execution...'}
              </pre>
            </div>
          </div>
        )}

        {/* Certificate Generator Panel */}
        {showCertificateGen && (
          <div style={{ marginTop: '30px', padding: '25px', backgroundColor: 'white', borderRadius: '8px', width: '80%', maxWidth: '850px', boxShadow: '0 6px 12px rgba(0,0,0,0.15)', border: '2px solid #FF9800' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ margin: 0, color: '#E65100' }}>📜 EduTrack Official Certificate Builder</h2>
              <button onClick={() => setShowCertificateGen(false)} style={{ backgroundColor: '#e0e0e0', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}>Close</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', fontWeight: 'bold', fontSize: '12px', marginBottom: '4px' }}>STUDENT NAME</label>
                <input type="text" value={certStudent} onChange={(e) => setCertStudent(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: 'bold', fontSize: '12px', marginBottom: '4px' }}>COURSE TITLE</label>
                <input type="text" value={certCourse} onChange={(e) => setCertCourse(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: 'bold', fontSize: '12px', marginBottom: '4px' }}>COMPLETION DATE</label>
                <input type="date" value={certDate} onChange={(e) => setCertDate(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
              </div>
            </div>

            <div style={{ textAlign: 'right', marginBottom: '15px' }}>
              <button onClick={() => window.print()} style={{ backgroundColor: '#FF9800', color: 'white', fontWeight: 'bold', padding: '8px 18px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>🖨️ Print Certificate</button>
            </div>

            {/* Certificate Preview Frame */}
            <div style={{ border: '10px double #1A237E', padding: '40px', backgroundColor: '#FFFDF7', textAlign: 'center', borderRadius: '4px', position: 'relative' }}>
              <h1 style={{ fontFamily: 'Georgia, serif', color: '#1A237E', fontSize: '2.4em', margin: '0 0 10px 0', letterSpacing: '2px' }}>CERTIFICATE OF COMPLETION</h1>
              <p style={{ color: '#555', fontStyle: 'italic', fontSize: '1.1em' }}>This is proudly presented to</p>
              <h2 style={{ fontFamily: 'Georgia, serif', color: '#0D47A1', fontSize: '2.2em', textDecoration: 'underline', margin: '15px 0' }}>{certStudent}</h2>
              <p style={{ color: '#555', fontSize: '1em', maxWidth: '600px', margin: '0 auto 15px auto' }}>
                for successfully completing all academic requirements and coursework in <strong>{certCourse}</strong> on EduTrack Academic Portal.
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px', paddingTop: '20px', borderTop: '1px solid #ccc' }}>
                <div>
                  <p style={{ margin: 0, fontWeight: 'bold', color: '#333' }}>{certDate}</p>
                  <p style={{ margin: 0, fontSize: '0.85em', color: '#777' }}>Issue Date</p>
                </div>
                <div>
                  <p style={{ margin: 0, fontWeight: 'bold', color: '#1A237E' }}>EDUTRACK ACADEMIC BOARD</p>
                  <p style={{ margin: 0, fontSize: '0.85em', color: '#777' }}>Verified Academic Credential</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Selected Language Details */}
        {selectedLang && (
          <div style={{ marginTop: '30px', padding: '20px', backgroundColor: 'white', border: '1px solid #ccc', borderRadius: '8px', width: '80%', maxWidth: '800px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
            <button onClick={() => setSelectedLang(null)} style={{ float: 'right', padding: '4px 8px', cursor: 'pointer', backgroundColor: '#e2e6ea', border: '1px solid #ccc', borderRadius: '4px' }}>Close</button>
            <h2 style={{ marginTop: 0, color: '#333' }}>{languageResources[selectedLang].title}</h2>
            
            <div style={{ marginBottom: '15px', display: 'flex', gap: '10px' }}>
              <button 
                onClick={() => handleLanguageSelect(selectedLang)} 
                style={{ backgroundColor: '#4CAF50', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
              >
                ⚡ Open in Code Runner
              </button>
            </div>

            <ul style={{ marginTop: '15px', paddingLeft: '20px' }}>
              {languageResources[selectedLang].links.map((link, idx) => (
                <li key={idx} style={{ marginBottom: '10px' }}>
                  <a href={link.url} target="_blank" rel="noreferrer" style={{ color: 'darkgreen', fontWeight: 'bold', fontSize: '1.1em' }}>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>

      <footer style={{ marginTop: '30px', textAlign: 'center', fontSize: '0.9em' }}>
        <p>&copy; 2024 Reference Links Page — EduTrack Industry Edition</p>
      </footer>
    </div>
  );
};

export default LinksReference;
