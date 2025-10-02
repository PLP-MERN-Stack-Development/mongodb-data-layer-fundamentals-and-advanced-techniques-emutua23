# 🗄️ MongoDB Assignment - Data Layer Fundamentals

## 📋 Overview
This project demonstrates comprehensive MongoDB skills including database setup, CRUD operations, advanced queries, aggregation pipelines, and performance optimization through indexing.

## 🗂️ Project Structure
```
mongodb-data-layer-fundamentals/
├── insert_books.js          # MongoDB Shell script to populate database
├── queries.js               # MongoDB Shell queries for all tasks
├── README.md                # This documentation file
├── .gitignore              # Git ignore patterns
└── screenshots/            # Database and query screenshots
    ├── MongoDB Compass showing collections and sample data.png
```

## 📚 Database Schema

### Books Collection Structure
```javascript
{
  _id: ObjectId,
  title: String,           // Book title
  author: String,          // Author name
  genre: String,           // Book genre/category
  published_year: Number,  // Publication year
  price: Number,           // Price in USD
  in_stock: Boolean,       // Availability status
  pages: Number,           // Page count
  publisher: String        // Publisher name
}
```
### Sample Document
```javascript
{
  _id: ObjectId("507f1f77bcf86cd799439011"),
  title: "Clean Code",
  author: "Robert C. Martin",
  genre: "Technology",
  published_year: 2008,
  price: 45.99,
  in_stock: true,
  pages: 464,
  publisher: "Prentice Hall"
}
🚀 Complete Setup Guide - MongoDB Compass/Atlas
This guide uses MongoDB Compass (desktop app) or MongoDB Atlas (web interface) exclusively.
📦 Prerequisites
Choose ONE of these options:
Option A: MongoDB Compass (Desktop Application)

Download from: MongoDB Compass Download
Install the application
You'll also need MongoDB installed locally OR use Atlas connection string

Option B: MongoDB Atlas (Cloud - Recommended)

Go to: MongoDB Atlas
Create a free account
No installation required - everything runs in the cloud


🔧 Step-by-Step Setup
Step 1: Set Up MongoDB Atlas (Cloud Database)
1.1 Create Your Account

Visit MongoDB Atlas
Sign up using email, Google, or GitHub
Verify your email address

1.2 Create a New Cluster

Click "Build a Database" or "Create"
Select "M0 FREE" tier (perfect for learning)
Choose your cloud provider (AWS, Google Cloud, or Azure)
Select a region close to you (e.g., "Nairobi" or nearest available)
Name your cluster (optional - default is fine)
Click "Create Cluster" (takes 3-5 minutes to deploy)

1.3 Configure Database Access

On the left sidebar, click "Database Access"
Click "Add New Database User"
Choose "Password" authentication
Create a username (e.g., student) and strong password
Under "Database User Privileges", select "Read and write to any database"
Click "Add User"

⚠️ IMPORTANT: Save your username and password - you'll need them!
1.4 Configure Network Access

On the left sidebar, click "Network Access"
Click "Add IP Address"
Click "Allow Access from Anywhere" (for development only)

This adds 0.0.0.0/0 to the whitelist


Click "Confirm"

Note: In production, you should restrict access to specific IP addresses.

Step 2: Connect to Your Database
2.1 Get Your Connection String

Go to "Database" in the left sidebar
Click "Connect" button on your cluster
Choose "MongoDB for VS Code" or "Compass" (both show shell access)
Copy your connection string - it looks like:

   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/

Replace <password> with your actual password
Add the database name at the end: /plp_bookstore
Final connection string:

   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/plp_bookstore
2.2 Open MongoDB Shell
Using MongoDB Compass:

Open MongoDB Compass application
Paste your connection string in the connection field
Click "Connect"
Once connected, click the ">_MONGOSH" tab at the bottom

Using MongoDB Atlas Web Interface:

In Atlas, click "Connect" on your cluster
Choose "MongoDB Shell"
Select "I have the MongoDB Shell installed" (or use the web shell)
Click "Connect with the MongoDB Shell in your browser"
A new tab opens with an embedded shell


Step 3: Create Database and Collection
In the MongoDB Shell (at the bottom of Compass or in Atlas web shell):
javascript// Switch to plp_bookstore database (creates it if it doesn't exist)
use plp_bookstore
Expected Output:
switched to db plp_bookstore
Now verify you're in the correct database:
javascriptdb.getName()
Expected Output:
plp_bookstore

Step 4: Insert Books Data
⚠️ IMPORTANT: Web-based MongoDB shells DO NOT support the load() function. You must copy and paste the code directly.
4.1 Copy the Insert Command
javascriptdb.books.insertMany([
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Fiction",
    published_year: 1925,
    price: 15.99,
    in_stock: true,
    pages: 180,
    publisher: "Scribner"
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Fiction",
    published_year: 1960,
    price: 18.99,
    in_stock: true,
    pages: 324,
    publisher: "J.B. Lippincott & Co."
  },
  {
    title: "1984",
    author: "George Orwell",
    genre: "Dystopian",
    published_year: 1949,
    price: 16.99,
    in_stock: true,
    pages: 328,
    publisher: "Secker & Warburg"
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    genre: "Romance",
    published_year: 1813,
    price: 12.99,
    in_stock: false,
    pages: 432,
    publisher: "T. Egerton"
  },
  {
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    genre: "Fiction",
    published_year: 1951,
    price: 14.99,
    in_stock: true,
    pages: 277,
    publisher: "Little, Brown and Company"
  },
  {
    title: "Harry Potter and the Philosopher's Stone",
    author: "J.K. Rowling",
    genre: "Fantasy",
    published_year: 1997,
    price: 24.99,
    in_stock: true,
    pages: 223,
    publisher: "Bloomsbury"
  },
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    published_year: 1937,
    price: 22.99,
    in_stock: true,
    pages: 310,
    publisher: "George Allen & Unwin"
  },
  {
    title: "Clean Code",
    author: "Robert C. Martin",
    genre: "Technology",
    published_year: 2008,
    price: 45.99,
    in_stock: true,
    pages: 464,
    publisher: "Prentice Hall"
  },
  {
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt",
    genre: "Technology",
    published_year: 1999,
    price: 42.99,
    in_stock: false,
    pages: 352,
    publisher: "Addison-Wesley"
  },
  {
    title: "Design Patterns",
    author: "Erich Gamma",
    genre: "Technology",
    published_year: 1994,
    price: 54.99,
    in_stock: true,
    pages: 395,
    publisher: "Addison-Wesley"
  },
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    genre: "Fiction",
    published_year: 1988,
    price: 17.99,
    in_stock: true,
    pages: 208,
    publisher: "HarperCollins"
  },
  {
    title: "Sapiens",
    author: "Yuval Noah Harari",
    genre: "Non-Fiction",
    published_year: 2011,
    price: 28.99,
    in_stock: true,
    pages: 443,
    publisher: "Harper"
  },
  {
    title: "Educated",
    author: "Tara Westover",
    genre: "Biography",
    published_year: 2018,
    price: 26.99,
    in_stock: true,
    pages: 334,
    publisher: "Random House"
  },
  {
    title: "Becoming",
    author: "Michelle Obama",
    genre: "Biography",
    published_year: 2018,
    price: 32.99,
    in_stock: false,
    pages: 448,
    publisher: "Crown"
  },
  {
    title: "Atomic Habits",
    author: "James Clear",
    genre: "Self-Help",
    published_year: 2018,
    price: 27.99,
    in_stock: true,
    pages: 320,
    publisher: "Avery"
  }
]);
4.2 Paste and Execute

Paste the entire code block into the MongoDB Shell
Press Enter to execute

Expected Output:
javascript{
  acknowledged: true,
  insertedIds: {
    '0': ObjectId("..."),
    '1': ObjectId("..."),
    // ... 15 total IDs
  }
}
4.3 Verify Data Insertion
javascript// Count all documents
db.books.countDocuments()
Expected Output: 15
javascript// View one sample document
db.books.findOne()
Expected Output: One complete book document

Step 5: View Your Data in Compass/Atlas
Using MongoDB Compass:

In the left sidebar, you should see plp_bookstore database
Expand it to see the books collection
Click on books to view all documents
You'll see all 15 books displayed in a nice visual format

Using MongoDB Atlas:

Go to "Database" in the left sidebar
Click "Browse Collections" on your cluster
Navigate to plp_bookstore → books
You'll see all 15 documents in a table/card view
📸 SCREENSHOT #1: A screenshot showing  collection with 15 documents

📝 Task 2: Basic CRUD Operations

Now let's perform all CRUD operations. Copy and paste these queries one at a time into the MongoDB Shell.
2.1 Find All Books in a Specific Genre
javascript// Find all Fiction books
db.books.find({ genre: "Fiction" })
Expected: 4-5 fiction books (The Great Gatsby, To Kill a Mockingbird, etc.)
2.2 Find Books Published After a Certain Year
javascript// Find books published after 2000
db.books.find({ published_year: { $gt: 2000 } })
Expected: 6 books (Clean Code, Sapiens, Educated, Becoming, Atomic Habits, Harry Potter)
2.3 Find Books by a Specific Author
javascript// Find books by J.K. Rowling
db.books.find({ author: "J.K. Rowling" })
Expected: 1 book (Harry Potter and the Philosopher's Stone)
2.4 Update the Price of a Specific Book
javascript// Update the price of "1984"
db.books.updateOne(
  { title: "1984" },
  { $set: { price: 19.99 } }
)
Expected Output:
javascript{
  acknowledged: true,
  matchedCount: 1,
  modifiedCount: 1
}
Verify the update:
javascriptdb.books.findOne({ title: "1984" })
Expected: Price should now be 19.99
2.5 Delete a Book by Title (Example)
javascript// Example - DO NOT execute unless you want to delete
// db.books.deleteOne({ title: "The Great Gatsby" })

// To demonstrate without deleting, just view the syntax
Note: Keep this commented out to preserve your data for the rest of the tasks

📝 Task 3: Advanced Queries

3.1 Find Books with Multiple Conditions
javascript// Find books that are IN STOCK AND published after 2010
db.books.find({
  in_stock: true,
  published_year: { $gt: 2010 }
})
Expected: 4 books (Sapiens, Educated, Atomic Habits)
3.2 Projection - Return Only Specific Fields
javascript// Show only title, author, and price (exclude _id)
db.books.find(
  {},
  { title: 1, author: 1, price: 1, _id: 0 }
)
Expected: All 15 books showing only title, author, and price fields
3.3 Sorting
Sort by Price (Ascending - Lowest to Highest):
javascriptdb.books.find(
  {},
  { title: 1, price: 1, _id: 0 }
).sort({ price: 1 })
Expected: Pride and Prejudice ($12.99) should be first
Sort by Price (Descending - Highest to Lowest):
javascriptdb.books.find(
  {},
  { title: 1, price: 1, _id: 0 }
).sort({ price: -1 })
Expected: Design Patterns ($54.99) should be first
3.4 Pagination
Page 1 (First 5 books):
javascriptdb.books.find(
  {},
  { title: 1, author: 1, price: 1, _id: 0 }
).limit(5)
Page 2 (Next 5 books):
javascriptdb.books.find(
  {},
  { title: 1, author: 1, price: 1, _id: 0 }
).skip(5).limit(5)
Page 3 (Last 5 books):
javascriptdb.books.find(
  {},
  { title: 1, author: 1, price: 1, _id: 0 }
).skip(10).limit(5)
Expected: Each query returns 5 different books

📝 Task 4: Aggregation Pipeline

Aggregation pipelines allow you to transform and analyze your data.
4.1 Calculate Average Price by Genre
javascriptdb.books.aggregate([
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
])
Expected Output: Each genre with its average price and book count

Technology should have the highest average (around $47.99)
Romance should have the lowest (around $12.99)

4.2 Find the Author with the Most Books
javascriptdb.books.aggregate([
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
])
Expected: If you have multiple books by the same author, they'll appear here. Otherwise, it shows one author with 1 book.
Show all authors with book counts:
javascriptdb.books.aggregate([
  {
    $group: {
      _id: "$author",
      bookCount: { $sum: 1 }
    }
  },
  {
    $sort: { bookCount: -1 }
  }
])
4.3 Group Books by Publication Decade
javascriptdb.books.aggregate([
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
])
Expected Output: Books grouped by decades (1810, 1920, 1930, 1940, 1950, 1980, 1990, 2000, 2010)

📝 Task 5: Indexing

Indexes dramatically improve query performance. Let's create indexes and analyze performance.
5.1 Create Index on Title Field
javascript// Create ascending index on title
db.books.createIndex({ title: 1 })
Expected Output:
javascripttitle_1
5.2 Create Compound Index on Author and Published Year
javascript// Create compound index
db.books.createIndex({ author: 1, published_year: -1 })
Expected Output:
javascriptauthor_1_published_year_-1
5.3 View All Indexes
javascriptdb.books.getIndexes()
Expected Output: Array showing all indexes including:

_id_ (default)
title_1
author_1_published_year_-1

5.4 Analyze Query Performance
Query using title index:
javascriptdb.books.find({ title: "Clean Code" }).explain("executionStats")
Look for these key metrics in the output:

executionTimeMillis: Should be very low (0-5ms)
totalDocsExamined: Should be 1 (using index)
indexName: Should show "title_1"

Query using compound index:
javascriptdb.books.find({ 
  author: "Robert C. Martin", 
  published_year: { $gte: 2000 } 
}).explain("executionStats")
Look for:

Index used: author_1_published_year_-1
Efficient execution with minimal document examination

Query without index (for comparison):
javascriptdb.books.find({ 
  genre: "Fiction",
  in_stock: true 
}).explain("executionStats")
Notice: This performs a collection scan (COLLSCAN) since there's no index on genre or in_stock.

### 📂 .gitignore File

Create a .gitignore file in your project root with this content:
# Dependencies (if using Node.js)
node_modules/

# Environment files
.env
.env.local

# Connection strings (sensitive data)
connection-string.txt
config.js

# MongoDB local data (if running locally)
data/
mongodb/

# Logs
*.log
logs/

# OS files
.DS_Store
Thumbs.db

# IDE files
.vscode/
.idea/
*.swp

🛠️ Useful Commands Reference

Database Commands
javascript// Show all databases
show dbs

// Switch to database
use plp_bookstore

// Check current database
db.getName()

// Show collections in current database
show collections
Collection Commands
javascript// Count documents
db.books.countDocuments()

// Count with filter
db.books.countDocuments({ genre: "Fiction" })

// View one document
db.books.findOne()

// View one specific document
db.books.findOne({ title: "1984" })
Query Operators
javascript// Greater than
{ published_year: { $gt: 2000 } }

// Greater than or equal
{ published_year: { $gte: 2000 } }

// Less than
{ price: { $lt: 20 } }

// Not equal
{ genre: { $ne: "Fiction" } }

// In array
{ genre: { $in: ["Fiction", "Fantasy"] } }
Index Commands
javascript// List all indexes
db.books.getIndexes()

// Drop specific index
db.books.dropIndex("title_1")

// Drop all indexes except _id
db.books.dropIndexes()

🔧 Troubleshooting

Issue: Can't connect to Atlas
Solution:

Check your internet connection
Verify your IP is whitelisted (Network Access in Atlas)
Confirm username and password are correct in connection string

Issue: "load is not currently implemented"
Solution: You're in a web-based shell. Copy and paste the code directly instead of using load().
Issue: No databases showing in Compass/Atlas
Solution:

Ensure you executed use plp_bookstore
Insert at least one document - empty databases don't show up
Refresh the database list

Issue: Queries return empty results
Solution:

Verify data was inserted: db.books.countDocuments()
Check you're in the correct database: db.getName()
Re-run the insert command if needed

👤 Emanuel Mutua
PLP Academy Student - Week 1 MongoDB Assignment
MERN Stack Development Program