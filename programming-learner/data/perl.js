// Perl course for the Programming Learner. Written for this project.
// Examples are complete Perl 5 scripts. tools/run_perl.py runs them with perl
// and checks the printed output.
window.PROGRAMMING = window.PROGRAMMING || {};
window.PROGRAMMING.perl = {
  id: "perl",
  name: "Perl",
  title: "Perl, the text-wrangling language",
  intro:
    "Larry Wall released Perl in 1987 to pull reports out of messy text files, and it became the glue of early web servers and system administration: CGI scripts, log crunchers, build tools. Its motto is \"there's more than one way to do it\", and its regular expressions were so good that most other languages copied them. Variable names carry a sigil that says what they hold: <code>$</code> for one value, <code>@</code> for a list, <code>%</code> for a hash. These lessons use Perl 5, which still ships with most Linux and macOS systems. Every example is a whole script and shows exactly what it prints. To run one yourself, save it as <code>hello.pl</code> and type <code>perl hello.pl</code>.",
  comment: "#",
  keywords: [
    "my", "our", "use", "strict", "warnings", "feature", "sub", "return", "if", "elsif", "else", "unless", "foreach", "for",
    "while", "until", "last", "next", "and", "or", "not", "eq", "ne", "lt", "gt", "cmp",
  ],
  builtins: ["print", "say", "push", "pop", "shift", "sort", "reverse", "keys", "values", "exists", "join", "split", "length", "uc", "lc", "scalar", "sprintf", "printf", "map", "grep"],
  lessons: [
    {
      id: "first",
      title: "Your first script",
      summary: "print, say, strict, and strings.",
      sections: [
        {
          p: "Start every script with <code>use strict;</code> and <code>use warnings;</code>: they make Perl complain about typos and mistakes instead of guessing. <code>print</code> prints exactly what it is given, so you add <code>\"\\n\"</code> yourself. <code>use feature 'say';</code> turns on <code>say</code>, which is <code>print</code> with the newline added.",
          code: `use strict;
use warnings;
use feature 'say';

print "Hello, squirrel!\\n";
say "Nuts: ", 42;`,
          out: "Hello, squirrel!\nNuts: 42",
        },
        {
          h: "Variables and strings",
          p: "<code>my</code> creates a variable. A single value, called a <b>scalar</b>, has a <code>$</code> in front. The dot <code>.</code> joins strings and <code>x</code> repeats one. Inside double quotes a variable is replaced by its value; single quotes keep the text exactly as written.",
          code: `use strict;
use warnings;
use feature 'say';

my $name = "Hazel";
my $nuts = 7;
say "Hi, " . $name . "!";
say "$name has $nuts nuts";
say '$name has $nuts nuts';
say "-" x 10;`,
          out: "Hi, Hazel!\nHazel has 7 nuts\n$name has $nuts nuts\n----------",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `use strict;
use warnings;

my $tree = "oak";
print "Up the $tree\\n";
print 'Up the $tree';`, options: ["Up the oak\nUp the $tree", "Up the oak\nUp the oak", "Up the $tree\nUp the $tree", "Up the $tree\nUp the oak"], answer: "Up the oak\nUp the $tree", why: "Double quotes put the variable's value in. Single quotes print the text as written." },
        { kind: "output", q: "What does this print?", code: `use strict;
use warnings;
use feature 'say';

say "ab" x 3;
say "ab" . 3;`, options: ["ababab\nab3", "ab3\nababab", "ababab\nababab", "ab ab ab\nab3"], answer: "ababab\nab3", why: "x repeats a string the given number of times. The dot just joins." },
        { q: "What does use strict make Perl do?", options: ["Refuse variables that weren't declared with my", "Run faster", "Turn on the say command", "Print every line as it runs"], answer: "Refuse variables that weren't declared with my", why: "Without it, a misspelled variable name quietly becomes a new, empty variable." },
      ],
    },
    {
      id: "values",
      title: "Numbers, strings and comparing",
      summary: "One scalar type, two sets of comparison operators.",
      sections: [
        {
          p: "A scalar can hold a number or a string, and Perl converts between them as needed: <code>\"4\" + 3</code> is 7, and <code>4 . 3</code> is the string \"43\". Division gives a fraction when one is needed. <code>int</code> drops the fraction and <code>%</code> gives the remainder; <code>**</code> raises to a power.",
          code: `use strict;
use warnings;
use feature 'say';

say 17 / 5;
say int(17 / 5);
say 17 % 5;
say 2 ** 10;
say "4" + 3;
say 4 . 3;`,
          out: "3.4\n3\n2\n1024\n7\n43",
        },
        {
          h: "Two kinds of comparison",
          p: "Because a scalar may be either, Perl has separate operators for comparing numbers and strings. Numbers use symbols: <code>==</code>, <code>!=</code>, <code>&lt;</code>, <code>&gt;</code>. Strings use words: <code>eq</code>, <code>ne</code>, <code>lt</code>, <code>gt</code>. Picking the wrong one gives a surprising answer: as strings, <code>\"10\"</code> comes before <code>\"9\"</code>, because <code>1</code> sorts before <code>9</code>.",
          code: `use strict;
use warnings;
use feature 'say';

say 10 > 9 ? "bigger" : "smaller";
say "10" gt "9" ? "bigger" : "smaller";
say "1.0" == 1 ? "same number" : "different";
say "1.0" eq "1" ? "same text" : "different text";`,
          out: "bigger\nsmaller\nsame number\ndifferent text",
        },
        {
          h: "Truth",
          p: "Perl has no separate true and false values. The number <code>0</code>, the strings <code>\"\"</code> and <code>\"0\"</code>, and <code>undef</code> (no value at all) count as false; everything else is true. <code>//</code> gives a fallback when a value is <code>undef</code>.",
          code: `use strict;
use warnings;
use feature 'say';

for my $v (0, 1, "", "0", "0.0", "nuts") {
    say "'$v' is ", ($v ? "true" : "false");
}
my $found;
say $found // "nothing yet";`,
          out: "'0' is false\n'1' is true\n'' is false\n'0' is false\n'0.0' is true\n'nuts' is true\nnothing yet",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `use strict;
use warnings;
use feature 'say';

say "abc" lt "abd" ? "yes" : "no";
say 100 < 20 ? "yes" : "no";`, options: ["yes\nno", "no\nyes", "yes\nyes", "no\nno"], answer: "yes\nno", why: "lt compares letter by letter, and c comes before d. 100 < 20 compares numbers, and it is false." },
        { kind: "output", q: "What does this print?", code: `use strict;
use warnings;
use feature 'say';

say "3 nuts" =~ /^\\d/ ? "starts with a digit" : "no digit";
say 7 . 7 + 1;`, options: ["starts with a digit\n78", "starts with a digit\n15", "no digit\n78", "starts with a digit\n771"], answer: "starts with a digit\n78", why: "Dot and + have the same priority and go left to right: 7 . 7 is \"77\", and \"77\" + 1 is 78." },
        { q: "Which of these values is true in Perl?", options: ["\"0.0\"", "0", "\"0\"", "\"\""], answer: "\"0.0\"", why: "Only 0, \"0\", \"\" and undef are false. \"0.0\" is a non-empty string that isn't exactly \"0\"." },
      ],
    },
    {
      id: "collections",
      title: "Arrays and hashes",
      summary: "@lists, %hashes, push, sort and keys.",
      sections: [
        {
          p: "An array holds a list and its name starts with <code>@</code>. To read one element you write <code>$trees[0]</code>, with a <code>$</code>, because one element is a scalar. <code>push</code> adds to the end, <code>pop</code> takes from the end, and <code>scalar(@trees)</code> counts the elements. <code>$trees[-1]</code> is the last one.",
          code: `use strict;
use warnings;
use feature 'say';

my @trees = ("oak", "ash");
push @trees, "hazel";
say scalar(@trees);
say $trees[0], " ", $trees[-1];
say join(", ", @trees);
say "@trees";
my $last = pop @trees;
say "$last; left: @trees";`,
          out: "3\noak hazel\noak, ash, hazel\noak ash hazel\nhazel; left: oak ash",
        },
        {
          h: "Hashes",
          p: "A hash maps keys to values and its name starts with <code>%</code>. One value is <code>$stash{oak}</code>, again with a <code>$</code>. A hash keeps no order, so code that prints one usually walks through <code>sort keys %stash</code>. <code>exists</code> checks whether a key is there.",
          code: `use strict;
use warnings;
use feature 'say';

my %stash = (oak => 4, hazel => 9);
$stash{beech} = 2;
$stash{oak}++;
for my $tree (sort keys %stash) {
    say "$tree: $stash{$tree}";
}
say exists $stash{pine} ? "pine found" : "no pine";`,
          out: "beech: 2\nhazel: 9\noak: 5\nno pine",
        },
        {
          h: "sort, map and grep",
          p: "<code>sort</code> on its own sorts as strings. For numbers, give it a block: <code>sort { $a &lt;=&gt; $b }</code>, where <code>&lt;=&gt;</code> compares two numbers. <code>grep</code> keeps the items whose block is true and <code>map</code> changes each one; inside both, <code>$_</code> is the current item.",
          code: `use strict;
use warnings;
use feature 'say';

my @nuts = (5, 12, 3, 8, 20);
say join " ", sort @nuts;
say join " ", sort { $a <=> $b } @nuts;
my @big = grep { $_ > 4 } @nuts;
my @doubled = map { $_ * 2 } @big;
say "@doubled";`,
          out: "12 20 3 5 8\n3 5 8 12 20\n10 24 16 40",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `use strict;
use warnings;
use feature 'say';

my @a = ("x", "y", "z");
say scalar(@a), $a[1], $a[-1];`, options: ["3yz", "2yz", "3xz", "3zy"], answer: "3yz", why: "There are three elements. Index 1 is the second one, y, and -1 is the last, z." },
        { kind: "output", q: "What does this print?", code: `use strict;
use warnings;
use feature 'say';

say join ",", sort (9, 10, 100);`, options: ["10,100,9", "9,10,100", "100,10,9", "9,100,10"], answer: "10,100,9", why: "Plain sort compares as strings, character by character, so anything starting with 1 comes before 9." },
        { q: "Why is one element of @trees written $trees[0]?", options: ["One element is a single scalar value", "It is a typo Perl forgives", "$ means the first element", "Arrays can't be indexed with @"], answer: "One element is a single scalar value", why: "The sigil tells you what you get back: $ for one value, @ for a list." },
      ],
    },
    {
      id: "control",
      title: "Decisions and loops",
      summary: "if, unless, statement modifiers, foreach, last and next.",
      sections: [
        {
          p: "<code>if</code>, <code>elsif</code> and <code>else</code> work as in other languages, and the braces are always required. <code>unless</code> is the opposite of <code>if</code>. For one short statement Perl lets you put the condition after it, which reads like English: <code>say \"feast\" if $nuts &gt; 20;</code>.",
          code: `use strict;
use warnings;
use feature 'say';

my $nuts = 12;
if ($nuts > 20) {
    say "feast";
} elsif ($nuts > 10) {
    say "good day";
} else {
    say "keep looking";
}
say "time to bury some" if $nuts > 10;
say "still hungry" unless $nuts > 5;`,
          out: "good day\ntime to bury some",
        },
        {
          h: "Loops",
          p: "<code>foreach</code> (or just <code>for</code>) walks a list; <code>1..5</code> is the list of numbers from 1 to 5. <code>while</code> repeats while its test holds. <code>next</code> skips to the next pass and <code>last</code> leaves the loop.",
          code: `use strict;
use warnings;
use feature 'say';

for my $i (1..6) {
    next if $i == 3;
    last if $i == 5;
    print "$i ";
}
print "\\n";
my $height = 1;
$height *= 3 while $height < 20;
say $height;`,
          out: "1 2 4 \n27",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `use strict;
use warnings;
use feature 'say';

my $n = 0;
$n += $_ for 1..4;
say $n;`, options: ["10", "4", "1234", "0"], answer: "10", why: "The modifier form of for runs the statement once per item with $_ set, so it adds 1, 2, 3 and 4." },
        { kind: "output", q: "What does this print?", code: `use strict;
use warnings;
use feature 'say';

my $cold = 0;
say "go out" unless $cold;
say "stay in" if $cold;`, options: ["go out", "stay in", "go out\nstay in", "nothing"], answer: "go out", why: "$cold is 0, which is false, so unless runs its statement and if does not." },
      ],
    },
    {
      id: "regex",
      title: "Regular expressions",
      summary: "Matching, captures, substitution and split.",
      sections: [
        {
          p: "Regular expressions are where Perl shines. <code>$text =~ /pattern/</code> is true when the pattern is found. <code>\\d</code> matches a digit, <code>\\w</code> a letter, digit or underscore, <code>+</code> means one or more, and brackets <b>capture</b> what they matched into <code>$1</code>, <code>$2</code> and so on.",
          code: `use strict;
use warnings;
use feature 'say';

my $line = "Hazel buried 12 nuts on day 3";
if ($line =~ /(\\w+) buried (\\d+) nuts/) {
    say "who: $1";
    say "how many: $2";
}
say "mentions a day" if $line =~ /day \\d/;`,
          out: "who: Hazel\nhow many: 12\nmentions a day",
        },
        {
          h: "Substitution and every match",
          p: "<code>s/old/new/</code> replaces the first match; add <code>g</code> to replace them all, and <code>i</code> to ignore case. In list context a match with <code>g</code> returns every capture at once, which makes pulling all the numbers out of a line a one-liner.",
          code: `use strict;
use warnings;
use feature 'say';

my $note = "Oak oak OAK";
(my $quiet = $note) =~ s/oak/elm/gi;
say $quiet;
my @numbers = ("3 nuts, 12 seeds, 7 berries" =~ /(\\d+)/g);
say "@numbers";`,
          out: "elm elm elm\n3 12 7",
        },
        {
          h: "split and join",
          p: "<code>split</code> breaks a string apart wherever a pattern matches, and <code>join</code> glues a list back together. Together with a hash they turn a line of a data file into named fields.",
          code: `use strict;
use warnings;
use feature 'say';

my $row = "hazel:9:autumn";
my ($tree, $nuts, $season) = split /:/, $row;
say "$tree gave $nuts in $season";
my @words = split /\\s+/, "  up   the   tree ";
say scalar(@words), ": ", join("|", @words);`,
          out: "hazel gave 9 in autumn\n4: |up|the|tree",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `use strict;
use warnings;
use feature 'say';

my $s = "nut nut nut";
$s =~ s/nut/acorn/;
say $s;`, options: ["acorn nut nut", "acorn acorn acorn", "nut nut acorn", "nut nut nut"], answer: "acorn nut nut", why: "Without the g flag, s/// replaces only the first match." },
        { kind: "output", q: "What does this print?", code: `use strict;
use warnings;
use feature 'say';

"2026-11-04" =~ /(\\d+)-(\\d+)-(\\d+)/;
say "$3/$2/$1";`, options: ["04/11/2026", "2026/11/04", "11/04/2026", "$3/$2/$1"], answer: "04/11/2026", why: "The three brackets capture year, month and day into $1, $2 and $3, and the line prints them in reverse." },
        { q: "What does \\d+ match?", options: ["One or more digits", "Exactly one digit", "The letter d and a plus sign", "Any character"], answer: "One or more digits", why: "\\d is any digit and + means one or more of the thing before it." },
      ],
    },
    {
      id: "subs",
      title: "Subroutines and references",
      summary: "sub, @_, returning lists, and nested data with references.",
      sections: [
        {
          p: "<code>sub</code> defines a subroutine. The arguments arrive in the array <code>@_</code>; the usual first line copies them into named variables with <code>my ($a, $b) = @_;</code>. A sub can return a list, and the caller can unpack it straight into variables.",
          code: `use strict;
use warnings;
use feature 'say';

sub share {
    my ($nuts, $squirrels) = @_;
    $squirrels //= 2;
    return (int($nuts / $squirrels), $nuts % $squirrels);
}

my ($each, $left) = share(17, 5);
say "$each each, $left left over";
say join " ", share(9);`,
          out: "3 each, 2 left over\n4 1",
        },
        {
          h: "References",
          p: "An array or hash can't sit directly inside another one, so Perl uses <b>references</b>: a scalar that points at the real data. <code>[...]</code> makes a reference to a new array and <code>{...}</code> to a new hash. <code>-&gt;</code> follows the reference, and <code>@{...}</code> gets the whole list back. This is how Perl builds records and nested data.",
          code: `use strict;
use warnings;
use feature 'say';

my %squirrel = (
    name  => "Hazel",
    stash => [3, 4, 5],
    home  => { tree => "oak", height => 12 },
);
say $squirrel{name};
say $squirrel{stash}->[1];
say $squirrel{home}->{tree};
push @{ $squirrel{stash} }, 6;
say scalar @{ $squirrel{stash} };`,
          out: "Hazel\n4\noak\n4",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `use strict;
use warnings;
use feature 'say';

sub biggest {
    my $max = shift;
    for (@_) { $max = $_ if $_ > $max }
    return $max;
}
say biggest(4, 19, 7);`, options: ["19", "4", "7", "30"], answer: "19", why: "shift takes the first argument as the starting max, and the loop checks the rest." },
        { kind: "output", q: "What does this print?", code: `use strict;
use warnings;
use feature 'say';

my $list = [10, 20, 30];
my $copy = $list;
push @$copy, 40;
say scalar @$list;`, options: ["4", "3", "40", "1"], answer: "4", why: "Copying a reference copies the pointer, not the array. Both names point at the same array, which now has four items." },
      ],
    },
  ],
};
