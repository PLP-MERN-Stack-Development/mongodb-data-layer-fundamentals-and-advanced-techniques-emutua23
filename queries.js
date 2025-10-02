// queries.js
// MongoDB Queries for PLP Bookstore Database

// Connect to the database
// use plp_bookstore; // Uncomment and run this in the MongoDB shell, not in JavaScript


print("\n=== TASK 2: BASIC CRUD OPERATIONS ===\n");

// 1. Find all books in a specific genre (Fiction)
print("1. All Fiction books:");
db.books.find({ genre: "Fiction" }).pretty();

// 2. Find books published after a certain year (2000)
print("\n2. Books published after 2000:");
db.books.find({ published_year: { $gt: 2000 } }).pretty();

// 3. Find books by a specific author (J.K. Rowling)
print("\n3. Books by J.K. Rowling:");
db.books.find({ author: "J.K. Rowling" }).pretty();

// 4. Update the price of a specific book
print("\n4. Updating price of '1984':");
db.books.updateOne(
  { title: "1984" },
  { $set: { price: 19.99 } }
);
print("Updated successfully!");
db.books.findOne({ title: "1984" });

// 5. Delete a book by its title (example - commented out to preserve data)
print("\n5. Delete operation (example - not executed):");
print("db.books.deleteOne({ title: 'Book Title' })");
// Uncomment the line below to actually delete a book
// db.books.deleteOne({ title: "The Great Gatsby" });


print("\n=== TASK 3: ADVANCED QUERIES ===\n");

// 1. Find books that are both in stock and published after 2010
print("1. Books in stock AND published after 2010:");
db.books.find({
  in_stock: true,
  published_year: { $gt: 2010 }
}).pretty();

// 2. Use projection to return only title, author, and price
print("\n2. Books with projection (title, author, price only):");
db.books.find(
  {},
  { title: 1, author: 1, price: 1, _id: 0 }
).pretty();

// 3a. Sort by price (ascending)
print("\n3a. Books sorted by price (ascending):");
db.books.find(
  {},
  { title: 1, price: 1, _id: 0 }
).sort({ price: 1 }).pretty();

// 3b. Sort by price (descending)
print("\n3b. Books sorted by price (descending):");
db.books.find(
  {},
  { title: 1, price: 1, _id: 0 }
).sort({ price: -1 }).pretty();

// 4. Pagination (5 books per page)
print("\n4a. Pagination - Page 1 (first 5 books):");
db.books.find(
  {},
  { title: 1, author: 1, price: 1, _id: 0 }
).limit(5).pretty();

print("\n4b. Pagination - Page 2 (next 5 books):");
db.books.find(
  {},
  { title: 1, author: 1, price: 1, _id: 0 }
).skip(5).limit(5).pretty();

print("\n4c. Pagination - Page 3 (next 5 books):");
db.books.find(
  {},
  { title: 1, author: 1, price: 1, _id: 0 }
).skip(10).limit(5).pretty();


print("\n=== TASK 4: AGGREGATION PIPELINE ===\n");

// 1. Calculate average price by genre
print("1. Average price of books by genre:");
db.books.aggregate([
  {
    $group: {
      _id: "$genre",
      averagePrice: { $avg: "$price" },
      count: { $sum: 1 }
    }
  },
  {
    $sort: { averagePrice: -1 }
  },
  {
    $project: {
      genre: "$_id",
      averagePrice: { $round: ["$averagePrice", 2] },
      count: 1,
      _id: 0
    }
  }
]).pretty();

// 2. Find the author with the most books
print("\n2. Author with the most books:");
db.books.aggregate([
  {
    $group: {
      _id: "$author",
      bookCount: { $sum: 1 },
      books: { $push: "$title" }
    }
  },
  {
    $sort: { bookCount: -1 }
  },
  {
    $limit: 1
  },
  {
    $project: {
      author: "$_id",
      bookCount: 1,
      books: 1,
      _id: 0
    }
  }
]).pretty();

// Alternative: Show all authors with book counts
print("\n2b. All authors with book counts:");
db.books.aggregate([
  {
    $group: {
      _id: "$author",
      bookCount: { $sum: 1 },
      titles: { $push: "$title" }
    }
  },
  {
    $sort: { bookCount: -1 }
  },
  {
    $project: {
      author: "$_id",
      bookCount: 1,
      titles: 1,
      _id: 0
    }
  }
]).pretty();

// 3. Group books by publication decade
print("\n3. Books grouped by publication decade:");
db.books.aggregate([
  {
    $addFields: {
      decade: {
        $multiply: [
          { $floor: { $divide: ["$published_year", 10] } },
          10
        ]
      }
    }
  },
  {
    $group: {
      _id: "$decade",
      count: { $sum: 1 },
      books: { $push: { title: "$title", year: "$published_year" } }
    }
  },
  {
    $sort: { _id: 1 }
  },
  {
    $project: {
      decade: "$_id",
      count: 1,
      books: 1,
      _id: 0
    }
  }
]).pretty();


print("\n=== TASK 5: INDEXING ===\n");

// 1. Create an index on the title field
print("1. Creating index on 'title' field:");
db.books.createIndex({ title: 1 });
print("Index created successfully!");

// 2. Create a compound index on author and published_year
print("\n2. Creating compound index on 'author' and 'published_year':");
db.books.createIndex({ author: 1, published_year: -1 });
print("Compound index created successfully!");

// List all indexes
print("\n3. All indexes on the books collection:");
db.books.getIndexes();

// 4. Use explain() to demonstrate performance improvement
print("\n4. Query performance analysis:");

print("\n4a. Query with index (finding by title):");
db.books.find({ title: "Clean Code" }).explain("executionStats");

print("\n4b. Query with compound index (finding by author and year):");
db.books.find({ 
  author: "Robert C. Martin", 
  published_year: { $gte: 2000 } 
}).explain("executionStats");

print("\n4c. General query performance (with indexes):");
db.books.find({ 
  genre: "Fiction",
  in_stock: true 
}).explain("executionStats");


print("\n=== ADDITIONAL USEFUL QUERIES ===\n");

// Count documents by genre
print("1. Book count by genre:");
db.books.aggregate([
  {
    $group: {
      _id: "$genre",
      count: { $sum: 1 }
    }
  },
  {
    $sort: { count: -1 }
  }
]).pretty();

// Most expensive books
print("\n2. Top 5 most expensive books:");
db.books.find(
  {},
  { title: 1, author: 1, price: 1, _id: 0 }
).sort({ price: -1 }).limit(5).pretty();

// Books not in stock
print("\n3. Books not in stock:");
db.books.find(
  { in_stock: false },
  { title: 1, author: 1, publisher: 1, _id: 0 }
).pretty();

// Books by page count
print("\n4. Books with more than 400 pages:");
db.books.find(
  { pages: { $gt: 400 } },
  { title: 1, pages: 1, _id: 0 }
).sort({ pages: -1 }).pretty();

// Price statistics
print("\n5. Overall price statistics:");
db.books.aggregate([
  {
    $group: {
      _id: null,
      avgPrice: { $avg: "$price" },
      minPrice: { $min: "$price" },
      maxPrice: { $max: "$price" },
      totalBooks: { $sum: 1 }
    }
  },
  {
    $project: {
      avgPrice: { $round: ["$avgPrice", 2] },
      minPrice: 1,
      maxPrice: 1,
      totalBooks: 1,
      _id: 0
    }
  }
]).pretty();

print("\n=== END OF QUERIES ===\n");