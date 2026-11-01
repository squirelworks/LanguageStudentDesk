// Chisel course for the Programming Learner. Written for this project.
// Chisel (Constructing Hardware in a Scala Embedded Language) is a hardware
// construction language embedded in Scala. These lessons use the chisel3
// API as documented by the Chisel project (chipsalliance/chisel, formerly
// UC Berkeley): Module, IO, :=, Wire, Reg, and when. Nothing is executed;
// elaborating a circuit needs Scala and the Chisel library, and the
// simulator API has moved between releases.
window.PROGRAMMING = window.PROGRAMMING || {};
window.PROGRAMMING.chisel = {
  id: "chisel",
  name: "Chisel",
  title: "Chisel, hardware written in Scala",
  intro:
    "Chisel is a hardware construction language embedded in Scala. A Chisel program is a Scala program that <em>builds a circuit</em>. It does not step through that circuit the way a C or Python program steps through statements. When the Scala finishes, what remains is a module of wires, registers and operations, which a later tool turns into Verilog. The spelling below is the <code>chisel3</code> API (UC Berkeley, now maintained as chipsalliance/chisel). These lessons do not run the examples: generating hardware needs a Scala build with the Chisel library on it, and the simulator calls have changed between releases.",
  comment: "//",
  keywords: ["class", "extends", "val", "import", "when", "otherwise", "elsewhen", "Module"],
  builtins: ["Input", "Output", "UInt", "Bool", "IO", "Wire", "Reg", "RegInit"],
  lessons: [
    {
      id: "generator",
      title: "A generator, not a program",
      summary: "Scala runs once and leaves a circuit behind.",
      sections: [
        {
          p: "You write Chisel inside an ordinary Scala program. Scala’s own <code>if</code>, <code>for</code> and <code>val</code> run while the circuit is being <b>elaborated</b>: they decide which hardware exists. They do not re-run on every clock. A <code>println</code> in Scala fires once, at elaboration. A Chisel <code>printf</code> is different: it is hardware, and it prints later, when a simulator runs the circuit.",
        },
        {
          h: "What comes out",
          p: "Elaboration produces an intermediate form (FIRRTL) that a compiler lowers to Verilog. The Verilog is what you simulate in a Verilog simulator or give to a chip tool. The Scala source is the generator, not the netlist.",
        },
      ],
      practice: [
        { q: "When does the Scala in a Chisel generator run?", options: ["Once, while the circuit is being built", "On every clock cycle", "Only when the chip is fabricated", "Never; Scala is ignored"], answer: "Once, while the circuit is being built", why: "Elaboration runs the Scala to decide what hardware exists. The circuit then runs on its own." },
        { q: "What is the difference between println and a Chisel printf?", options: ["println runs once at elaboration; printf prints when the circuit is simulated", "They print at the same time", "printf runs at elaboration and println runs every cycle", "Neither can print"], answer: "println runs once at elaboration; printf prints when the circuit is simulated", why: "println is Scala. Chisel printf is a piece of the circuit." },
        { q: "What does elaboration produce, before Verilog?", options: ["An intermediate circuit description (FIRRTL)", "A running program", "A Scala class the CPU executes every cycle", "A timing diagram"], answer: "An intermediate circuit description (FIRRTL)", why: "FIRRTL is the circuit Chisel built. A later compiler turns that into Verilog." },
        { q: "A Scala if around a connection decides what?", options: ["Whether that hardware is generated at all", "Which input wins on each clock", "The reset value", "The module’s name"], answer: "Whether that hardware is generated at all", why: "Scala if is elaboration-time. It is not a mux. A mux is when, in the next lessons." },
        { q: "Why does this course not run the examples?", options: ["Generating hardware needs the Chisel library, and the simulator API has changed between releases", "Chisel cannot describe hardware", "Scala cannot print", "Circuits have no ports"], answer: "Generating hardware needs the Chisel library, and the simulator API has changed between releases", why: "The chisel3 generator API below is stable enough to teach. Driving a simulation is a separate toolchain." },
      ],
    },
    {
      id: "modules",
      title: "Modules and ports",
      summary: "Module, IO, and a bundle of directions.",
      sections: [
        {
          p: "Hardware lives in a <code>Module</code>. Ports are declared together as <code>val io = IO(new Bundle { ... })</code>. Each field is an <code>Input</code> or an <code>Output</code>. <code>UInt(8.W)</code> is an unsigned value, 8 bits wide. <code>8.W</code> is the width. A width is part of the type of the wire.",
          code: `import chisel3._

class Add extends Module {
  val io = IO(new Bundle {
    val a = Input(UInt(8.W))
    val b = Input(UInt(8.W))
    val y = Output(UInt(8.W))
  })
  io.y := io.a + io.b
}`,
        },
        {
          h: "Directions",
          p: "<code>Input</code> is driven from outside the module. <code>Output</code> is driven from inside. <code>Flip</code> on a bundle swaps every direction, which is how a child module’s ports line up with the parent’s. Forgetting a direction, or driving an input from the inside, is an elaboration error.",
        },
      ],
      practice: [
        { q: "What is a Chisel Module?", options: ["A piece of hardware with ports", "A Scala function that returns an Int", "A Verilog simulator", "A clock cycle"], answer: "A piece of hardware with ports", why: "class Add extends Module describes a component. The Scala class is the generator for that component." },
        { q: "What does UInt(8.W) mean?", options: ["An unsigned value, 8 bits wide", "A Scala Int limited to 8", "A signed value, 8 bits wide", "An 8-element vector of Bools, always"], answer: "An unsigned value, 8 bits wide", why: "UInt is unsigned. 8.W is the width. SInt is the signed form." },
        { q: "Who drives an Input port?", options: ["Logic outside the module", "Only the module’s own body", "The reset signal", "Nobody; inputs are constants"], answer: "Logic outside the module", why: "Input is the module’s view of a signal someone else provides. The body drives Outputs." },
        { q: "In the adder, what does io.y := io.a + io.b build?", options: ["An 8-bit adder connecting a and b to y", "A Scala method named +", "A print of a and b", "A register that stores the sum"], answer: "An 8-bit adder connecting a and b to y", why: "+ on UInt is hardware. := connects that adder’s result to the output port. There is no register unless you ask for one." },
        { q: "Where are a module’s ports declared?", options: ["Together, as io = IO(new Bundle { ... })", "As separate Scala vars anywhere in the file", "Only in Verilog, after elaboration", "Inside println"], answer: "Together, as io = IO(new Bundle { ... })", why: "IO wraps the bundle so Chisel treats those fields as the module’s ports." },
      ],
    },
    {
      id: "connect",
      title: "Wires and :=",
      summary: "A connection, and last-connect-wins.",
      sections: [
        {
          p: "<code>:=</code> is a connection, not a Scala assignment you can update over time. <code>io.y := io.a</code> wires <code>a</code> to <code>y</code>. If the same sink is connected again, the later connection wins. That “last connect wins” rule is how Chisel builds multiplexers: a default connection, then a conditional one that overrides it.",
        },
        {
          h: "Wire",
          p: "A <code>Wire</code> is a combinational node you can name. It has no memory. Until something is connected to it, it is an error to read it. <code>val sum = Wire(UInt(8.W)); sum := io.a + io.b</code> names the adder’s result.",
          code: `val sum = Wire(UInt(8.W))
sum := io.a + io.b
io.y := sum`,
        },
        {
          h: "Literals",
          p: "<code>1.U</code> is an unsigned literal one. <code>1.U(8.W)</code> is that one, 8 bits wide. <code>true.B</code> and <code>false.B</code> are Bool literals. A bare Scala <code>1</code> is not a hardware value; the <code>.U</code> is what makes it one.",
        },
      ],
      practice: [
        { q: "What does := mean?", options: ["Connect a hardware source to a sink", "Update a Scala var", "Compare two values", "Declare a port"], answer: "Connect a hardware source to a sink", why: ":= is a wire. It is not the assignment you use to change a Scala variable over time." },
        { q: "Two connections drive the same wire. Which one is kept?", options: ["The later one", "The earlier one", "Both, added together", "Neither; elaboration always fails"], answer: "The later one", why: "Last connect wins. Conditional overrides of a default connection are how muxes get built." },
        { q: "What does a Wire remember between clocks?", options: ["Nothing; it is combinational", "The last value written", "Its reset value", "The first value connected"], answer: "Nothing; it is combinational", why: "A Wire is a name for a combinational result. Memory is a Reg." },
        { q: "Which of these is a hardware literal?", options: ["1.U", "1", "\"1\"", "UInt"], answer: "1.U", why: "The .U turns a Scala number into a Chisel unsigned literal. A bare 1 is only a Scala Int." },
        { q: "What is wrong with reading a Wire that nothing drives?", options: ["It has no source, so elaboration should reject it", "It reads as 0", "It reads as the last clock’s value", "It prints a warning and continues"], answer: "It has no source, so elaboration should reject it", why: "A Wire is not a register and it does not default to zero. Something must be connected to it." },
      ],
    },
    {
      id: "registers",
      title: "Registers",
      summary: "Reg and RegInit update on the clock.",
      sections: [
        {
          p: "A <code>Reg</code> is state. The connection <code>r := r + 1.U</code> does not change <code>r</code> during elaboration. It builds an adder from the register’s output back to its input. The register captures that result on the clock. A <code>Module</code> has an implicit clock and reset.",
          code: `val r = RegInit(0.U(8.W))
r := r + 1.U`,
        },
        {
          h: "RegInit",
          p: "<code>RegInit(0.U(8.W))</code> resets to zero. A plain <code>Reg(UInt(8.W))</code> has no specified reset value. The value you pass to <code>RegInit</code> is the reset value, not a value that updates when the Scala runs.",
        },
        {
          h: "Reading your own next value",
          p: "On the right-hand side, <code>r</code> means the value stored now, the output of the register. The left-hand side is the input, what will be stored at the next clock. So <code>r := r + 1.U</code> is a counter, not an infinite Scala loop.",
        },
      ],
      practice: [
        { q: "When does r := r + 1.U change the stored value?", options: ["On the clock, in the circuit", "Immediately, as the Scala line runs", "Only at reset", "Never; + is not allowed on a Reg"], answer: "On the clock, in the circuit", why: "The Scala line builds the adder and the connection. The register updates when the clock edge arrives." },
        { q: "What does RegInit(0.U(8.W)) set?", options: ["The reset value, an 8-bit zero", "A Scala var that starts at 0 and grows during elaboration", "The clock frequency", "An output port"], answer: "The reset value, an 8-bit zero", why: "RegInit takes the value the register holds when reset is asserted." },
        { q: "On the right-hand side of r := r + 1.U, what is r?", options: ["The value currently stored in the register", "The value about to be stored", "A Scala Int counting elaborations", "The reset signal"], answer: "The value currently stored in the register", why: "Reading a Reg yields its output. Writing it sets the input that will be captured next." },
        { q: "How is a Reg different from a Wire?", options: ["A Reg holds state across clocks; a Wire does not", "A Wire holds state; a Reg does not", "They are the same", "A Reg can only be 1 bit"], answer: "A Reg holds state across clocks; a Wire does not", why: "Registers are the memory. Wires are names for combinational results." },
        { q: "Where do a Module’s clock and reset come from?", options: ["They are implicit on Module", "You must declare them as ordinary Inputs named clock and reset in every bundle", "From println", "From the width of the first UInt"], answer: "They are implicit on Module", why: "Module provides clock and reset. You can use an explicit clock if you need a second one, but the simple counter does not declare them in io." },
      ],
    },
    {
      id: "when",
      title: "when, not if",
      summary: "A hardware mux, versus elaboration.",
      sections: [
        {
          p: "<code>when</code> is a hardware condition. The test is a Chisel <code>Bool</code>, and both branches exist in the circuit. <code>otherwise</code> is the other input of the mux. <code>elsewhen</code> adds another.",
          code: `when(io.en) {
  io.y := io.a
}.otherwise {
  io.y := io.b
}`,
        },
        {
          h: "Scala if is the other tool",
          p: "A Scala <code>if</code> runs at elaboration, on a Scala <code>Boolean</code>. Use it to decide whether to generate a piece of hardware (“if this parameter is true, add a register”). Use <code>when</code> when the choice depends on a signal in the circuit. Writing <code>if (io.en)</code> does not compile: <code>io.en</code> is hardware, not a Scala Boolean.",
        },
        {
          h: "Last connect still applies",
          p: "Inside <code>when</code>, a connection overrides the default only on the cycles where the condition is true. A common pattern is a default <code>io.y := 0.U</code>, then <code>when(io.en) { io.y := io.a }</code>.",
        },
      ],
      practice: [
        { q: "What does when(io.en) build?", options: ["A multiplexer chosen by the signal en", "Hardware that exists only if en is a Scala true", "A register enable with no mux", "An elaboration-time branch"], answer: "A multiplexer chosen by the signal en", why: "when is hardware. Both the true and the false connections are in the circuit, and en selects." },
        { q: "Why does if (io.en) fail?", options: ["io.en is a Chisel Bool, not a Scala Boolean", "if is not a Scala keyword", "en is a reserved word", "Chisel has no conditionals"], answer: "io.en is a Chisel Bool, not a Scala Boolean", why: "Scala if wants a Boolean known at elaboration. A port is a signal. The hardware conditional is when." },
        { q: "What is otherwise?", options: ["The other input of the when mux", "A Scala else that deletes hardware", "A reset", "A comment"], answer: "The other input of the when mux", why: "when { }.otherwise { } is the two-way mux. elsewhen adds further conditions." },
        { q: "A default connection, then a when that connects the same wire. When the condition is false, what is driven?", options: ["The default", "Nothing", "Zero, always", "The when value anyway"], answer: "The default", why: "The when overrides the default only while its condition is true. Last-connect-wins is conditional here." },
        { q: "You want a register only if a Scala parameter includeReg is true. Which do you use?", options: ["A Scala if", "when", "otherwise", "RegInit alone, which checks the parameter"], answer: "A Scala if", why: "includeReg is known when the generator runs. Scala if includes or omits the register. when would put a mux in the circuit instead." },
      ],
    },
  ],
};
