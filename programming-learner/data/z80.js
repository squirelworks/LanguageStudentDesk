// Z80 assembly course for the Programming Learner. Written for this project.
// Schema: see data/python.js. Complete programs (the ones with `out`, and
// practice of kind "output") are CP/M .COM programs: tools/check_packs.py runs
// them with tools/z80run.py, which follows the same BDOS rules as a real CP/M.
window.PROGRAMMING = window.PROGRAMMING || {};
window.PROGRAMMING.z80 = {
  id: "z80",
  name: "Z80 Assembly",
  title: "Z80 assembly, register by register",
  intro:
    "The Zilog Z80 is an 8-bit processor from 1976 that powered the ZX Spectrum, MSX computers, the TRS-80, CP/M business machines and the Game Boy's close cousin. Assembly language is a readable spelling of the processor's own instructions, so every line does one small, exact thing. This course writes small programs for <b>CP/M</b>, the disk operating system most Z80 business machines ran, because CP/M gives you an easy way to print text. To run them, assemble a file with an assembler such as <code>pasmo</code>, <code>z80asm</code> or <code>sjasmplus</code> into a <code>.COM</code> file, then start it inside a CP/M emulator such as RunCPM. Every complete program here shows exactly what it prints.",
  comment: ";",
  caseInsensitive: true,
  keywords: [
    "LD", "PUSH", "POP", "EX", "EXX", "ADD", "ADC", "SUB", "SBC", "AND", "OR", "XOR", "CP", "INC", "DEC", "JP", "JR", "DJNZ", "CALL",
    "RET", "RST", "NOP", "HALT", "DI", "EI", "IN", "OUT", "RLA", "RRA", "RLCA", "RRCA", "RL", "RR", "RLC", "RRC", "SLA", "SRA", "SRL", "BIT", "SET", "RES",
    "NEG", "CPL", "SCF", "CCF", "LDIR", "LDDR", "LDI", "LDD", "CPIR", "CPI", "ORG", "EQU", "DB", "DW", "DS", "DEFB", "DEFW", "DEFS", "END",
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
          p: "<code>LD destination, source</code> copies a value. The destination always comes first. Brackets mean “the memory at this address”.",
          code: `        LD   A, 5        ; A = 5
        LD   B, A        ; B = 5 too
        LD   HL, 8000h   ; HL = address 8000 (hex)
        LD   (HL), A     ; memory[8000h] = 5
        LD   A, (HL)     ; A = memory[8000h]`,
        },
        {
          h: "Hex, binary and characters",
          p: "Assembly programmers write numbers in whichever base is clearest. <code>255</code>, <code>0FFh</code> and <code>11111111b</code> are the same value. A hex number that starts with a letter needs a leading 0 so the assembler does not mistake it for a name. A character in quotes, like <code>'A'</code>, means its code: 65.",
          code: `        LD   A, 65       ; decimal
        LD   A, 41h      ; the same, in hex
        LD   A, 01000001b ; the same, in binary
        LD   A, 'A'      ; the same, as a character`,
        },
        {
          h: "Pairs share their halves",
          p: "<code>H</code> is the high byte of <code>HL</code> and <code>L</code> the low byte. Changing one changes the pair. The same goes for <code>B</code>/<code>C</code> and <code>D</code>/<code>E</code>.",
          code: `        LD   HL, 1234h   ; H = 12h, L = 34h
        LD   L, 0        ; HL is now 1200h
        LD   DE, 300     ; 300 = 012Ch, so D = 01h, E = 2Ch`,
        },
      ],
      practice: [
        { q: "After LD A, 5 then LD B, A, what is in B?", options: ["5", "0", "A", "Whatever was in B before"], answer: "5", why: "LD copies the source (A, holding 5) into the destination (B)." },
        { q: "What does LD (HL), A do?", options: ["Stores A into memory at the address in HL", "Copies HL into A", "Loads A from address HL", "Adds A to HL"], answer: "Stores A into memory at the address in HL", why: "The destination comes first, and brackets mean memory at that address." },
        { q: "HL holds 1234h. What is in H?", options: ["12h", "34h", "1234h", "0"], answer: "12h", why: "H is the high byte of the pair, L the low byte." },
        { q: "Which value is not the same as the others?", options: ["10h", "16", "00010000b", "0Ah"], answer: "0Ah", why: "10h, 16 and 00010000b are all sixteen; 0Ah is ten." },
        { q: "Why write 0FFh instead of FFh?", options: ["So the assembler reads a number, not a name", "It is a bigger number", "It means a negative number", "FFh is a different value"], answer: "So the assembler reads a number, not a name", why: "A word that starts with a letter looks like a label; the leading 0 marks it as a number." },
      ],
    },
    {
      id: "hello",
      title: "Hello, CP/M",
      summary: "The shape of a whole program, and printing with the BDOS.",
      sections: [
        {
          p: "A CP/M program is loaded at address <code>100h</code>, so it starts with <code>ORG 100h</code>. To print, you ask the operating system: put a function number in <code>C</code> and <code>CALL 5</code>, the address of the <b>BDOS</b> (Basic Disk Operating System). Function 9 prints the string whose address is in <code>DE</code>, up to a <code>$</code> sign. <code>RET</code> at the end goes back to CP/M.",
          code: `        ORG  100h
        LD   DE, msg     ; DE = address of the text
        LD   C, 9        ; BDOS function 9: print string
        CALL 5
        RET              ; back to CP/M
msg:    DB   'Hello, squirrel!$'`,
          out: "Hello, squirrel!",
        },
        {
          h: "DB puts bytes in memory",
          p: "<code>DB</code> (define byte) is not an instruction. It tells the assembler to place bytes right there in the program: characters from quoted text, and numbers as they are. 13 and 10 are carriage return and line feed, which together start a new line on CP/M.",
          code: `        ORG  100h
        LD   DE, msg
        LD   C, 9
        CALL 5
        RET
msg:    DB   'Line one', 13, 10
        DB   'Line two$'`,
          out: "Line one\nLine two",
        },
        {
          h: "One character at a time",
          p: "Function 2 prints the single character in <code>E</code>. The BDOS is allowed to change any register, so set <code>C</code> and <code>E</code> again before every call.",
          code: `        ORG  100h
        LD   E, 'O'
        LD   C, 2        ; BDOS function 2: print the character in E
        CALL 5
        LD   E, 'K'
        LD   C, 2
        CALL 5
        RET`,
          out: "OK",
        },
        {
          h: "EQU names a number",
          p: "<code>name EQU value</code> gives a number a name, so the program says what it means. Labels like <code>msg:</code> are names too: they stand for the address where they appear.",
          code: `BDOS    EQU  5
PRINT   EQU  9
        ORG  100h
        LD   DE, msg
        LD   C, PRINT
        CALL BDOS
        RET
msg:    DB   'Named and tidy$'`,
          out: "Named and tidy",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `        ORG  100h
        LD   DE, msg
        LD   C, 9
        CALL 5
        RET
msg:    DB   'Nuts$ and more'`, options: ["Nuts", "Nuts$ and more", "Nuts and more", "msg"], answer: "Nuts", why: "Function 9 stops at the first $ and does not print it." },
        { q: "Which register holds the BDOS function number?", options: ["C", "A", "E", "DE"], answer: "C", why: "CP/M reads the function number from C; DE or E holds what it works on." },
        { kind: "output", q: "What does this print?", code: `        ORG  100h
        LD   E, 'H'
        LD   C, 2
        CALL 5
        LD   E, 'I'
        LD   C, 2
        CALL 5
        RET`, options: ["HI", "H", "I", "IH"], answer: "HI", why: "Each call to function 2 prints the character in E, in program order." },
        { q: "What does ORG 100h tell the assembler?", options: ["The program will be loaded at address 100h", "Print 100h characters", "The program is 100h bytes long", "Start a loop"], answer: "The program will be loaded at address 100h", why: "CP/M loads every .COM program at 100h, so labels must be counted from there." },
        { q: "Why set C again before a second CALL 5?", options: ["The BDOS may have changed it", "CALL always clears C", "C counts the calls", "It is only needed for style"], answer: "The BDOS may have changed it", why: "CP/M makes no promise to keep registers, so a careful program reloads them." },
      ],
    },
    {
      id: "arithmetic",
      title: "Arithmetic and the carry",
      summary: "ADD, SUB, INC and DEC; the carry flag; 16-bit sums.",
      sections: [
        {
          p: "<code>ADD A, x</code> and <code>SUB x</code> work on the accumulator. <code>INC</code> and <code>DEC</code> add or take one from any register. Adding the character code of <code>'0'</code> (48) to a number from 0 to 9 gives the digit to print.",
          code: `        ORG  100h
        LD   A, 3
        ADD  A, 4        ; A = 7
        SUB  2           ; A = 5
        INC  A           ; A = 6
        ADD  A, '0'      ; A = '6'
        LD   E, A
        LD   C, 2
        CALL 5
        RET`,
          out: "6",
        },
        {
          h: "Wrapping and the carry flag",
          p: "An 8-bit register wraps: 250 + 10 is 4, not 260. When that happens the <b>carry flag</b> (C) is set, as if the ninth bit fell out into it. Subtraction that goes below 0 also wraps and sets carry (a “borrow”). <code>INC</code> and <code>DEC</code> wrap too, but leave carry alone.",
          code: `        LD   A, 250
        ADD  A, 10       ; A = 4, carry set
        LD   A, 3
        SUB  5           ; A = 254, carry set (borrow)
        LD   A, 255
        INC  A           ; A = 0, carry unchanged`,
        },
        {
          h: "ADC and SBC carry it on",
          p: "<code>ADC</code> (add with carry) adds the carry flag as an extra 1. That is how you add numbers wider than 8 bits: add the low bytes, then <code>ADC</code> the high bytes. <code>SBC</code> does the same for subtraction.",
          code: `        ; 300 + 500 using 8-bit steps: 012Ch + 01F4h
        LD   A, 2Ch      ; low byte of 300
        ADD  A, 0F4h     ; low byte of 500: A = 20h, carry set
        LD   L, A
        LD   A, 01h      ; high byte of 300
        ADC  A, 01h      ; high byte of 500, plus the carry: A = 03h
        LD   H, A        ; HL = 0320h = 800`,
        },
        {
          h: "16-bit sums in HL",
          p: "<code>ADD HL, rr</code> adds a whole register pair in one go. <code>INC HL</code> and <code>DEC HL</code> step a pointer. There is no 16-bit <code>SUB</code>; use <code>OR A</code> to clear carry and then <code>SBC HL, DE</code>.",
          code: `        LD   HL, 1000
        LD   DE, 234
        ADD  HL, DE      ; HL = 1234
        OR   A           ; clear the carry flag
        SBC  HL, DE      ; HL = 1000 again`,
        },
        {
          h: "NEG flips the sign",
          p: "<code>NEG</code> turns A into 0 − A. In 8 bits, −1 is written 255, −2 is 254, and so on (<b>two's complement</b>). The same bits can be read as 0 to 255 or as −128 to 127; it is the program that decides which.",
          code: `        ORG  100h
        LD   A, 7
        NEG              ; A = 249, which is -7
        ADD  A, 9        ; 249 + 9 wraps to 2
        ADD  A, '0'
        LD   E, A
        LD   C, 2
        CALL 5
        RET`,
          out: "2",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `        ORG  100h
        LD   A, 9
        SUB  4
        DEC  A
        ADD  A, '0'
        LD   E, A
        LD   C, 2
        CALL 5
        RET`, options: ["4", "5", "3", "9"], answer: "4", why: "9 − 4 is 5, DEC makes it 4, and adding '0' makes the character 4." },
        { q: "A holds 200. After ADD A, 100, what is in A?", options: ["44", "300", "255", "0"], answer: "44", why: "300 does not fit in 8 bits; it wraps to 300 − 256 = 44 and sets carry." },
        { q: "Which instruction adds the carry flag in as well?", options: ["ADC", "ADD", "INC", "SUB"], answer: "ADC", why: "ADC means add with carry; it is how wider numbers are added byte by byte." },
        { q: "A holds 255 and carry is clear. After INC A?", options: ["A = 0, carry still clear", "A = 0, carry set", "A = 256", "A = 255"], answer: "A = 0, carry still clear", why: "INC wraps to 0 and sets the zero flag, but it never touches carry." },
        { kind: "output", q: "What does this print?", code: `        ORG  100h
        LD   A, 2
        NEG
        ADD  A, 7
        ADD  A, '0'
        LD   E, A
        LD   C, 2
        CALL 5
        RET`, options: ["5", "9", "7", "3"], answer: "5", why: "NEG makes A −2 (254); 254 + 7 wraps to 5." },
        { q: "Why OR A before SBC HL, DE?", options: ["To clear carry so it is not subtracted too", "To set A to 0", "To make HL positive", "SBC needs A to be 0"], answer: "To clear carry so it is not subtracted too", why: "SBC subtracts the carry as well; OR A leaves A alone but always clears carry." },
      ],
    },
    {
      id: "flow",
      title: "Flags and decisions",
      summary: "CP, the zero and carry flags, and conditional jumps.",
      sections: [
        {
          p: "Arithmetic sets <b>flags</b>. The most used are <b>Z</b> (the result was zero) and <b>C</b> (carry). <code>CP x</code> compares A with x by subtracting without keeping the answer, only the flags. Jumps then test them: <code>JP Z</code>, <code>JR NZ</code>, <code>JR C</code>, <code>JR NC</code>.",
          code: `        CP   10          ; compare A with 10
        JR   Z, ten      ; jump if A was 10
        JR   C, small    ; jump if A was less than 10
        ; otherwise A is bigger than 10 here`,
        },
        {
          h: "Reading CP",
          p: "After <code>CP x</code>: <b>Z</b> set means A = x. <b>C</b> set means A &lt; x (unsigned). Neither set means A &gt; x. <b>NC</b> means A ≥ x.",
          code: `        ORG  100h
        LD   A, 7
        CP   5
        JR   C, less     ; not taken: 7 is not below 5
        LD   DE, big
        JR   show
less:   LD   DE, small
show:   LD   C, 9
        CALL 5
        RET
big:    DB   'big$'
small:  DB   'small$'`,
          out: "big",
        },
        {
          h: "JR or JP",
          p: "<code>JR</code> (jump relative) is one byte shorter and can reach about 127 bytes forward or back; it only tests Z, NZ, C and NC. <code>JP</code> reaches anywhere and can also test the sign (<code>P</code>, <code>M</code>) and parity/overflow (<code>PE</code>, <code>PO</code>). Use <code>JR</code> for short hops.",
        },
        {
          h: "If, else if, else",
          p: "A chain of compares makes a decision with several branches. Each branch ends with a jump past the others.",
          code: `        ORG  100h
        LD   A, 0        ; try 0, 1 or 2
        CP   0
        JR   NZ, not0
        LD   DE, zero
        JR   done
not0:   CP   1
        JR   NZ, other
        LD   DE, one
        JR   done
other:  LD   DE, many
done:   LD   C, 9
        CALL 5
        RET
zero:   DB   'none$'
one:    DB   'one$'
many:   DB   'lots$'`,
          out: "none",
        },
        {
          h: "Testing for zero cheaply",
          p: "<code>OR A</code> leaves A unchanged but sets Z if A is 0, so you do not need <code>CP 0</code>. <code>AND A</code> works the same way. Many instructions set flags as a side effect, so you can often jump straight after <code>DEC</code> or <code>SUB</code>.",
          code: `        OR   A           ; is A zero?
        JR   Z, empty
        DEC  B           ; DEC sets Z when B reaches 0
        JR   Z, last`,
        },
      ],
      practice: [
        { q: "After CP 10 with A = 10, which flag is set?", options: ["Z", "C", "Neither", "Both"], answer: "Z", why: "10 − 10 is zero, so Z is set; there is no borrow, so C is clear." },
        { q: "After CP 10 with A = 4, which jump is taken?", options: ["JR C", "JR Z", "JR NC", "JR NZ and JR Z"], answer: "JR C", why: "4 − 10 borrows, setting the carry flag, so A is less than 10." },
        { kind: "output", q: "What does this print?", code: `        ORG  100h
        LD   A, 3
        CP   3
        JR   NZ, no
        LD   E, 'Y'
        JR   say
no:     LD   E, 'N'
say:    LD   C, 2
        CALL 5
        RET`, options: ["Y", "N", "YN", "3"], answer: "Y", why: "A equals 3, so Z is set and JR NZ is not taken; E gets Y." },
        { kind: "output", q: "What does this print?", code: `        ORG  100h
        LD   A, 12
        CP   20
        JR   NC, isbig
        LD   DE, lomsg
        JR   say
isbig:  LD   DE, himsg
say:    LD   C, 9
        CALL 5
        RET
lomsg:  DB   'low$'
himsg:  DB   'high$'`, options: ["low", "high", "lowhigh", "12"], answer: "low", why: "12 − 20 borrows, so carry is set and JR NC is not taken." },
        { q: "Which jump cannot be written with JR?", options: ["JP M, label", "JR Z, label", "JR NC, label", "JR label"], answer: "JP M, label", why: "JR only tests Z, NZ, C and NC; the sign condition M needs JP." },
        { q: "What does OR A do to A?", options: ["Nothing, but it sets the flags from A", "Clears A", "Sets A to 255", "Doubles A"], answer: "Nothing, but it sets the flags from A", why: "A OR A is A; the point is that Z and S now describe A, and carry is cleared." },
      ],
    },
    {
      id: "loops",
      title: "Loops",
      summary: "DJNZ, counting up, and 16-bit counters.",
      sections: [
        {
          p: "<code>DJNZ label</code> means “decrement B, jump if not zero”. Put the count in <code>B</code> and the loop runs exactly that many times. Here the BDOS call is outside the loop, so nothing else disturbs B.",
          code: `        ORG  100h
        LD   B, 3        ; loop three times
        LD   A, 0
again:  ADD  A, 2        ; A = 2, 4, 6
        DJNZ again
        ADD  A, '0'
        LD   E, A
        LD   C, 2
        CALL 5
        RET`,
          out: "6",
        },
        {
          h: "Keep B safe across calls",
          p: "If the loop body calls the BDOS, B may come back changed. <code>PUSH BC</code> before the call and <code>POP BC</code> after keep the counter safe. This loop prints five stars.",
          code: `        ORG  100h
        LD   B, 5
star:   PUSH BC
        LD   E, '*'
        LD   C, 2
        CALL 5
        POP  BC
        DJNZ star
        RET`,
          out: "*****",
        },
        {
          h: "Counting up with CP",
          p: "To count up, keep the number in a register, print or use it, add one, and compare with the end value. Here the digit itself is the counter, kept in <code>D</code> and saved around the call.",
          code: `        ORG  100h
        LD   D, '1'
next:   PUSH DE
        LD   E, D
        LD   C, 2
        CALL 5
        POP  DE
        INC  D
        LD   A, D
        CP   '6'         ; stop after 5
        JR   NZ, next
        RET`,
          out: "12345",
        },
        {
          h: "Longer loops with BC",
          p: "DJNZ only counts to 256. For more, count down a register pair. <code>DEC BC</code> does not set any flags, so test for zero by hand: <code>LD A, B</code> then <code>OR C</code> sets Z only when both halves are 0.",
          code: `        LD   BC, 1000
slow:   ; ... loop body ...
        DEC  BC
        LD   A, B
        OR   C
        JR   NZ, slow    ; runs 1000 times`,
        },
        {
          h: "Loops inside loops",
          p: "An inner loop needs its own counter, or the outer counter must be saved. This one prints three rows of four dots, with the outer count in D and the inner count in B.",
          code: `        ORG  100h
        LD   D, 3
row:    LD   B, 4
dot:    PUSH BC
        PUSH DE
        LD   E, '.'
        LD   C, 2
        CALL 5
        POP  DE
        POP  BC
        DJNZ dot
        PUSH DE
        LD   DE, crlf
        LD   C, 9
        CALL 5
        POP  DE
        DEC  D
        JR   NZ, row
        RET
crlf:   DB   13, 10, '$'`,
          out: "....\n....\n....",
        },
      ],
      practice: [
        { q: "How many times does a DJNZ loop run when it starts with LD B, 3?", options: ["3", "2", "4", "255"], answer: "3", why: "B goes 3 → 2 → 1 → 0; the jump is taken until B reaches 0." },
        { kind: "output", q: "What does this print?", code: `        ORG  100h
        LD   B, 4
lp:     PUSH BC
        LD   E, '#'
        LD   C, 2
        CALL 5
        POP  BC
        DJNZ lp
        RET`, options: ["####", "###", "#", "#####"], answer: "####", why: "B starts at 4, so the body runs four times." },
        { kind: "output", q: "What does this print?", code: `        ORG  100h
        LD   B, 3
        LD   A, 1
lp:     ADD  A, A
        DJNZ lp
        ADD  A, '0'
        LD   E, A
        LD   C, 2
        CALL 5
        RET`, options: ["8", "6", "4", "3"], answer: "8", why: "ADD A, A doubles: 1 → 2 → 4 → 8 over three passes." },
        { q: "Why test LD A, B / OR C after DEC BC?", options: ["DEC BC sets no flags", "DEC BC clears A", "OR C adds C to B", "It makes the loop faster"], answer: "DEC BC sets no flags", why: "16-bit INC and DEC leave the flags alone, so you check both halves for zero yourself." },
        { q: "What does LD B, 0 then a DJNZ loop do?", options: ["Runs 256 times", "Runs 0 times", "Runs once", "Never stops"], answer: "Runs 256 times", why: "The first DEC turns 0 into 255, so the loop goes all the way round: 256 passes." },
        { q: "The loop body calls the BDOS. What keeps the DJNZ count safe?", options: ["PUSH BC before, POP BC after", "Nothing is needed", "Using DEC B instead", "Putting the count in C"], answer: "PUSH BC before, POP BC after", why: "The BDOS may change B; saving BC on the stack and restoring it keeps the counter." },
      ],
    },
    {
      id: "stack",
      title: "Subroutines and the stack",
      summary: "CALL, RET, PUSH, POP and keeping registers safe.",
      sections: [
        {
          p: "<code>CALL label</code> pushes the return address on the stack and jumps; <code>RET</code> pops it and goes back. A <b>subroutine</b> is just code that ends in <code>RET</code>. This one doubles A.",
          code: `        ORG  100h
        LD   A, 1
        CALL double      ; A = 2
        CALL double      ; A = 4
        ADD  A, '0'
        LD   E, A
        LD   C, 2
        CALL 5
        RET
double: ADD  A, A
        RET`,
          out: "4",
        },
        {
          h: "Last in, first out",
          p: "The stack grows downward in memory. <code>PUSH</code> puts a register pair on top and <code>POP</code> takes the top one off, so they come back in reverse order. Here the pops are crossed on purpose, which swaps the two pairs.",
          code: `        LD   BC, 1111h
        LD   DE, 2222h
        PUSH BC
        PUSH DE
        POP  BC          ; BC = 2222h (DE went on last)
        POP  DE          ; DE = 1111h`,
        },
        {
          h: "A print-character routine",
          p: "A routine that saves every register it uses can be called from anywhere without surprises. <code>putc</code> prints the character in A and keeps all registers, which makes the loop simple.",
          code: `        ORG  100h
        LD   A, 'a'
        LD   B, 5
lp:     CALL putc
        INC  A
        DJNZ lp
        RET

putc:   PUSH AF          ; print the character in A
        PUSH BC
        PUSH DE
        PUSH HL
        LD   E, A
        LD   C, 2
        CALL 5
        POP  HL
        POP  DE
        POP  BC
        POP  AF
        RET`,
          out: "abcde",
        },
        {
          h: "Passing values",
          p: "Assembly has no parameters; you agree which registers carry what. Here <code>print</code> takes the address of a <code>$</code>-ended string in HL. Write that agreement in a comment above the routine.",
          code: `        ORG  100h
        LD   HL, m1
        CALL print
        LD   HL, m2
        CALL print
        RET

; print: HL = address of a $-ended string
print:  EX   DE, HL      ; the BDOS wants it in DE
        LD   C, 9
        CALL 5
        RET

m1:     DB   'up the $'
m2:     DB   'tree$'`,
          out: "up the tree",
        },
        {
          h: "Balance every PUSH",
          p: "<code>RET</code> pops whatever is on top of the stack. If a routine pushes something and forgets to pop it, <code>RET</code> jumps to that value instead of going home, and the program crashes. Every <code>PUSH</code> needs a matching <code>POP</code> on every path out.",
        },
      ],
      practice: [
        { q: "You PUSH BC then PUSH DE. Which POP gets DE back?", options: ["The first POP", "The second POP", "Either", "Neither"], answer: "The first POP", why: "The stack is last in, first out: DE went on last, so it comes off first." },
        { kind: "output", q: "What does this print?", code: `        ORG  100h
        LD   A, 2
        CALL triple
        ADD  A, '0'
        LD   E, A
        LD   C, 2
        CALL 5
        RET
triple: LD   B, A
        ADD  A, A
        ADD  A, B
        RET`, options: ["6", "4", "2", "8"], answer: "6", why: "triple adds A twice and then the copy in B: 2 + 2 + 2." },
        { q: "What does CALL put on the stack?", options: ["The address of the next instruction", "The value of A", "The address of the routine", "Nothing"], answer: "The address of the next instruction", why: "That return address is what RET pops so the program carries on after the CALL." },
        { kind: "output", q: "What does this print?", code: `        ORG  100h
        LD   D, 'X'
        LD   E, 'Y'
        PUSH DE
        LD   D, 'A'
        LD   E, 'B'
        POP  DE
        LD   C, 2
        CALL 5
        RET`, options: ["Y", "B", "X", "A"], answer: "Y", why: "POP DE restores the pair saved earlier, so E is Y again." },
        { q: "A routine does PUSH HL but returns without POP HL. What happens at RET?", options: ["It jumps to the address that was in HL", "It returns normally", "HL is restored", "The assembler refuses"], answer: "It jumps to the address that was in HL", why: "RET pops the top of the stack, which is now HL's old value, not the return address." },
      ],
    },
    {
      id: "memory",
      title: "Memory, tables and strings",
      summary: "Walking through memory with HL, lookup tables and LDIR.",
      sections: [
        {
          p: "HL is the usual pointer. <code>LD A, (HL)</code> reads the byte it points at and <code>INC HL</code> moves to the next. Strings in assembly often end with a 0 byte; a loop prints until it finds it.",
          code: `        ORG  100h
        LD   HL, text
next:   LD   A, (HL)
        OR   A           ; the 0 at the end?
        RET  Z           ; then we are finished
        PUSH HL
        LD   E, A
        LD   C, 2
        CALL 5
        POP  HL
        INC  HL
        JR   next
text:   DB   'acorn', 0`,
          out: "acorn",
        },
        {
          h: "Conditional RET",
          p: "<code>RET Z</code> returns only if Z is set. That and <code>RET NZ</code>, <code>RET C</code>, <code>RET NC</code> make tidy exits from loops and routines. At the top level of a CP/M program a return ends the program.",
        },
        {
          h: "Lookup tables",
          p: "To turn a number into something else, keep the answers in a table and add the number to the table's address. <code>ADD HL, DE</code> does the indexing; D must be 0 so only E is added.",
          code: `        ORG  100h
        LD   E, 3        ; which entry (counting from 0)
        LD   D, 0
        LD   HL, table
        ADD  HL, DE      ; HL = table + 3
        LD   E, (HL)
        LD   C, 2
        CALL 5
        RET
table:  DB   'ZOTF'      ; entries 0..3`,
          out: "F",
        },
        {
          h: "Writing to memory",
          p: "<code>LD (HL), A</code> stores. <code>DS n</code> reserves n bytes of space for the program to fill in. Here the program writes three characters and a <code>$</code> into a buffer, then prints it.",
          code: `        ORG  100h
        LD   HL, buf
        LD   A, 'c'
        LD   (HL), A
        INC  HL
        LD   (HL), 'a'
        INC  HL
        LD   (HL), 't'
        INC  HL
        LD   (HL), '$'
        LD   DE, buf
        LD   C, 9
        CALL 5
        RET
buf:    DS   4`,
          out: "cat",
        },
        {
          h: "LDIR copies a block",
          p: "<code>LDIR</code> copies BC bytes from the address in HL to the address in DE, moving both forward. It is a whole copy loop in one instruction.",
          code: `        ORG  100h
        LD   HL, src
        LD   DE, dst
        LD   BC, 6       ; five letters and the $
        LDIR
        LD   DE, dst
        LD   C, 9
        CALL 5
        RET
src:    DB   'copy!$'
dst:    DS   6`,
          out: "copy!",
        },
        {
          h: "Named addresses",
          p: "<code>LD A, (count)</code> and <code>LD (count), A</code> read and write a byte at a labelled address. That is how you keep a variable in memory when you run out of registers.",
          code: `        ORG  100h
        LD   A, (count)
        ADD  A, 2
        LD   (count), A  ; count is now 7
        ADD  A, '0'
        LD   E, A
        LD   C, 2
        CALL 5
        RET
count:  DB   5`,
          out: "7",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `        ORG  100h
        LD   HL, word
        INC  HL
        INC  HL
        LD   E, (HL)
        LD   C, 2
        CALL 5
        RET
word:   DB   'nuts'`, options: ["t", "u", "n", "s"], answer: "t", why: "HL starts at n; two INC HL move it to t (n, u, t)." },
        { q: "What does LDIR use as its byte count?", options: ["BC", "B", "A", "HL"], answer: "BC", why: "LDIR copies from (HL) to (DE), counting BC down to 0." },
        { kind: "output", q: "What does this print?", code: `        ORG  100h
        LD   E, 1
        LD   D, 0
        LD   HL, t
        ADD  HL, DE
        LD   E, (HL)
        LD   C, 2
        CALL 5
        RET
t:      DB   'abc'`, options: ["b", "a", "c", "1"], answer: "b", why: "Entries count from 0, so table + 1 is the second byte, b." },
        { q: "What does RET Z do if the Z flag is clear?", options: ["Nothing; the program carries on", "Returns anyway", "Jumps to 0", "Clears Z"], answer: "Nothing; the program carries on", why: "A conditional RET only returns when its condition holds." },
        { kind: "output", q: "What does this print?", code: `        ORG  100h
        LD   HL, s
        LD   B, 0
cnt:    LD   A, (HL)
        OR   A
        JR   Z, done
        INC  B
        INC  HL
        JR   cnt
done:   LD   A, B
        ADD  A, '0'
        LD   E, A
        LD   C, 2
        CALL 5
        RET
s:      DB   'oak', 0`, options: ["3", "4", "0", "2"], answer: "3", why: "The loop counts bytes until the 0: o, a and k." },
        { q: "What does DS 10 do?", options: ["Reserves 10 bytes of space", "Prints 10 characters", "Defines the string 10", "Delays 10 steps"], answer: "Reserves 10 bytes of space", why: "DS (define space) leaves room in the program for data written later." },
      ],
    },
    {
      id: "bits",
      title: "Bits and logic",
      summary: "AND, OR, XOR, BIT/SET/RES and shifting.",
      sections: [
        {
          p: "<code>AND</code> keeps only the bits set in both values, <code>OR</code> turns bits on, <code>XOR</code> flips them. A value used to pick bits is called a <b>mask</b>. In ASCII, lowercase and uppercase letters differ by one bit (20h), so clearing it uppercases a letter.",
          code: `        ORG  100h
        LD   A, 'q'
        AND  0DFh        ; clear bit 5: 'q' becomes 'Q'
        LD   E, A
        LD   C, 2
        CALL 5
        LD   A, 'Z'
        OR   20h         ; set bit 5: 'Z' becomes 'z'
        LD   E, A
        LD   C, 2
        CALL 5
        RET`,
          out: "Qz",
        },
        {
          h: "XOR A",
          p: "Any value XOR itself is 0, so <code>XOR A</code> is the shortest way to set A to 0 (and clear carry). You will see it everywhere in real Z80 code.",
          code: `        XOR  A           ; A = 0, Z set, carry clear
        XOR  0FFh        ; flips every bit: A = 255`,
        },
        {
          h: "BIT, SET and RES",
          p: "Bits are numbered 0 (the 1s place) to 7 (the 128s place). <code>BIT n, r</code> tests one bit and sets Z if it is 0. <code>SET n, r</code> turns it on and <code>RES n, r</code> turns it off. They work on any register or on <code>(HL)</code>.",
          code: `        ORG  100h
        LD   A, 5        ; 00000101b
        BIT  1, A        ; bit 1 is 0, so Z is set
        JR   Z, off
        LD   E, '1'
        JR   say
off:    LD   E, '0'
say:    LD   C, 2
        CALL 5
        RET`,
          out: "0",
        },
        {
          h: "Shifting multiplies and divides",
          p: "<code>SLA r</code> shifts every bit left, which doubles the number; the bit that falls out goes into carry. <code>SRL r</code> shifts right, halving it and dropping the remainder into carry. <code>ADD A, A</code> is a quick way to double A.",
          code: `        ORG  100h
        LD   B, 3
        SLA  B           ; 6
        SLA  B           ; 12
        SRL  B           ; 6
        LD   A, B
        ADD  A, '0'
        LD   E, A
        LD   C, 2
        CALL 5
        RET`,
          out: "6",
        },
        {
          h: "Printing in binary",
          p: "Shift A left eight times. Each time, the top bit drops into carry, and the program prints 0 or 1 depending on it. <code>RLCA</code> rotates A left, copying the top bit into both carry and bit 0.",
          code: `        ORG  100h
        LD   A, 0A5h     ; 10100101b
        LD   B, 8
bitlp:  RLCA             ; top bit into carry
        PUSH AF
        PUSH BC
        LD   E, '0'
        JR   NC, zero
        LD   E, '1'
zero:   LD   C, 2
        CALL 5
        POP  BC
        POP  AF
        DJNZ bitlp
        RET`,
          out: "10100101",
        },
      ],
      practice: [
        { q: "What is 0F0h AND 3Ch?", options: ["30h", "0FCh", "0CCh", "3Ch"], answer: "30h", why: "11110000 AND 00111100 keeps only bits on in both: 00110000, which is 30h." },
        { kind: "output", q: "What does this print?", code: `        ORG  100h
        LD   A, 'm'
        AND  0DFh
        LD   E, A
        LD   C, 2
        CALL 5
        RET`, options: ["M", "m", "-", "0"], answer: "M", why: "Clearing bit 5 (20h) turns a lowercase ASCII letter into uppercase." },
        { q: "Why do programmers write XOR A?", options: ["It sets A to 0 in one short instruction", "It doubles A", "It flips the sign of A", "It tests bit 0"], answer: "It sets A to 0 in one short instruction", why: "Any value XOR itself is 0; XOR A is one byte, shorter than LD A, 0." },
        { kind: "output", q: "What does this print?", code: `        ORG  100h
        LD   A, 1
        SLA  A
        SLA  A
        SLA  A
        ADD  A, '0'
        LD   E, A
        LD   C, 2
        CALL 5
        RET`, options: ["8", "3", "4", "6"], answer: "8", why: "Each left shift doubles: 1 → 2 → 4 → 8." },
        { q: "After LD A, 4 then BIT 2, A, is Z set?", options: ["No, bit 2 is 1", "Yes, bit 2 is 0", "Only if carry is set", "BIT does not change Z"], answer: "No, bit 2 is 1", why: "4 is 00000100b: bit 2 is on, so BIT clears Z." },
        { kind: "output", q: "What does this print?", code: `        ORG  100h
        LD   A, 9
        SRL  A
        ADD  A, '0'
        LD   E, A
        LD   C, 2
        CALL 5
        RET`, options: ["4", "5", "9", "3"], answer: "4", why: "Shifting right halves and drops the remainder: 9 → 4, with 1 in carry." },
      ],
    },
    {
      id: "numbers",
      title: "Printing numbers",
      summary: "Turning a byte into decimal and hex digits, and multiplying.",
      sections: [
        {
          p: "CP/M only prints characters, so a number has to be split into digits. For 0–255: count how many times 100 fits (subtract until it would go below 0), then 10, and what is left is the units. <code>printd</code> below skips the leading zeros.",
          code: `        ORG  100h
        LD   A, 142
        CALL printd
        RET

; printd: print A (0-255) in decimal
printd: LD   D, 0        ; D = 1 once a digit has been printed
        LD   B, 100
        CALL digit
        LD   B, 10
        CALL digit
        ADD  A, '0'      ; units are always printed
        JP   putc
digit:  LD   C, '0'      ; count how many B's fit in A
dlp:    CP   B
        JR   C, dend
        SUB  B
        INC  C
        JR   dlp
dend:   PUSH AF
        LD   A, C
        CP   '0'
        JR   NZ, show
        BIT  0, D        ; a leading zero? skip it
        JR   Z, skip
show:   LD   D, 1
        CALL putc
skip:   POP  AF
        RET
putc:   PUSH AF          ; print the character in A
        PUSH BC
        PUSH DE
        PUSH HL
        LD   E, A
        LD   C, 2
        CALL 5
        POP  HL
        POP  DE
        POP  BC
        POP  AF
        RET`,
          out: "142",
        },
        {
          h: "JP to a routine",
          p: "<code>printd</code> ends with <code>JP putc</code> instead of <code>CALL putc</code> then <code>RET</code>. When a routine's last job is calling another routine, jumping to it lets that routine's <code>RET</code> return straight to the original caller. This is called a <b>tail call</b>.",
        },
        {
          h: "Hex digits",
          p: "A byte is two hex digits, one per half (a <b>nibble</b>). Shift the top half down with four <code>RRCA</code>s, mask with <code>AND 0Fh</code>, and turn 0–15 into <code>0</code>–<code>9</code> or <code>A</code>–<code>F</code>. The letters start 7 places after <code>'9'+1</code>, hence the <code>ADD A, 7</code>.",
          code: `        ORG  100h
        LD   A, 3Ch
        CALL printh
        RET

; printh: print A as two hex digits
printh: PUSH AF
        RRCA
        RRCA
        RRCA
        RRCA
        CALL nib         ; high half first
        POP  AF
nib:    AND  0Fh
        CP   10
        JR   C, dig
        ADD  A, 7        ; 10..15 become 'A'..'F'
dig:    ADD  A, '0'
        LD   E, A
        LD   C, 2
        JP   5           ; the BDOS returns for us`,
          out: "3C",
        },
        {
          h: "Multiplying by adding",
          p: "The Z80 has no multiply instruction. The simple way is a loop that adds one number B times. Faster programs shift and add, but this is easy to check.",
          code: `        ORG  100h
        LD   B, 6        ; 6 x 7
        LD   C, 7
        XOR  A
mul:    ADD  A, C
        DJNZ mul         ; A = 42
        CALL printd
        RET

printd: LD   B, 10       ; print A (0-99) as two digits
        LD   C, '0'
tens:   CP   B
        JR   C, units
        SUB  B
        INC  C
        JR   tens
units:  PUSH AF
        LD   E, C
        LD   C, 2
        CALL 5
        POP  AF
        ADD  A, '0'
        LD   E, A
        LD   C, 2
        JP   5`,
          out: "42",
        },
      ],
      practice: [
        { q: "To print 142 one digit at a time, what do you find first?", options: ["How many 100s fit", "The units digit", "How many 2s fit", "The hex digits"], answer: "How many 100s fit", why: "Printing goes left to right, so the hundreds digit has to be worked out first." },
        { kind: "output", q: "What does this print?", code: `        ORG  100h
        LD   A, 37
        LD   B, 10
        LD   C, '0'
tens:   CP   B
        JR   C, show
        SUB  B
        INC  C
        JR   tens
show:   LD   E, C
        LD   C, 2
        CALL 5
        RET`, options: ["3", "7", "37", "0"], answer: "3", why: "10 fits into 37 three times before A drops below 10; the units (7) are never printed." },
        { q: "What is 0Bh as a printed hex digit?", options: ["B", "11", ";", "b"], answer: "B", why: "11 is not below 10, so 7 is added: 11 + 7 + '0' is the code for B." },
        { kind: "output", q: "What does this print?", code: `        ORG  100h
        LD   A, 0A7h
        AND  0Fh
        ADD  A, '0'
        LD   E, A
        LD   C, 2
        CALL 5
        RET`, options: ["7", "A", "0", "G"], answer: "7", why: "AND 0Fh keeps only the low nibble, which is 7." },
        { q: "Why end printd with JP putc instead of CALL putc then RET?", options: ["putc's RET returns straight to printd's caller", "JP is required after a CALL", "CALL cannot reach putc", "It prints twice otherwise"], answer: "putc's RET returns straight to printd's caller", why: "A tail call saves an instruction and a little stack; the result is the same." },
        { kind: "output", q: "What does this print?", code: `        ORG  100h
        LD   B, 3
        XOR  A
mul:    ADD  A, 3
        DJNZ mul
        ADD  A, '0'
        LD   E, A
        LD   C, 2
        CALL 5
        RET`, options: ["9", "6", "3", "0"], answer: "9", why: "Adding 3 three times is 3 × 3." },
      ],
    },
    {
      id: "fizzbuzz",
      title: "Putting it together: FizzBuzz",
      summary: "A whole program from the pieces: loops, compares, routines and printing.",
      sections: [
        {
          p: "FizzBuzz prints the numbers from 1 up, but says <b>Fizz</b> for multiples of 3, <b>Buzz</b> for multiples of 5 and <b>FizzBuzz</b> for both. Instead of dividing, this version keeps two countdowns that reset to 3 and 5: when one reaches 0, it is time for that word.",
          code: `        ORG  100h
        LD   A, 1
        LD   (n), A
        LD   A, 3
        LD   (three), A
        LD   A, 5
        LD   (five), A
loop:   LD   D, 0        ; D = 1 if a word was printed
        LD   HL, three
        DEC  (HL)
        JR   NZ, no3
        LD   (HL), 3
        LD   HL, fizz
        CALL print
        LD   D, 1
no3:    LD   HL, five
        DEC  (HL)
        JR   NZ, no5
        LD   (HL), 5
        LD   HL, buzz
        CALL print
        LD   D, 1
no5:    LD   A, D
        OR   A
        JR   NZ, eol
        LD   A, (n)
        CALL printd
eol:    LD   HL, crlf
        CALL print
        LD   A, (n)
        INC  A
        LD   (n), A
        CP   16          ; 1 to 15
        JR   NZ, loop
        RET

print:  PUSH DE          ; HL = $-ended string
        EX   DE, HL
        LD   C, 9
        CALL 5
        POP  DE
        RET
printd: LD   B, 10       ; A = 0-99
        LD   C, '0'
tens:   CP   B
        JR   C, units
        SUB  B
        INC  C
        JR   tens
units:  PUSH AF
        LD   A, C
        CP   '0'
        JR   Z, notens
        LD   E, C
        LD   C, 2
        CALL 5
notens: POP  AF
        ADD  A, '0'
        LD   E, A
        LD   C, 2
        JP   5

n:      DB   0
three:  DB   0
five:   DB   0
fizz:   DB   'Fizz$'
buzz:   DB   'Buzz$'
crlf:   DB   13, 10, '$'`,
          out: "1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz",
        },
        {
          h: "How to read a longer program",
          p: "Start at the labels: they name the parts. <code>loop</code> is one pass per number. <code>three</code> and <code>five</code> are the countdowns, kept in memory because there are not enough registers to go round. <code>DEC (HL)</code> counts a memory byte down and sets Z at 0, just as <code>DEC B</code> would. The routines at the bottom each save what they must and say in a comment what they expect.",
        },
        {
          h: "Where to go next",
          p: "You now know enough to read most Z80 listings. Good next steps: run these programs in RunCPM and change them; read a reference card for the full instruction set (exchange registers <code>EXX</code>, index registers <code>IX</code>/<code>IY</code>, block searches <code>CPIR</code>); then try a machine with a screen of its own, such as the ZX Spectrum in the Fuse emulator, where writing bytes to video memory draws pictures.",
        },
      ],
      practice: [
        { q: "Why does this FizzBuzz keep its countdowns in memory?", options: ["There are not enough registers for everything", "Memory is faster than registers", "DEC only works on memory", "The BDOS needs them there"], answer: "There are not enough registers for everything", why: "The BDOS may change registers, and the program needs several values at once, so it parks them in memory." },
        { q: "What does DEC (HL) do?", options: ["Takes 1 from the byte HL points at", "Takes 1 from HL", "Takes 1 from H and L", "Moves HL back one byte"], answer: "Takes 1 from the byte HL points at", why: "Brackets mean memory; DEC (HL) changes the byte and sets Z when it reaches 0." },
        { q: "For the number 15, why are both words printed?", options: ["Both countdowns reach 0 on the same pass", "15 is checked twice", "FizzBuzz is stored as one word", "The loop ends at 15"], answer: "Both countdowns reach 0 on the same pass", why: "Every 15th pass is a multiple of both 3 and 5, so Fizz and then Buzz print." },
        { kind: "output", q: "What does this print?", code: `        ORG  100h
        LD   B, 6
        LD   D, 3
lp:     DEC  D
        JR   NZ, skip
        LD   D, 3
        PUSH BC
        PUSH DE
        LD   E, '!'
        LD   C, 2
        CALL 5
        POP  DE
        POP  BC
skip:   DJNZ lp
        RET`, options: ["!!", "!", "!!!", "!!!!!!"], answer: "!!", why: "The countdown in D hits 0 on passes 3 and 6, so ! prints twice." },
        { q: "Which register pair is most often used as a memory pointer?", options: ["HL", "AF", "BC only", "PC"], answer: "HL", why: "HL is the main address register: (HL) works with almost every instruction." },
      ],
    },
  ],
};
