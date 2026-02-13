import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Database, 
  FlaskConical, 
  Search, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft,
  Info,
  Laptop,
  MessageSquare,
  BarChart3,
  X,
  BookMarked,
  Send,
  Trophy
} from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('intro');
  const [progress, setProgress] = useState(0);
  const [quizScores, setQuizScores] = useState({});
  const [isGlossaryOpen, setIsGlossaryOpen] = useState(false);
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const [labNotes, setLabNotes] = useState({
    cocaFreq: '',
    bncFreq: '',
    observations: '',
    cocaDesign: '',
    bncDesign: ''
  });

  const glossary = {
    "Empirical": "Based on, concerned with, or verifiable by observation or experience rather than theory or pure logic.",
    "Lemma": "The base or dictionary form of a word. For example, 'go', 'goes', 'going', and 'went' all belong to the lemma [go].",
    "Diachronic": "Studying the development and evolution of a language through different periods of history.",
    "Synchronic": "Studying a language at a specific point in time (usually the present) without considering its history.",
    "Lexicographer": "A person who compiles dictionaries.",
    "Metadata": "A set of data that describes and gives information about other data (e.g., who spoke, where they were from, and their age).",
    "Collocation": "The habitual juxtaposition of a particular word with another word or words with a frequency greater than chance (e.g., 'heavy rain').",
    "Performance": "The actual use of language in concrete situations (which might include slips of the tongue).",
    "Competence": "The unconscious knowledge of grammar and rules that allows a speaker to use a language."
  };

  const sections = [
    { id: 'intro', title: 'What is a Corpus?', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'debate', title: 'The Big Debate', icon: <MessageSquare className="w-5 h-5" /> },
    { id: 'methods', title: 'Research Methods', icon: <FlaskConical className="w-5 h-5" /> },
    { id: 'lab', title: 'Lab Exercise', icon: <Laptop className="w-5 h-5" /> },
  ];

  useEffect(() => {
    const index = sections.findIndex(s => s.id === activeTab);
    setProgress(((index + 1) / sections.length) * 100);
  }, [activeTab]);

  const handleQuiz = (id, isCorrect) => {
    setQuizScores(prev => ({ ...prev, [id]: isCorrect }));
  };

  const openGlossary = (term) => {
    setSelectedTerm(term);
    setIsGlossaryOpen(true);
  };

  const handleSubmitLab = () => {
    if (!labNotes.cocaFreq || !labNotes.bncFreq || !labNotes.cocaDesign || !labNotes.bncDesign) {
      alert("Please fill out the frequency data and classifications before submitting!");
      return;
    }
    setIsSubmitted(true);
  };

  // Helper component for glossary terms
  const Term = ({ children }) => (
    <button 
      onClick={() => openGlossary(children)}
      className="text-indigo-600 font-semibold border-b-2 border-indigo-200 hover:border-indigo-600 transition-all px-0.5"
    >
      {children}
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-24">
      {/* Sticky Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 px-6 py-4 shadow-sm">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-lg text-white">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight">Corpus Linguistics</h1>
              <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Chapter 1: Foundations</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => {setSelectedTerm(null); setIsGlossaryOpen(true);}}
              className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
            >
              <BookMarked className="w-4 h-4" /> Glossary
            </button>
            <div className="hidden md:flex gap-2 ml-4 border-l pl-4 border-slate-200">
              {sections.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setActiveTab(s.id)}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    activeTab === s.id ? 'bg-indigo-100 text-indigo-700' : 'text-slate-500 hover:bg-slate-100'
                  }`}
                >
                  {s.title}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="max-w-4xl mx-auto mt-4">
          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-indigo-500 transition-all duration-500 ease-out" 
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Intro Section */}
        {activeTab === 'intro' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
              <h2 className="text-3xl font-bold mb-6 text-slate-800 flex items-center gap-3">
                <BookOpen className="text-indigo-600" /> What is a Corpus?
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                The word <span className="text-indigo-600 font-bold italic">corpus</span> comes from Latin and means "body." 
                In linguistics, it refers to a massive, digital collection of real-world language samples. 
                Think of it as a searchable "language library."
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mt-10">
                <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
                  <h3 className="font-bold text-indigo-700 mb-3 uppercase text-xs tracking-widest">The Rationalist Way</h3>
                  <p className="text-sm">Relying on your own "gut feeling" or intuition to decide if a sentence is correct.</p>
                </div>
                <div className="p-6 bg-indigo-50 rounded-xl border border-indigo-100">
                  <h3 className="font-bold text-indigo-700 mb-3 uppercase text-xs tracking-widest">The Empirical Way</h3>
                  <p className="text-sm font-medium text-indigo-900">Looking at external data (the corpus) to see how people <span className="underline decoration-indigo-300">actually</span> use the language.</p>
                </div>
              </div>
            </section>

            <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-xl flex gap-4">
              <Info className="text-amber-500 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-amber-800 mb-1">Key Term: Empirical</p>
                <p className="text-sm text-amber-700 leading-snug">
                  Corpus linguistics is an <Term>Empirical</Term> science because it is based on facts and data from the outside world, not just guesses.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Debate Section */}
        {activeTab === 'debate' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h2 className="text-3xl font-bold text-slate-800 mb-2">Chomsky vs. Corpora</h2>
            <p className="text-slate-600 mb-8">Noam Chomsky famously argued against corpus linguistics in the 1950s. Here is his challenge and the modern response.</p>
            
            <div className="grid gap-6">
              {[
                {
                  challenge: "Performance vs. Competence",
                  text: "People make slips of the tongue. Why record mistakes when we want to know the 'perfect' rules in the head?",
                  response: "Scale changes everything. By looking at 100 million words, we can filter out one-time errors to find real, massive patterns.",
                  terms: ["Performance", "Competence"]
                },
                {
                  challenge: "Representativeness",
                  text: "A corpus can't include every sentence possible. It's just a tiny sample.",
                  response: "Computing power now allows us to build 'Monitor Corpora' with billions of words—effectively a giant mirror of a whole language."
                }
              ].map((item, idx) => (
                <div key={idx} className="bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col md:flex-row shadow-sm">
                  <div className="p-8 bg-slate-900 text-white md:w-1/2">
                    <span className="text-xs font-bold text-indigo-400 uppercase mb-2 block tracking-widest">Chomsky's Doubt</span>
                    <h4 className="text-xl font-bold mb-4">{item.challenge}</h4>
                    <p className="text-slate-300 leading-relaxed italic">"{item.text}"</p>
                  </div>
                  <div className="p-8 md:w-1/2 bg-white">
                    <span className="text-xs font-bold text-emerald-500 uppercase mb-2 block tracking-widest text-right">Modern Answer</span>
                    <div className="text-slate-700 leading-relaxed pt-6 border-t border-slate-100">
                      {item.challenge === "Performance vs. Competence" ? (
                        <>Scale changes everything. By looking at 100 million words, we can filter out one-time errors (<Term>Performance</Term>) to find the real, massive rules of language (<Term>Competence</Term>).</>
                      ) : (
                        item.response
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Methods Section */}
        {activeTab === 'methods' && (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <section>
              <h2 className="text-3xl font-bold mb-8">Research Methods</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 mb-4 font-bold">Qn</div>
                    <h4 className="font-bold text-lg mb-2">Quantitative</h4>
                    <p className="text-sm text-slate-600">Focuses on numbers and stats. "How many times per million does 'love' appear?"</p>
                  </div>
                  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600 mb-4 font-bold">Ql</div>
                    <h4 className="font-bold text-lg mb-2">Qualitative</h4>
                    <p className="text-sm text-slate-600">Focuses on detail. "Why did this specific <Term>Lexicographer</Term> use this phrase here?"</p>
                  </div>
                </div>
                
                <div className="bg-indigo-900 rounded-2xl p-8 text-white flex flex-col justify-center">
                  <BarChart3 className="w-12 h-12 text-indigo-400 mb-4" />
                  <h4 className="text-2xl font-bold mb-4 leading-tight text-white">Corpus vs. Experiment</h4>
                  <p className="text-indigo-100 opacity-90 leading-relaxed">
                    Corpora observe language in its <span className="font-bold text-white">natural state</span>. Experiments <span className="font-bold text-white">manipulate</span> the world to see what changes.
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-slate-900 text-white rounded-2xl p-8">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <CheckCircle2 className="text-emerald-400" /> Knowledge Check
                </h3>
                <div className="space-y-6">
                    <div>
                        <p className="text-slate-300 mb-4">If you want to study how "awesome" changed from 1920 to 2020, you need a:</p>
                        <div className="flex flex-wrap gap-3">
                            <button 
                                onClick={() => handleQuiz('q1', false)}
                                className={`px-4 py-2 rounded-full border border-slate-700 text-sm transition-all ${quizScores.q1 === false ? 'bg-red-500/20 border-red-500' : 'hover:bg-slate-800'}`}
                            >Synchronic Corpus</button>
                            <button 
                                onClick={() => handleQuiz('q1', true)}
                                className={`px-4 py-2 rounded-full border border-slate-700 text-sm transition-all ${quizScores.q1 === true ? 'bg-emerald-500 border-emerald-500' : 'hover:bg-slate-800'}`}
                            >Diachronic Corpus</button>
                        </div>
                        {quizScores.q1 === true && <p className="text-emerald-400 text-sm mt-2">Correct! <Term>Diachronic</Term> = Across time.</p>}
                    </div>
                </div>
            </section>
          </div>
        )}

        {/* Lab Section */}
        {activeTab === 'lab' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <header className="mb-10">
              <h2 className="text-3xl font-bold mb-4">Lab: Exploring Interfaces</h2>
              <p className="text-slate-600">Compare American vs. British English using real-world databases.</p>
            </header>

            {isSubmitted ? (
                <div className="bg-emerald-50 border border-emerald-200 p-12 rounded-3xl text-center space-y-6 animate-in zoom-in duration-500">
                    <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                        <Trophy className="w-10 h-10" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-emerald-900">Lab Exercise Complete!</h3>
                        <p className="text-emerald-700 mt-2">Your findings have been saved to your digital notebook.</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-emerald-100 text-left text-sm max-w-md mx-auto space-y-2">
                        <p><strong>COCA Frequency:</strong> {labNotes.cocaFreq}</p>
                        <p><strong>BNC Frequency:</strong> {labNotes.bncFreq}</p>
                        <p><strong>Classification:</strong> {labNotes.cocaDesign} vs {labNotes.bncDesign}</p>
                    </div>
                    <button 
                        onClick={() => setIsSubmitted(false)}
                        className="text-emerald-600 text-sm font-semibold hover:underline"
                    >
                        Edit results
                    </button>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative">
                            <span className="absolute -top-3 left-6 bg-indigo-600 text-white px-3 py-1 text-xs font-bold rounded-full">STEP 1</span>
                            <h4 className="font-bold text-indigo-700 mb-2 mt-2">COCA Search</h4>
                            <p className="text-sm text-slate-500 mb-4">Search the <Term>Lemma</Term> <code className="bg-slate-100 px-1 rounded">[movie]</code> in the Contemporary American corpus.</p>
                            <input 
                                type="text"
                                placeholder="Frequency per million"
                                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                                value={labNotes.cocaFreq}
                                onChange={(e) => setLabNotes({...labNotes, cocaFreq: e.target.value})}
                            />
                        </div>
                        
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative">
                            <span className="absolute -top-3 left-6 bg-slate-600 text-white px-3 py-1 text-xs font-bold rounded-full">STEP 2</span>
                            <h4 className="font-bold text-slate-700 mb-2 mt-2">BNC Search</h4>
                            <p className="text-sm text-slate-500 mb-4">Search <code className="bg-slate-100 px-1 rounded">movie</code> in the British National Corpus.</p>
                            <input 
                                type="text"
                                placeholder="Normalized Frequency (per million)"
                                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-slate-500 outline-none"
                                value={labNotes.bncFreq}
                                onChange={(e) => setLabNotes({...labNotes, bncFreq: e.target.value})}
                            />
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
                        <h4 className="font-bold mb-4 flex items-center gap-2 underline decoration-indigo-200 underline-offset-4">
                            <Search className="w-4 h-4 text-slate-400" /> Digital Lab Notebook
                        </h4>
                        <textarea 
                            className="w-full flex-1 p-4 bg-slate-50 rounded-xl text-sm border-none focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                            placeholder="Write your observations here..."
                            value={labNotes.observations}
                            onChange={(e) => setLabNotes({...labNotes, observations: e.target.value})}
                        />
                        <div className="mt-6 p-4 bg-indigo-50 rounded-lg mb-6">
                            <p className="text-xs font-bold text-indigo-800 uppercase mb-3">Classification Task</p>
                            <div className="flex gap-4">
                                <label className="text-xs text-indigo-900 flex-1">
                                    COCA:
                                    <select 
                                        className="w-full mt-1 bg-white border border-indigo-200 rounded p-1"
                                        value={labNotes.cocaDesign}
                                        onChange={(e) => setLabNotes({...labNotes, cocaDesign: e.target.value})}
                                    >
                                        <option value="">Select...</option>
                                        <option value="Monitor">Monitor (Open)</option>
                                        <option value="Sample">Sample (Closed)</option>
                                    </select>
                                </label>
                                <label className="text-xs text-indigo-900 flex-1">
                                    BNC:
                                    <select 
                                        className="w-full mt-1 bg-white border border-indigo-200 rounded p-1"
                                        value={labNotes.bncDesign}
                                        onChange={(e) => setLabNotes({...labNotes, bncDesign: e.target.value})}
                                    >
                                        <option value="">Select...</option>
                                        <option value="Monitor">Monitor (Open)</option>
                                        <option value="Sample">Sample (Closed)</option>
                                    </select>
                                </label>
                            </div>
                        </div>
                        <button 
                            onClick={handleSubmitLab}
                            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-200"
                        >
                            <Send className="w-4 h-4" /> Submit Lab Results
                        </button>
                    </div>
                </div>
            )}
          </div>
        )}
      </main>

      {/* Glossary Modal */}
      {isGlossaryOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsGlossaryOpen(false)} />
          <div className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="bg-indigo-600 p-6 text-white flex justify-between items-start">
              <div className="flex items-center gap-3">
                <BookMarked className="w-6 h-6" />
                <h3 className="text-xl font-bold italic">Glossary</h3>
              </div>
              <button onClick={() => setIsGlossaryOpen(false)} className="bg-white/20 hover:bg-white/30 p-1 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-8">
              {selectedTerm ? (
                <div>
                  <h4 className="text-2xl font-bold text-slate-900 mb-2">{selectedTerm}</h4>
                  <p className="text-slate-600 leading-relaxed text-lg">{glossary[selectedTerm]}</p>
                  <button 
                    onClick={() => setSelectedTerm(null)}
                    className="mt-6 text-sm font-semibold text-indigo-600 hover:text-indigo-800"
                  >
                    ← Back to full list
                  </button>
                </div>
              ) : (
                <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                  {Object.entries(glossary).map(([term, def]) => (
                    <button 
                      key={term}
                      onClick={() => setSelectedTerm(term)}
                      className="w-full text-left p-4 rounded-xl border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50 transition-all group"
                    >
                      <h5 className="font-bold text-slate-800 group-hover:text-indigo-700">{term}</h5>
                      <p className="text-sm text-slate-500 line-clamp-1">{def}</p>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Fixed Bottom Navigation */}
      <nav className="fixed bottom-0 w-full bg-white border-t border-slate-200 px-6 py-4 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        <div className="max-w-4xl mx-auto flex justify-between">
          <button 
            disabled={activeTab === 'intro'}
            onClick={() => {
                const idx = sections.findIndex(s => s.id === activeTab);
                setActiveTab(sections[idx - 1].id);
            }}
            className="flex items-center gap-2 text-sm font-semibold text-slate-600 disabled:opacity-30 px-4 py-2 rounded-lg hover:bg-slate-50 transition-all"
          >
            <ChevronLeft className="w-4 h-4" /> Previous
          </button>
          
          <button 
            disabled={activeTab === 'lab'}
            onClick={() => {
                const idx = sections.findIndex(s => s.id === activeTab);
                setActiveTab(sections[idx + 1].id);
            }}
            className="flex items-center gap-2 bg-slate-900 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-600 transition-all disabled:opacity-30"
          >
            Next Section <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </nav>
    </div>
  );
};

export default App;

