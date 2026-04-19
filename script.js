const engineStatus = document.querySelector("#engine-status");
const currentSkillLabel = document.querySelector("#current-skill-label");
const currentDifficultyLabel = document.querySelector("#current-difficulty-label");
const currentStreakLabel = document.querySelector("#current-streak-label");

const questionTitle = document.querySelector("#question-title");
const questionPrompt = document.querySelector("#question-prompt");
const questionDataset = document.querySelector("#question-dataset");
const questionTables = document.querySelector("#question-tables");
const questionCounter = document.querySelector("#question-counter");
const questionBadge = document.querySelector("#question-badge");
const schemaPalette = document.querySelector("#schema-palette");
const hintText = document.querySelector("#hint-text");
const coachingText = document.querySelector("#coaching-text");
const adaptiveFeedback = document.querySelector("#adaptive-feedback");
const masteryGrid = document.querySelector("#mastery-grid");

const practiceEditor = document.querySelector("#practice-editor");
const finalEditor = document.querySelector("#final-editor");
const practiceMeta = document.querySelector("#practice-meta");
const finalMeta = document.querySelector("#final-meta");
const practiceResult = document.querySelector("#practice-result");
const finalResult = document.querySelector("#final-result");

const showHintButton = document.querySelector("#show-hint");
const showCoachingButton = document.querySelector("#show-coaching");
const nextQuestionButton = document.querySelector("#next-question");
const runPracticeButton = document.querySelector("#run-practice");
const skipSectionButton = document.querySelector("#skip-section");
const submitAnswerButton = document.querySelector("#submit-answer");
const copyPracticeButton = document.querySelector("#copy-practice");
const resetEditorsButton = document.querySelector("#reset-editors");
const validateAnswerButton = document.querySelector("#validate-answer");

const conceptOrder = [
  { key: "select", label: "SELECT" },
  { key: "aliases", label: "ALIASES" },
  { key: "where", label: "WHERE" },
  { key: "having", label: "HAVING" },
  { key: "inner_join", label: "INNER JOIN" },
  { key: "group_by", label: "GROUP BY" },
  { key: "left_join", label: "LEFT JOIN" },
  { key: "subquery", label: "SUBQUERY" },
  { key: "dml", label: "DATA MANIPULATION (DML)" },
  { key: "ddl", label: "DATA DEFINITION (DDL)" },
  { key: "views", label: "VIEWS" },
  { key: "case", label: "CASE STATEMENTS" },
  { key: "cte", label: "COMMON TABLE EXPRESSIONS (CTEs)" },
  { key: "window_functions", label: "WINDOW FUNCTIONS" },
  { key: "stored_procs", label: "STORED PROCEDURES" },
  { key: "functions", label: "FUNCTIONS" },
  { key: "set_operators", label: "SET OPERATORS" },
];

const scaffoldLabels = [
  "Guided",
  "Partial",
  "Light",
  "Independent",
];

const datasets = {
  library: {
    label: "Library",
    schema: {
      members: ["member_id", "member_name", "city"],
      books: ["book_id", "book_title", "category", "is_available"],
      loans: ["loan_id", "member_id", "book_id", "borrowed_on", "due_date", "returned_on"],
    },
    seedSql: `
      CREATE TABLE members (
        member_id INTEGER PRIMARY KEY,
        member_name TEXT NOT NULL,
        city TEXT NOT NULL
      );
      CREATE TABLE books (
        book_id INTEGER PRIMARY KEY,
        book_title TEXT NOT NULL,
        category TEXT NOT NULL,
        is_available INTEGER NOT NULL
      );
      CREATE TABLE loans (
        loan_id INTEGER PRIMARY KEY,
        member_id INTEGER NOT NULL,
        book_id INTEGER NOT NULL,
        borrowed_on TEXT NOT NULL,
        due_date TEXT NOT NULL,
        returned_on TEXT,
        FOREIGN KEY (member_id) REFERENCES members(member_id),
        FOREIGN KEY (book_id) REFERENCES books(book_id)
      );
      INSERT INTO members VALUES
        (1, 'Maya Patel', 'Austin'),
        (2, 'Jordan Lee', 'Chicago'),
        (3, 'Sofia Gomez', 'Dallas'),
        (4, 'Noah Carter', 'Houston');
      INSERT INTO books VALUES
        (1, 'Learning SQL Basics', 'Technology', 0),
        (2, 'The Night Library', 'Fiction', 1),
        (3, 'History of Cities', 'History', 1),
        (4, 'Data for Everyone', 'Technology', 0),
        (5, 'Ocean Wonders', 'Science', 1),
        (6, 'Garden Atlas', 'Lifestyle', 1);
      INSERT INTO loans VALUES
        (1, 1, 1, '2026-04-01', '2026-04-08', NULL),
        (2, 2, 4, '2026-04-03', '2026-04-10', NULL),
        (3, 3, 2, '2026-03-20', '2026-03-27', '2026-03-26'),
        (4, 4, 5, '2026-04-02', '2026-04-09', '2026-04-06'),
        (5, 1, 6, '2026-04-11', '2026-04-18', NULL);
    `,
  },
  school: {
    label: "School",
    schema: {
      students: ["student_id", "student_name", "grade_level", "active"],
      teachers: ["teacher_id", "teacher_name", "subject"],
      buildings: ["building_id", "building_name", "campus_zone"],
      classrooms: ["classroom_id", "room_name", "building_id", "capacity"],
      courses: ["course_id", "course_name", "department", "credits"],
      classes: ["class_id", "class_name", "course_id", "teacher_id", "classroom_id", "term_name"],
      enrollments: ["enrollment_id", "student_id", "class_id", "enrolled_on"],
      tests: ["test_id", "class_id", "test_name", "test_type", "max_score", "test_date"],
      grades: ["grade_id", "student_id", "test_id", "score", "letter_grade"],
    },
    seedSql: `
      CREATE TABLE students (
        student_id INTEGER PRIMARY KEY,
        student_name TEXT NOT NULL,
        grade_level INTEGER NOT NULL,
        active INTEGER NOT NULL
      );
      CREATE TABLE teachers (
        teacher_id INTEGER PRIMARY KEY,
        teacher_name TEXT NOT NULL,
        subject TEXT NOT NULL
      );
      CREATE TABLE buildings (
        building_id INTEGER PRIMARY KEY,
        building_name TEXT NOT NULL,
        campus_zone TEXT NOT NULL
      );
      CREATE TABLE classrooms (
        classroom_id INTEGER PRIMARY KEY,
        room_name TEXT NOT NULL,
        building_id INTEGER NOT NULL,
        capacity INTEGER NOT NULL,
        FOREIGN KEY (building_id) REFERENCES buildings(building_id)
      );
      CREATE TABLE courses (
        course_id INTEGER PRIMARY KEY,
        course_name TEXT NOT NULL,
        department TEXT NOT NULL,
        credits INTEGER NOT NULL
      );
      CREATE TABLE classes (
        class_id INTEGER PRIMARY KEY,
        class_name TEXT NOT NULL,
        course_id INTEGER NOT NULL,
        teacher_id INTEGER NOT NULL,
        classroom_id INTEGER NOT NULL,
        term_name TEXT NOT NULL,
        FOREIGN KEY (course_id) REFERENCES courses(course_id),
        FOREIGN KEY (teacher_id) REFERENCES teachers(teacher_id),
        FOREIGN KEY (classroom_id) REFERENCES classrooms(classroom_id)
      );
      CREATE TABLE enrollments (
        enrollment_id INTEGER PRIMARY KEY,
        student_id INTEGER NOT NULL,
        class_id INTEGER NOT NULL,
        enrolled_on TEXT NOT NULL,
        FOREIGN KEY (student_id) REFERENCES students(student_id),
        FOREIGN KEY (class_id) REFERENCES classes(class_id)
      );
      CREATE TABLE tests (
        test_id INTEGER PRIMARY KEY,
        class_id INTEGER NOT NULL,
        test_name TEXT NOT NULL,
        test_type TEXT NOT NULL,
        max_score INTEGER NOT NULL,
        test_date TEXT NOT NULL,
        FOREIGN KEY (class_id) REFERENCES classes(class_id)
      );
      CREATE TABLE grades (
        grade_id INTEGER PRIMARY KEY,
        student_id INTEGER NOT NULL,
        test_id INTEGER NOT NULL,
        score INTEGER NOT NULL,
        letter_grade TEXT NOT NULL,
        FOREIGN KEY (student_id) REFERENCES students(student_id),
        FOREIGN KEY (test_id) REFERENCES tests(test_id)
      );
      INSERT INTO students VALUES
        (1, 'Ava Johnson', 8, 1),
        (2, 'Liam Brown', 8, 1),
        (3, 'Emma Davis', 7, 1),
        (4, 'Lucas Wilson', 9, 0),
        (5, 'Mia Roberts', 7, 1),
        (6, 'Ethan Walker', 8, 1),
        (7, 'Harper Lewis', 9, 1),
        (8, 'Benjamin Hall', 6, 1),
        (9, 'Charlotte Young', 6, 1),
        (10, 'Amelia Scott', 8, 1),
        (11, 'James Baker', 7, 1),
        (12, 'Ella Flores', 9, 1);
      INSERT INTO teachers VALUES
        (1, 'Mr. Turner', 'Math'),
        (2, 'Ms. Reed', 'Science'),
        (3, 'Mrs. Clark', 'History'),
        (4, 'Coach Ramirez', 'Physical Education'),
        (5, 'Ms. Bennett', 'English'),
        (6, 'Dr. Shah', 'Computer Science');
      INSERT INTO buildings VALUES
        (1, 'North Hall', 'North'),
        (2, 'Science Center', 'East'),
        (3, 'Arts Wing', 'West'),
        (4, 'Innovation Lab', 'South');
      INSERT INTO classrooms VALUES
        (1, 'N101', 1, 28),
        (2, 'N204', 1, 24),
        (3, 'S110', 2, 30),
        (4, 'S210', 2, 26),
        (5, 'A105', 3, 25),
        (6, 'I301', 4, 22),
        (7, 'Gym 1', 4, 40);
      INSERT INTO courses VALUES
        (1, 'Algebra Foundations', 'Mathematics', 4),
        (2, 'Life Science', 'Science', 4),
        (3, 'World History', 'Social Studies', 3),
        (4, 'English Literature', 'Language Arts', 4),
        (5, 'Introduction to Coding', 'Technology', 3),
        (6, 'Physical Education', 'Wellness', 2),
        (7, 'Earth Science', 'Science', 4);
      INSERT INTO classes VALUES
        (1, 'Algebra I - Section A', 1, 1, 1, 'Spring 2026'),
        (2, 'Life Science - Section A', 2, 2, 3, 'Spring 2026'),
        (3, 'World History - Section A', 3, 3, 5, 'Spring 2026'),
        (4, 'English Lit - Section A', 4, 5, 2, 'Spring 2026'),
        (5, 'Intro Coding - Section A', 5, 6, 6, 'Spring 2026'),
        (6, 'Physical Education - Section A', 6, 4, 7, 'Spring 2026'),
        (7, 'Earth Science - Section A', 7, 2, 4, 'Spring 2026');
      INSERT INTO enrollments VALUES
        (1, 1, 1, '2026-01-10'),
        (2, 1, 2, '2026-01-10'),
        (3, 2, 1, '2026-01-10'),
        (4, 3, 3, '2026-01-10'),
        (5, 2, 2, '2026-01-10'),
        (6, 5, 3, '2026-01-10'),
        (7, 6, 1, '2026-01-11'),
        (8, 6, 5, '2026-01-11'),
        (9, 7, 4, '2026-01-12'),
        (10, 7, 6, '2026-01-12'),
        (11, 8, 2, '2026-01-09'),
        (12, 8, 6, '2026-01-09'),
        (13, 9, 4, '2026-01-09'),
        (14, 9, 7, '2026-01-09'),
        (15, 10, 1, '2026-01-10'),
        (16, 10, 5, '2026-01-10'),
        (17, 11, 3, '2026-01-10'),
        (18, 11, 4, '2026-01-10'),
        (19, 12, 2, '2026-01-10'),
        (20, 12, 7, '2026-01-10');
      INSERT INTO tests VALUES
        (1, 1, 'Linear Equations Quiz', 'Quiz', 20, '2026-02-05'),
        (2, 1, 'Functions Test', 'Test', 100, '2026-03-01'),
        (3, 2, 'Cells Quiz', 'Quiz', 25, '2026-02-08'),
        (4, 2, 'Ecosystems Test', 'Test', 100, '2026-03-05'),
        (5, 3, 'Ancient Civilizations Essay', 'Project', 50, '2026-02-14'),
        (6, 4, 'Reading Comprehension Test', 'Test', 100, '2026-03-09'),
        (7, 5, 'Scratch Lab', 'Project', 40, '2026-02-18'),
        (8, 5, 'Python Basics Quiz', 'Quiz', 30, '2026-03-12'),
        (9, 7, 'Rocks and Minerals Quiz', 'Quiz', 25, '2026-02-22');
      INSERT INTO grades VALUES
        (1, 1, 1, 18, 'A'),
        (2, 2, 1, 16, 'B'),
        (3, 6, 1, 19, 'A'),
        (4, 10, 1, 17, 'B'),
        (5, 1, 2, 92, 'A'),
        (6, 2, 2, 81, 'B'),
        (7, 6, 2, 95, 'A'),
        (8, 10, 2, 88, 'B'),
        (9, 1, 3, 22, 'A'),
        (10, 2, 3, 20, 'B'),
        (11, 8, 3, 23, 'A'),
        (12, 12, 3, 19, 'B'),
        (13, 1, 4, 90, 'A'),
        (14, 2, 4, 78, 'C'),
        (15, 8, 4, 85, 'B'),
        (16, 12, 4, 91, 'A'),
        (17, 3, 5, 44, 'B'),
        (18, 5, 5, 47, 'A'),
        (19, 11, 5, 41, 'B'),
        (20, 7, 6, 87, 'B'),
        (21, 9, 6, 93, 'A'),
        (22, 11, 6, 89, 'B'),
        (23, 6, 7, 36, 'A'),
        (24, 10, 7, 34, 'A'),
        (25, 6, 8, 27, 'A'),
        (26, 10, 8, 25, 'B'),
        (27, 9, 9, 21, 'B'),
        (28, 12, 9, 24, 'A');
    `,
  },
  store: {
    label: "Store",
    schema: {
      customers: ["customer_id", "customer_name", "city"],
      orders: ["order_id", "customer_id", "order_date"],
      products: ["product_id", "product_name", "category", "price"],
      order_items: ["order_item_id", "order_id", "product_id", "quantity"],
    },
    seedSql: `
      CREATE TABLE customers (
        customer_id INTEGER PRIMARY KEY,
        customer_name TEXT NOT NULL,
        city TEXT NOT NULL
      );
      CREATE TABLE orders (
        order_id INTEGER PRIMARY KEY,
        customer_id INTEGER NOT NULL,
        order_date TEXT NOT NULL,
        FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
      );
      CREATE TABLE products (
        product_id INTEGER PRIMARY KEY,
        product_name TEXT NOT NULL,
        category TEXT NOT NULL,
        price REAL NOT NULL
      );
      CREATE TABLE order_items (
        order_item_id INTEGER PRIMARY KEY,
        order_id INTEGER NOT NULL,
        product_id INTEGER NOT NULL,
        quantity INTEGER NOT NULL,
        FOREIGN KEY (order_id) REFERENCES orders(order_id),
        FOREIGN KEY (product_id) REFERENCES products(product_id)
      );
      INSERT INTO customers VALUES
        (1, 'Ella Martinez', 'Chicago'),
        (2, 'Mason Green', 'Austin'),
        (3, 'Olivia Hall', 'Dallas');
      INSERT INTO orders VALUES
        (1, 1, '2026-04-01'),
        (2, 2, '2026-04-04'),
        (3, 1, '2026-04-06'),
        (4, 3, '2026-04-08');
      INSERT INTO products VALUES
        (1, 'Notebook', 'Office', 4.50),
        (2, 'Desk Lamp', 'Home', 28.00),
        (3, 'Water Bottle', 'Lifestyle', 16.00),
        (4, 'Planner', 'Office', 12.00),
        (5, 'Cable Organizer', 'Office', 9.00);
      INSERT INTO order_items VALUES
        (1, 1, 1, 3),
        (2, 1, 4, 1),
        (3, 2, 2, 1),
        (4, 3, 1, 2),
        (5, 3, 3, 2),
        (6, 4, 4, 4),
        (7, 4, 5, 3);
    `,
  },
};

const columnLabels = {
  member_name: "member name",
  city: "city",
  book_title: "book title",
  category: "category",
  is_available: "availability status",
  borrowed_on: "borrowed date",
  due_date: "due date",
  returned_on: "returned date",
  student_name: "student name",
  grade_level: "grade level",
  active: "active status",
  teacher_name: "teacher name",
  subject: "subject",
  class_name: "class name",
  building_name: "building name",
  campus_zone: "campus zone",
  room_name: "room name",
  capacity: "capacity",
  course_name: "course name",
  department: "department",
  credits: "credits",
  term_name: "term name",
  enrolled_on: "enrolled date",
  test_name: "test name",
  test_type: "test type",
  max_score: "maximum score",
  test_date: "test date",
  score: "score",
  letter_grade: "letter grade",
  customer_name: "customer name",
  order_id: "order id",
  order_date: "order date",
  product_name: "product name",
  price: "price",
  quantity: "quantity",
  loan_id: "loan id",
  product_id: "product id",
};

function humanizeColumn(column) {
  return columnLabels[column] || column.replaceAll("_", " ");
}

function titleCase(value) {
  return value
    .split(" ")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function pairCombinations(list) {
  const pairs = [];
  for (let left = 0; left < list.length; left += 1) {
    for (let right = left + 1; right < list.length; right += 1) {
      pairs.push([list[left], list[right]]);
    }
  }
  return pairs;
}

function dedupeQuestions(list) {
  const seen = new Set();
  return list.filter((question) => {
    if (seen.has(question.id)) return false;
    seen.add(question.id);
    return true;
  });
}

function buildSelectQuestions() {
  const configs = [
    { dataset: "library", table: "books", columns: ["book_title", "category", "is_available"] },
    { dataset: "library", table: "members", columns: ["member_name", "city"] },
    { dataset: "school", table: "students", columns: ["student_name", "grade_level", "active"] },
    { dataset: "school", table: "teachers", columns: ["teacher_name", "subject"] },
    { dataset: "school", table: "buildings", columns: ["building_name", "campus_zone"] },
    { dataset: "school", table: "classrooms", columns: ["room_name", "capacity"] },
    { dataset: "school", table: "courses", columns: ["course_name", "department", "credits"] },
    { dataset: "school", table: "classes", columns: ["class_name", "term_name"] },
    { dataset: "school", table: "tests", columns: ["test_name", "test_type", "test_date"] },
    { dataset: "school", table: "grades", columns: ["score", "letter_grade"] },
    { dataset: "store", table: "products", columns: ["product_name", "category", "price"] },
    { dataset: "store", table: "customers", columns: ["customer_name", "city"] },
    { dataset: "store", table: "orders", columns: ["order_id", "order_date"] },
  ];

  const questions = [];

  configs.forEach((config) => {
    config.columns.forEach((column) => {
      questions.push({
        id: `select:${config.dataset}:${config.table}:${column}:single`,
        dataset: config.dataset,
        title: `Show ${humanizeColumn(column)} from ${config.table}`,
        prompt: `Show the ${humanizeColumn(column)} for every row in the ${config.table} table. Sort the result by ${humanizeColumn(column)}.`,
        tables: config.table,
        expectedQuery: `SELECT ${column} FROM ${config.table} ORDER BY ${column};`,
        hint: "Pick the requested column, read from the requested table, then sort the result.",
        coaching: "SELECT practice is about returning exactly the requested shape with no extra filtering or joins.",
      });
    });

    pairCombinations(config.columns).forEach(([first, second]) => {
      [first, second].forEach((sortColumn) => {
        // Standard sort
        questions.push({
          id: `select:${config.dataset}:${config.table}:${first}:${second}:sort:${sortColumn}`,
          dataset: config.dataset,
          title: `List ${humanizeColumn(first)} and ${humanizeColumn(second)} from ${config.table}, sorted by ${humanizeColumn(sortColumn)}`,
          prompt: `Show the ${humanizeColumn(first)} together with the ${humanizeColumn(second)} for each row in the ${config.table} table. Sort by ${humanizeColumn(sortColumn)}.`,
          tables: config.table,
          expectedQuery: `SELECT ${first}, ${second} FROM ${config.table} ORDER BY ${sortColumn};`,
          hint: "The requested columns go in SELECT. The source table goes in FROM. The sort column goes in ORDER BY.",
          coaching: "A strong beginner SELECT answer uses only one table, only the requested columns, and one clear ordering rule.",
        });

        // Descending sort
        questions.push({
          id: `select:${config.dataset}:${config.table}:${first}:${second}:sort:${sortColumn}:desc`,
          dataset: config.dataset,
          title: `Sort ${config.table} by ${humanizeColumn(sortColumn)} Descending`,
          prompt: `Show the ${humanizeColumn(first)} and ${humanizeColumn(second)} from the ${config.table} table, but sort the results by ${humanizeColumn(sortColumn)} in descending order (highest to lowest).`,
          tables: config.table,
          expectedQuery: `SELECT ${first}, ${second} FROM ${config.table} ORDER BY ${sortColumn} DESC;`,
          hint: "Add DESC after the column name in the ORDER BY clause.",
          coaching: "DESC flips the order. It's essential for seeing the most recent dates or highest prices first.",
        });
      });

      // Multi-column sort
      questions.push({
        id: `select:${config.dataset}:${config.table}:${first}:${second}:sort:multi`,
        dataset: config.dataset,
        title: `Multi-column sort on ${config.table}`,
        prompt: `List the ${humanizeColumn(first)} and ${humanizeColumn(second)} from the ${config.table} table. Sort the results first by ${humanizeColumn(first)} and then by ${humanizeColumn(second)}.`,
        tables: config.table,
        expectedQuery: `SELECT ${first}, ${second} FROM ${config.table} ORDER BY ${first}, ${second};`,
        hint: "List both columns in ORDER BY, separated by a comma.",
        coaching: "When the first column has duplicate values, the second column determines the order within those duplicates.",
      });
    });

    // DISTINCT variation
    config.columns.forEach((column) => {
      questions.push({
        id: `select:${config.dataset}:${config.table}:${column}:distinct`,
        dataset: config.dataset,
        title: `Unique ${humanizeColumn(column)} values`,
        prompt: `Find all unique values of ${humanizeColumn(column)} in the ${config.table} table. Sort the result by ${humanizeColumn(column)}.`,
        tables: config.table,
        expectedQuery: `SELECT DISTINCT ${column} FROM ${config.table} ORDER BY ${column};`,
        hint: "Use the DISTINCT keyword immediately after SELECT.",
        coaching: "DISTINCT removes duplicate rows from your results.",
      });
    });
  });

  return dedupeQuestions(questions);
}

function buildAliasQuestions() {
  const configs = [
    { dataset: "library", table: "books", alias: "b", columns: ["book_title", "category", "is_available"] },
    { dataset: "library", table: "members", alias: "m", columns: ["member_name", "city"] },
    { dataset: "school", table: "students", alias: "s", columns: ["student_name", "grade_level", "active"] },
    { dataset: "school", table: "teachers", alias: "t", columns: ["teacher_name", "subject"] },
    { dataset: "school", table: "courses", alias: "c", columns: ["course_name", "department", "credits"] },
    { dataset: "school", table: "classrooms", alias: "r", columns: ["room_name", "capacity"] },
    { dataset: "school", table: "tests", alias: "ts", columns: ["test_name", "test_type", "test_date"] },
    { dataset: "store", table: "products", alias: "p", columns: ["product_name", "category", "price"] },
    { dataset: "store", table: "customers", alias: "c", columns: ["customer_name", "city"] },
  ];

  const questions = [];

  configs.forEach((config) => {
    pairCombinations(config.columns).forEach(([first, second]) => {
      [first, second].forEach((sortColumn) => {
        questions.push({
          id: `aliases:${config.dataset}:${config.table}:${first}:${second}:sort:${sortColumn}`,
          dataset: config.dataset,
          title: `Use an alias with ${config.table} for ${humanizeColumn(first)} and ${humanizeColumn(second)}, sorted by ${humanizeColumn(sortColumn)}`,
          prompt: `Give the ${config.table} table a short alias and use that alias throughout the query. Show the ${humanizeColumn(first)} with the ${humanizeColumn(second)} and sort by ${humanizeColumn(sortColumn)}.`,
          tables: config.table,
          expectedQuery: `SELECT ${config.alias}.${first}, ${config.alias}.${second} FROM ${config.table} ${config.alias} ORDER BY ${config.alias}.${sortColumn};`,
          hint: "Alias the table once in FROM, then keep using the alias when you name columns.",
          coaching: "Aliases are naming shortcuts. This concept is about using the short name consistently, even in ORDER BY.",
        });
      });

      // Column alias variation
      const col = config.columns[0];
      questions.push({
        id: `aliases:${config.dataset}:${config.table}:${col}:as`,
        dataset: config.dataset,
        title: `Rename column ${humanizeColumn(col)} using AS`,
        prompt: `Select the ${humanizeColumn(col)} from the ${config.table} table and rename it to 'Display_Name' using an alias. Sort the result by the new name.`,
        tables: config.table,
        expectedQuery: `SELECT ${col} AS Display_Name FROM ${config.table} ORDER BY Display_Name;`,
        hint: "Use AS 'New_Name' after the column in SELECT.",
        coaching: "Column aliases let you customize the headers of your result set.",
      });
    });
  });

  return dedupeQuestions(questions);
}

function buildWhereQuestions() {
  const configs = [
    {
      dataset: "library",
      table: "books",
      selectColumns: ["book_title", "category"],
      sortColumn: "book_title",
      filters: [
        { key: "available", text: "that are available to borrow right now", sql: "is_available = 1" },
        { key: "checked-out", text: "that are currently checked out", sql: "is_available = 0" },
        { key: "tech", text: "that belong to the Technology category", sql: "category = 'Technology'" },
        { key: "science", text: "that belong to the Science category", sql: "category = 'Science'" },
        { key: "lifestyle", text: "that belong to the Lifestyle category", sql: "category = 'Lifestyle'" },
      ],
    },
    {
      dataset: "library",
      table: "members",
      selectColumns: ["member_name", "city"],
      sortColumn: "member_name",
      filters: [
        { key: "austin", text: "who live in Austin", sql: "city = 'Austin'" },
        { key: "chicago", text: "who live in Chicago", sql: "city = 'Chicago'" },
        { key: "dallas", text: "who live in Dallas", sql: "city = 'Dallas'" },
      ],
    },
    {
      dataset: "school",
      table: "students",
      selectColumns: ["student_name", "grade_level"],
      sortColumn: "student_name",
      filters: [
        { key: "grade7", text: "who are in grade 7", sql: "grade_level = 7" },
        { key: "grade8", text: "who are in grade 8", sql: "grade_level = 8" },
        { key: "grade9", text: "who are in grade 9", sql: "grade_level = 9" },
        { key: "active", text: "who are currently active", sql: "active = 1" },
        { key: "inactive", text: "who are not currently active", sql: "active = 0" },
      ],
      doubleFilters: [
        { key: "grade8-active", text: "who are both in grade 8 and currently active", sql: "grade_level = 8 AND active = 1" },
        { key: "grade7-active", text: "who are both in grade 7 and currently active", sql: "grade_level = 7 AND active = 1" },
      ],
    },
    {
      dataset: "school",
      table: "courses",
      selectColumns: ["course_name", "department"],
      sortColumn: "course_name",
      filters: [
        { key: "science", text: "that belong to the Science department", sql: "department = 'Science'" },
        { key: "technology", text: "that belong to the Technology department", sql: "department = 'Technology'" },
        { key: "four-credits", text: "that are worth 4 credits", sql: "credits = 4" },
      ],
      doubleFilters: [
        { key: "science-four-credits", text: "that belong to the Science department and are worth 4 credits", sql: "department = 'Science' AND credits = 4" },
      ],
    },
    {
      dataset: "school",
      table: "classrooms",
      selectColumns: ["room_name", "capacity"],
      sortColumn: "room_name",
      filters: [
        { key: "capacity-over-25", text: "with capacity greater than 25", sql: "capacity > 25" },
        { key: "capacity-over-30", text: "with capacity greater than 30", sql: "capacity > 30" },
      ],
    },
    {
      dataset: "school",
      table: "grades",
      selectColumns: ["score", "letter_grade"],
      sortColumn: "score",
      filters: [
        { key: "grade-a", text: "with the letter grade A", sql: "letter_grade = 'A'" },
        { key: "score-over-90", text: "with score greater than 90", sql: "score > 90" },
      ],
      doubleFilters: [
        { key: "a-over-90", text: "with the letter grade A and a score greater than 90", sql: "letter_grade = 'A' AND score > 90" },
      ],
    },
    {
      dataset: "store",
      table: "products",
      selectColumns: ["product_name", "price"],
      sortColumn: "product_name",
      filters: [
        { key: "office", text: "that are in the Office category", sql: "category = 'Office'" },
        { key: "home", text: "that are in the Home category", sql: "category = 'Home'" },
        { key: "lifestyle", text: "that are in the Lifestyle category", sql: "category = 'Lifestyle'" },
        { key: "price-over-10", text: "that cost more than 10", sql: "price > 10" },
        { key: "price-over-15", text: "that cost more than 15", sql: "price > 15" },
      ],
      doubleFilters: [
        { key: "office-over-8", text: "that are in the Office category and cost more than 8", sql: "category = 'Office' AND price > 8" },
        { key: "office-over-10", text: "that are in the Office category and cost more than 10", sql: "category = 'Office' AND price > 10" },
      ],
    },
    {
      dataset: "store",
      table: "customers",
      selectColumns: ["customer_name", "city"],
      sortColumn: "customer_name",
      filters: [
        { key: "austin", text: "who live in Austin", sql: "city = 'Austin'" },
        { key: "chicago", text: "who live in Chicago", sql: "city = 'Chicago'" },
        { key: "dallas", text: "who live in Dallas", sql: "city = 'Dallas'" },
      ],
    },
  ];

  const questions = [];

  configs.forEach((config) => {
    config.filters.forEach((filter) => {
      questions.push({
        id: `where:${config.dataset}:${config.table}:${filter.key}:single`,
        dataset: config.dataset,
        title: `Filter ${config.table} rows for ${filter.key}`,
        prompt: `Show the ${humanizeColumn(config.selectColumns[0])} and ${humanizeColumn(config.selectColumns[1])} from the ${config.table} table, but only keep rows ${filter.text}. Sort by ${humanizeColumn(config.sortColumn)}.`,
        tables: config.table,
        expectedQuery: `SELECT ${config.selectColumns.join(", ")} FROM ${config.table} WHERE ${filter.sql} ORDER BY ${config.sortColumn};`,
        hint: "WHERE decides which rows stay in the result.",
        coaching: "Think about the row rule first. Only rows that satisfy the condition should survive the filter.",
      });

      // LIKE variation for strings
      if (filter.sql.includes("'")) {
        const val = filter.sql.split("'")[1];
        const col = filter.sql.split(" ")[0];
        if (val && val.length > 1) {
          questions.push({
            id: `where:${config.dataset}:${config.table}:${filter.key}:like`,
            dataset: config.dataset,
            title: `Search ${config.table} using partial match`,
            prompt: `Find all rows in ${config.table} where ${humanizeColumn(col)} starts with '${val[0]}'. Show the ${config.selectColumns.join(" and ")}.`,
            tables: config.table,
            expectedQuery: `SELECT ${config.selectColumns.join(", ")} FROM ${config.table} WHERE ${col} LIKE '${val[0]}%' ORDER BY ${config.sortColumn};`,
            hint: "Use the LIKE operator with the % wildcard.",
            coaching: "The % wildcard matches zero or more characters. 'A%' matches everything starting with A.",
          });
        }
      }
    });

    // Logical OR variation
    if (config.filters.length >= 2) {
      const f1 = config.filters[0];
      const f2 = config.filters[1];
      questions.push({
        id: `where:${config.dataset}:${config.table}:${f1.key}:${f2.key}:or`,
        dataset: config.dataset,
        title: `OR filter for ${config.table}`,
        prompt: `Show all rows from ${config.table} where EITHER (${f1.text}) OR (${f2.text}). Sort by ${humanizeColumn(config.sortColumn)}.`,
        tables: config.table,
        expectedQuery: `SELECT ${config.selectColumns.join(", ")} FROM ${config.table} WHERE ${f1.sql} OR ${f2.sql} ORDER BY ${config.sortColumn};`,
        hint: "Use the OR operator between two conditions.",
        coaching: "OR is inclusive. If a row meets at least one condition, it is included.",
      });
    }

    (config.doubleFilters || []).forEach((filter) => {
      questions.push({
        id: `where:${config.dataset}:${config.table}:${filter.key}:double`,
        dataset: config.dataset,
        title: `Filter ${config.table} with ${filter.key}`,
        prompt: `Show the ${humanizeColumn(config.selectColumns[0])} and ${humanizeColumn(config.selectColumns[1])} from the ${config.table} table, but only keep rows ${filter.text}. Sort by ${humanizeColumn(config.sortColumn)}.`,
        tables: config.table,
        expectedQuery: `SELECT ${config.selectColumns.join(", ")} FROM ${config.table} WHERE ${filter.sql} ORDER BY ${config.sortColumn};`,
        hint: "When the prompt gives two conditions that must both hold, combine them in WHERE.",
        coaching: "Multiple conditions still belong to row filtering. Stay focused on which rows qualify before thinking about output.",
      });
    });

    // BETWEEN variation for numbers
    if (config.table === "products") {
       questions.push({
        id: `where:store:products:price:between`,
        dataset: "store",
        title: "Price range for products",
        prompt: "Show the product_name and price for all products where the price is between 10 and 20. Sort by price.",
        tables: "products",
        expectedQuery: "SELECT product_name, price FROM products WHERE price BETWEEN 10 AND 20 ORDER BY price;",
        hint: "Use the BETWEEN operator for range filtering.",
        coaching: "BETWEEN is inclusive. It's cleaner than using >= AND <=.",
      });
    }
  });

  return dedupeQuestions(questions);
}

function buildHavingQuestions() {
  const questions = [
    {
      id: "having:books:category:gt1",
      dataset: "library",
      title: "Find book categories with multiple books",
      prompt: "Count how many books are in each category, then show only the categories that have more than one book. Sort by category.",
      tables: "books",
      expectedQuery: "SELECT category, COUNT(*) AS book_count FROM books GROUP BY category HAVING COUNT(*) > 1 ORDER BY category;",
    },
    {
      id: "having:students:grade:gt1",
      dataset: "school",
      title: "Find grade levels with multiple students",
      prompt: "Count how many students are in each grade level, then show only the grade levels that have more than one student. Sort by grade level.",
      tables: "students",
      expectedQuery: "SELECT grade_level, COUNT(*) AS student_count FROM students GROUP BY grade_level HAVING COUNT(*) > 1 ORDER BY grade_level;",
    },
    {
      id: "having:tests:type:gt1",
      dataset: "school",
      title: "Find repeated test types",
      prompt: "Count how many tests belong to each test type, then show only the test types that appear more than once. Sort by test type.",
      tables: "tests",
      expectedQuery: "SELECT test_type, COUNT(*) AS test_count FROM tests GROUP BY test_type HAVING COUNT(*) > 1 ORDER BY test_type;",
    },
    {
      id: "having:grades:letter:gt1",
      dataset: "school",
      title: "Find common letter grades",
      prompt: "Count how many grade records belong to each letter grade, then show only the letter grades that appear more than once. Sort by letter grade.",
      tables: "grades",
      expectedQuery: "SELECT letter_grade, COUNT(*) AS grade_count FROM grades GROUP BY letter_grade HAVING COUNT(*) > 1 ORDER BY letter_grade;",
    },
    {
      id: "having:classes:building:gt1",
      dataset: "school",
      title: "Find buildings hosting multiple classes",
      prompt: "Count how many classes are scheduled in each building, then show only the building ids that host more than one class. Sort by building id.",
      tables: "classes, classrooms",
      expectedQuery: "SELECT r.building_id, COUNT(*) AS class_count FROM classes c INNER JOIN classrooms r ON c.classroom_id = r.classroom_id GROUP BY r.building_id HAVING COUNT(*) > 1 ORDER BY r.building_id;",
    },
    {
      id: "having:order_items:product:gt2",
      dataset: "store",
      title: "Find products with more than two units sold",
      prompt: "Add up total quantity sold for each product id, then show only the product ids whose total sold quantity is greater than 2. Sort by product id.",
      tables: "order_items",
      expectedQuery: "SELECT product_id, SUM(quantity) AS total_quantity FROM order_items GROUP BY product_id HAVING SUM(quantity) > 2 ORDER BY product_id;",
    },
    {
      id: "having:order_items:order:gt3",
      dataset: "store",
      title: "Find larger orders",
      prompt: "Add up total quantity inside each order, then show only the order ids whose total quantity is greater than 3. Sort by order id.",
      tables: "order_items",
      expectedQuery: "SELECT order_id, SUM(quantity) AS total_quantity FROM order_items GROUP BY order_id HAVING SUM(quantity) > 3 ORDER BY order_id;",
    },
    {
      id: "having:enrollments:student:gt1",
      dataset: "school",
      title: "Find students with multiple enrollments",
      prompt: "Count how many enrollments each student id has, then show only the student ids with more than one enrollment. Sort by student id.",
      tables: "enrollments",
      expectedQuery: "SELECT student_id, COUNT(*) AS enrollment_count FROM enrollments GROUP BY student_id HAVING COUNT(*) > 1 ORDER BY student_id;",
    },
    {
      id: "having:loans:member:gt1",
      dataset: "library",
      title: "Find members with multiple loans",
      prompt: "Count how many loans each member id has, then show only the member ids with more than one loan. Sort by member id.",
      tables: "loans",
      expectedQuery: "SELECT member_id, COUNT(*) AS loan_count FROM loans GROUP BY member_id HAVING COUNT(*) > 1 ORDER BY member_id;",
    },
    {
      id: "having:products-category:units:gt4",
      dataset: "store",
      title: "Find strong-selling categories",
      prompt: "Work out total quantity sold for each product category, then show only the categories whose total quantity is greater than 4. Sort by category.",
      tables: "products, order_items",
      expectedQuery:
        "SELECT p.category, SUM(oi.quantity) AS total_quantity FROM products p INNER JOIN order_items oi ON p.product_id = oi.product_id GROUP BY p.category HAVING SUM(oi.quantity) > 4 ORDER BY p.category;",
    },
    {
      id: "having:classes:teacher:gt1",
      dataset: "school",
      title: "Find teachers with multiple classes",
      prompt: "Count how many classes each teacher id leads, then show only the teacher ids that teach more than one class. Sort by teacher id.",
      tables: "classes",
      expectedQuery: "SELECT teacher_id, COUNT(*) AS class_count FROM classes GROUP BY teacher_id HAVING COUNT(*) > 1 ORDER BY teacher_id;",
    },
  ];

  return questions.map((question) => ({
    ...question,
    hint: "If the filter depends on COUNT or SUM, the condition belongs in HAVING after GROUP BY.",
    coaching: "HAVING filters grouped results, not raw rows. Build the groups first, summarize them, then keep only the groups that qualify.",
  }));
}

function buildInnerJoinQuestions() {
  const questions = [
    {
      id: "join:library:current-loans",
      dataset: "library",
      title: "Match members to current books",
      prompt: "Show which members currently have which books checked out. Sort by member name.",
      tables: "loans, members, books",
      expectedQuery:
        "SELECT m.member_name, b.book_title FROM loans l INNER JOIN members m ON l.member_id = m.member_id INNER JOIN books b ON l.book_id = b.book_id WHERE l.returned_on IS NULL ORDER BY m.member_name;",
    },
    {
      id: "join:library:due-dates",
      dataset: "library",
      title: "Show current due dates",
      prompt: "Show each currently borrowed book together with the member who has it and the due date. Sort by due date.",
      tables: "loans, members, books",
      expectedQuery:
        "SELECT b.book_title, m.member_name, l.due_date FROM loans l INNER JOIN members m ON l.member_id = m.member_id INNER JOIN books b ON l.book_id = b.book_id WHERE l.returned_on IS NULL ORDER BY l.due_date;",
    },
    {
      id: "join:school:students-classes",
      dataset: "school",
      title: "Match students to classes",
      prompt: "Show each student together with the classes they are enrolled in. Sort by student name.",
      tables: "students, enrollments, classes",
      expectedQuery:
        "SELECT s.student_name, c.class_name FROM students s INNER JOIN enrollments e ON s.student_id = e.student_id INNER JOIN classes c ON e.class_id = c.class_id ORDER BY s.student_name;",
    },
    {
      id: "join:school:classes-courses",
      dataset: "school",
      title: "Match classes to courses",
      prompt: "Show each class together with its course name and department. Sort by class name.",
      tables: "classes, courses",
      expectedQuery:
        "SELECT cl.class_name, co.course_name, co.department FROM classes cl INNER JOIN courses co ON cl.course_id = co.course_id ORDER BY cl.class_name;",
    },
    {
      id: "join:school:classes-teachers",
      dataset: "school",
      title: "Match classes to teachers",
      prompt: "Show each class together with the teacher who leads it. Sort by class name.",
      tables: "classes, teachers",
      expectedQuery:
        "SELECT c.class_name, t.teacher_name FROM classes c INNER JOIN teachers t ON c.teacher_id = t.teacher_id ORDER BY c.class_name;",
    },
    {
      id: "join:school:classes-rooms-buildings",
      dataset: "school",
      title: "Show classes with rooms and buildings",
      prompt: "Show each class together with its room name and building name. Sort by class name.",
      tables: "classes, classrooms, buildings",
      expectedQuery:
        "SELECT cl.class_name, r.room_name, b.building_name FROM classes cl INNER JOIN classrooms r ON cl.classroom_id = r.classroom_id INNER JOIN buildings b ON r.building_id = b.building_id ORDER BY cl.class_name;",
    },
    {
      id: "join:school:tests-classes",
      dataset: "school",
      title: "Show tests with classes",
      prompt: "Show each test together with the class name it belongs to and the test date. Sort by test date.",
      tables: "tests, classes",
      expectedQuery:
        "SELECT t.test_name, cl.class_name, t.test_date FROM tests t INNER JOIN classes cl ON t.class_id = cl.class_id ORDER BY t.test_date;",
    },
    {
      id: "join:school:grades-tests-students",
      dataset: "school",
      title: "Show student test scores",
      prompt: "Show each student together with the test name and score they received. Sort by student name.",
      tables: "grades, tests, students",
      expectedQuery:
        "SELECT s.student_name, t.test_name, g.score FROM grades g INNER JOIN students s ON g.student_id = s.student_id INNER JOIN tests t ON g.test_id = t.test_id ORDER BY s.student_name;",
    },
    {
      id: "join:school:student-class-teacher",
      dataset: "school",
      title: "Show students with classes and teachers",
      prompt: "Show each student together with the class name and the teacher name for that class. Sort by student name.",
      tables: "students, enrollments, classes, teachers",
      expectedQuery:
        "SELECT s.student_name, c.class_name, t.teacher_name FROM students s INNER JOIN enrollments e ON s.student_id = e.student_id INNER JOIN classes c ON e.class_id = c.class_id INNER JOIN teachers t ON c.teacher_id = t.teacher_id ORDER BY s.student_name;",
    },
    {
      id: "join:store:orders-customers",
      dataset: "store",
      title: "Match orders to customers",
      prompt: "Show each order together with the customer who placed it. Sort by order date.",
      tables: "orders, customers",
      expectedQuery:
        "SELECT o.order_id, c.customer_name, o.order_date FROM orders o INNER JOIN customers c ON o.customer_id = c.customer_id ORDER BY o.order_date;",
    },
    {
      id: "join:store:order-products",
      dataset: "store",
      title: "Show products inside orders",
      prompt: "Show each order id together with the product name and quantity inside that order. Sort by order id.",
      tables: "order_items, products",
      expectedQuery:
        "SELECT oi.order_id, p.product_name, oi.quantity FROM order_items oi INNER JOIN products p ON oi.product_id = p.product_id ORDER BY oi.order_id;",
    },
    {
      id: "join:store:customer-products",
      dataset: "store",
      title: "Show customers with purchased products",
      prompt: "Show each customer together with the product names they purchased and the quantity for each purchased item. Sort by customer name.",
      tables: "customers, orders, order_items, products",
      expectedQuery:
        "SELECT c.customer_name, p.product_name, oi.quantity FROM customers c INNER JOIN orders o ON c.customer_id = o.customer_id INNER JOIN order_items oi ON o.order_id = oi.order_id INNER JOIN products p ON oi.product_id = p.product_id ORDER BY c.customer_name;",
    },
    {
      id: "join:library:member-loans-books",
      dataset: "library",
      title: "Show members with their borrowed books",
      prompt: "Show each member name together with the title of the book they borrowed and the loan date. Sort by member name.",
      tables: "members, loans, books",
      expectedQuery:
        "SELECT m.member_name, b.book_title, l.loan_date FROM members m INNER JOIN loans l ON m.member_id = l.member_id INNER JOIN books b ON l.book_id = b.book_id ORDER BY m.member_name;",
    },
  ];

  return questions.map((question) => ({
    ...question,
    hint: "Start from the table that links the records, then join outward to the human-readable tables.",
    coaching: "INNER JOIN is for matching related rows across tables. The learner should focus on how keys connect the data.",
  }));
}

function buildGroupByQuestions() {
  const questions = [
    {
      id: "group:books:category",
      dataset: "library",
      title: "Count books by category",
      prompt: "Count how many books are in each category and sort by category.",
      tables: "books",
      expectedQuery: "SELECT category, COUNT(*) AS book_count FROM books GROUP BY category ORDER BY category;",
    },
    {
      id: "group:members:city",
      dataset: "library",
      title: "Count members by city",
      prompt: "Count how many members live in each city and sort by city.",
      tables: "members",
      expectedQuery: "SELECT city, COUNT(*) AS member_count FROM members GROUP BY city ORDER BY city;",
    },
    {
      id: "group:students:grade",
      dataset: "school",
      title: "Count students by grade",
      prompt: "Count how many students are in each grade level and sort by grade level.",
      tables: "students",
      expectedQuery: "SELECT grade_level, COUNT(*) AS student_count FROM students GROUP BY grade_level ORDER BY grade_level;",
    },
    {
      id: "group:tests:type",
      dataset: "school",
      title: "Count tests by type",
      prompt: "Count how many tests belong to each test type and sort by test type.",
      tables: "tests",
      expectedQuery: "SELECT test_type, COUNT(*) AS test_count FROM tests GROUP BY test_type ORDER BY test_type;",
    },
    {
      id: "group:grades:letter",
      dataset: "school",
      title: "Count grades by letter",
      prompt: "Count how many grade records belong to each letter grade and sort by letter grade.",
      tables: "grades",
      expectedQuery: "SELECT letter_grade, COUNT(*) AS grade_count FROM grades GROUP BY letter_grade ORDER BY letter_grade;",
    },
    {
      id: "group:classrooms:building",
      dataset: "school",
      title: "Count classrooms by building",
      prompt: "Count how many classrooms belong to each building id and sort by building id.",
      tables: "classrooms",
      expectedQuery: "SELECT building_id, COUNT(*) AS classroom_count FROM classrooms GROUP BY building_id ORDER BY building_id;",
    },
    {
      id: "group:students:active",
      dataset: "school",
      title: "Count students by active status",
      prompt: "Count how many students fall into each active status and sort by active status.",
      tables: "students",
      expectedQuery: "SELECT active, COUNT(*) AS student_count FROM students GROUP BY active ORDER BY active;",
    },
    {
      id: "group:customers:city",
      dataset: "store",
      title: "Count customers by city",
      prompt: "Count how many customers live in each city and sort by city.",
      tables: "customers",
      expectedQuery: "SELECT city, COUNT(*) AS customer_count FROM customers GROUP BY city ORDER BY city;",
    },
    {
      id: "group:products:category",
      dataset: "store",
      title: "Count products by category",
      prompt: "Count how many products are in each category and sort by category.",
      tables: "products",
      expectedQuery: "SELECT category, COUNT(*) AS product_count FROM products GROUP BY category ORDER BY category;",
    },
    {
      id: "group:order-items:order",
      dataset: "store",
      title: "Add quantities by order",
      prompt: "Add up total quantity inside each order and sort by order id.",
      tables: "order_items",
      expectedQuery: "SELECT order_id, SUM(quantity) AS total_quantity FROM order_items GROUP BY order_id ORDER BY order_id;",
    },
    {
      id: "group:order-items:product",
      dataset: "store",
      title: "Add quantities by product",
      prompt: "Add up total quantity sold for each product id and sort by product id.",
      tables: "order_items",
      expectedQuery: "SELECT product_id, SUM(quantity) AS total_quantity FROM order_items GROUP BY product_id ORDER BY product_id;",
    },
    {
      id: "group:enrollments:class",
      dataset: "school",
      title: "Count enrollments by class",
      prompt: "Count how many enrollments each class id has and sort by class id.",
      tables: "enrollments",
      expectedQuery: "SELECT class_id, COUNT(*) AS enrollment_count FROM enrollments GROUP BY class_id ORDER BY class_id;",
    },
    {
      id: "group:store:multi-agg",
      dataset: "store",
      title: "Category price statistics",
      prompt: "For each product category, find the count of products, the average price, and the maximum price. Sort by category.",
      tables: "products",
      expectedQuery: "SELECT category, COUNT(*), AVG(price), MAX(price) FROM products GROUP BY category ORDER BY category;",
    },
    {
      id: "group:school:multi-col",
      dataset: "school",
      title: "Grades per student and class",
      prompt: "Count how many grades each student has in each class. Show the student name, class name, and the count of grades. Join students, grades, tests, and classes. Sort by student name and then class name.",
      tables: "students, grades, tests, classes",
      expectedQuery: "SELECT s.student_name, c.class_name, COUNT(*) FROM students s JOIN grades g ON s.student_id = g.student_id JOIN tests t ON g.test_id = t.test_id JOIN classes c ON t.class_id = c.class_id GROUP BY s.student_name, c.class_name ORDER BY s.student_name, c.class_name;",
    },
  ];

  return questions.map((question) => ({
    ...question,
    hint: "The grouped column must appear in both SELECT and GROUP BY.",
    coaching: "GROUP BY turns detail rows into buckets. Each output row now stands for an entire group.",
  }));
}

function buildLeftJoinQuestions() {
  const questions = [
    {
      id: "left:books-loans",
      dataset: "library",
      title: "Keep every book visible",
      prompt: "Show every book and include any matching loan id if one exists. Books without a loan should still appear. Sort by book title.",
      tables: "books, loans",
      expectedQuery:
        "SELECT b.book_title, l.loan_id FROM books b LEFT JOIN loans l ON b.book_id = l.book_id ORDER BY b.book_title;",
    },
    {
      id: "left:customers-orders",
      dataset: "store",
      title: "Keep every customer visible",
      prompt: "Show every customer and include any matching order id if one exists. Customers without an order should still appear. Sort by customer name.",
      tables: "customers, orders",
      expectedQuery:
        "SELECT c.customer_name, o.order_id FROM customers c LEFT JOIN orders o ON c.customer_id = o.customer_id ORDER BY c.customer_name;",
    },
    {
      id: "left:students-enrollments",
      dataset: "school",
      title: "Keep every student visible",
      prompt: "Show every student and include any matching enrollment id if one exists. Students without an enrollment should still appear. Sort by student name.",
      tables: "students, enrollments",
      expectedQuery:
        "SELECT s.student_name, e.enrollment_id FROM students s LEFT JOIN enrollments e ON s.student_id = e.student_id ORDER BY s.student_name;",
    },
    {
      id: "left:courses-classes",
      dataset: "school",
      title: "Keep every course visible",
      prompt: "Show every course and include any matching class id if one exists. Courses without a class should still appear. Sort by course name.",
      tables: "courses, classes",
      expectedQuery:
        "SELECT co.course_name, cl.class_id FROM courses co LEFT JOIN classes cl ON co.course_id = cl.course_id ORDER BY co.course_name;",
    },
    {
      id: "left:classes-tests",
      dataset: "school",
      title: "Keep every class visible for tests",
      prompt: "Show every class and include any matching test id if one exists. Classes without a test should still appear. Sort by class name.",
      tables: "classes, tests",
      expectedQuery:
        "SELECT cl.class_name, t.test_id FROM classes cl LEFT JOIN tests t ON cl.class_id = t.class_id ORDER BY cl.class_name;",
    },
    {
      id: "left:products-order-items",
      dataset: "store",
      title: "Keep every product visible",
      prompt: "Show every product and include any matching order item id if one exists. Products without a matching order item should still appear. Sort by product name.",
      tables: "products, order_items",
      expectedQuery:
        "SELECT p.product_name, oi.order_item_id FROM products p LEFT JOIN order_items oi ON p.product_id = oi.product_id ORDER BY p.product_name;",
    },
  ];

  return questions.map((question) => ({
    ...question,
    hint: "Put the table you want to preserve on the left side of the LEFT JOIN.",
    coaching: "LEFT JOIN keeps every row from the left table even when there is no matching row on the right.",
  }));
}

function buildSubqueryQuestions() {
  const questions = [
    {
      id: "subquery:products-above-average",
      dataset: "store",
      title: "Find products above average price",
      prompt: "Show the products that cost more than the average product price. Sort from highest price to lowest price.",
      tables: "products",
      expectedQuery:
        "SELECT product_name, price FROM products WHERE price > (SELECT AVG(price) FROM products) ORDER BY price DESC;",
    },
    {
      id: "subquery:products-below-average",
      dataset: "store",
      title: "Find products below average price",
      prompt: "Show the products that cost less than the average product price. Sort from lowest price to highest price.",
      tables: "products",
      expectedQuery:
        "SELECT product_name, price FROM products WHERE price < (SELECT AVG(price) FROM products) ORDER BY price ASC;",
    },
    {
      id: "subquery:students-above-average-score",
      dataset: "school",
      title: "Find grades above average score",
      prompt: "Show the grade records whose score is higher than the average score in the grades table. Sort from highest score to lowest score.",
      tables: "grades",
      expectedQuery:
        "SELECT grade_id, score FROM grades WHERE score > (SELECT AVG(score) FROM grades) ORDER BY score DESC;",
    },
    {
      id: "subquery:classes-with-tests",
      dataset: "school",
      title: "Find classes that already have tests",
      prompt: "Show the class names for classes that appear in the tests table. Sort by class name.",
      tables: "classes, tests",
      expectedQuery:
        "SELECT class_name FROM classes WHERE class_id IN (SELECT class_id FROM tests) ORDER BY class_name;",
    },
    {
      id: "subquery:students-above-average-grade",
      dataset: "school",
      title: "Find students above average grade level",
      prompt: "Show the students whose grade level is higher than the average grade level in the students table. Sort by student name.",
      tables: "students",
      expectedQuery:
        "SELECT student_name, grade_level FROM students WHERE grade_level > (SELECT AVG(grade_level) FROM students) ORDER BY student_name;",
    },
    {
      id: "subquery:customers-multiple-orders",
      dataset: "store",
      title: "Find customers with more than one order",
      prompt: "Show the customers who placed more than one order. Sort by customer name.",
      tables: "customers, orders",
      expectedQuery:
        "SELECT customer_name FROM customers WHERE customer_id IN (SELECT customer_id FROM orders GROUP BY customer_id HAVING COUNT(*) > 1) ORDER BY customer_name;",
    },
    {
      id: "subquery:members-multiple-loans",
      dataset: "library",
      title: "Find members with more than one loan",
      prompt: "Show the members who have more than one loan record. Sort by member name.",
      tables: "members, loans",
      expectedQuery:
        "SELECT member_name FROM members WHERE member_id IN (SELECT member_id FROM loans GROUP BY member_id HAVING COUNT(*) > 1) ORDER BY member_name;",
    },
    {
      id: "subquery:students-multiple-enrollments",
      dataset: "school",
      title: "Find students with more than one class",
      prompt: "Show the students who are enrolled in more than one class. Sort by student name.",
      tables: "students, enrollments",
      expectedQuery:
        "SELECT student_name FROM students WHERE student_id IN (SELECT student_id FROM enrollments GROUP BY student_id HAVING COUNT(*) > 1) ORDER BY student_name;",
    },
    {
      id: "subquery:books-never-borrowed",
      dataset: "library",
      title: "Find books never borrowed",
      prompt: "Show the books that have never appeared in the loans table. Sort by book title.",
      tables: "books, loans",
      expectedQuery:
        "SELECT book_title FROM books WHERE book_id NOT IN (SELECT book_id FROM loans) ORDER BY book_title;",
    },
  ];

  return questions.map((question) => ({
    ...question,
    hint: "The inner query should produce the comparison value or list that the outer query needs.",
    coaching: "Subqueries let one query depend on the result of another query. Build the inner answer first, then use it in the outer filter.",
  }));
}

function buildDmlQuestions() {
  const questions = [
    {
      id: "dml:library:insert-member",
      dataset: "library",
      title: "Register a new member",
      prompt: "Add a new member named 'Leo Grant' who lives in 'Austin' to the members table. Use an auto-incrementing ID if necessary, but focus on the name and city columns.",
      tables: "members",
      expectedQuery: "INSERT INTO members (member_name, city) VALUES ('Leo Grant', 'Austin');",
      verificationQuery: "SELECT member_name, city FROM members WHERE member_name = 'Leo Grant';",
    },
    {
      id: "dml:library:update-book",
      dataset: "library",
      title: "Mark book as borrowed",
      prompt: "Update the books table to mark 'The Night Library' as not available (is_available = 0).",
      tables: "books",
      expectedQuery: "UPDATE books SET is_available = 0 WHERE book_title = 'The Night Library';",
      verificationQuery: "SELECT book_title, is_available FROM books WHERE book_title = 'The Night Library';",
    },
    {
      id: "dml:library:delete-loans",
      dataset: "library",
      title: "Remove returned loans",
      prompt: "Delete all records from the loans table where the book has already been returned (return_date is not null).",
      tables: "loans",
      expectedQuery: "DELETE FROM loans WHERE return_date IS NOT NULL;",
      verificationQuery: "SELECT COUNT(*) FROM loans WHERE return_date IS NOT NULL;",
    },
    {
      id: "dml:store:price-hike",
      dataset: "store",
      title: "Increase product prices",
      prompt: "Update all products in the 'Office' category to increase their price by 10%.",
      tables: "products",
      expectedQuery: "UPDATE products SET price = price * 1.10 WHERE category = 'Office';",
      verificationQuery: "SELECT product_name, price FROM products WHERE category = 'Office' ORDER BY product_name;",
    },
    {
      id: "dml:school:activate-student",
      dataset: "school",
      title: "Activate student",
      prompt: "Update the student named 'Lucas Wilson' to set his active status to 1.",
      tables: "students",
      expectedQuery: "UPDATE students SET active = 1 WHERE student_name = 'Lucas Wilson';",
      verificationQuery: "SELECT student_name, active FROM students WHERE student_name = 'Lucas Wilson';",
    },
  ];

  return questions.map((question) => ({
    ...question,
    hint: "DML statements (INSERT, UPDATE, DELETE) change data. Make sure your WHERE clause is specific.",
    coaching: "DML is about data lifecycle. Use INSERT for new records, UPDATE for changes, and DELETE to remove stale data.",
  }));
}

function buildDdlQuestions() {
  const questions = [
    {
      id: "ddl:library:create-tags",
      dataset: "library",
      title: "Create a book tags table",
      prompt: "Create a new table named 'book_tags' with two columns: 'book_id' (INTEGER) and 'tag_name' (TEXT).",
      tables: "books",
      expectedQuery: "CREATE TABLE book_tags (book_id INTEGER, tag_name TEXT);",
      verificationQuery: "SELECT name FROM sqlite_master WHERE type='table' AND name='book_tags';",
    },
    {
      id: "ddl:library:add-column",
      dataset: "library",
      title: "Add email column to members",
      prompt: "Alter the members table to add a new column named 'email' of type TEXT.",
      tables: "members",
      expectedQuery: "ALTER TABLE members ADD COLUMN email TEXT;",
      verificationQuery: "PRAGMA table_info(members);",
    },
    {
      id: "ddl:store:drop-items",
      dataset: "store",
      title: "Remove the products table",
      prompt: "Drop the 'products' table from the database (simulating a cleanup).",
      tables: "products",
      expectedQuery: "DROP TABLE products;",
      verificationQuery: "SELECT name FROM sqlite_master WHERE type='table' AND name='products';",
    },
  ];

  return questions.map((question) => ({
    ...question,
    hint: "DDL statements (CREATE, ALTER, DROP) change the structure of the database.",
    coaching: "DDL defines the 'schema'. It's the blueprint that DML follows.",
  }));
}

function buildViewQuestions() {
  const questions = [
    {
      id: "view:library:active-loans",
      dataset: "library",
      title: "Create active loans view",
      prompt: "Create a view named 'active_loans_view' that shows the member_name and book_title for all loans that haven't been returned yet.",
      tables: "loans, members, books",
      expectedQuery: "CREATE VIEW active_loans_view AS SELECT m.member_name, b.book_title FROM loans l INNER JOIN members m ON l.member_id = m.member_id INNER JOIN books b ON l.book_id = b.book_id WHERE l.returned_on IS NULL;",
      verificationQuery: "SELECT * FROM active_loans_view ORDER BY member_name;",
    },
    {
      id: "view:school:high-scores",
      dataset: "school",
      title: "Create high scores view",
      prompt: "Create a view named 'honor_roll' showing student_name and score for all students with a score above 90.",
      tables: "students, grades",
      expectedQuery: "CREATE VIEW honor_roll AS SELECT s.student_name, g.score FROM students s INNER JOIN grades g ON s.student_id = g.student_id WHERE g.score > 90;",
      verificationQuery: "SELECT * FROM honor_roll ORDER BY student_name;",
    },
  ];

  return questions.map((question) => ({
    ...question,
    hint: "A view is a saved query. Use CREATE VIEW [name] AS [query].",
    coaching: "Views simplify complex joins and logic by giving them a name you can query like a table.",
  }));
}

function buildSetOperatorQuestions() {
  const questions = [
    {
      id: "set:library:cities",
      dataset: "library",
      title: "Find all unique cities",
      prompt: "Find all cities mentioned in the 'members' table and combine them with all cities mentioned in the 'customers' table (if there were any). Use the library dataset and union the cities from members with a hardcoded list for demonstration: SELECT 'Austin' UNION SELECT 'Chicago' UNION SELECT 'New York' ORDER BY 1.",
      tables: "members",
      expectedQuery: "SELECT city FROM members UNION SELECT 'San Francisco' ORDER BY 1;",
      verificationQuery: "",
    },
    {
      id: "set:school:except",
      dataset: "school",
      title: "Students without grades",
      prompt: "Show the student_ids from the students table EXCEPT for the student_ids that appear in the grades table. Sort by student_id.",
      tables: "students, grades",
      expectedQuery: "SELECT student_id FROM students EXCEPT SELECT student_id FROM grades ORDER BY student_id;",
      verificationQuery: "",
    },
  ];

  return questions.map((question) => ({
    ...question,
    hint: "Set operators (UNION, INTERSECT, EXCEPT) combine the results of two SELECT statements.",
    coaching: "Sets allow you to perform logic on whole result sets, like finding overlaps or differences.",
  }));
}

function buildStoredProcQuestions() {
  const questions = [
    {
      id: "proc:members:all",
      dataset: "library",
      title: "Get all members (Simulated)",
      prompt: "In SQLite, we simulate procedures with triggers or standard queries. For this training, write the logic for a procedure that retrieves all member names and cities: SELECT member_name, city FROM members;",
      tables: "members",
      expectedQuery: "SELECT member_name, city FROM members;",
    },
    {
      id: "proc:books:search",
      dataset: "library",
      title: "Search books by status (Simulated)",
      prompt: "Write a query that would serve as a procedure body to find all book titles where the book_id is less than 5.",
      tables: "books",
      expectedQuery: "SELECT book_title FROM books WHERE book_id < 5;",
    },
  ];

  return questions.map((question) => ({
    ...question,
    hint: "Think of a stored procedure as a saved query that you can call later.",
    coaching: "Stored procedures encapsulate business logic on the database server for better performance and security.",
  }));
}

function buildFunctionQuestions() {
  const questions = [
    {
      id: "func:string:lower",
      dataset: "store",
      title: "Lowercase product names",
      prompt: "Use the LOWER() function to retrieve all product names in lowercase.",
      tables: "products",
      expectedQuery: "SELECT LOWER(product_name) FROM products;",
    },
    {
      id: "func:math:abs",
      dataset: "store",
      title: "Absolute stock levels",
      prompt: "While stock is usually positive, use the ABS() function on the stock_level to ensure absolute values are returned.",
      tables: "products",
      expectedQuery: "SELECT ABS(stock_level) FROM products;",
    },
  ];

  return questions.map((question) => ({
    ...question,
    hint: "Functions like LOWER(), UPPER(), ABS(), and LENGTH() transform individual values.",
    coaching: "Functions allow you to manipulate data directly within your SELECT statements for formatting or calculations.",
  }));
}

function buildCaseQuestions() {
  const questions = [
    {
      id: "case:library:availability",
      dataset: "library",
      title: "Categorize book availability",
      prompt: "Show the book_title and a new column 'Status'. If is_available is 1, the status should be 'In Stock'. Otherwise, it should be 'On Loan'. Sort by book_title.",
      tables: "books",
      expectedQuery: "SELECT book_title, CASE WHEN is_available = 1 THEN 'In Stock' ELSE 'On Loan' END AS Status FROM books ORDER BY book_title;",
    },
    {
      id: "case:store:price-category",
      dataset: "store",
      title: "Price brackets",
      prompt: "Categorize products as 'Expensive' if the price is over 20, 'Moderate' if between 10 and 20, and 'Cheap' otherwise. Show product_name and the category. Sort by price.",
      tables: "products",
      expectedQuery: "SELECT product_name, CASE WHEN price > 20 THEN 'Expensive' WHEN price >= 10 THEN 'Moderate' ELSE 'Cheap' END AS bracket FROM products ORDER BY price;",
    },
  ];

  return questions.map((question) => ({
    ...question,
    hint: "Use CASE WHEN condition THEN result ELSE alternative END.",
    coaching: "CASE statements add conditional if-then-else logic directly into your SQL queries.",
  }));
}

function buildCteQuestions() {
  const questions = [
    {
      id: "cte:school:top-grades",
      dataset: "school",
      title: "Using a CTE for filtering",
      prompt: "Create a CTE named 'TopScores' that selects student_id and score where score > 90. Then, select everything from 'TopScores' joined with 'students' to see student names. Sort by score DESC.",
      tables: "grades, students",
      expectedQuery: "WITH TopScores AS (SELECT student_id, score FROM grades WHERE score > 90) SELECT s.student_name, ts.score FROM TopScores ts JOIN students s ON ts.student_id = s.student_id ORDER BY ts.score DESC;",
    },
  ];

  return questions.map((question) => ({
    ...question,
    hint: "Start with WITH Name AS (SELECT ...).",
    coaching: "CTEs (Common Table Expressions) make complex queries much more readable by breaking them into named blocks.",
  }));
}

function buildWindowQuestions() {
  const questions = [
    {
      id: "window:school:rank",
      dataset: "school",
      title: "Rank students by grade",
      prompt: "Show the student_name and their grade_level, along with a row number for each student within their grade level. Sort by grade level and then row number.",
      tables: "students",
      expectedQuery: "SELECT student_name, grade_level, ROW_NUMBER() OVER (PARTITION BY grade_level ORDER BY student_name) as row_num FROM students ORDER BY grade_level, row_num;",
    },
  ];

  return questions.map((question) => ({
    ...question,
    hint: "Use ROW_NUMBER() OVER (PARTITION BY ... ORDER BY ...).",
    coaching: "Window functions perform calculations across a set of table rows that are related to the current row.",
  }));
}

const conceptTemplates = {
  select: buildSelectQuestions(),
  aliases: buildAliasQuestions(),
  where: buildWhereQuestions(),
  having: buildHavingQuestions(),
  inner_join: buildInnerJoinQuestions(),
  group_by: buildGroupByQuestions(),
  left_join: buildLeftJoinQuestions(),
  subquery: buildSubqueryQuestions(),
  dml: buildDmlQuestions(),
  ddl: buildDdlQuestions(),
  views: buildViewQuestions(),
  case: buildCaseQuestions(),
  cte: buildCteQuestions(),
  window_functions: buildWindowQuestions(),
  stored_procs: buildStoredProcQuestions(),
  functions: buildFunctionQuestions(),
  set_operators: buildSetOperatorQuestions(),
};

const scaffoldLevels = [
  {
    label: scaffoldLabels[0],
    apply: (query) => query,
  },
  {
    label: scaffoldLabels[1],
    apply: (query, conceptKey) => {
      const q = query.replaceAll("\n", " ");
      if (conceptKey === "select" || conceptKey === "aliases") {
        const parts = q.split(/ FROM /i);
        return parts.length >= 2 ? `${parts[0]}\nFROM ` : q;
      }
      if (conceptKey === "where") {
        const parts = q.split(/ WHERE /i);
        if (parts.length >= 2) {
          const selectFrom = parts[0].split(/ FROM /i);
          return `${selectFrom[0]}\nFROM ${selectFrom[1] || ""}\nWHERE `;
        }
        return q;
      }
      if (conceptKey === "having") {
        const parts = q.split(/ GROUP BY /i);
        return parts.length >= 2 ? `${parts[0]}\nGROUP BY \nHAVING ` : q;
      }
      if (conceptKey === "inner_join") {
        const selectFrom = q.split(/ FROM /i);
        return selectFrom.length >= 2 ? `${selectFrom[0]}\nFROM ${selectFrom[1].split(/ JOIN /i)[0]}\nJOIN \nJOIN ` : q;
      }
      return q;
    },
  },
  {
    label: scaffoldLabels[2],
    apply: (query, conceptKey) => {
      if (conceptKey === "select") return "SELECT\nFROM ;";
      if (conceptKey === "aliases") return "SELECT\nFROM  ;";
      if (conceptKey === "where") return "SELECT\nFROM\nWHERE ;";
      if (conceptKey === "having") return "SELECT\nFROM\nGROUP BY\nHAVING ;";
      if (conceptKey === "inner_join") return "SELECT\nFROM\nINNER JOIN\nORDER BY ;";
      return "SELECT\nFROM ;";
    },
  },
  {
    label: scaffoldLabels[3],
    apply: () => "",
  },
];

let SQL;
let currentQuestion = null;
let currentQuestionNumber = 0;
let currentQuestionAttempts = 0;
let currentConceptIndex = 0;
let activeEditor = practiceEditor;
const questionRotation = Object.fromEntries(
  conceptOrder.map((concept) => [
    concept.key,
    {
      usedIndices: [],
      visibleHistory: [],
    },
  ])
);

const progress = Object.fromEntries(
  conceptOrder.map((concept) => [
    concept.key,
    {
      label: concept.label,
      support: 100,
      asked: 0,
      correct: 0,
      currentStreak: 0,
      mastery: {},
      consecutiveIndependentCorrect: 0,
      skipChallengeActive: false,
      mastered: false,
    },
  ])
);

function randomItem(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function shuffled(list) {
  const clone = [...list];
  for (let index = clone.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [clone[index], clone[swapIndex]] = [clone[swapIndex], clone[index]];
  }
  return clone;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function buildDatabase(datasetKey) {
  const db = new SQL.Database();
  db.run(datasets[datasetKey].seedSql);
  return db;
}

function normalizeResults(resultSets) {
  return resultSets.map((set) => ({
    columns: [...set.columns],
    values: set.values.map((row) => row.map((value) => (value === null ? null : String(value)))),
  }));
}

function areResultsEqual(left, right) {
  return JSON.stringify(normalizeResults(left)) === JSON.stringify(normalizeResults(right));
}

function normalizeQueryText(query) {
  return query.toLowerCase().replaceAll(";", "").replace(/\s+/g, " ").trim();
}

function renderTable(resultSets) {
  if (!resultSets.length) {
    return `<div class="result-empty">The statement ran successfully but returned no rows.</div>`;
  }

  const first = resultSets[0];
  const headers = first.columns.map((column) => `<th>${escapeHtml(column)}</th>`).join("");
  const rows = first.values
    .map(
      (row) =>
        `<tr>${row
          .map((value) => `<td>${value === null ? "<em>null</em>" : escapeHtml(value)}</td>`)
          .join("")}</tr>`
    )
    .join("");

  return `
    <div class="result-table-wrapper">
      <table class="result-table">
        <thead><tr>${headers}</tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  `;
}

function currentConcept() {
  return conceptOrder[currentConceptIndex];
}

function supportMode(support) {
  if (support >= 75) return 0;
  if (support >= 50) return 1;
  if (support >= 25) return 2;
  return 3;
}

function conceptSummaryMessage(conceptKey) {
  const stats = progress[conceptKey];
  if (stats.mastered) {
    return `${stats.label} is mastered. The next concept is now unlocked.`;
  }

  const mode = supportMode(stats.support);

  if (mode === 0) {
    return `You are still in fully guided ${stats.label} practice. Keep solving similar questions until the pattern feels obvious.`;
  }

  if (mode === 1) {
    return `${stats.label} scaffolding has been reduced. You still stay in this concept until you can write more of the SQL yourself.`;
  }

  if (mode === 2) {
    return `${stats.label} is now in light-support mode. You need a few stronger answers before the trainer removes most of the help.`;
  }

  return `${stats.label} is in independent mode. The trainer will not advance until you can reliably write the SQL with little or no scaffold.`;
}

function renderMastery() {
  const tracker = document.querySelector("#course-tracker");
  if (tracker) {
    tracker.innerHTML = conceptOrder
      .map((concept, index) => {
        const stats = progress[concept.key];
        let stateClass = "";
        let icon = index + 1;

        if (stats.mastered || index < currentConceptIndex) {
          stateClass = "completed";
          icon = "✓";
        } else if (index === currentConceptIndex) {
          stateClass = "current";
        }

        return `
          <div class="step-node ${stateClass}">
            <div class="step-circle">${icon}</div>
            <div class="step-label">${concept.label}</div>
          </div>
        `;
      })
      .join("");
  }

  masteryGrid.innerHTML = conceptOrder
    .map((concept, index) => {
      const stats = progress[concept.key];
      const progressPercent = stats.mastered ? 100 : Math.max(10, 100 - stats.support);
      const stateLabel = stats.mastered
        ? "Unlocked"
        : index === currentConceptIndex
        ? "Current"
        : index < currentConceptIndex
        ? "Done"
        : "Locked";
      return `
        <article class="mastery-card">
          <div class="mastery-card-header">
            <strong>${concept.label}</strong>
            <span>${stateLabel}</span>
          </div>
          <div class="mastery-meter"><span style="width:${progressPercent}%"></span></div>
          <p>Support ${stats.support}%, correct ${stats.correct}/${stats.asked}</p>
        </article>
      `;
    })
    .join("");
}

function buildScaffoldedStarter(query, conceptKey, support) {
  return scaffoldLevels[supportMode(support)].apply(query, conceptKey);
}

function nextTemplateIndex(conceptKey) {
  const rotation = questionRotation[conceptKey];
  const templates = conceptTemplates[conceptKey];
  const allIndices = templates.map((_, index) => index);
  const unusedIndices = allIndices.filter((index) => !rotation.usedIndices.includes(index));

  if (unusedIndices.length) {
    return randomItem(unusedIndices);
  }

  return randomItem(allIndices);
}

function recordVisibleQuestion(conceptKey, templateIndex) {
  const rotation = questionRotation[conceptKey];
  if (!rotation || templateIndex === undefined || templateIndex === null) return;

  if (!rotation.usedIndices.includes(templateIndex)) {
    rotation.usedIndices.push(templateIndex);
  }
  rotation.visibleHistory.push(templateIndex);
  if (rotation.visibleHistory.length > 24) {
    rotation.visibleHistory.shift();
  }
}

function questionTableList(question) {
  return question.tables
    .split(",")
    .map((table) => table.trim())
    .filter(Boolean);
}

function renderSchemaPalette(question) {
  const datasetSchema = datasets[question.dataset].schema;
  const tables = questionTableList(question);

  schemaPalette.innerHTML = tables
    .map((tableName) => {
      const columns = datasetSchema[tableName] || [];
      const columnChips = columns
        .map(
          (column) => `
            <button
              class="schema-chip"
              type="button"
              draggable="true"
              data-insert="${escapeHtml(column)}"
              data-kind="column"
              data-table="${escapeHtml(tableName)}"
            >
              ${escapeHtml(column)}
            </button>
          `
        )
        .join("");

      return `
        <article class="schema-group">
          <div class="schema-group-header">
            <h4>${escapeHtml(tableName)}</h4>
            <button
              class="schema-chip table-chip"
              type="button"
              draggable="true"
              data-insert="${escapeHtml(tableName)}"
              data-kind="table"
              data-table="${escapeHtml(tableName)}"
            >
              Insert table
            </button>
          </div>
          <p class="schema-caption">Columns from ${escapeHtml(tableName)}</p>
          <div class="schema-chip-row">
            <div class="schema-chip-list">${columnChips}</div>
          </div>
        </article>
      `;
    })
    .join("");

  bindSchemaChipEvents();
}

function handleSchemaChipInsert(chip) {
  if (!chip?.dataset?.insert) return;
  insertAtCursor(activeEditor, chip.dataset.insert);
}

function bindSchemaChipEvents() {
  schemaPalette.querySelectorAll("[data-insert]").forEach((chip) => {
    chip.addEventListener("click", () => {
      handleSchemaChipInsert(chip);
    });
    chip.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("text/plain", chip.dataset.insert);
      event.dataTransfer.effectAllowed = "copy";
    });
  });
}

function insertAtCursor(editor, text) {
  const start = editor.selectionStart ?? editor.value.length;
  const end = editor.selectionEnd ?? editor.value.length;
  const before = editor.value.slice(0, start);
  const after = editor.value.slice(end);

  const isColumn = !text.includes(" ") && !text.includes("(");
  const needsComma = isColumn && before && !/[\s(.,]$/.test(before) && !/SELECT\s*$/i.test(before);
  const needsLeadingSpace = before && !/[\s(.,]$/.test(before) && !needsComma;
  const needsTrailingSpace = after && !/^[\s),.;]/.test(after);

  const insertion = `${needsComma ? ", " : ""}${needsLeadingSpace ? " " : ""}${text}${
    needsTrailingSpace ? " " : ""
  }`;

  editor.value = `${before}${insertion}${after}`;
  const nextPosition = before.length + insertion.length;
  editor.focus();
  editor.setSelectionRange(nextPosition, nextPosition);
}

function activateEditor(editor) {
  activeEditor = editor;
}

function editorDropHandlers(editor) {
  editor.addEventListener("focus", () => activateEditor(editor));
  editor.addEventListener("click", () => activateEditor(editor));
  editor.addEventListener("dragover", (event) => {
    event.preventDefault();
    editor.classList.add("drop-target");
  });
  editor.addEventListener("dragleave", () => {
    editor.classList.remove("drop-target");
  });
  editor.addEventListener("drop", (event) => {
    event.preventDefault();
    editor.classList.remove("drop-target");
    activateEditor(editor);
    const text = event.dataTransfer.getData("text/plain");
    if (text) {
      insertAtCursor(editor, text);
    }
  });
}

function setQuestion(question) {
  currentQuestion = question;
  currentQuestionNumber += 1;
  recordVisibleQuestion(question.conceptKey, question.templateIndex);
  const stats = progress[question.conceptKey];

  currentSkillLabel.textContent = progress[question.conceptKey].label;
  currentDifficultyLabel.textContent = `${scaffoldLevels[supportMode(stats.support)].label} (${stats.support}% support)`;
  currentStreakLabel.textContent = String(stats.consecutiveIndependentCorrect);

  questionTitle.textContent = question.title;
  questionPrompt.textContent = question.prompt;
  questionDataset.textContent = datasets[question.dataset].label;
  questionTables.textContent = question.tables;
  questionCounter.textContent = String(currentQuestionNumber);
  questionBadge.textContent = `Concept ${currentConceptIndex + 1}`;

  hintText.textContent = "Hints stay hidden until you ask.";
  coachingText.textContent = "Coaching stays hidden until you ask.";
  practiceResult.innerHTML = `<div class="result-empty">Practice results will appear here.</div>`;
  finalResult.innerHTML = `<div class="result-empty">Final answer feedback will appear here.</div>`;
  adaptiveFeedback.textContent = conceptSummaryMessage(question.conceptKey);

  renderSchemaPalette(question);
  practiceEditor.value = question.starter || "";
  finalEditor.value = question.starter || "";
  practiceMeta.textContent = "Drag or click table and column names into the practice editor, then build your query from scratch.";
  finalMeta.textContent = "Use the schema chips to build your final answer from scratch, then submit it for scoring.";
  activateEditor(practiceEditor);

  renderMastery();
}

function buildQuestion(conceptKey) {
  const templateIndex = nextTemplateIndex(conceptKey);
  const base = conceptTemplates[conceptKey][templateIndex];
  const stats = progress[conceptKey];
  return {
    ...base,
    conceptKey,
    templateIndex,
    starter: buildScaffoldedStarter(base.expectedQuery, conceptKey, stats.support),
  };
}

function loadCurrentConceptQuestion() {
  currentQuestionAttempts = 0;
  const currentKey = currentConcept().key;
  if (progress[currentKey]) {
    progress[currentKey].skipChallengeActive = false;
  }
  setQuestion(buildQuestion(currentKey));
}

function maybeAdvanceConcept(conceptKey) {
  const stats = progress[conceptKey];
  if (stats.support <= 10 && stats.consecutiveIndependentCorrect >= 3 && stats.correct >= 8) {
    stats.mastered = true;
    if (currentConceptIndex < conceptOrder.length - 1) {
      currentConceptIndex += 1;
    }
    return true;
  }

  return false;
}

function handleIncorrect(conceptKey) {
  const stats = progress[conceptKey];
  stats.consecutiveIndependentCorrect = 0;
  stats.support = Math.min(100, stats.support + 15);
}

function showHint() {
  hintText.textContent = currentQuestion.hint;
}

function showCoaching() {
  coachingText.textContent = currentQuestion.coaching;
}

function runQuery(query, datasetKey = currentQuestion.dataset) {
  const db = buildDatabase(datasetKey);
  try {
    return db.exec(query);
  } finally {
    db.close();
  }
}

function runVerification(userQuery, expectedQuery, verificationQuery, datasetKey) {
  const dbUser = buildDatabase(datasetKey);
  const dbExpected = buildDatabase(datasetKey);

  try {
    dbUser.run(userQuery);
    dbExpected.run(expectedQuery);

    if (!verificationQuery) {
      // If no verification query, we assume it was a SELECT and we should have used the normal flow
      // But for safety, we return true if no error occurred in DML
      return true;
    }

    const userState = dbUser.exec(verificationQuery);
    const expectedState = dbExpected.exec(verificationQuery);

    return areResultsEqual(userState, expectedState);
  } catch (error) {
    throw error;
  } finally {
    dbUser.close();
    dbExpected.close();
  }
}

function runPractice() {
  const query = practiceEditor.value.trim();
  if (!query) {
    practiceResult.innerHTML = `<div class="result-error">Write a practice query first.</div>`;
    return;
  }

  try {
    const results = runQuery(query);
    practiceResult.innerHTML = renderTable(results);
    practiceMeta.textContent = `Practice ran successfully on the ${datasets[currentQuestion.dataset].label} dataset.`;
  } catch (error) {
    practiceResult.innerHTML = `<div class="result-error">${escapeHtml(error.message)}</div>`;
    practiceMeta.textContent = "This practice query has an error. Fix it and try again.";
  }
}

function validateAnswer() {
  const query = finalEditor.value.trim();

  if (!query) {
    finalResult.innerHTML = `<div class="result-error">Write your query to validate first.</div>`;
    return;
  }

  try {
    let passed = false;
    let userResults = [];

    if (currentQuestion.verificationQuery) {
      const db = buildDatabase(currentQuestion.dataset);
      db.run(query);
      userResults = db.exec(currentQuestion.verificationQuery);
      db.close();
      
      passed = runVerification(
        query,
        currentQuestion.expectedQuery,
        currentQuestion.verificationQuery,
        currentQuestion.dataset
      );
    } else {
      userResults = runQuery(query);
      const expectedResults = runQuery(currentQuestion.expectedQuery);
      passed =
        areResultsEqual(userResults, expectedResults) ||
        normalizeQueryText(query) === normalizeQueryText(currentQuestion.expectedQuery);
    }

    if (passed) {
      finalResult.innerHTML = `
        <div class="result-success" style="background: var(--success-soft); border: 1px solid var(--success); padding: 12px; border-radius: 8px;">
          ✅ <strong>Validation Passed!</strong> Your query is correct. You can now Submit it.
        </div>
        ${renderTable(userResults)}
      `;
    } else {
      finalResult.innerHTML = `
        <div class="result-error">
          ❌ <strong>Validation Failed:</strong> The query ran, but the results do not match the expected answer.
        </div>
        ${renderTable(userResults)}
      `;
    }
  } catch (error) {
    finalResult.innerHTML = `<div class="result-error">SQL error: ${escapeHtml(error.message)}</div>`;
  }
}


function submitAnswer() {
  const query = finalEditor.value.trim();
  const conceptKey = currentQuestion.conceptKey;
  const stats = progress[conceptKey];

  if (!query) {
    finalResult.innerHTML = `<div class="result-error">Write your final SQL answer first.</div>`;
    return;
  }

  // Developer Cheat Code
  if (query === "-- DEV_SKIP") {
    stats.mastered = true;
    stats.skipChallengeActive = false;
    let advanced = false;
    if (currentConceptIndex < conceptOrder.length - 1) {
      currentConceptIndex += 1;
      const nextConceptKey = conceptOrder[currentConceptIndex].key;
      progress[nextConceptKey].support = 100;
      advanced = true;
    }
    
    finalResult.innerHTML = `
      <div class="result-success" style="margin-top: 10px; background: #2b1f3c; border: 1px solid #733cc7;">
        👾 <strong>Cheat Activated!</strong> Bypassing the section entirely...
      </div>
    `;
    if (advanced) {
      adaptiveFeedback.textContent = `Cheat code accepted. Unlocked ${currentConcept().label}.`;
    }
    renderMastery();
    loadCurrentConceptQuestion();
    return;
  }

  stats.asked += 1;

  try {
    let passed = false;
    let userResults = [];

    if (currentQuestion.verificationQuery) {
      passed = runVerification(
        query,
        currentQuestion.expectedQuery,
        currentQuestion.verificationQuery,
        currentQuestion.dataset
      );
      // For DML/DDL, userResults for display should be the state AFTER the query
      const db = buildDatabase(currentQuestion.dataset);
      db.run(query);
      userResults = db.exec(currentQuestion.verificationQuery);
      db.close();
    } else {
      userResults = runQuery(query);
      const expectedResults = runQuery(currentQuestion.expectedQuery);
      passed =
        areResultsEqual(userResults, expectedResults) ||
        normalizeQueryText(query) === normalizeQueryText(currentQuestion.expectedQuery);
    }

    if (passed) {
      stats.correct += 1;
      stats.support = Math.max(0, stats.support - 15);
      stats.consecutiveIndependentCorrect += 1;

      let advanced = false;
      if (stats.skipChallengeActive) {
        stats.mastered = true;
        stats.skipChallengeActive = false;
        if (currentConceptIndex < conceptOrder.length - 1) {
          currentConceptIndex += 1;
          const nextConceptKey = conceptOrder[currentConceptIndex].key;
          progress[nextConceptKey].support = 100;
          advanced = true;
        }
      } else {
        advanced = maybeAdvanceConcept(conceptKey);
      }

      finalResult.innerHTML = `
        <div class="result-success">
          Correct. The result matches the expected answer.
          ${stats.mastered && !advanced ? " (Concept Mastered!)" : ""}
        </div>
        ${renderTable(userResults)}
      `;

      if (advanced) {
        finalResult.innerHTML += `
          <div class="result-success" style="margin-top: 10px; background: var(--success-soft); border: 1px solid var(--success);">
            🚀 <strong>Progress!</strong> Moving to the next section: <strong>${conceptOrder[currentConceptIndex].label}</strong>.
          </div>
        `;
      }

      if (advanced && currentConceptIndex < conceptOrder.length) {
        adaptiveFeedback.textContent = `${progress[conceptKey].label} is now strong enough. The trainer unlocked ${currentConcept().label}.`;
      } else if (stats.support <= 20) {
        adaptiveFeedback.textContent = `Correct again. Stay in ${progress[conceptKey].label} until you can repeat independent answers consistently.`;
      } else {
        adaptiveFeedback.textContent = `Correct. You are still inside ${progress[conceptKey].label}. The trainer reduced support a little, but it will keep you in this concept until you can write the SQL with much less help.`;
      }

      renderMastery();
      loadCurrentConceptQuestion();
      return;
    }

    handleIncorrect(conceptKey);
    currentQuestionAttempts += 1;
    
    let retryMessage = "";
    if (currentQuestionAttempts >= 3) {
      retryMessage = `
        <div class="result-error" style="margin-top: 15px; border-top: 1px solid var(--line); padding-top: 15px;">
          <strong>OUT OF ATTEMPTS:</strong> Here is the correct query to help you learn:
          <pre style="background: var(--surface-strong); padding: 12px; border-radius: 8px; margin-top: 8px; border: 1px solid var(--line); color: var(--accent);">${escapeHtml(currentQuestion.expectedQuery)}</pre>
          <p style="margin-top: 8px; font-size: 0.9rem;">The trainer will give you a similar variation next to practice this pattern.</p>
        </div>
      `;
    } else {
      retryMessage = `
        <div class="result-error" style="margin-top: 10px; background: var(--gold-soft); border: 1px solid var(--gold);">
          <strong>Attempt ${currentQuestionAttempts}/3:</strong> Try again! Check your logic or use the 'Explain Concept' button for help.
        </div>
      `;
    }

    finalResult.innerHTML = `
      <div class="result-error">
        Not correct yet. Your SQL ran, but the result does not match the expected answer for this concept.
      </div>
      ${retryMessage}
      ${renderTable(userResults)}
    `;
    renderMastery();
    // After 3 failures, we've revealed the answer. 
    // We don't advance automatically so they can actually READ it.
    if (currentQuestionAttempts >= 3) {
      adaptiveFeedback.textContent = "You've seen the solution. Review it, then click 'Skip Question' to try a fresh variation of this concept.";
    }
  } catch (error) {
    handleIncorrect(conceptKey);
    currentQuestionAttempts += 1;
    
    let retryMessage = "";
    if (currentQuestionAttempts >= 3) {
      retryMessage = `
        <div class="result-error" style="margin-top: 15px; border-top: 1px solid var(--line); padding-top: 15px;">
          <strong>OUT OF ATTEMPTS:</strong> Here is the correct query to help you learn:
          <pre style="background: var(--surface-strong); padding: 12px; border-radius: 8px; margin-top: 8px; border: 1px solid var(--line); color: var(--accent);">${escapeHtml(currentQuestion.expectedQuery)}</pre>
          <p style="margin-top: 8px; font-size: 0.9rem;">The trainer will give you a similar variation next.</p>
        </div>
      `;
    } else {
      retryMessage = `
        <div class="result-error" style="margin-top: 10px; background: var(--gold-soft); border: 1px solid var(--gold);">
          <strong>Attempt ${currentQuestionAttempts}/3:</strong> Try again! Check your syntax.
        </div>
      `;
    }

    finalResult.innerHTML = `
      <div class="result-error">SQL error: ${escapeHtml(error.message)}</div>
      ${retryMessage}
    `;
    
    renderMastery();
    if (currentQuestionAttempts >= 3) {
      adaptiveFeedback.textContent = "Syntax errors are tough! Review the correct solution below, then skip to a new question.";
    }
  }
}

async function initializeTrainer() {
  if (typeof initSqlJs !== "function") {
    engineStatus.textContent = "Engine failed";
    return;
  }

  try {
    SQL = await initSqlJs({
      locateFile: (file) => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.3/${file}`,
    });
    engineStatus.textContent = "Ready";
    renderMastery();
    loadCurrentConceptQuestion();
  } catch (error) {
    engineStatus.textContent = "Engine failed";
    practiceResult.innerHTML = `<div class="result-error">${escapeHtml(error.message)}</div>`;
  }
}

showHintButton.addEventListener("click", showHint);
showCoachingButton.addEventListener("click", showCoaching);
nextQuestionButton.addEventListener("click", () => {
  adaptiveFeedback.textContent = `Question skipped. You are still inside ${currentConcept().label}, and the trainer will give you another variation in the same concept.`;
  loadCurrentConceptQuestion();
});
runPracticeButton.addEventListener("click", runPractice);
function handleSkipSection() {
  const conceptKey = conceptOrder[currentConceptIndex].key;
  const templates = conceptTemplates[conceptKey];
  
  if (!templates || templates.length === 0) return;

  // Pick a random template from the latter half of the templates (usually more complex)
  const startIndex = Math.floor(templates.length / 2);
  const randomIndex = startIndex + Math.floor(Math.random() * (templates.length - startIndex));
  const baseTemplate = templates[randomIndex];

  const challengeQuestion = {
    ...baseTemplate,
    conceptKey,
    templateIndex: randomIndex,
    title: `CHALLENGE: Skip ${conceptOrder[currentConceptIndex].label}`,
    prompt: `🔥 PROVE YOUR MASTERY: ${baseTemplate.prompt}`,
    starter: "-- Write the full query from scratch to prove you know this concept.",
    isChallenge: true,
  };
  
  progress[conceptKey].skipChallengeActive = true;
  setQuestion(challengeQuestion);
  adaptiveFeedback.textContent = "Pass this high-difficulty challenge with zero help to skip the entire section.";
}

skipSectionButton.addEventListener("click", handleSkipSection);
validateAnswerButton.addEventListener("click", validateAnswer);
submitAnswerButton.addEventListener("click", submitAnswer);
copyPracticeButton.addEventListener("click", () => {
  finalEditor.value = practiceEditor.value;
  finalMeta.textContent = "Copied the practice query into the final answer editor.";
});
resetEditorsButton.addEventListener("click", () => {
  practiceEditor.value = "";
  finalEditor.value = "";
  practiceResult.innerHTML = `<div class="result-empty">Practice results will appear here.</div>`;
  finalResult.innerHTML = `<div class="result-empty">Final answer feedback will appear here.</div>`;
  practiceMeta.textContent = "Drag or click table and column names into the practice editor, then build your query from scratch.";
  finalMeta.textContent = "Use the schema chips to build your final answer from scratch, then submit it for scoring.";
  activateEditor(practiceEditor);
});

practiceEditor.addEventListener("keydown", (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
    runPractice();
  }
});

finalEditor.addEventListener("keydown", (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
    submitAnswer();
  }
});

editorDropHandlers(practiceEditor);
editorDropHandlers(finalEditor);

initializeTrainer();
