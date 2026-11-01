// Legalese Learner course. Written for this project.
// This teaches how to read legal phrasing. It is not legal advice, and a
// clause in a real document is read under the law of a particular place.
//
// lesson = { id, title, summary, sections: [{ h?, p, example? }], practice }
// p is HTML. practice items are { q, options, answer, why }.
window.LEGALESE = {
  title: "Reading legalese",
  intro:
    "Legalese is the dialect of contracts, statutes and court papers: ordinary ideas written with a small set of heavy words. Those words have jobs. <em>Shall</em>, <em>notwithstanding</em> and <em>hereinafter</em> are not decoration. These lessons teach the jobs, using short clauses written for the Desk. They are not advice about your own contract, and they are not the law of any one country. When a real document matters, a lawyer qualified where it applies is the person who reads it for you.",
  lessons: [
    {
      id: "what-it-is",
      title: "What the words are doing",
      summary: "Operative terms, recitals, and defined terms.",
      sections: [
        {
          p: "A contract is usually two layers. The opening <b>recitals</b> (often starting with <em>Whereas</em>) say why the parties are signing. They set the scene. The <b>operative terms</b> that follow are the promises: who must do what. If a recital and an operative term disagree, the operative term is the one that binds, unless the document says otherwise.",
        },
        {
          h: "Capital letters are a pointer",
          p: "A capitalised phrase such as <em>Delivery Date</em> or <em>the Goods</em> is usually a <b>defined term</b>. It does not mean “any goods”. It means whatever the definitions clause says it means, and that meaning is used every time the capitalised words appear.",
          example: "“Delivery Date” means 1 March 2026.",
        },
        {
          h: "And / or",
          p: "<em>And/or</em> tries to mean “one, or the other, or both”. Readers and courts have treated it as “and”, as “or”, and as unclear. Careful drafting picks <em>and</em> or <em>or</em>, or writes “A or B or both”.",
        },
      ],
      practice: [
        { q: "What is a recital for?", options: ["Background, often under Whereas", "The promise that can be enforced", "A definition of a capitalised term", "The signature block"], answer: "Background, often under Whereas", why: "Recitals explain the setting. The operative clauses are the promises." },
        { q: "If a Whereas clause and an operative clause conflict, which one ordinarily wins?", options: ["The operative clause", "The Whereas clause", "Whichever is longer", "Neither; the contract is void"], answer: "The operative clause", why: "Recitals are scene-setting. The operative terms are what the parties undertake, unless the contract says the recitals control." },
        { q: "What does a capitalised Delivery Date usually mean?", options: ["The date given in the definitions, every time the words appear", "Whatever date the reader thinks is reasonable", "The date the document was signed", "Any date in March"], answer: "The date given in the definitions, every time the words appear", why: "Defined terms are labels. The definition, not the everyday meaning, travels with the capital letters." },
        { q: "Why do drafting guides dislike and/or?", options: ["It can be read as and, as or, or as unclear", "It is always read as both", "It is not a real English word, so it is ignored", "It means neither"], answer: "It can be read as and, as or, or as unclear", why: "The slash tries to keep every option open and ends up leaving the choice to the reader." },
        { q: "Which part of a contract states the promises?", options: ["The operative terms", "The title", "The recitals alone", "The page numbers"], answer: "The operative terms", why: "That is the layer that says who must do what." },
      ],
    },
    {
      id: "shall-may",
      title: "Shall, must, will and may",
      summary: "Duty, permission, and the future.",
      sections: [
        {
          p: "In traditional drafting, <b>shall</b> imposes a duty: <em>The Supplier shall deliver</em> means the Supplier is obliged to deliver. <b>May</b> is permission or discretion: <em>The Buyer may inspect</em> means the Buyer is allowed to, not obliged to. <b>Will</b> is often a future fact, or a promise written in ordinary English, rather than the old word of obligation.",
        },
        {
          h: "Why shall is slippery",
          p: "Courts have sometimes read <em>shall</em> as <em>must</em>, sometimes as <em>may</em>, and sometimes as a mere future. Plain-language guides (including the US Federal Plain Language Guidelines, and Bryan Garner's usage writing) prefer <b>must</b> for a duty, <b>may</b> for a choice, and <b>will</b> for the future, and they tell drafters to retire <em>shall</em>. Older contracts are full of it anyway, so you still have to recognise it.",
          example: "The Supplier shall deliver the Goods on the Delivery Date. The Buyer may reject goods that do not match the Sample.",
        },
        {
          h: "Must not, and shall not",
          p: "<em>Shall not</em> and <em>must not</em> forbid. <em>The Buyer shall not copy the drawings</em> is a prohibition, not a lack of permission politely expressed.",
        },
      ],
      practice: [
        { q: "In traditional drafting, what does “The Supplier shall deliver” impose?", options: ["A duty on the Supplier", "Permission for the Supplier", "A duty on the Buyer", "A recital"], answer: "A duty on the Supplier", why: "Shall, used carefully, marks an obligation of the person named as the subject." },
        { q: "What does “The Buyer may inspect” give the Buyer?", options: ["A choice, not a duty", "A duty to inspect", "A prohibition", "A definition of inspect"], answer: "A choice, not a duty", why: "May permits. It does not require. The Buyer can inspect and can also skip it." },
        { q: "Why do plain-language guides prefer must over shall for a duty?", options: ["Shall has been read as must, as may, and as a mere future", "Must is older", "Shall is not English", "Must applies only to criminal law"], answer: "Shall has been read as must, as may, and as a mere future", why: "The word became too flexible. Must is harder to mistake for permission." },
        { q: "What is “The Buyer shall not copy the drawings”?", options: ["A prohibition", "Permission to copy", "A definition of drawings", "A recital"], answer: "A prohibition", why: "Shall not forbids the act. It is the negative of a duty." },
        { q: "In modern plain drafting, which word marks a future fact rather than a duty?", options: ["will", "shall", "must not", "notwithstanding"], answer: "will", why: "Will is kept for what will happen. Must (or a clean shall) is kept for what someone is obliged to do." },
      ],
    },
    {
      id: "pointers",
      title: "Herein, thereof, hereinafter",
      summary: "Words that point at this document.",
      sections: [
        {
          p: "The <em>-here</em> and <em>-there</em> family are pointers. <b>Herein</b> means “in this document”. <b>Hereof</b> means “of this document”. <b>Hereto</b> means “to this document”. <b>Hereby</b> means “by this document” — the sentence itself is the act, as in <em>the Buyer hereby assigns</em>.",
        },
        {
          h: "There",
          p: "The <em>there-</em> forms point at something already mentioned, not at the whole document. <b>Thereof</b> means “of that”. <b>Therein</b> means “in that”. <b>Thereunder</b> means “under that” (under that clause or that agreement).",
          example: "The Buyer shall pay the Price thereof.",
        },
        {
          h: "Hereinafter",
          p: "<b>Hereinafter</b> means “later in this document”. It introduces a short label: <em>Northwind Trading Ltd (hereinafter “the Supplier”)</em>. After that, <em>the Supplier</em> is that company. <b>Hereinabove</b> and <b>hereinbelow</b> mean earlier and later on the page. They are easy to replace with “above” and “below”, or with a clause number.",
        },
      ],
      practice: [
        { q: "What does herein point at?", options: ["This document", "The previous noun only", "A document signed last year", "The courthouse"], answer: "This document", why: "Here- means this instrument. Herein is “in this document”." },
        { q: "In “pay the Price thereof”, what does thereof attach to?", options: ["The thing just mentioned, whose price it is", "This whole contract, always", "The court", "The date of signature"], answer: "The thing just mentioned, whose price it is", why: "There- points backward at an antecedent. Thereof is “of that”." },
        { q: "What is hereinafter doing in “Ada Blake (hereinafter ‘the Author’)”?", options: ["Giving Ada Blake a short name for the rest of the document", "Saying Ada Blake signed above", "Cancelling Ada Blake’s obligations", "Defining a date"], answer: "Giving Ada Blake a short name for the rest of the document", why: "Hereinafter means “from here on in this document”. The nickname is a defined term." },
        { q: "What does hereby claim in “the Buyer hereby assigns the copyright”?", options: ["That this sentence is the act of assigning", "That the assignment happened last year", "That the assignment is optional", "That a recital is starting"], answer: "That this sentence is the act of assigning", why: "Hereby means “by this document” or “by these words”. The clause does the thing it describes." },
        { q: "Which pair matches?", options: ["hereinabove = earlier in this document; therein = in that thing", "herein = in that thing; thereof = in this document", "hereby = later; hereinafter = by this act", "thereto = of this document; hereof = to that thing"], answer: "hereinabove = earlier in this document; therein = in that thing", why: "Here- is this document. There- is the antecedent. Above and below are position; in, of and to are the relation." },
      ],
    },
    {
      id: "overrides",
      title: "Notwithstanding, subject to, provided that",
      summary: "Which sentence wins.",
      sections: [
        {
          p: "These three tell you how clauses rank. <b>Notwithstanding</b> X means “despite X”: this sentence wins over X. <b>Subject to</b> X means the opposite: this sentence yields to X. <b>Provided that</b> adds a condition or a cut-back. It often means “but only if” or “except that”.",
          example: "Subject to clause 4, the Supplier shall deliver the Goods on the Delivery Date, notwithstanding any delay in the Buyer's inspection, provided that the Buyer has paid the Deposit.",
        },
        {
          h: "Reading that sentence",
          p: "Three signals are stacked, which is exactly how these words earn their reputation. The ordinary reading is: the Supplier has a duty to deliver on the Delivery Date; a late inspection does not excuse that duty (<em>notwithstanding</em>); the duty is conditional on the Deposit having been paid (<em>provided that</em>); and if clause 4 says something else, clause 4 wins (<em>subject to</em>). A real dispute about the stack is for a lawyer, because the words can be argued. The lesson is to notice that they are not synonyms.",
        },
        {
          h: "Including, but not limited to",
          p: "<em>Including</em> introduces examples. <em>Including without limitation</em> and <em>including but not limited to</em> say the list is not closed. <em>Vehicles, including cars,</em> might be read as only cars. <em>Vehicles, including without limitation cars and bicycles,</em> is an attempt to keep scooters inside “vehicles” too.",
        },
      ],
      practice: [
        { q: "What does notwithstanding clause 4 say about this sentence?", options: ["This sentence wins even if clause 4 conflicts", "This sentence yields to clause 4", "Clause 4 is deleted", "Clause 4 is a definition"], answer: "This sentence wins even if clause 4 conflicts", why: "Notwithstanding means despite. The clause you are reading overrides the thing named." },
        { q: "What does subject to clause 4 say?", options: ["This sentence yields to clause 4", "This sentence overrides clause 4", "Clause 4 is a recital", "Clause 4 is optional reading"], answer: "This sentence yields to clause 4", why: "Subject to is the inverse of notwithstanding. The named clause controls." },
        { q: "In the sample delivery sentence, what does provided that the Deposit has been paid do?", options: ["Makes payment of the Deposit a condition of the duty to deliver", "Deletes the Delivery Date", "Lets the Buyer skip the Deposit", "Defines Deposit as the Goods"], answer: "Makes payment of the Deposit a condition of the duty to deliver", why: "Provided that cuts the promise back. On the ordinary reading, delivery is due only if the Deposit was paid." },
        { q: "Why is “including without limitation” added to a list?", options: ["To say the list is examples, not a closed set", "To limit the list to the named items", "To delete the items named", "To make the list a definition of a capitalised term"], answer: "To say the list is examples, not a closed set", why: "Without the extra words, some readers treat the list as exhaustive. The phrase is there to resist that reading." },
        { q: "Which word yields, and which word overrides?", options: ["Subject to yields; notwithstanding overrides", "Notwithstanding yields; subject to overrides", "Both override", "Both only add examples"], answer: "Subject to yields; notwithstanding overrides", why: "They are opposites. Mixing them up reverses who wins." },
      ],
    },
    {
      id: "bargain",
      title: "Parties, consideration, indemnity",
      summary: "Who is bound, and what was exchanged.",
      sections: [
        {
          p: "A <b>party</b> is a person or organisation the document binds. Everyone else is a <b>third party</b>. In the common-law tradition a promise is generally enforceable as a contract only if something was exchanged for it. That something is <b>consideration</b>: a payment, a return promise, or a giving-up. A one-sided gift promise may be unenforceable for want of consideration. Civil-law systems do not all use that idea. This is a vocabulary lesson, not a map of every legal system.",
          example: "In consideration of the Price, the Supplier shall deliver the Goods.",
        },
        {
          h: "Represents and warrants",
          p: "A <b>representation</b> is a statement of present fact meant to be relied on (“the car has done 40,000 miles”). A <b>warranty</b> is a promise that a fact is or will be true, often tied to a remedy if it is not. English and US contracts very often glue them together as <em>represents and warrants</em>, so that both sets of remedies are in play. They are not quite the same word.",
        },
        {
          h: "Indemnify",
          p: "<b>Indemnify</b> means to pay the other party for specified losses, so they come out whole. <em>The Supplier shall indemnify the Buyer against claims by third parties arising out of defects in the Goods</em> is a promise to cover those claims, not a promise that no claim will ever be made.",
        },
      ],
      practice: [
        { q: "Who is a party?", options: ["A person or organisation the document binds", "Anyone who reads the document", "Only the lawyer who drafted it", "Only a human, never a company"], answer: "A person or organisation the document binds", why: "Parties are the ones who take on the obligations. A company can be a party." },
        { q: "What is consideration, in the common-law sense?", options: ["What was exchanged for the promise", "Polite wording", "The recital", "The lawyer’s fee for reading the contract"], answer: "What was exchanged for the promise", why: "Consideration is the bargained-for exchange. Without it, a bare promise may not be a contract in common-law systems." },
        { q: "What does “in consideration of the Price, the Supplier shall deliver” link?", options: ["The duty to deliver, to the payment", "A recital, to a definition", "A permission, to a prohibition", "The signature, to the date"], answer: "The duty to deliver, to the payment", why: "The Price is what is given for the promise to deliver. That is the bargain the sentence is naming." },
        { q: "How does a representation differ from a warranty, before they get glued together?", options: ["A representation is a statement of fact; a warranty is a contractual promise about a fact", "They are the same word", "A warranty is always criminal", "A representation is a signature"], answer: "A representation is a statement of fact; a warranty is a contractual promise about a fact", why: "The remedies differ. Pairing them as “represents and warrants” is a drafter trying to keep both." },
        { q: "What does indemnify ask the promisor to do?", options: ["Cover specified losses so the other party is made whole", "Admit liability in court", "Delete the contract", "Inspect the goods"], answer: "Cover specified losses so the other party is made whole", why: "An indemnity is a pay-the-loss promise. It is not itself a finding that anyone was at fault." },
      ],
    },
    {
      id: "boilerplate",
      title: "The clauses at the back",
      summary: "Entire agreement, severability, governing law, force majeure.",
      sections: [
        {
          p: "The last pages are often called boilerplate, which makes them sound unimportant. They decide what counts as the contract and what happens when a piece of it fails.",
        },
        {
          h: "Entire agreement",
          p: "An <b>entire agreement</b> clause (an integration clause) says this document is the whole deal. Earlier emails, conversations and drafts are not extra terms. It is aimed at stopping a side promise from being added later. It does not usually wipe out liability for fraud.",
          example: "This Agreement constitutes the entire agreement between the parties and supersedes all prior discussions relating to its subject matter.",
        },
        {
          h: "Severability, law, and force majeure",
          p: "<b>Severability</b>: if one clause is illegal or unenforceable, the rest stays. <b>Governing law</b>: which place’s law is used to read the contract. <b>Force majeure</b>: a listed kind of event outside the parties’ control (war, earthquake, a named kind of shutdown) that excuses or suspends a duty. It covers what the clause lists, not every inconvenience.",
        },
      ],
      practice: [
        { q: "What is an entire-agreement clause trying to do?", options: ["Make this document the whole deal, so earlier talks are not extra terms", "Promise that every recital is true", "Choose the court", "Set the price"], answer: "Make this document the whole deal, so earlier talks are not extra terms", why: "It integrates the bargain into the signed pages. Side conversations drop out as terms, though fraud is a separate question." },
        { q: "What does a severability clause save?", options: ["The rest of the contract, if one clause fails", "The failing clause", "The recitals only", "The lawyer’s notes"], answer: "The rest of the contract, if one clause fails", why: "Sever means cut away. The bad clause is cut away and the remainder stands." },
        { q: "What does a governing-law clause choose?", options: ["Which place’s law is used to read the contract", "Which language the contract is written in", "Which party pays", "Which defined term wins"], answer: "Which place’s law is used to read the contract", why: "The same English words can be read differently in different legal systems. The clause picks the system." },
        { q: "What does force majeure excuse?", options: ["A duty, when an event of the kind the clause lists is beyond the parties’ control", "Every late delivery", "The price", "The signatures"], answer: "A duty, when an event of the kind the clause lists is beyond the parties’ control", why: "It is not a general “this was hard” excuse. The event has to fit the clause." },
        { q: "Why is boilerplate worth reading?", options: ["It decides what counts as the contract and what survives a broken clause", "It is always identical and can be skipped", "It is only the table of contents", "It repeats the recitals"], answer: "It decides what counts as the contract and what survives a broken clause", why: "The nickname suggests filler. Entire agreement, severability, governing law and force majeure are operative terms." },
      ],
    },
  ],
};
