const query = "SELECT book_title FROM books ORDER BY book_title;";
const lines = query.split("\n");
console.log("Lines length:", lines.length);
try {
    const result = `${lines[0]}\nFROM ${lines[1].split("FROM ")[1]}`;
    console.log("Result:", result);
} catch (e) {
    console.log("Error:", e.message);
}
