// Java course for the Programming Learner. Written for this project.
// Examples are complete Java 21 source files. tools/run_java.py runs them with
// the single-file source launcher and checks the printed output.
window.PROGRAMMING = window.PROGRAMMING || {};
window.PROGRAMMING.java = {
  id: "java",
  name: "Java",
  title: "Java from the first class",
  intro:
    "Java arrived in 1995 with a promise: compile once, run on any machine that has a Java virtual machine. It became the language of big business systems, Android apps, university courses and tools like Minecraft's original edition. Everything in Java lives inside a class, every variable has a type the compiler checks, and memory is cleaned up for you by the garbage collector. These lessons use Java 21, which added records, switch expressions and <code>var</code> to cut down the typing older Java was known for. Every example is a whole file and shows exactly what it prints. To run one yourself, save it as <code>Main.java</code> and type <code>java Main.java</code>.",
  comment: "//",
  keywords: [
    "class", "public", "private", "static", "void", "int", "double", "boolean", "char", "long", "var", "final", "new", "return",
    "if", "else", "for", "while", "switch", "case", "default", "yield", "record", "interface", "implements", "extends", "this",
    "true", "false", "null", "import", "throw", "try", "catch",
  ],
  builtins: ["System", "out", "println", "print", "printf", "String", "Math", "List", "Map", "ArrayList", "HashMap", "main", "Integer"],
  lessons: [
    {
      id: "first",
      title: "Your first program",
      summary: "class, main and System.out.println.",
      sections: [
        {
          p: "A Java program is a class with a <code>main</code> method. The line <code>public static void main(String[] args)</code> looks like a lot, but every program starts with it, so it soon reads as one word. <code>System.out.println</code> prints a value and ends the line; <code>System.out.print</code> prints without ending it. Statements end with a semicolon.",
          code: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, squirrel!");
        System.out.print("Nuts: ");
        System.out.println(42);
    }
}`,
          out: "Hello, squirrel!\nNuts: 42",
        },
        {
          h: "Joining text",
          p: "<code>+</code> between a string and anything else joins them into a longer string. Java reads <code>+</code> from left to right, so numbers before the first string are still added as numbers.",
          code: `public class Main {
    public static void main(String[] args) {
        String name = "Hazel";
        System.out.println("Hi, " + name + "!");
        System.out.println(1 + 2 + " nuts");
        System.out.println("nuts " + 1 + 2);
    }
}`,
          out: "Hi, Hazel!\n3 nuts\nnuts 12",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `public class Main {
    public static void main(String[] args) {
        System.out.print("Up");
        System.out.print(" the");
        System.out.println(" tree");
    }
}`, options: ["Up the tree", "Up\n the\n tree", "Upthetree", "Up the\ntree"], answer: "Up the tree", why: "print does not end the line, so the three pieces land on one line. Only the last call, println, ends it." },
        { kind: "output", q: "What does this print?", code: `public class Main {
    public static void main(String[] args) {
        System.out.println("total " + 4 + 5);
    }
}`, options: ["total 45", "total 9", "total 4 5", "9 total"], answer: "total 45", why: "Java works left to right. \"total \" + 4 is already a string, so + 5 joins another character instead of adding." },
        { q: "Where does a Java program start running?", options: ["In the main method", "At the first line of the file", "In the class constructor", "In a method called start"], answer: "In the main method", why: "The launcher looks for public static void main(String[] args) and calls it." },
      ],
    },
    {
      id: "values",
      title: "Types and variables",
      summary: "int, double, boolean, String, var and final.",
      sections: [
        {
          p: "Every variable has a type, written before its name: <code>int</code> for whole numbers, <code>double</code> for numbers with a fraction, <code>boolean</code> for <code>true</code> or <code>false</code>, <code>char</code> for one character in single quotes, and <code>String</code> for text in double quotes. Dividing one <code>int</code> by another throws away the fraction; <code>%</code> gives the remainder.",
          code: `public class Main {
    public static void main(String[] args) {
        int nuts = 17;
        int squirrels = 5;
        double share = 17.0 / 5;
        boolean plenty = nuts > 10;
        char grade = 'A';
        System.out.println(nuts / squirrels);
        System.out.println(nuts % squirrels);
        System.out.println(share);
        System.out.println(plenty + " " + grade);
    }
}`,
          out: "3\n2\n3.4\ntrue A",
        },
        {
          h: "var and final",
          p: "<code>var</code> lets the compiler work out the type from the value, so <code>var count = 3;</code> is still an <code>int</code> and can only ever hold ints. <code>final</code> means the variable can't be given a new value. A cast like <code>(int) 3.9</code> turns a double into an int by cutting off the fraction, not by rounding.",
          code: `public class Main {
    public static void main(String[] args) {
        var count = 3;
        final double PRICE = 1.25;
        count = count + 1;
        System.out.println(count * PRICE);
        System.out.println((int) 3.9);
        System.out.println(Math.round(3.9));
    }
}`,
          out: "5.0\n3\n4",
        },
        {
          h: "Strings are objects",
          p: "A <code>String</code> has methods you call with a dot: <code>length()</code>, <code>toUpperCase()</code>, <code>charAt(i)</code> (counting from 0) and <code>contains</code>. Compare strings with <code>equals</code>, not <code>==</code>: <code>==</code> asks whether two variables point at the very same object, which is not the same question as whether they hold the same text.",
          code: `public class Main {
    public static void main(String[] args) {
        String tree = "Oak";
        System.out.println(tree.length());
        System.out.println(tree.toUpperCase());
        System.out.println(tree.charAt(0));
        String typed = new String("Oak");
        System.out.println(tree.equals(typed));
        System.out.println(tree == typed);
    }
}`,
          out: "3\nOAK\nO\ntrue\nfalse",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `public class Main {
    public static void main(String[] args) {
        System.out.println(7 / 2);
        System.out.println(7 / 2.0);
    }
}`, options: ["3\n3.5", "3.5\n3.5", "3\n3", "4\n3.5"], answer: "3\n3.5", why: "7 / 2 is int division and drops the .5. Once one side is a double, the result is a double." },
        { kind: "output", q: "What does this print?", code: `public class Main {
    public static void main(String[] args) {
        String a = "acorn";
        System.out.println(a.charAt(1) + "" + a.length());
    }
}`, options: ["c5", "a5", "c6", "o5"], answer: "c5", why: "charAt counts from 0, so position 1 is 'c'. The empty string in the middle makes + join text instead of adding character codes." },
        { q: "How should you check whether two Strings hold the same text?", options: ["a.equals(b)", "a == b", "a = b", "a.same(b)"], answer: "a.equals(b)", why: "equals compares the characters. == compares whether both names refer to the same object." },
      ],
    },
    {
      id: "control",
      title: "Decisions and loops",
      summary: "if, switch expressions, for, for-each and while.",
      sections: [
        {
          p: "<code>if</code> takes a condition in brackets and runs the block in braces when it is true. <code>&amp;&amp;</code> means and, <code>||</code> means or and <code>!</code> means not. A <b>switch expression</b> picks a value by matching cases with <code>-&gt;</code>; there is no fall-through to worry about.",
          code: `public class Main {
    public static void main(String[] args) {
        int nuts = 12;
        if (nuts > 20) {
            System.out.println("feast");
        } else if (nuts > 10 && nuts % 2 == 0) {
            System.out.println("even dozen-ish");
        } else {
            System.out.println("keep looking");
        }
        String day = "SAT";
        String plan = switch (day) {
            case "SAT", "SUN" -> "nap in the drey";
            case "MON" -> "bury nuts";
            default -> "forage";
        };
        System.out.println(plan);
    }
}`,
          out: "even dozen-ish\nnap in the drey",
        },
        {
          h: "Loops",
          p: "The classic <code>for</code> loop has three parts: a start, a condition checked before each pass, and a step. The <b>for-each</b> loop, <code>for (int n : nuts)</code>, visits every item of an array or list. <code>while</code> repeats as long as its condition holds.",
          code: `public class Main {
    public static void main(String[] args) {
        for (int i = 1; i <= 3; i++) {
            System.out.print(i + " ");
        }
        System.out.println();
        int[] nuts = {4, 9, 2};
        int total = 0;
        for (int n : nuts) {
            total += n;
        }
        System.out.println(total);
        int height = 1;
        while (height < 20) {
            height *= 3;
        }
        System.out.println(height);
    }
}`,
          out: "1 2 3 \n15\n27",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `public class Main {
    public static void main(String[] args) {
        int n = 3;
        String size = switch (n) {
            case 1 -> "one";
            case 2, 3 -> "a few";
            default -> "many";
        };
        System.out.println(size);
    }
}`, options: ["a few", "one", "many", "a few\nmany"], answer: "a few", why: "The arrow form runs only the matching case. 3 is listed with 2, so the value is \"a few\"." },
        { kind: "output", q: "What does this print?", code: `public class Main {
    public static void main(String[] args) {
        int count = 0;
        for (int i = 0; i < 10; i += 3) {
            count++;
        }
        System.out.println(count);
    }
}`, options: ["4", "3", "10", "9"], answer: "4", why: "i takes the values 0, 3, 6 and 9 before reaching 12, which fails the test. That is four passes." },
      ],
    },
    {
      id: "methods",
      title: "Methods and arrays",
      summary: "static methods, return values, overloading and arrays.",
      sections: [
        {
          p: "A method is a named block of code. Its header gives the return type, the name and the parameters with their types. <code>static</code> means you call it on the class itself, without making an object first. Two methods may share a name if their parameters differ; this is called <b>overloading</b>, and Java picks the one that fits the arguments.",
          code: `public class Main {
    static int square(int x) {
        return x * x;
    }

    static String describe(int nuts) {
        return nuts + " nuts";
    }

    static String describe(String kind, int nuts) {
        return nuts + " " + kind + " nuts";
    }

    public static void main(String[] args) {
        System.out.println(square(6));
        System.out.println(describe(3));
        System.out.println(describe("hazel", 5));
    }
}`,
          out: "36\n3 nuts\n5 hazel nuts",
        },
        {
          h: "Arrays",
          p: "An array holds a fixed number of values of one type. <code>new int[4]</code> makes four zeros; <code>{3, 1, 2}</code> lists the values directly. <code>length</code> (no brackets on arrays) gives the size, and indexes run from 0 to length minus 1. Reading past the end stops the program with an <code>ArrayIndexOutOfBoundsException</code>. <code>java.util.Arrays</code> has helpers to sort and print arrays.",
          code: `import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        int[] stash = {30, 12, 5, 8};
        Arrays.sort(stash);
        System.out.println(Arrays.toString(stash));
        System.out.println(stash.length + " " + stash[0]);
        int[] empty = new int[3];
        System.out.println(Arrays.toString(empty));
    }
}`,
          out: "[5, 8, 12, 30]\n4 5\n[0, 0, 0]",
        },
        {
          h: "Arrays are shared, ints are copied",
          p: "Passing an <code>int</code> to a method hands over a copy, so the method can't change the caller's variable. An array variable holds a reference to the array, so a method that is given it changes the same array the caller sees.",
          code: `import java.util.Arrays;

public class Main {
    static void addOne(int n) {
        n = n + 1;
    }

    static void addOneToAll(int[] ns) {
        for (int i = 0; i < ns.length; i++) {
            ns[i] = ns[i] + 1;
        }
    }

    public static void main(String[] args) {
        int nuts = 5;
        addOne(nuts);
        System.out.println(nuts);
        int[] piles = {1, 2};
        addOneToAll(piles);
        System.out.println(Arrays.toString(piles));
    }
}`,
          out: "5\n[2, 3]",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `public class Main {
    static int twice(int x) {
        return x * 2;
    }

    public static void main(String[] args) {
        System.out.println(twice(twice(3)));
    }
}`, options: ["12", "6", "9", "33"], answer: "12", why: "The inner call gives 6, and twice(6) is 12." },
        { kind: "output", q: "What does this print?", code: `public class Main {
    static void reset(int[] a) {
        a[0] = 0;
    }

    public static void main(String[] args) {
        int[] nuts = {7, 8};
        reset(nuts);
        System.out.println(nuts[0] + nuts[1]);
    }
}`, options: ["8", "15", "78", "0"], answer: "8", why: "The method changes the caller's array, so nuts is {0, 8}, and 0 + 8 is 8." },
        { q: "What is the last valid index of an array of length 5?", options: ["4", "5", "6", "-1"], answer: "4", why: "Indexes start at 0, so five items use 0 to 4." },
      ],
    },
    {
      id: "classes",
      title: "Classes, records and interfaces",
      summary: "Objects with fields and methods, records for plain data, interfaces for shared behaviour.",
      sections: [
        {
          p: "A class describes a kind of object: its <b>fields</b> (the data each object keeps) and its <b>methods</b> (what it can do). The <b>constructor</b> has the class's name and sets up a new object; <code>new</code> calls it. Fields are usually <code>private</code>, so other code changes them only through the class's own methods. <code>this</code> means the object the method was called on.",
          code: `public class Main {
    static class Squirrel {
        private final String name;
        private int nuts;

        Squirrel(String name) {
            this.name = name;
            this.nuts = 0;
        }

        void gather(int found) {
            nuts += found;
        }

        String report() {
            return name + " has " + nuts;
        }
    }

    public static void main(String[] args) {
        Squirrel s = new Squirrel("Hazel");
        s.gather(3);
        s.gather(4);
        System.out.println(s.report());
    }
}`,
          out: "Hazel has 7",
        },
        {
          h: "Records",
          p: "A <b>record</b> is a class for plain data. From one line Java writes the constructor, a method to read each field, <code>equals</code> that compares the values, and a <code>toString</code> for printing. Records can't be changed after they are made.",
          code: `public class Main {
    record Nut(String kind, int grams) {}

    public static void main(String[] args) {
        Nut a = new Nut("hazel", 3);
        Nut b = new Nut("hazel", 3);
        System.out.println(a);
        System.out.println(a.grams());
        System.out.println(a.equals(b));
    }
}`,
          out: "Nut[kind=hazel, grams=3]\n3\ntrue",
        },
        {
          h: "Interfaces",
          p: "An <b>interface</b> lists methods that a class promises to have. Code can then work with any class that <code>implements</code> it without knowing which one it got. Each class gives its own version of the method, and Java calls the right one when the program runs.",
          code: `import java.util.List;

public class Main {
    interface Animal {
        String sound();
    }

    record Squirrel() implements Animal {
        public String sound() { return "chitter"; }
    }

    record Owl() implements Animal {
        public String sound() { return "hoo"; }
    }

    public static void main(String[] args) {
        List<Animal> wood = List.of(new Squirrel(), new Owl(), new Squirrel());
        for (Animal a : wood) {
            System.out.print(a.sound() + " ");
        }
        System.out.println();
    }
}`,
          out: "chitter hoo chitter ",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `public class Main {
    static class Counter {
        private int count;
        void tick() { count++; }
        int value() { return count; }
    }

    public static void main(String[] args) {
        Counter a = new Counter();
        Counter b = new Counter();
        a.tick();
        a.tick();
        b.tick();
        System.out.println(a.value() + " " + b.value());
    }
}`, options: ["2 1", "3 3", "1 2", "0 0"], answer: "2 1", why: "Each object has its own count field. a ticked twice and b once. A field starts at 0 when it isn't given a value." },
        { kind: "output", q: "What does this print?", code: `public class Main {
    record Point(int x, int y) {}

    public static void main(String[] args) {
        Point p = new Point(2, 5);
        System.out.println(p.x() + p.y());
    }
}`, options: ["7", "25", "Point[x=2, y=5]", "2 5"], answer: "7", why: "x() and y() are ints, so + adds them." },
        { q: "What does a record give you automatically?", options: ["A constructor, field readers, equals and toString", "Only a constructor", "Setters for every field", "A main method"], answer: "A constructor, field readers, equals and toString", why: "Records are for plain, unchanging data, so they have no setters." },
      ],
    },
    {
      id: "collections",
      title: "Lists, maps and streams",
      summary: "ArrayList, HashMap, generics and stream pipelines.",
      sections: [
        {
          p: "Arrays have a fixed size, so most Java code uses the collection classes instead. <code>ArrayList</code> grows as you <code>add</code>, and <code>get(i)</code> reads by index. The type in angle brackets, as in <code>List&lt;String&gt;</code>, says what the list holds; this is called a <b>generic</b> type. Collections hold objects, so whole numbers go in as <code>Integer</code>, which Java converts to and from <code>int</code> for you.",
          code: `import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<String> trees = new ArrayList<>();
        trees.add("oak");
        trees.add("beech");
        trees.add(0, "hazel");
        System.out.println(trees);
        System.out.println(trees.size() + " " + trees.get(1));
        trees.remove("beech");
        System.out.println(trees.contains("beech"));
    }
}`,
          out: "[hazel, oak, beech]\n3 oak\nfalse",
        },
        {
          h: "Maps",
          p: "A <code>Map</code> stores values under keys. <code>put</code> adds or replaces, <code>get</code> reads (giving <code>null</code> for a missing key), and <code>getOrDefault</code> gives a fallback instead. <code>HashMap</code> doesn't keep any order; <code>TreeMap</code> keeps keys sorted, which makes printed output predictable.",
          code: `import java.util.Map;
import java.util.TreeMap;

public class Main {
    public static void main(String[] args) {
        Map<String, Integer> stash = new TreeMap<>();
        stash.put("oak", 4);
        stash.put("hazel", 9);
        stash.put("oak", stash.get("oak") + 1);
        System.out.println(stash);
        System.out.println(stash.getOrDefault("pine", 0));
        for (var entry : stash.entrySet()) {
            System.out.println(entry.getKey() + ": " + entry.getValue());
        }
    }
}`,
          out: "{hazel=9, oak=5}\n0\nhazel: 9\noak: 5",
        },
        {
          h: "Streams and lambdas",
          p: "A <b>stream</b> passes the items of a collection through a pipeline of steps. <code>filter</code> keeps the items that pass a test, <code>map</code> changes each item, and a final step such as <code>toList()</code> or <code>sum()</code> collects the result. The tests and changes are <b>lambdas</b>: small unnamed functions written <code>n -&gt; n * 2</code>.",
          code: `import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<Integer> nuts = List.of(5, 12, 3, 8, 20);
        List<Integer> big = nuts.stream()
            .filter(n -> n > 4)
            .map(n -> n * 2)
            .toList();
        System.out.println(big);
        int total = nuts.stream().mapToInt(n -> n).sum();
        System.out.println(total);
    }
}`,
          out: "[10, 24, 16, 40]\n48",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<String> a = new ArrayList<>();
        a.add("x");
        a.add("y");
        a.add(1, "z");
        System.out.println(a);
    }
}`, options: ["[x, z, y]", "[x, y, z]", "[z, x, y]", "[x, z]"], answer: "[x, z, y]", why: "add(1, \"z\") inserts at index 1 and moves y along one place." },
        { kind: "output", q: "What does this print?", code: `import java.util.List;

public class Main {
    public static void main(String[] args) {
        long count = List.of("oak", "ash", "elm", "beech").stream()
            .filter(t -> t.length() == 3)
            .count();
        System.out.println(count);
    }
}`, options: ["3", "4", "1", "0"], answer: "3", why: "oak, ash and elm have three letters. beech has five." },
        { q: "Why does a list of whole numbers use List<Integer> and not List<int>?", options: ["Collections hold objects, and Integer is the object form of int", "int is too small for lists", "List<int> is the old name", "Integer is faster than int"], answer: "Collections hold objects, and Integer is the object form of int", why: "Java converts between int and Integer automatically, so you can still add plain numbers." },
      ],
    },
  ],
};
