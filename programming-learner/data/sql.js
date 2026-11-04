// SQL course for the Programming Learner. Written for this project.
// Every example runs on a fresh copy of the small sample database built by the
// section marked setup: true. tools/run_sql.py runs them with SQLite and
// checks the printed results.
window.PROGRAMMING = window.PROGRAMMING || {};
window.PROGRAMMING.sql = {
  id: "sql",
  name: "SQL",
  title: "SQL: asking questions of a database",
  intro:
    "SQL (Structured Query Language) is how programs talk to relational databases, which keep data in tables of rows and columns. It came out of IBM research in the 1970s and is still everywhere: banks, shops, phones and web sites all store their data in databases you query with SQL. It is different from the other languages here: you don't write the steps, you describe the result you want, and the database works out how to get it. These lessons use SQLite, a small database that lives in a single file and is built into Python, every phone and every web browser; the SQL itself is close to what PostgreSQL, MySQL and SQL Server accept. All examples share the sample database from the first lesson, and each one starts from a fresh copy, so changes made in one example don't carry over. Results are shown as a header line and then one line per row. To try them yourself, install the <code>sqlite3</code> program, paste the setup from the first lesson, then type the queries.",
  comment: "--",
  caseInsensitive: true,
  keywords: [
    "SELECT", "FROM", "WHERE", "AND", "OR", "NOT", "ORDER", "BY", "ASC", "DESC", "LIMIT", "GROUP", "HAVING", "AS", "JOIN", "LEFT",
    "ON", "INSERT", "INTO", "VALUES", "UPDATE", "SET", "DELETE", "CREATE", "TABLE", "PRIMARY", "KEY", "REFERENCES", "NOT", "NULL",
    "IS", "IN", "LIKE", "BETWEEN", "DISTINCT", "CASE", "WHEN", "THEN", "ELSE", "END", "WITH", "INTEGER", "TEXT", "REAL", "UNIQUE",
    "CHECK", "DEFAULT", "OVER", "PARTITION",
  ],
  builtins: ["COUNT", "SUM", "AVG", "MIN", "MAX", "ROUND", "UPPER", "LOWER", "LENGTH", "COALESCE", "RANK"],
  lessons: [
    {
      id: "first",
      title: "Tables and SELECT",
      summary: "The sample database, SELECT, columns and expressions.",
      sections: [
        {
          p: "A database holds <b>tables</b>. Each table has named <b>columns</b>, each with a type, and any number of <b>rows</b>. Here is the sample database every lesson uses: a table of trees, a table of squirrels (each living in one tree), and a table of the nuts each squirrel has buried. <code>PRIMARY KEY</code> marks the column that identifies a row, and <code>REFERENCES</code> says a column holds the key of a row in another table. You don't need to type this in to follow the lessons; it is here so you know what the tables hold.",
          setup: true,
          code: `CREATE TABLE trees (
    id       INTEGER PRIMARY KEY,
    kind     TEXT NOT NULL,
    height_m REAL
);
CREATE TABLE squirrels (
    id      INTEGER PRIMARY KEY,
    name    TEXT NOT NULL UNIQUE,
    tree_id INTEGER REFERENCES trees(id),
    born    INTEGER
);
CREATE TABLE stashes (
    id          INTEGER PRIMARY KEY,
    squirrel_id INTEGER NOT NULL REFERENCES squirrels(id),
    nut         TEXT NOT NULL,
    count       INTEGER NOT NULL CHECK (count > 0),
    buried_on   TEXT
);
INSERT INTO trees VALUES
    (1, 'oak', 21.5), (2, 'hazel', 6.0), (3, 'beech', 30.0), (4, 'ash', NULL);
INSERT INTO squirrels VALUES
    (1, 'Hazel', 1, 2022), (2, 'Acorn', 1, 2024), (3, 'Bramble', 3, 2021),
    (4, 'Pip', 2, 2025), (5, 'Rowan', NULL, 2023);
INSERT INTO stashes VALUES
    (1, 1, 'acorn', 12, '2026-10-02'), (2, 1, 'hazelnut', 5, '2026-10-09'),
    (3, 2, 'acorn', 3, '2026-10-05'), (4, 3, 'beechnut', 20, '2026-09-28'),
    (5, 3, 'acorn', 7, '2026-10-11'), (6, 4, 'hazelnut', 2, '2026-10-12'),
    (7, 1, 'beechnut', 4, '2026-10-15');`,
        },
        {
          h: "SELECT",
          p: "<code>SELECT</code> asks for columns <code>FROM</code> a table. <code>*</code> means every column. Keywords are often written in capitals so they stand out, but SQL doesn't mind either way. A statement ends with a semicolon. <code>NULL</code> means no value: the ash tree's height was never measured.",
          code: `SELECT * FROM trees;`,
          out: "id | kind | height_m\n1 | oak | 21.5\n2 | hazel | 6.0\n3 | beech | 30.0\n4 | ash | NULL",
        },
        {
          h: "Choosing and computing columns",
          p: "List the columns you want, separated by commas. A column can also be an expression, and <code>AS</code> gives it a name in the result. <code>||</code> joins strings in SQL, and functions like <code>UPPER</code> and <code>LENGTH</code> work on each row.",
          code: `SELECT name, 2026 - born AS age, UPPER(name) || '!' AS shout
FROM squirrels;`,
          out: "name | age | shout\nHazel | 4 | HAZEL!\nAcorn | 2 | ACORN!\nBramble | 5 | BRAMBLE!\nPip | 1 | PIP!\nRowan | 3 | ROWAN!",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `SELECT kind, height_m * 2 AS double FROM trees WHERE id = 2;`, options: ["kind | double\nhazel | 12.0", "kind | height_m\nhazel | 6.0", "hazel | 12.0", "kind | double\nhazel | 6.0"], answer: "kind | double\nhazel | 12.0", why: "Only the row with id 2 is chosen, and the second column is the height times two, named double." },
        { q: "What does NULL mean in a table?", options: ["There is no value", "The number zero", "An empty string", "An error"], answer: "There is no value", why: "NULL is not 0 or '': it means the value is missing or unknown, which is why it needs its own tests." },
      ],
    },
    {
      id: "filter",
      title: "Filtering and sorting",
      summary: "WHERE, AND/OR, IN, LIKE, IS NULL, ORDER BY and LIMIT.",
      sections: [
        {
          p: "<code>WHERE</code> keeps only the rows where a condition is true. Compare with <code>=</code>, <code>&lt;&gt;</code> (not equal), <code>&lt;</code> and <code>&gt;</code>, and combine with <code>AND</code>, <code>OR</code> and <code>NOT</code>. <code>IN (...)</code> checks against a list, and <code>LIKE</code> matches a pattern where <code>%</code> stands for any run of characters.",
          code: `SELECT name, born FROM squirrels
WHERE born >= 2022 AND name LIKE '%a%';

SELECT nut, count FROM stashes
WHERE nut IN ('hazelnut', 'beechnut') AND count > 3;`,
          out: "name | born\nHazel | 2022\nAcorn | 2024\nRowan | 2023\n\nnut | count\nhazelnut | 5\nbeechnut | 20\nbeechnut | 4",
        },
        {
          h: "Testing for NULL",
          p: "Comparing anything with <code>NULL</code> gives neither true nor false but NULL, so <code>height_m = NULL</code> never matches. Use <code>IS NULL</code> and <code>IS NOT NULL</code>. <code>COALESCE</code> gives the first value that isn't NULL, which is handy for a fallback.",
          code: `SELECT kind FROM trees WHERE height_m = NULL;

SELECT kind FROM trees WHERE height_m IS NULL;

SELECT name, COALESCE(tree_id, 'homeless') AS home FROM squirrels WHERE id > 3;`,
          out: "kind\n\nkind\nash\n\nname | home\nPip | 2\nRowan | homeless",
        },
        {
          h: "ORDER BY and LIMIT",
          p: "Rows come back in no promised order unless you ask for one. <code>ORDER BY</code> sorts by one or more columns, <code>DESC</code> from largest to smallest. <code>LIMIT</code> keeps only the first few rows, so together they answer questions like \"the three biggest\".",
          code: `SELECT nut, count FROM stashes
ORDER BY count DESC
LIMIT 3;

SELECT name FROM squirrels ORDER BY born, name;`,
          out: "nut | count\nbeechnut | 20\nacorn | 12\nacorn | 7\n\nname\nBramble\nHazel\nRowan\nAcorn\nPip",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `SELECT name FROM squirrels
WHERE tree_id = 1 OR born > 2024
ORDER BY name;`, options: ["name\nAcorn\nHazel\nPip", "name\nHazel\nAcorn\nPip", "name\nAcorn\nHazel", "name\nPip"], answer: "name\nAcorn\nHazel\nPip", why: "Hazel and Acorn live in tree 1 and Pip was born in 2025. ORDER BY name puts them in alphabetical order." },
        { kind: "output", q: "What does this print?", code: `SELECT COUNT(*) AS n FROM squirrels WHERE tree_id <> 1;`, options: ["n\n2", "n\n3", "n\n5", "n\n0"], answer: "n\n2", why: "Bramble (tree 3) and Pip (tree 2) match. Rowan's tree_id is NULL, and NULL <> 1 is not true, so Rowan is left out." },
      ],
    },
    {
      id: "aggregate",
      title: "Counting and grouping",
      summary: "COUNT, SUM, AVG, MIN, MAX, GROUP BY and HAVING.",
      sections: [
        {
          p: "<b>Aggregate</b> functions turn many rows into one value: <code>COUNT(*)</code> counts rows, and <code>SUM</code>, <code>AVG</code>, <code>MIN</code> and <code>MAX</code> work on a column. Without grouping, the whole table becomes a single result row. Aggregates skip NULLs, which is why <code>AVG(height_m)</code> averages three trees, not four.",
          code: `SELECT COUNT(*) AS stashes, SUM(count) AS nuts, MAX(count) AS biggest
FROM stashes;

SELECT COUNT(*) AS trees, COUNT(height_m) AS measured, ROUND(AVG(height_m), 1) AS avg_height
FROM trees;`,
          out: "stashes | nuts | biggest\n7 | 53 | 20\n\ntrees | measured | avg_height\n4 | 3 | 19.2",
        },
        {
          h: "GROUP BY",
          p: "<code>GROUP BY</code> splits the rows into groups that share a value, and the aggregates are worked out once per group. Every column you select should either be in the <code>GROUP BY</code> or be inside an aggregate.",
          code: `SELECT nut, COUNT(*) AS stashes, SUM(count) AS total
FROM stashes
GROUP BY nut
ORDER BY total DESC;`,
          out: "nut | stashes | total\nbeechnut | 2 | 24\nacorn | 3 | 22\nhazelnut | 2 | 7",
        },
        {
          h: "HAVING",
          p: "<code>WHERE</code> filters rows before grouping; <code>HAVING</code> filters the groups afterwards, so it can test an aggregate. The order of the clauses is fixed: <code>SELECT</code>, <code>FROM</code>, <code>WHERE</code>, <code>GROUP BY</code>, <code>HAVING</code>, <code>ORDER BY</code>, <code>LIMIT</code>.",
          code: `SELECT squirrel_id, SUM(count) AS total
FROM stashes
WHERE buried_on >= '2026-10-01'
GROUP BY squirrel_id
HAVING SUM(count) > 5
ORDER BY squirrel_id;`,
          out: "squirrel_id | total\n1 | 21\n3 | 7",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `SELECT squirrel_id, COUNT(*) AS n
FROM stashes
GROUP BY squirrel_id
HAVING COUNT(*) > 1
ORDER BY squirrel_id;`, options: ["squirrel_id | n\n1 | 3\n3 | 2", "squirrel_id | n\n1 | 3", "squirrel_id | n\n1 | 3\n2 | 1\n3 | 2\n4 | 1", "n\n2"], answer: "squirrel_id | n\n1 | 3\n3 | 2", why: "Squirrel 1 has three stashes and squirrel 3 has two. Squirrels 2 and 4 have one each and are filtered out by HAVING." },
        { q: "Which clause can test SUM(count) > 10?", options: ["HAVING", "WHERE", "ORDER BY", "FROM"], answer: "HAVING", why: "WHERE runs on single rows before the groups exist, so it can't use an aggregate." },
      ],
    },
    {
      id: "joins",
      title: "Joining tables",
      summary: "JOIN ... ON, table aliases and LEFT JOIN.",
      sections: [
        {
          p: "Keeping each fact in one place means the answer to a question is often spread over several tables. A <code>JOIN</code> pairs rows from two tables that match an <code>ON</code> condition, usually a key in one equal to a reference in the other. Short <b>aliases</b> such as <code>s</code> and <code>t</code> keep the column names readable.",
          code: `SELECT s.name, t.kind AS tree
FROM squirrels AS s
JOIN trees AS t ON t.id = s.tree_id
ORDER BY s.name;`,
          out: "name | tree\nAcorn | oak\nBramble | beech\nHazel | oak\nPip | hazel",
        },
        {
          h: "LEFT JOIN",
          p: "A plain <code>JOIN</code> drops rows that have no match, which is why Rowan, who has no tree, is missing above. <code>LEFT JOIN</code> keeps every row of the left table and fills the right side with NULL when nothing matches. It is the way to find things that are missing, such as trees nobody lives in.",
          code: `SELECT t.kind, COUNT(s.id) AS residents
FROM trees AS t
LEFT JOIN squirrels AS s ON s.tree_id = t.id
GROUP BY t.id
ORDER BY t.id;`,
          out: "kind | residents\noak | 2\nhazel | 1\nbeech | 1\nash | 0",
        },
        {
          h: "Three tables",
          p: "Joins chain: each new <code>JOIN</code> adds another table to the rows built so far. Here every stash is joined to its squirrel and that squirrel's tree, then grouped to total the nuts stored at each tree.",
          code: `SELECT t.kind AS tree, SUM(st.count) AS nuts
FROM stashes AS st
JOIN squirrels AS s ON s.id = st.squirrel_id
JOIN trees AS t ON t.id = s.tree_id
GROUP BY t.kind
ORDER BY nuts DESC;`,
          out: "tree | nuts\nbeech | 27\noak | 24\nhazel | 2",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `SELECT s.name
FROM squirrels AS s
LEFT JOIN stashes AS st ON st.squirrel_id = s.id
WHERE st.id IS NULL;`, options: ["name\nRowan", "name", "name\nPip\nRowan", "name\nAcorn"], answer: "name\nRowan", why: "Rowan has no stashes, so the LEFT JOIN fills the stash columns with NULL, and the WHERE keeps exactly those rows." },
        { q: "Why does a plain JOIN of squirrels and trees leave out Rowan?", options: ["Rowan's tree_id is NULL, so no tree matches", "Rowan is the last row", "JOIN skips duplicate names", "Rowan was born too late"], answer: "Rowan's tree_id is NULL, so no tree matches", why: "An inner JOIN keeps only pairs that satisfy ON. LEFT JOIN would keep Rowan with NULL tree columns." },
      ],
    },
    {
      id: "changes",
      title: "Changing data",
      summary: "INSERT, UPDATE, DELETE, and constraints that refuse bad data.",
      sections: [
        {
          p: "<code>INSERT INTO ... VALUES</code> adds rows, <code>UPDATE ... SET</code> changes them and <code>DELETE FROM</code> removes them. <code>UPDATE</code> and <code>DELETE</code> without a <code>WHERE</code> change <b>every</b> row in the table, so always write the <code>WHERE</code> first. The example ends with a <code>SELECT</code> to show the result.",
          code: `INSERT INTO squirrels (name, tree_id, born) VALUES ('Nutmeg', 4, 2026);
UPDATE stashes SET count = count + 10 WHERE nut = 'hazelnut';
DELETE FROM stashes WHERE count < 5;

SELECT name, tree_id FROM squirrels WHERE born = 2026;

SELECT nut, count FROM stashes ORDER BY id;`,
          out: "name | tree_id\nNutmeg | 4\n\nnut | count\nacorn | 12\nhazelnut | 15\nbeechnut | 20\nacorn | 7\nhazelnut | 12",
        },
        {
          h: "Constraints",
          p: "The table definitions from the first lesson include rules: <code>NOT NULL</code>, <code>UNIQUE</code> and <code>CHECK (count &gt; 0)</code>. The database refuses any change that breaks one, so bad data can't get in whichever program is writing. Here the first insert is refused because a squirrel called Hazel already exists, and nothing after the error runs.",
          code: `SELECT COUNT(*) AS before FROM squirrels;
INSERT INTO squirrels (name, tree_id, born) VALUES ('Hazel', 2, 2026);
SELECT COUNT(*) AS after FROM squirrels;`,
          out: "before\n5",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `UPDATE trees SET height_m = 8.5 WHERE kind = 'ash';
SELECT COUNT(*) AS measured FROM trees WHERE height_m IS NOT NULL;`, options: ["measured\n4", "measured\n3", "measured\n1", "measured\n8.5"], answer: "measured\n4", why: "The ash was the only tree without a height. After the UPDATE all four are measured." },
        { q: "What does  DELETE FROM stashes;  do?", options: ["Removes every row in stashes", "Removes the table itself", "Nothing without a WHERE", "Removes the first row"], answer: "Removes every row in stashes", why: "Without WHERE, every row matches. DROP TABLE is the statement that removes the table itself." },
      ],
    },
    {
      id: "subqueries",
      title: "Subqueries and WITH",
      summary: "Queries inside queries, common table expressions and CASE.",
      sections: [
        {
          p: "A query in brackets can be used inside another one. A subquery that gives one value can sit anywhere a value can, such as a comparison with the average. One that gives a column can be used with <code>IN</code>.",
          code: `SELECT nut, count FROM stashes
WHERE count > (SELECT AVG(count) FROM stashes)
ORDER BY count DESC;

SELECT name FROM squirrels
WHERE id IN (SELECT squirrel_id FROM stashes WHERE nut = 'acorn')
ORDER BY name;`,
          out: "nut | count\nbeechnut | 20\nacorn | 12\n\nname\nAcorn\nBramble\nHazel",
        },
        {
          h: "WITH and CASE",
          p: "<code>WITH name AS (...)</code> names a query, called a <b>common table expression</b>, that the main query can then use like a table. It lets you build a long query in readable steps. <code>CASE WHEN ... THEN ... ELSE ... END</code> picks a value row by row, like an if in other languages.",
          code: `WITH totals AS (
    SELECT squirrel_id, SUM(count) AS nuts
    FROM stashes
    GROUP BY squirrel_id
)
SELECT s.name,
       COALESCE(t.nuts, 0) AS nuts,
       CASE
           WHEN t.nuts >= 20 THEN 'ready for winter'
           WHEN t.nuts >= 5 THEN 'getting there'
           ELSE 'needs help'
       END AS status
FROM squirrels AS s
LEFT JOIN totals AS t ON t.squirrel_id = s.id
ORDER BY nuts DESC, s.name;`,
          out: "name | nuts | status\nBramble | 27 | ready for winter\nHazel | 21 | ready for winter\nAcorn | 3 | needs help\nPip | 2 | needs help\nRowan | 0 | needs help",
        },
      ],
      practice: [
        { kind: "output", q: "What does this print?", code: `SELECT kind FROM trees
WHERE height_m = (SELECT MAX(height_m) FROM trees);`, options: ["kind\nbeech", "kind\noak", "kind\n30.0", "kind\nash"], answer: "kind\nbeech", why: "The subquery finds the greatest height, 30.0, and the outer query finds the tree with that height." },
        { kind: "output", q: "What does this print?", code: `SELECT name,
       CASE WHEN born < 2023 THEN 'elder' ELSE 'young' END AS age_group
FROM squirrels
WHERE id <= 2;`, options: ["name | age_group\nHazel | elder\nAcorn | young", "name | age_group\nHazel | young\nAcorn | elder", "name | age_group\nHazel | elder\nAcorn | elder", "Hazel | elder\nAcorn | young"], answer: "name | age_group\nHazel | elder\nAcorn | young", why: "Hazel was born in 2022, before 2023. Acorn was born in 2024." },
      ],
    },
  ],
};
