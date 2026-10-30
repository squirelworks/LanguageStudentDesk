// Z80 assembly course for the Programming Learner. Written for this project.
// Schema: see data/python.js.
window.PROGRAMMING = window.PROGRAMMING || {};
window.PROGRAMMING.z80 = {
  id: "z80",
  name: "Z80 Assembly",
  title: "Z80 assembly, register by register",
  intro:
    "The Zilog Z80 is an 8-bit processor from 1976 that powered the ZX Spectrum, MSX computers, the TRS-80, CP/M business machines and the Game Boy's close cousin. Assembly language is a readable spelling of the processor's own instructions, so every line does one small, exact thing. Assemblers such as SjASMPlus or z80asm turn it into bytes, and emulators such as Fuse (Spectrum) or openMSX let you watch it run.",
  comment: ";",
  caseInsensitive: true,
  keywords: [
    "LD", "PUSH", "POP", "EX", "EXX", "ADD", "ADC", "SUB", "SBC", "AND", "OR", "XOR", "CP", "INC", "DEC", "JP", "JR", "DJNZ", "CALL",
    "RET", "RST", "NOP", "HALT", "DI", "EI", "IN", "OUT", "RLA", "RRA", "RLCA", "RRCA", "SLA", "SRA", "SRL", "BIT", "SET", "RES",
    "NEG", "CPL", "LDIR", "ORG", "EQU", "DB", "DW", "DEFB", "DEFW",
  ],
  builtins: ["A", "B", "C", "D", "E", "H", "L", "F", "AF", "BC", "DE", "HL", "IX", "IY", "SP", "PC", "NZ", "Z", "NC", "PO", "PE", "P", "M"],
  lessons: [
    {
      id: "registers",
      title: "Registers and LD",
      summary: "The processor's own tiny variables, and moving data between them.",
      sections: [
        {
          p: "The Z80 has a handful of 8-bit <b>registers</b>: <code>A</code> (the accumulator, where most arithmetic happens), <code>B</code>, <code>C</code>, <code>D</code>, <code>E</code>, <code>H</code> and <code>L</code>. They pair up into 16-bit registers <code>BC</code>, <code>DE</code> and <code>HL</code>, which usually hold addresses. 8 bits hold 0–255; 16 bits hold 0–65535, the whole memory map.",
        },
        {
          h: "LD copies",
          p: "<code>LD destination, source</code> copies a value. Brackets mean “the memory at this address”.",
          code: `        LD   A, 5        ; A = 5
        LD   B, A        ; B = 5 too
        LD   HL, 8000h   ; HL = address 8000 (hex)
        LD   (HL), A     ; memory[8000h] = 5
        LD   A, (HL)     ; A = memory[8000h]`,
        },
        {
          h: "Arithmetic",
          p: "<code>ADD A, x</code> and <code>SUB x</code> work on the accumulator. <code>INC</code> and <code>DEC</code> add or take one from any register. Values wrap around: 255 + 1 is 0 in an 8-bit register.",
          code: `        LD   A, 10
        ADD  A, 7        ; A = 17
        SUB  2           ; A = 15
        INC  A           ; A = 16
        LD   A, 255
        INC  A           ; A = 0, and the Zero flag is set`,
        },
      ],
      practice: [
        { q: "After LD A, 5 then INC A, what is in A?", options: ["6", "5", "4", "0"], answer: "6", why: "INC adds one to the register." },
        { q: "What does LD (HL), A do?", options: ["Stores A into memory at the address in HL", "Copies HL into A", "Loads A from address HL", "Adds A to HL"], answer: "Stores A into memory at the address in HL", why: "The destination comes first, and brackets mean memory at that address." },
        { q: "A holds 255. What is A after INC A?", options: ["0", "256", "255", "1"], answer: "0", why: "An 8-bit register wraps around from 255 to 0." },
        { q: "Which register pair is most often used as a memory pointer?", options: ["HL", "AF", "BC only", "PC"], answer: "HL", why: "HL is the main address register: (HL) works with almost every instruction." },
      ],
    },
    {
      id: "flow",
      title: "Flags, jumps and loops",
      summary: "CP, conditional jumps, DJNZ, CALL and the stack.",
      sections: [
        {
          p: "Arithmetic sets <b>flags</b>. The most used are <b>Z</b> (the result was zero) and <b>C</b> (carry: the result overflowed or a subtraction borrowed). <code>CP x</code> compares A with x by subtracting without keeping the answer, just the flags. Jumps then test them: <code>JP Z</code>, <code>JR NZ</code>, <code>JR C</code>.",
          code: `        CP   10          ; compare A with 10
        JR   Z, ten      ; jump if A was 10
        JR   C, small    ; jump if A was less than 10
        ; otherwise A is bigger than 10 here`,
        },
        {
          h: "DJNZ loops",
          p: "<code>DJNZ label</code> means “decrement B, jump if not zero”. Put the loop count in B and the loop takes care of itself.",
          code: `        LD   B, 3        ; loop three times
        LD   A, 0
loop:   ADD  A, 4        ; A = 4, 8, 12
        DJNZ loop
        ; A is now 12`,
        },
        {
          h: "Subroutines and the stack",
          p: "<code>CALL label</code> pushes the return address on the stack and jumps; <code>RET</code> pops it and goes back. <code>PUSH</code> and <code>POP</code> save and restore register pairs, last in first out.",
          code: `        LD   A, 3
        CALL double      ; A = 6
        CALL double      ; A = 12
        HALT
double: PUSH BC          ; keep the caller's BC safe
        LD   B, A
        ADD  A, B
        POP  BC
        RET`,
        },
      ],
      practice: [
        { q: "How many times does a DJNZ loop run when it starts with LD B, 3?", options: ["3", "2", "4", "255"], answer: "3", why: "B goes 3 → 2 → 1 → 0; the jump is taken until B reaches 0." },
        { q: "After CP 10 with A = 10, which flag is set?", options: ["Z", "C", "Neither", "Both"], answer: "Z", why: "10 − 10 is zero, so Z is set; there is no borrow, so C is clear." },
        { q: "After CP 10 with A = 4, which jump is taken?", options: ["JR C", "JR Z", "JR NC", "JR NZ and JR Z"], answer: "JR C", why: "4 − 10 borrows, setting the carry flag, so A is less than 10." },
        { q: "You PUSH BC then PUSH DE. Which POP gets DE back?", options: ["The first POP", "The second POP", "Either", "Neither"], answer: "The first POP", why: "The stack is last in, first out: DE went on last, so it comes off first." },
      ],
    },
  ],
};
