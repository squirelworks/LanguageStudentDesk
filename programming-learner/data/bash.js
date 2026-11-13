// Bash course for the Programming Learner. Written for this project.
// Examples are complete Bash scripts. tools/run_bash.py runs each one with
// bash in an empty folder and checks the printed output.
window.PROGRAMMING = window.PROGRAMMING || {};
window.PROGRAMMING.bash = {
  id: "bash",
  name: "Bash",
  title: "Bash scripting from the first echo",
  intro:
    "Bash is the shell: the program that reads the commands you type in a Linux or macOS terminal. Brian Fox wrote it in 1989 for the GNU project, as a free replacement for the Bourne shell, and it is still the default on most Linux systems. A Bash script is a file of those same commands, plus variables, tests and loops to tie them together. Shell scripts start servers, build software, move files and glue other programs into pipelines. The rules feel odd at first, because everything is text and spaces matter, but they are few. Every example is a whole script and shows exactly what it prints. To run one yourself, save it as <code>hello.sh</code> and type <code>bash hello.sh</code>.",
  comment: "#",
  keywords: [
    "if", "then", "elif", "else", "fi", "for", "in", "do", "done", "while", "until", "case", "esac", "function", "local",
    "return", "exit", "declare", "readonly", "break", "continue",
  ],
  builtins: ["echo", "printf", "read", "cd", "test", "set", "shift", "export", "cat", "sort", "uniq", "wc", "grep", "tr", "cut", "head", "seq"],
  lessons: [
    {
      id: "first",
      title: "Your first script",
      summary: "echo, variables and quoting.",
      sections: [
        {
          p: "A script usually starts with the line <code>#!/usr/bin/env bash</code>, which tells the system to run the file with Bash. <code>echo</code> prints its arguments separated by spaces and ends the line. Anything after <code>#</code> is a comment.",
          code: `#!/usr/bin/env bash
# My first script
echo Hello, squirrel!
echo "Nuts:" 42`,
          out: "Hello, squirrel!\nNuts: 42",
        },
        {
          h: "Variables",
          p: "Set a variable with <code>name=value</code>, with <b>no spaces</b> around the <code>=</code>; with spaces, Bash would try to run a command called <code>name</code>. Read it back with <code>$name</code>, or <code>\${name}</code> when letters follow straight after. Double quotes let variables in; single quotes keep the text exactly as written.",
          code: `#!/usr/bin/env bash
name=Hazel
nuts=7
echo "$name has $nuts nuts"
echo '$name has $nuts nuts'
echo "\${name}s stash"`,
          out: "Hazel has 7 nuts\n$name has $nuts nuts\nHazels stash",
        },
        {
          h: "Why to quote",
          p: "Without quotes, Bash splits a variable's value into words at every space and squeezes runs of spaces away. Wrapping it in double quotes keeps it as one piece, exactly as stored. Quoting every <code>\"$variable\"</code> is the habit that prevents most shell bugs, especially with file names that contain spaces.",
          code: `#!/usr/bin/env bash
tree="old    oak"
echo $tree
echo "$tree"
printf '[%s]\\n' $tree
printf '[%s]\\n' "$tree"`,
          out: "old oak\nold    oak\n[old]\n[oak]\n[old    oak]",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `#!/usr/bin/env bash
tree=oak
echo "Up the $tree"
echo 'Up the $tree'`, options: ["Up the oak\nUp the $tree", "Up the oak\nUp the oak", "Up the $tree\nUp the $tree", "Up the $tree\nUp the oak"], answer: "Up the oak\nUp the $tree", why: "Double quotes put the variable's value in. Single quotes keep the text as written." },
        { kind: "output", q: "What does this print?", code: `#!/usr/bin/env bash
day=sun
echo "$dayday"
echo "\${day}day"`, options: ["\nsunday", "sunday\nsunday", "sunday\n", "$dayday\nsunday"], answer: "\nsunday", why: "$dayday asks for a variable called dayday, which isn't set, so it is empty. The braces mark where the name ends." },
        { q: "What goes wrong with  nuts = 5  in Bash?", options: ["Bash tries to run a command named nuts", "Nothing, it sets nuts to 5", "It sets nuts to \" 5\"", "It compares nuts with 5"], answer: "Bash tries to run a command named nuts", why: "With spaces, the line reads as a command (nuts) with two arguments (= and 5). Assignments must have no spaces." },
      ],
    },
    {
      id: "tests",
      title: "Arithmetic and tests",
      summary: "$(( )), [[ ]], if and exit status.",
      sections: [
        {
          p: "Everything in Bash is text, so <code>1+2</code> is just three characters. Arithmetic goes inside <code>$(( ... ))</code>, where variables don't need their <code>$</code>. It works on whole numbers only: <code>/</code> drops the fraction and <code>%</code> gives the remainder. <code>(( nuts++ ))</code> changes a variable without printing anything.",
          code: `#!/usr/bin/env bash
nuts=17
squirrels=5
echo 1+2
echo $(( 1 + 2 ))
echo $(( nuts / squirrels )) $(( nuts % squirrels ))
(( nuts++ ))
echo $nuts`,
          out: "1+2\n3\n3 2\n18",
        },
        {
          h: "if and [[ ]]",
          p: "<code>if</code> runs a command and checks whether it <b>succeeded</b>. <code>[[ ... ]]</code> is a test command: inside it, <code>==</code> and <code>!=</code> compare text, and <code>-lt</code>, <code>-gt</code>, <code>-eq</code> compare numbers. For numbers, <code>(( ... ))</code> lets you write <code>&lt;</code> and <code>&gt;</code> as usual. The block ends with <code>fi</code>, which is <code>if</code> backwards.",
          code: `#!/usr/bin/env bash
nuts=12
if (( nuts > 20 )); then
    echo feast
elif [[ $nuts -gt 10 ]]; then
    echo "good day"
else
    echo "keep looking"
fi
name=Hazel
if [[ $name == H* ]]; then
    echo "starts with H"
fi`,
          out: "good day\nstarts with H",
        },
        {
          h: "Exit status",
          p: "Every command finishes with an <b>exit status</b>: 0 means success and anything else means failure. <code>$?</code> holds the last command's status. <code>&amp;&amp;</code> runs the next command only if the last one succeeded, and <code>||</code> only if it failed. This is how scripts react to errors.",
          code: `#!/usr/bin/env bash
[[ 3 -lt 5 ]]
echo "status $?"
[[ 3 -gt 5 ]]
echo "status $?"
[[ -e nest.txt ]] && echo "nest found" || echo "no nest yet"
touch nest.txt
[[ -e nest.txt ]] && echo "nest found" || echo "no nest yet"`,
          out: "status 0\nstatus 1\nno nest yet\nnest found",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `#!/usr/bin/env bash
a=7
b=2
echo $(( a / b )) $(( a * b ))`, options: ["3 14", "3.5 14", "7/2 7*2", "3 9"], answer: "3 14", why: "Bash arithmetic uses whole numbers, so 7 / 2 drops the .5." },
        { kind: "output", q: "What does this print?", code: `#!/usr/bin/env bash
if [[ 10 < 9 ]]; then echo text; fi
if (( 10 < 9 )); then echo number; fi`, options: ["text", "number", "text\nnumber", "nothing"], answer: "text", why: "Inside [[ ]], < compares as text, and \"10\" sorts before \"9\". Inside (( )) it compares numbers, and 10 is not less than 9." },
        { q: "What exit status means a command succeeded?", options: ["0", "1", "-1", "Any positive number"], answer: "0", why: "There is one way to succeed and many ways to fail, so success is 0 and the other numbers name kinds of failure." },
      ],
    },
    {
      id: "loops",
      title: "Loops",
      summary: "for over lists and ranges, while, and case.",
      sections: [
        {
          p: "<code>for x in a b c</code> runs the body once for each word. <code>{1..5}</code> expands to the numbers 1 to 5, and the C-style <code>for (( i = 0; i &lt; 3; i++ ))</code> works too. A <code>for</code> over a pattern like <code>*.txt</code> visits matching files. The body sits between <code>do</code> and <code>done</code>.",
          code: `#!/usr/bin/env bash
for tree in oak ash hazel; do
    echo "climbing $tree"
done
for n in {1..5}; do
    printf '%s ' "$n"
done
echo
for (( i = 10; i > 0; i -= 4 )); do
    printf '%s ' "$i"
done
echo`,
          out: "climbing oak\nclimbing ash\nclimbing hazel\n1 2 3 4 5 \n10 6 2 ",
        },
        {
          h: "while and case",
          p: "<code>while</code> repeats as long as its command succeeds. <code>case</code> matches a value against patterns, each ending in <code>)</code>, with <code>;;</code> to finish a branch and <code>*</code> as the catch-all. It closes with <code>esac</code>.",
          code: `#!/usr/bin/env bash
height=1
while (( height < 20 )); do
    height=$(( height * 3 ))
done
echo "$height"
for day in sat mon wed; do
    case $day in
        sat|sun) echo "$day: nap in the drey" ;;
        mon)     echo "$day: bury nuts" ;;
        *)       echo "$day: forage" ;;
    esac
done`,
          out: "27\nsat: nap in the drey\nmon: bury nuts\nwed: forage",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `#!/usr/bin/env bash
total=0
for n in {1..4}; do
    total=$(( total + n ))
done
echo $total`, options: ["10", "1234", "4", "0+1+2+3+4"], answer: "10", why: "{1..4} gives 1, 2, 3 and 4, and $(( )) adds each to the total." },
        { kind: "output", q: "What does this print?", code: `#!/usr/bin/env bash
for f in report.txt photo.jpg notes.txt; do
    case $f in
        *.txt) echo "text: $f" ;;
    esac
done`, options: ["text: report.txt\ntext: notes.txt", "text: report.txt", "text: report.txt\ntext: photo.jpg\ntext: notes.txt", "text: *.txt"], answer: "text: report.txt\ntext: notes.txt", why: "case patterns work like file name patterns, so *.txt matches any name ending in .txt." },
      ],
    },
    {
      id: "arrays",
      title: "Arrays and expansions",
      summary: "Indexed and associative arrays, defaults and trimming.",
      sections: [
        {
          p: "An array holds a list: <code>trees=(oak ash)</code>. <code>trees+=(hazel)</code> adds to it. <code>\${trees[0]}</code> reads one element, <code>\"\${trees[@]}\"</code> gives all of them as separate words, and <code>\${#trees[@]}</code> counts them. The braces are required here.",
          code: `#!/usr/bin/env bash
trees=(oak ash)
trees+=(hazel "silver birch")
echo "\${#trees[@]} trees"
echo "first: \${trees[0]}, last: \${trees[-1]}"
for t in "\${trees[@]}"; do
    echo "- $t"
done`,
          out: "4 trees\nfirst: oak, last: silver birch\n- oak\n- ash\n- hazel\n- silver birch",
        },
        {
          h: "Associative arrays",
          p: "<code>declare -A</code> makes an associative array, which maps text keys to values. <code>\${!stash[@]}</code> lists the keys. Bash keeps them in no particular order, so the example pipes them through <code>sort</code> to print them in a fixed order.",
          code: `#!/usr/bin/env bash
declare -A stash
stash[oak]=4
stash[hazel]=9
stash[oak]=$(( stash[oak] + 1 ))
for tree in $(printf '%s\\n' "\${!stash[@]}" | sort); do
    echo "$tree: \${stash[$tree]}"
done`,
          out: "hazel: 9\noak: 5",
        },
        {
          h: "Parameter expansion",
          p: "Braces can also change a value as it is read. <code>\${name:-default}</code> gives a fallback when the variable is empty or unset. <code>\${#name}</code> is the length. <code>\${file%.txt}</code> trims a pattern from the end and <code>\${path##*/}</code> trims everything up to the last slash. <code>\${name^^}</code> makes it upper case.",
          code: `#!/usr/bin/env bash
file="/home/hazel/stash.txt"
echo "\${who:-nobody}"
echo "\${#file}"
echo "\${file##*/}"
echo "\${file%.txt}.bak"
name=hazel
echo "\${name^^}"`,
          out: "nobody\n21\nstash.txt\n/home/hazel/stash.bak\nHAZEL",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `#!/usr/bin/env bash
a=(x y z)
a+=(w)
echo "\${#a[@]} \${a[1]}"`, options: ["4 y", "4 x", "3 y", "1 y"], answer: "4 y", why: "There are four elements after the +=, and index 1 is the second one, y." },
        { kind: "output", q: "What does this print?", code: `#!/usr/bin/env bash
photo="holiday.final.jpg"
echo "\${photo%.*}"
echo "\${photo%%.*}"`, options: ["holiday.final\nholiday", "holiday\nholiday.final", "holiday.final\nholiday.final", "jpg\nfinal.jpg"], answer: "holiday.final\nholiday", why: "% trims the shortest match from the end (.jpg). %% trims the longest (.final.jpg)." },
      ],
    },
    {
      id: "functions",
      title: "Functions",
      summary: "Arguments, local variables, return status and output.",
      sections: [
        {
          p: "A function is defined with <code>name() { ... }</code> and called like any command. Its arguments arrive as <code>$1</code>, <code>$2</code> and so on, <code>$#</code> counts them and <code>\"$@\"</code> is all of them. <code>local</code> keeps a variable inside the function; without it, the function would change the caller's variable of the same name.",
          code: `#!/usr/bin/env bash
greet() {
    local who=$1
    local greeting=\${2:-Hello}
    echo "$greeting, $who ($# arguments)"
}
greet Hazel
greet Acorn Hi
count=0
bump() { count=$(( count + 1 )); }
bump
bump
echo "count is $count"`,
          out: "Hello, Hazel (1 arguments)\nHi, Acorn (2 arguments)\ncount is 2",
        },
        {
          h: "Returning values",
          p: "<code>return</code> only sets the exit status, a number from 0 to 255, which is meant for success or failure. To hand back a real value, a function <b>prints</b> it and the caller captures the output with <code>$( ... )</code>, called command substitution.",
          code: `#!/usr/bin/env bash
is_even() {
    (( $1 % 2 == 0 ))
}
square() {
    echo $(( $1 * $1 ))
}
for n in 3 4; do
    if is_even "$n"; then echo "$n is even"; else echo "$n is odd"; fi
done
area=$(square 6)
echo "area is $area"`,
          out: "3 is odd\n4 is even\narea is 36",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `#!/usr/bin/env bash
x=outside
change() { local x=inside; echo "$x"; }
change
echo "$x"`, options: ["inside\noutside", "inside\ninside", "outside\noutside", "outside\ninside"], answer: "inside\noutside", why: "local makes a separate x that disappears when the function ends, so the outer x is untouched." },
        { kind: "output", q: "What does this print?", code: `#!/usr/bin/env bash
shout() { echo "\${1^^}!"; }
word=$(shout nuts)
echo "[$word]"`, options: ["[NUTS!]", "NUTS!\n[]", "[nuts!]", "[0]"], answer: "[NUTS!]", why: "$( ) captures what the function prints instead of letting it reach the screen, so it all ends up inside the brackets." },
      ],
    },
    {
      id: "pipes",
      title: "Pipes, files and redirection",
      summary: ">, >>, <, |, here-documents and small tools working together.",
      sections: [
        {
          p: "<code>&gt;</code> sends a command's output into a file, replacing what was there, and <code>&gt;&gt;</code> adds to the end. <code>&lt;</code> feeds a file in as input. A <b>here-document</b>, <code>&lt;&lt;EOF</code> up to a line that says <code>EOF</code>, feeds the lines in between. <code>while read</code> takes input one line at a time.",
          code: `#!/usr/bin/env bash
echo "oak 4" > stash.txt
echo "hazel 9" >> stash.txt
cat <<EOF >> stash.txt
beech 2
ash 7
EOF
wc -l < stash.txt
while read -r tree nuts; do
    echo "$tree has $nuts"
done < stash.txt`,
          out: "4\noak has 4\nhazel has 9\nbeech has 2\nash has 7",
        },
        {
          h: "Pipelines",
          p: "<code>|</code> sends one command's output straight into the next command's input. Small tools, each doing one job, chain into a pipeline: <code>tr</code> changes characters, <code>sort</code> sorts lines, <code>uniq -c</code> counts repeated lines next to each other, and <code>head</code> keeps the first few. This is the Unix way of working, and Bash is the glue.",
          code: `#!/usr/bin/env bash
words="oak ash oak hazel oak ash"
echo "$words" | tr ' ' '\\n' | sort | uniq -c | sort -rn | head -2
echo "$words" | wc -w
echo $(( $(seq 1 5 | paste -sd+) ))`,
          out: "      3 oak\n      2 ash\n6\n15",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `#!/usr/bin/env bash
echo one > f.txt
echo two > f.txt
echo three >> f.txt
cat f.txt`, options: ["two\nthree", "one\ntwo\nthree", "three", "one\nthree"], answer: "two\nthree", why: "The second > replaces the file's contents, and >> then adds a line to the end." },
        { kind: "output", q: "What does this print?", code: `#!/usr/bin/env bash
printf 'c\\na\\nb\\na\\n' | sort | uniq | wc -l`, options: ["3", "4", "2", "1"], answer: "3", why: "sort puts the two a lines next to each other, uniq collapses them, and three lines are left: a, b and c." },
      ],
    },
    {
      id: "strings",
      title: "Working with strings",
      summary: "Length, slices, trimming patterns, replacing and changing case.",
      sections: [
        {
          p: "Bash can cut and change the text in a variable without calling another program. <code>${#var}</code> is its length and <code>${var:start:length}</code> a slice. <code>${var#pattern}</code> removes the shortest match from the front and <code>${var##pattern}</code> the longest; <code>%</code> and <code>%%</code> do the same from the back. The patterns are the same wildcards as file names: <code>*</code>, <code>?</code> and <code>[abc]</code>.",
          code: `path="/home/hazel/stash/acorns.tar.gz"
echo "length: \${#path}"
echo "first 5: \${path:0:5}"
echo "file: \${path##*/}"
echo "folder: \${path%/*}"
echo "no last extension: \${path%.*}"
echo "no extensions: \${path%%.*}"
echo "extension: \${path#*.}"`,
          out: "length: 31\nfirst 5: /home\nfile: acorns.tar.gz\nfolder: /home/hazel/stash\nno last extension: /home/hazel/stash/acorns.tar\nno extensions: /home/hazel/stash/acorns\nextension: tar.gz",
        },
        {
          h: "Replacing and case",
          p: "<code>${var/old/new}</code> replaces the first match and <code>${var//old/new}</code> every match. <code>${var^^}</code> makes the text upper case, <code>${var,,}</code> lower case, and <code>${var^}</code> capitalizes the first letter.",
          code: `line="acorn, walnut, acorn, pecan"
echo "\${line/acorn/hazelnut}"
echo "\${line//acorn/hazelnut}"
echo "\${line//, /;}"
name="hazel"
echo "\${name^} \${name^^}"
shout="STOP THAT"
echo "\${shout,,}"`,
          out: "hazelnut, walnut, acorn, pecan\nhazelnut, walnut, hazelnut, pecan\nacorn;walnut;acorn;pecan\nHazel HAZEL\nstop that",
        },
        {
          h: "Matching with [[ ]]",
          p: "Inside <code>[[ ]]</code>, <code>==</code> compares against a wildcard pattern and <code>=~</code> against a regular expression. After a regex match, the parts in parentheses are in the array <code>BASH_REMATCH</code>.",
          code: `for f in notes.txt photo.JPG data.csv; do
  if [[ $f == *.txt || $f == *.csv ]]; then
    echo "$f is text"
  else
    echo "$f is something else"
  fi
done

entry="day 12: walnut x7"
if [[ $entry =~ ^day\\ ([0-9]+):\\ ([a-z]+)\\ x([0-9]+)$ ]]; then
  echo "day=\${BASH_REMATCH[1]} nut=\${BASH_REMATCH[2]} count=\${BASH_REMATCH[3]}"
fi`,
          out: "notes.txt is text\nphoto.JPG is something else\ndata.csv is text\nday=12 nut=walnut count=7",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `f="report.final.pdf"
echo "\${f%.*} \${f##*.}"`, options: ["report.final pdf", "report final.pdf", "report pdf", "report.final.pdf pdf"], answer: "report.final pdf", why: "%.* removes the shortest .something from the end; ##*. removes everything up to the last dot." },
        { kind: "output", q: "What does this print?", code: `s="banana"
echo "\${s//a/o} \${#s}"`, options: ["bonono 6", "bonana 6", "banana 6", "bonono 3"], answer: "bonono 6", why: "// replaces every a, and the length of banana is 6." },
        { q: "Where does Bash put the groups of a =~ match?", options: ["In the array BASH_REMATCH", "In $1, $2 and so on", "In the variable MATCH", "Nowhere; =~ only says yes or no"], answer: "In the array BASH_REMATCH", why: "Index 0 is the whole match and 1, 2 … are the groups." },
      ],
    },
    {
      id: "errors",
      title: "Exit codes and safe scripts",
      summary: "&&, ||, set -euo pipefail and trap.",
      sections: [
        {
          p: "Every command ends with an exit status: 0 for success, anything else for failure. <code>$?</code> holds the last one. <code>a &amp;&amp; b</code> runs <code>b</code> only if <code>a</code> succeeded, and <code>a || b</code> runs <code>b</code> only if <code>a</code> failed, which makes a short way to give a fallback or a message.",
          code: `mkdir stash && echo "made stash"
mkdir stash 2>/dev/null || echo "stash already there"
false
echo "false gave $?"
true
echo "true gave $?"
grep -q acorn <<< "walnut pecan" || echo "no acorns"
[[ -d stash ]] && echo "stash is a folder"`,
          out: "made stash\nstash already there\nfalse gave 1\ntrue gave 0\nno acorns\nstash is a folder",
        },
        {
          h: "set -euo pipefail",
          p: "By default a script carries on after a failed command, which can do damage. Many scripts start with <code>set -euo pipefail</code>: <code>-e</code> stops at the first failing command, <code>-u</code> treats an unset variable as an error, and <code>-o pipefail</code> makes a pipeline fail if any part of it fails, not just the last. A command tested by <code>if</code>, <code>&amp;&amp;</code> or <code>||</code> doesn't stop the script.",
          code: `set -euo pipefail

count_nuts() {
  local file=$1
  if [[ ! -f $file ]]; then
    echo "no file $file" >&2
    return 1
  fi
  wc -l < "$file"
}

printf 'acorn\\nwalnut\\n' > stash.txt
echo "lines: $(count_nuts stash.txt)"
if ! count_nuts missing.txt 2>/dev/null; then
  echo "handled the missing file"
fi
echo "\${UNSET_THING:-default used}"`,
          out: "lines: 2\nhandled the missing file\ndefault used",
        },
        {
          h: "trap",
          p: "<code>trap 'commands' EXIT</code> runs the commands when the script ends, however it ends. It's the usual way to clean up temporary files. Here the subshell in parentheses stands for a whole script: it stops at the failure, and its trap still runs.",
          code: `(
  set -e
  tmp=$(mktemp -d)
  trap 'rm -rf "$tmp"; echo "cleaned up"' EXIT
  echo "working in a temp folder"
  touch "$tmp/nuts"
  false
  echo "never printed"
)
echo "script exit status: $?"`,
          out: "working in a temp folder\ncleaned up\nscript exit status: 1",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `false && echo a || echo b`, options: ["b", "a", "a\nb", "nothing"], answer: "b", why: "false fails, so echo a is skipped, and || runs echo b." },
        { q: "What does set -o pipefail change?", options: ["A pipeline fails if any command in it fails, not only the last", "Pipes are run one after another", "Errors in pipes are ignored", "It stops pipes from being used"], answer: "A pipeline fails if any command in it fails, not only the last", why: "Without it, cmd_that_fails | sort succeeds because sort does." },
        { kind: "output", q: "What does this print?", code: `( trap 'echo bye' EXIT; echo hi; exit 3 )
echo $?`, options: ["hi\nbye\n3", "hi\n3", "bye\nhi\n3", "hi\nbye\n0"], answer: "hi\nbye\n3", why: "The trap runs as the subshell exits, and the exit status 3 is kept." },
      ],
    },
    {
      id: "arguments",
      title: "Script arguments and options",
      summary: "$#, $@, shift and getopts.",
      sections: [
        {
          p: "A script's arguments are <code>$1</code>, <code>$2</code> and so on; <code>$#</code> is how many there are, and <code>\"$@\"</code> is all of them, each kept whole even if it has spaces. <code>shift</code> drops the first one and moves the rest down. A function gets its own arguments the same way, so the example uses one to stand for a script.",
          code: `show_args() {
  echo "$# arguments"
  for a in "$@"; do
    echo "  [$a]"
  done
  shift
  echo "after shift, first is [$1]"
}

show_args acorn "two words" pecan`,
          out: "3 arguments\n  [acorn]\n  [two words]\n  [pecan]\nafter shift, first is [two words]",
        },
        {
          h: "Options with getopts",
          p: "<code>getopts</code> reads options such as <code>-v</code> or <code>-n 5</code>. The string <code>\"vn:\"</code> lists the letters it knows; a colon after a letter means it takes a value, which arrives in <code>OPTARG</code>. Afterwards, <code>shift $((OPTIND - 1))</code> leaves only the plain arguments.",
          code: `count_nuts() {
  local verbose=0 limit=10 opt OPTIND=1
  while getopts "vn:" opt; do
    case $opt in
      v) verbose=1 ;;
      n) limit=$OPTARG ;;
      *) echo "usage: count_nuts [-v] [-n limit] nut..."; return 2 ;;
    esac
  done
  shift $((OPTIND - 1))
  (( verbose )) && echo "limit is $limit, nuts are: $*"
  echo "$(( $# < limit ? $# : limit )) nuts counted"
}

count_nuts acorn walnut pecan
count_nuts -v -n 2 acorn walnut pecan
count_nuts -x acorn 2>/dev/null || echo "exit status $?"`,
          out: "3 nuts counted\nlimit is 2, nuts are: acorn walnut pecan\n2 nuts counted\nusage: count_nuts [-v] [-n limit] nut...\nexit status 2",
        },
      ],
      practice: [
        { q: "Why write \"$@\" with the quotes?", options: ["So each argument stays one word, even if it has spaces", "So the arguments are joined into one string", "Quotes are needed for $@ to work at all", "To sort the arguments"], answer: "So each argument stays one word, even if it has spaces", why: "Unquoted, \"two words\" would split into two arguments." },
        { kind: "output", q: "What does this print?", code: `f() { shift 2; echo "$# $1"; }
f a b c d`, options: ["2 c", "4 a", "2 a", "3 b"], answer: "2 c", why: "shift 2 drops a and b, leaving c and d." },
        { q: "In getopts \"ab:c\", which option takes a value?", options: ["-b", "-a", "-c", "All three"], answer: "-b", why: "A colon after a letter means that option needs a value." },
      ],
    },
    {
      id: "project",
      title: "Project: a stash report",
      summary: "Reading lines, matching, associative arrays and printf together.",
      sections: [
        {
          p: "This script writes a small log file, then reads it line by line with <code>while IFS= read -r</code>. A regular expression picks out the parts of each line; lines that don't fit are reported to standard error and skipped. An associative array adds up the nuts, and <code>printf</code> lays out a table, sorted with <code>sort</code>.",
          code: `set -euo pipefail

cat > stash.log <<'EOF'
2026-10-01 stored acorn 6
2026-10-01 stored hazelnut 2
2026-10-02 stored walnut 1
2026-10-02 ate acorn 1
oops this line is broken
2026-10-03 stored acorn 9
2026-10-03 ate hazelnut 1
EOF

declare -A total=()
stored=0 ate=0 bad=0
while IFS= read -r line; do
  if [[ $line =~ ^[0-9-]+\\ (stored|ate)\\ ([a-z]+)\\ ([0-9]+)$ ]]; then
    action=\${BASH_REMATCH[1]} nut=\${BASH_REMATCH[2]} n=\${BASH_REMATCH[3]}
    if [[ $action == stored ]]; then
      total[$nut]=$(( \${total[$nut]:-0} + n ))
      stored=$(( stored + n ))
    else
      total[$nut]=$(( \${total[$nut]:-0} - n ))
      ate=$(( ate + n ))
    fi
  else
    bad=$(( bad + 1 ))
  fi
done < stash.log

for nut in "\${!total[@]}"; do
  printf '%-9s %3d\\n' "$nut" "\${total[$nut]}"
done | sort -k2,2nr -k1,1
echo "stored $stored, ate $ate, left $(( stored - ate )), unreadable lines: $bad"`,
          out: "acorn      14\nhazelnut    1\nwalnut      1\nstored 18, ate 2, left 16, unreadable lines: 1",
        },
        {
          h: "Ideas to try",
          p: "Take the log file's name as an argument with a <code>-f</code> option, print a total per day, or warn when a nut's count would go below zero.",
        },
      ],
      practice: [
        { q: "Why read lines with while IFS= read -r line?", options: ["IFS= keeps leading spaces and -r keeps backslashes, so each line arrives exactly", "It makes the loop faster", "It splits each line into words", "It skips empty lines"], answer: "IFS= keeps leading spaces and -r keeps backslashes, so each line arrives exactly", why: "Without them, read trims spaces and treats backslashes as escapes." },
        { kind: "output", q: "What does this print?", code: `declare -A n=([a]=1)
n[a]=$(( \${n[a]:-0} + 2 ))
n[b]=$(( \${n[b]:-0} + 5 ))
echo "\${n[a]} \${n[b]} \${#n[@]}"`, options: ["3 5 2", "1 5 2", "3 5 1", "12 5 2"], answer: "3 5 2", why: "a goes from 1 to 3, b starts from the default 0 to 5, and there are two keys." },
        { q: "What does sort -k2,2nr -k1,1 do to the table?", options: ["Sorts by the second column as a number, largest first, then by name", "Sorts by name, then by number", "Reverses the lines", "Removes duplicate lines"], answer: "Sorts by the second column as a number, largest first, then by name", why: "Each -k gives a key; n is numeric and r reverses it, and the second key breaks ties." },
      ],
    },
  ],
};
