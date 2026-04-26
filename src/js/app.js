// Date
(function(){
  var d = new Date();
  var el = document.getElementById('todayDate');
  if (el) el.textContent = d.toLocaleDateString('en-GB', { weekday:'long', day:'numeric', month:'long', year:'numeric' });
})();

// Drawer toggle
function toggleDrawer() {
  document.getElementById('drawer').classList.toggle('open');
  document.getElementById('drawerOverlay').classList.toggle('open');
}

// Random trivia (homepage)
var TRIVIA = [
  "Article 21 of the Indian Constitution guarantees the Right to Life — expanded by the Supreme Court to include the right to live with dignity, privacy, clean environment, and even the right to sleep.",
  "India's Constitution is the longest written constitution in the world, with 395 Articles (originally) and 12 Schedules.",
  "The first woman judge of the Supreme Court of India was Justice M. Fathima Beevi, appointed in 1989.",
  "India has over 5 crore pending cases across all courts — which is why ADR mechanisms like Lok Adalat and arbitration are so critical.",
  "The word 'secular' and 'socialist' were added to the Preamble by the 42nd Amendment in 1976.",
  "Lok Adalat awards are final and binding — there is no appeal against them in any court.",
  "Dr. B.R. Ambedkar called Article 32 (Right to Constitutional Remedies) the 'heart and soul' of the Constitution.",
  "Section 138 of the Negotiable Instruments Act (cheque bounce) is one of the most common cases settled in Lok Adalats."
];
var triviaEl = document.getElementById('triviaText');
if (triviaEl) triviaEl.textContent = TRIVIA[Math.floor(Math.random() * TRIVIA.length)];
