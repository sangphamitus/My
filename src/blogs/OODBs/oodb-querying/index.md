---
title: "OODBs 2: Querying with OQL"
date: "2026-03-04"
tags:
  - databases
  - OODBs
  - OQL
  - querying
topic: OODBs
references:
  - "Object Query Language | https://en.wikipedia.org/wiki/Object_Query_Language"
  - "OQL Standard | https://www.odbms.org/wp-content/uploads/2013/11/odmg30.pdf"
---

## What is OQL?

**OQL (Object Query Language)** is the query language for Object-Oriented Databases. It was standardized by the ODMG (Object Data Management Group) and is designed to work directly on objects and their relationships — rather than on flat rows and columns.

OQL looks similar to SQL but replaces table joins with **direct property navigation**, and can call **methods** on objects as part of a query.

---

## Path Navigation vs SQL JOINs

The most visible difference from SQL is how relationships are traversed. In SQL, you must explicitly JOIN tables. In OQL, you navigate object properties with dot notation.

```sql
-- SQL: two tables, explicit JOIN
SELECT p.name, a.city
FROM person p
JOIN address a ON p.addr_id = a.id
WHERE a.country = 'VN'

-- OQL: single expression, no JOIN
SELECT p.name, p.address.city
FROM Person p
WHERE p.address.country = 'VN'
```

OQL paths can be as deep as the object graph:

```sql
SELECT o.customer.address.city
FROM Order o
WHERE o.customer.address.country = 'VN'
```

Each `.` dereferences an object reference — the equivalent of following a pointer.

---

## Basic Query Structure

OQL queries follow a `SELECT … FROM … WHERE` structure, with `FROM` referencing a **class extent** (all stored instances of a class).

```sql
-- All people older than 25
SELECT p FROM Person p WHERE p.age > 25

-- Just the names (projection)
SELECT p.name FROM Person p WHERE p.age > 25

-- Struct projection (multiple fields)
SELECT struct(name: p.name, city: p.address.city)
FROM Person p
WHERE p.age > 25
```

The `FROM Person p` clause iterates over every stored `Person` instance — including instances of any subclass.

---

## Calling Methods in Queries

OQL can invoke object methods directly inside a query expression. This is unique to OQL — SQL has no equivalent because relational rows carry no behavior.

```sql
-- Call a method defined on Person
SELECT p FROM Person p WHERE p.getAge() > 18

-- Method on a nested object
SELECT p FROM Person p WHERE p.address.isInCity('Hanoi')

-- Method result used in projection
SELECT struct(name: p.name, label: p.getDisplayLabel())
FROM Person p
```

The database executes the method against each object during the query scan. For performance, it is best to use indexes on fields rather than relying solely on method calls for filtering.

---

## Ordering and Distinct

```sql
-- Sort results
SELECT p FROM Person p
WHERE p.age > 18
ORDER BY p.name ASC

-- Remove duplicates
SELECT DISTINCT p.address.city FROM Person p

-- Multiple sort keys
SELECT p FROM Person p
ORDER BY p.address.country ASC, p.name ASC
```

---

## Querying Collections

When an object has a collection attribute (list, set, bag), OQL provides operators to query into it.

```sql
-- Find orders that contain a specific product
-- (items is a list[OrderLine] on Order)
SELECT o FROM Order o
WHERE 'Widget' IN (SELECT ol.product FROM o.items ol)
```

The `IN` operator tests membership in a collection. The inner `SELECT` iterates over `o.items` — a path into the collection attribute of each `Order`.

For collection aggregates:

```sql
-- Average total across all orders
SELECT AVG(o.total) FROM Order o

-- Count of people per city
SELECT p.address.city, COUNT(p)
FROM Person p
GROUP BY p.address.city
```

---

## Polymorphic Queries

Because `FROM ClassName` queries the full class **extent** (all instances including subclasses), queries are polymorphic by default.

```sql
-- Returns ALL animals: Dog, Cat, and any other subclass
SELECT a.name FROM Animal a WHERE a.age > 3

-- Restrict to a specific subclass only
SELECT d FROM Dog d WHERE d.breed = 'Labrador'
```

To query a class but *exclude* subclass instances, some OODBMS systems support an `ONLY` keyword:

```sql
SELECT a FROM ONLY(Animal) a   -- instances of Animal itself, not subclasses
```

---

## OQL vs SQL at a Glance

| Capability | SQL | OQL |
|-----------|-----|-----|
| Navigate relationships | JOIN tables | Dot path (`p.address.city`) |
| Call behavior | Not possible | Method calls in expressions |
| Nested queries | Subqueries on tables | Subqueries on collection attributes |
| Polymorphism | UNION across tables | Automatic via class extents |
| Aggregate functions | `SUM`, `AVG`, `COUNT` | Same |
| Sorting | `ORDER BY` | `ORDER BY` |
| Grouping | `GROUP BY` | `GROUP BY` |
