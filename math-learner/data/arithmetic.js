// Arithmetic course for the Math Learner. Written for this project.
// Schema (shared by every pack in data/):
//   { id, name, title, intro, lessons: [lesson] }
//   lesson   = { id, title, summary, sections: [section], practice: [question] }
//   section  = { h?, p?, code? }   p is trusted HTML; code is a worked example in plain text
//   question = { q, options, answer, why }   exactly one correct answer in options
window.MATH = window.MATH || {};
window.MATH.arithmetic = {
  id: "arithmetic",
  name: "Arithmetic",
  title: "Arithmetic foundations",
  intro:
    "Arithmetic is the craft of working with numbers: how they are written, how the four operations combine them, and how fractions, decimals and percentages describe parts of a whole. These lessons build from place value through ratios, with enough practice that each idea stands on its own. Use pencil and paper; calculators are optional after you can do the steps by hand.",
  lessons: [
    {
      id: "place-value",
      title: "Place value",
      summary: "Ones, tens, hundreds and how a digit’s place changes its value.",
      sections: [
        {
          p: "In the base-ten system, each digit’s value depends on its place. Moving one place left multiplies by 10; moving one place right divides by 10.",
        },
        {
          h: "Reading a whole number",
          p: "In <b>3,482</b> the 3 is thousands (3 × 1000), the 4 is hundreds, the 8 is tens and the 2 is ones. Expanding: 3000 + 400 + 80 + 2.",
          code: "3482 = 3×1000 + 4×100 + 8×10 + 2×1",
        },
        {
          h: "Powers of ten",
          p: "10¹ = 10, 10² = 100, 10³ = 1000. A digit in the 10ⁿ place means that digit times 10ⁿ.",
        },
        {
          h: "Comparing",
          p: "To compare two numbers of the same length, compare digits from the left. The first place that differs decides which is larger. Extra leading zeros do not change the value: 0042 = 42.",
        },
      ],
      practice: [
        { q: "In 5,703, what is the value of the digit 7?", options: ["700", "70", "7", "7000"], answer: "700", why: "The 7 sits in the hundreds place, so it contributes 7 × 100 = 700." },
        { q: "Which expansion matches 2,015?", options: ["2×1000 + 0×100 + 1×10 + 5×1", "2×100 + 1×10 + 5×1", "2×1000 + 1×100 + 5×1", "20×100 + 15×1"], answer: "2×1000 + 0×100 + 1×10 + 5×1", why: "Thousands, hundreds (zero), tens and ones." },
        { q: "Which number is larger: 9,099 or 9,109?", options: ["9,109", "9,099", "They are equal", "Cannot tell"], answer: "9,109", why: "Hundreds place: 1 > 0, so 9,109 is larger." },
        { q: "10³ equals:", options: ["1000", "100", "30", "10000"], answer: "1000", why: "10 × 10 × 10 = 1000." },
        { q: "Moving a digit one place to the left multiplies its place value by:", options: ["10", "2", "100", "1"], answer: "10", why: "Each step left is ×10 in base ten." },
        { q: "What is 4000 + 50 + 6 written in standard form?", options: ["4056", "456", "4506", "40056"], answer: "4056", why: "4 thousands, 0 hundreds, 5 tens, 6 ones." },
      ],
    },
    {
      id: "addition-subtraction",
      title: "Addition and subtraction",
      summary: "Combining and taking away, with regrouping (carrying and borrowing).",
      sections: [
        {
          p: "<b>Addition</b> combines quantities. <b>Subtraction</b> finds how much is left or how far apart two numbers are. Addition and subtraction undo each other: if a + b = c, then c − b = a.",
        },
        {
          h: "Column addition",
          p: "Align place values. Add from the ones column. When a column sums to 10 or more, write down the ones digit and carry 1 (or more) to the next place.",
          code: "  278\n+ 156\n-----\n  434   (8+6=14 → write 4, carry 1; 7+5+1=13 → write 3, carry 1; 2+1+1=4)",
        },
        {
          h: "Column subtraction",
          p: "If the top digit is smaller, borrow 1 from the next left place (that place loses 1; this place gains 10).",
          code: "  503\n− 178\n-----\n  325   (borrow so ones become 13; tens become 9 after lending, then borrow again from hundreds)",
        },
        {
          h: "Checking",
          p: "Check subtraction by adding the difference back to the subtrahend. Check addition by estimating: 278 + 156 is near 280 + 160 = 440.",
        },
      ],
      practice: [
        { q: "What is 47 + 38?", options: ["85", "75", "95", "84"], answer: "85", why: "7+8=15 write 5 carry 1; 4+3+1=8." },
        { q: "What is 100 − 37?", options: ["63", "73", "67", "53"], answer: "63", why: "Borrowing from hundreds gives 10 tens; 9 tens after lending to ones: 10−7=3 ones, 9−3=6 tens." },
        { q: "If 29 + n = 54, what is n?", options: ["25", "35", "83", "24"], answer: "25", why: "n = 54 − 29 = 25." },
        { q: "278 + 156 = ?", options: ["434", "424", "444", "334"], answer: "434", why: "As in the worked column example." },
        { q: "Which statement is always true?", options: ["a + b = b + a", "a − b = b − a", "a + 0 = 0", "a − a = a"], answer: "a + b = b + a", why: "Addition is commutative; subtraction is not." },
        { q: "Estimate 198 + 203 by rounding to tens:", options: ["400", "390", "410", "301"], answer: "400", why: "200 + 200 = 400." },
      ],
    },
    {
      id: "multiplication",
      title: "Multiplication",
      summary: "Repeated addition, the times table and multi-digit products.",
      sections: [
        {
          p: "Multiplication <b>a × b</b> means b groups of a (or a groups of b). It is repeated addition: 4 × 3 = 4 + 4 + 4 = 12.",
        },
        {
          h: "Properties",
          p: "Commutative: a × b = b × a. Associative: (a × b) × c = a × (b × c). Distributive over addition: a × (b + c) = a×b + a×c. Multiplying by 0 gives 0; by 1 leaves the number unchanged.",
        },
        {
          h: "Multi-digit",
          p: "Multiply by each digit of the second factor, shifting left one place for tens, two for hundreds, then add the partial products.",
          code: "23 × 14\n  23 × 4  =  92\n  23 × 10 = 230\n  sum     = 322",
        },
        {
          h: "Powers of ten",
          p: "×10 appends a zero to a whole number; ×100 appends two zeros. 45 × 100 = 4500.",
        },
      ],
      practice: [
        { q: "What is 7 × 8?", options: ["56", "54", "64", "48"], answer: "56", why: "Standard times-table fact." },
        { q: "What is 23 × 14?", options: ["322", "312", "332", "276"], answer: "322", why: "92 + 230 = 322." },
        { q: "6 × (5 + 2) equals:", options: ["42", "32", "37", "17"], answer: "42", why: "Distribute: 6×5 + 6×2 = 30 + 12 = 42, or 6×7 = 42." },
        { q: "What is 90 × 10?", options: ["900", "90", "910", "9"], answer: "900", why: "×10 shifts one place left / appends a zero." },
        { q: "Which product is 0?", options: ["17 × 0", "17 × 1", "0 + 17", "17 − 0"], answer: "17 × 0", why: "Any number times zero is zero." },
        { q: "12 × 11 = ?", options: ["132", "121", "144", "122"], answer: "132", why: "12×10 + 12×1 = 120 + 12." },
        { q: "Which property says a × b = b × a?", options: ["Commutative", "Associative", "Distributive", "Identity"], answer: "Commutative", why: "Order of factors does not change the product." },
      ],
    },
    {
      id: "division",
      title: "Division",
      summary: "Sharing into equal groups, quotients and remainders.",
      sections: [
        {
          p: "Division asks how many equal groups, or how large each group is. <b>a ÷ b</b> (or a/b) is the number of times b fits into a. If it does not fit evenly, there is a <b>remainder</b>.",
        },
        {
          h: "Quotient and remainder",
          p: "For whole numbers, a = b × q + r with 0 ≤ r < b. Example: 17 ÷ 5 = 3 remainder 2, because 5×3 + 2 = 17.",
          code: "17 ÷ 5 → q = 3, r = 2\nCheck: 5×3 + 2 = 17",
        },
        {
          h: "Long division sketch",
          p: "Work from the left: how many times does the divisor fit into the leading digits? Write that digit of the quotient, subtract, bring down the next digit, repeat.",
        },
        {
          h: "Link to multiplication",
          p: "If a ÷ b = q with no remainder, then b × q = a. Division by zero is undefined: there is no number q with 0 × q = a when a ≠ 0, and every q works when a = 0.",
        },
      ],
      practice: [
        { q: "What is 56 ÷ 7?", options: ["8", "7", "9", "6"], answer: "8", why: "7 × 8 = 56." },
        { q: "17 ÷ 5 as quotient and remainder:", options: ["3 r 2", "3 r 1", "2 r 3", "4 r 2"], answer: "3 r 2", why: "5×3 = 15; remainder 17−15 = 2." },
        { q: "If 6 × n = 54, then n =", options: ["9", "8", "48", "60"], answer: "9", why: "n = 54 ÷ 6 = 9." },
        { q: "Which is undefined?", options: ["12 ÷ 0", "0 ÷ 12", "12 ÷ 1", "12 ÷ 12"], answer: "12 ÷ 0", why: "Division by zero is not defined." },
        { q: "100 ÷ 25 = ?", options: ["4", "5", "25", "75"], answer: "4", why: "25 × 4 = 100." },
        { q: "In a = b×q + r with whole numbers, r must satisfy:", options: ["0 ≤ r < b", "r > b", "r = 0 always", "r ≥ b"], answer: "0 ≤ r < b", why: "Remainder is strictly smaller than the divisor." },
      ],
    },
    {
      id: "fractions",
      title: "Fractions",
      summary: "Parts of a whole: equivalent fractions, comparing, add and multiply.",
      sections: [
        {
          p: "A fraction <b>a/b</b> (b ≠ 0) means a equal parts when the whole is split into b equal parts. The top number is the <b>numerator</b>; the bottom is the <b>denominator</b>.",
        },
        {
          h: "Equivalent fractions",
          p: "Multiply or divide numerator and denominator by the same nonzero number: 1/2 = 2/4 = 3/6. Simplest form cancels common factors.",
          code: "2/3 = 4/6 = 6/9\n6/9 ÷ 3/3 = 2/3",
        },
        {
          h: "Comparing",
          p: "With the same denominator, larger numerator is larger. Otherwise find a common denominator, or cross-multiply: a/b ? c/d compares a×d with b×c (when b,d > 0).",
        },
        {
          h: "Operations",
          p: "Add/subtract only after a common denominator: a/c + b/c = (a+b)/c. Multiply: (a/b)×(c/d) = (ac)/(bd). Divide by multiplying by the reciprocal: (a/b)÷(c/d) = (a/b)×(d/c).",
          code: "1/4 + 1/6 = 3/12 + 2/12 = 5/12\n(2/3)×(3/5) = 6/15 = 2/5",
        },
      ],
      practice: [
        { q: "Which equals 1/2?", options: ["3/6", "2/6", "1/3", "3/4"], answer: "3/6", why: "Multiply top and bottom of 1/2 by 3." },
        { q: "1/4 + 1/6 = ?", options: ["5/12", "2/10", "1/5", "2/24"], answer: "5/12", why: "LCD 12: 3/12 + 2/12." },
        { q: "(2/3) × (3/5) in simplest form:", options: ["2/5", "6/15", "5/6", "6/8"], answer: "2/5", why: "6/15 reduces by dividing by 3." },
        { q: "(3/4) ÷ (1/2) = ?", options: ["3/2", "3/8", "1/2", "6/4"], answer: "3/2", why: "Multiply by reciprocal: (3/4)×(2/1) = 6/4 = 3/2." },
        { q: "Which is larger: 3/5 or 2/3?", options: ["2/3", "3/5", "Equal", "Cannot compare"], answer: "2/3", why: "Cross: 3×3=9, 5×2=10; 9 < 10 so 3/5 < 2/3." },
        { q: "What is the reciprocal of 4/7?", options: ["7/4", "4/7", "−4/7", "7"], answer: "7/4", why: "Swap numerator and denominator." },
        { q: "Simplify 8/12:", options: ["2/3", "4/6", "8/12", "1/2"], answer: "2/3", why: "Divide by 4: 8÷4=2, 12÷4=3." },
      ],
    },
    {
      id: "decimals",
      title: "Decimals",
      summary: "Tenths and hundredths, linking decimals to fractions and place value.",
      sections: [
        {
          p: "Digits after the decimal point are tenths, hundredths, thousandths, … So 0.35 = 3/10 + 5/100 = 35/100 = 7/20.",
        },
        {
          h: "Place value again",
          p: "In 12.407 the 4 is tenths, 0 is hundredths, 7 is thousandths. Trailing zeros after the point do not change value: 1.50 = 1.5, but they can show precision.",
        },
        {
          h: "Adding and subtracting",
          p: "Line up the decimal points and work column by column, same as whole numbers.",
          code: "  3.40\n+ 1.25\n------\n  4.65",
        },
        {
          h: "Multiplying",
          p: "Multiply as whole numbers, then place the decimal so the product has as many digits after the point as the factors have combined. 1.2 × 0.3: 12×3=36, two decimal places → 0.36.",
        },
        {
          h: "Dividing",
          p: "You may move the decimal in divisor and dividend the same number of places to make the divisor a whole number, then divide.",
        },
      ],
      practice: [
        { q: "0.7 as a fraction in simplest form:", options: ["7/10", "7/100", "70/10", "1/7"], answer: "7/10", why: "One digit after the point means tenths." },
        { q: "3.4 + 1.25 = ?", options: ["4.65", "4.55", "5.65", "3.65"], answer: "4.65", why: "Align decimals: 3.40 + 1.25." },
        { q: "1.2 × 0.3 = ?", options: ["0.36", "0.36 0", "3.6", "0.15"], answer: "0.36", why: "12×3=36 with two decimal places total." },
        { q: "Which equals 0.25?", options: ["1/4", "1/5", "2/5", "25/10"], answer: "1/4", why: "0.25 = 25/100 = 1/4." },
        { q: "In 5.03, the digit 3 is in which place?", options: ["Hundredths", "Tenths", "Ones", "Thousandths"], answer: "Hundredths", why: "First after point = tenths (0); second = hundredths (3)." },
        { q: "2.5 − 0.75 = ?", options: ["1.75", "1.25", "2.25", "1.85"], answer: "1.75", why: "2.50 − 0.75 = 1.75." },
      ],
    },
    {
      id: "percentages",
      title: "Percentages",
      summary: "Per hundred: converting among percents, fractions and decimals.",
      sections: [
        {
          p: "<b>Percent</b> means “per hundred”. 25% = 25/100 = 0.25. Percents are a convenient language for discounts, tax and test scores.",
        },
        {
          h: "Conversions",
          p: "Percent → decimal: divide by 100 (move the point two places left). Decimal → percent: multiply by 100. Fraction → percent: divide, then ×100, or scale denominator to 100 when easy.",
          code: "40% = 0.40 = 2/5\n3/5 = 0.6 = 60%",
        },
        {
          h: "Finding a percentage of a number",
          p: "p% of N is (p/100)×N. Example: 15% of 80 = 0.15×80 = 12.",
        },
        {
          h: "Percentage change",
          p: "Increase of p% means multiply by (1 + p/100). Decrease of p% means multiply by (1 − p/100). A 20% off sale on $50 costs 0.8×50 = $40.",
        },
      ],
      practice: [
        { q: "25% as a decimal:", options: ["0.25", "2.5", "0.025", "25"], answer: "0.25", why: "Divide by 100." },
        { q: "3/5 as a percent:", options: ["60%", "35%", "15%", "75%"], answer: "60%", why: "3÷5 = 0.6 = 60%." },
        { q: "15% of 80 is:", options: ["12", "15", "8", "20"], answer: "12", why: "0.15 × 80 = 12." },
        { q: "A $50 item with 20% off costs:", options: ["$40", "$30", "$45", "$10"], answer: "$40", why: "Pay 80% of 50: 0.8×50 = 40." },
        { q: "0.07 as a percent:", options: ["7%", "0.7%", "70%", "0.07%"], answer: "7%", why: "×100 moves the point two places right." },
        { q: "Which equals 100%?", options: ["1", "0.1", "10", "1/100"], answer: "1", why: "100/100 = 1; the whole." },
        { q: "If a test score is 18 out of 20, the percent is:", options: ["90%", "80%", "18%", "95%"], answer: "90%", why: "18/20 = 0.9 = 90%." },
      ],
    },
    {
      id: "order-of-operations",
      title: "Order of operations",
      summary: "Parentheses, exponents, multiply/divide, then add/subtract.",
      sections: [
        {
          p: "When an expression mixes operations, evaluate in a fixed order so everyone gets the same answer. A common mnemonic is <b>PEMDAS</b> / <b>BODMAS</b>: parentheses (brackets) first, then exponents (orders), then multiplication and division left to right, then addition and subtraction left to right.",
        },
        {
          h: "Worked examples",
          code: "3 + 4 × 2 = 3 + 8 = 11   (not 14)\n(3 + 4) × 2 = 7 × 2 = 14\n12 ÷ 3 × 2 = 4 × 2 = 8   (left to right)\n2³ + 1 = 8 + 1 = 9",
        },
        {
          h: "Fractions as grouping",
          p: "A fraction bar groups the numerator and the denominator. Compute top and bottom before dividing.",
        },
        {
          h: "Why it matters",
          p: "Without a shared order, 3 + 4 × 2 could mean 14 or 11. The rule is a convention, but it is the convention used in algebra and calculators (scientific mode).",
        },
      ],
      practice: [
        { q: "3 + 4 × 2 = ?", options: ["11", "14", "10", "24"], answer: "11", why: "Multiply first: 4×2=8, then 3+8." },
        { q: "(3 + 4) × 2 = ?", options: ["14", "11", "10", "5"], answer: "14", why: "Parentheses first: 7×2." },
        { q: "12 ÷ 3 × 2 = ?", options: ["8", "2", "18", "0.5"], answer: "8", why: "Left to right: 12÷3=4, then 4×2=8." },
        { q: "2³ − 1 = ?", options: ["7", "5", "8", "6"], answer: "7", why: "2³=8; 8−1=7." },
        { q: "10 − 3 − 2 = ?", options: ["5", "9", "7", "1"], answer: "5", why: "Left to right: (10−3)−2 = 5." },
        { q: "Which operation comes first in 5 + 2³ × 4?", options: ["Exponent 2³", "Addition", "Multiplication only", "Nothing — left to right all"], answer: "Exponent 2³", why: "Exponents before multiply and add: 8×4=32, then 5+32." },
      ],
    },
    {
      id: "integers",
      title: "Integers",
      summary: "Negative numbers, absolute value and signed arithmetic.",
      sections: [
        {
          p: "Integers are …, −2, −1, 0, 1, 2, … Negatives sit to the left of zero on the number line. Temperature below zero, debt and elevation below sea level all use negatives.",
        },
        {
          h: "Absolute value",
          p: "|a| is the distance from a to 0, always ≥ 0. |−5| = 5 and |5| = 5.",
        },
        {
          h: "Adding signed numbers",
          p: "Same signs: add the absolute values and keep the sign. Different signs: subtract the smaller absolute value from the larger and keep the sign of the larger.",
          code: "−3 + (−5) = −8\n−3 + 5 = 2\n3 + (−5) = −2",
        },
        {
          h: "Subtracting",
          p: "a − b = a + (−b). Subtracting a negative is adding: 4 − (−2) = 4 + 2 = 6.",
        },
        {
          h: "Multiplying and dividing",
          p: "Same signs → positive product/quotient. Different signs → negative. (−2)×(−3)=6; (−2)×3=−6.",
        },
      ],
      practice: [
        { q: "|−7| = ?", options: ["7", "−7", "0", "1"], answer: "7", why: "Absolute value is distance from zero." },
        { q: "−3 + 5 = ?", options: ["2", "−2", "8", "−8"], answer: "2", why: "Different signs; 5−3=2 with the sign of 5." },
        { q: "4 − (−2) = ?", options: ["6", "2", "−6", "−2"], answer: "6", why: "Minus a negative is plus." },
        { q: "(−2) × (−3) = ?", options: ["6", "−6", "5", "−5"], answer: "6", why: "Same signs → positive." },
        { q: "(−12) ÷ 3 = ?", options: ["−4", "4", "−3", "9"], answer: "−4", why: "Different signs → negative quotient." },
        { q: "Which is smallest?", options: ["−5", "−1", "0", "2"], answer: "−5", why: "Further left on the number line." },
        { q: "−8 + (−2) = ?", options: ["−10", "10", "−6", "6"], answer: "−10", why: "Same signs: add absolutes, keep negative." },
      ],
    },
    {
      id: "ratios",
      title: "Ratios and rates",
      summary: "Comparing quantities by division; proportions and unit rates.",
      sections: [
        {
          p: "A <b>ratio</b> a:b (or a/b) compares two quantities of the same kind. A <b>rate</b> compares different kinds (km per hour, price per kg). A <b>unit rate</b> has a denominator of 1.",
        },
        {
          h: "Equivalent ratios",
          p: "Scale both parts by the same factor: 2:3 = 4:6 = 6:9. In fraction form this is the same as equivalent fractions.",
        },
        {
          h: "Proportions",
          p: "A proportion says two ratios are equal: a/b = c/d. Cross-multiply: a×d = b×c. Solve for a missing part with that rule.",
          code: "2/5 = n/20\n2×20 = 5×n → 40 = 5n → n = 8",
        },
        {
          h: "Unit rates",
          p: "If 3 apples cost $1.50, the unit price is $1.50 ÷ 3 = $0.50 per apple. Unit rates make comparisons easy.",
        },
      ],
      practice: [
        { q: "Simplify the ratio 8:12.", options: ["2:3", "4:6", "8:12", "1:2"], answer: "2:3", why: "Divide both parts by 4." },
        { q: "If 2/5 = n/20, then n =", options: ["8", "10", "4", "40"], answer: "8", why: "Cross: 2×20 = 5n → n=8." },
        { q: "3 apples for $1.50 → price per apple:", options: ["$0.50", "$1.50", "$4.50", "$0.15"], answer: "$0.50", why: "1.50 ÷ 3 = 0.50." },
        { q: "Which ratio equals 1:4?", options: ["3:12", "4:1", "2:4", "1:2"], answer: "3:12", why: "Multiply both parts of 1:4 by 3." },
        { q: "A car travels 150 km in 2 hours. Unit rate:", options: ["75 km/h", "150 km/h", "300 km/h", "2 km/h"], answer: "75 km/h", why: "150 ÷ 2 = 75." },
        { q: "In a proportion a/b = c/d (b,d ≠ 0), which is true?", options: ["a×d = b×c", "a×b = c×d", "a×c = b×d", "a + d = b + c"], answer: "a×d = b×c", why: "Cross-multiplication." },
      ],
    },
  ],
};
