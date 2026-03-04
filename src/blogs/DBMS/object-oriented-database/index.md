---
title: "Object oriented databases (OODBs)"
date: "2026-03-04"
tags:
  - databases
  - object-oriented-databases
  - OODBs
topic: OODBs
references:
  - "Object Database | https://en.wikipedia.org/wiki/Object_database"
---

## What is an Object-Oriented Database?

An **Object-Oriented Database Management System (OODBMS)** stores data as **objects** — the same way object-oriented programming languages like Java, Python, or C++ model real-world things.

Instead of rows and columns (like a relational database), an OODBMS stores each thing as a complete object that bundles together:

- **Attributes** — what it *has* (name, speed, color)
- **Methods** — what it *can do* (start, stop, validate)
- **Identity** — a unique permanent ID that stays the same even if the data changes

*Example:* A `Car` object stores its brand, speed, and fuel type — plus the logic to accelerate and brake — all in one place.

---

## Core Concepts

### Objects and Classes

A **class** is the blueprint. An **object** is one specific instance of that class stored persistently in the database.

```python
class Car:
    brand: str
    speed: int
    color: str

    def accelerate(self, amount: int) -> None:
        self.speed += amount

    def get_info(self) -> str:
        return f"{self.brand} going {self.speed} km/h"
```

In an OODBMS, the `Car` class defines the structure, and every car you save is a **persistent object instance** — written to disk and loadable later with all its data and relationships intact.

![Anatomy of a persistent object](object-anatomy.svg)

### Object Identity (OID)

Every object gets a **unique, system-assigned ID** called an **OID**. Unlike a primary key (which is just a value you choose), an OID is:

- **Permanent** — it never changes, even if you update all the object's data
- **System-generated** — the database creates it automatically
- **Pointer-like** — objects reference each other directly through OIDs, not by looking up keys

This means two objects can have identical data and still be two distinct things — just like two identical cars are still different cars.

### Inheritance

Subclasses **inherit** all attributes and methods from their parent class. A `Dog` automatically gets `name`, `age`, and `eat()` from `Animal` — without re-defining them.

```python
class Animal:
    name: str
    age: int

    def eat(self) -> None:
        print(f"{self.name} is eating")

class Dog(Animal):       # Dog inherits from Animal
    breed: str

    def bark(self) -> None:
        print("Woof!")

class Cat(Animal):       # Cat inherits from Animal
    indoor: bool

    def meow(self) -> None:
        print("Meow!")
```

The database stores this entire class hierarchy and enforces it — a `Dog` object will always carry all `Animal` fields.

![Class inheritance diagram](class-hierarchy.svg)

### Encapsulation

Objects control access to their own data through **methods**. External code calls `car.accelerate(10)` instead of directly modifying the internal `speed` field. The OODBMS stores the full object — behavior included — and keeps this boundary intact.

### Nested and Complex Types

One of the biggest advantages of OODBMS is storing **nested objects and collections** natively, without splitting data into separate tables:

```python
class Address:
    city: str
    country: str

class Order:
    item: str
    total: float

class Person:
    name: str
    age: int
    address: Address        # nested object — no JOIN needed
    orders: list[Order]     # collection of objects
```

In a relational database, `Address` and `Order` would live in separate tables and require JOIN queries to reassemble. In an OODBMS, they live directly inside `Person`.

---

## How an OODBMS Stores Data

### Object Graph

Objects reference other objects directly using OIDs — there are no foreign keys. The database stores an **object graph**: a network of interconnected persistent objects.

When you load a `Person`, the database follows its OID references and loads the related `Address` and `Order` objects too (either immediately or lazily on demand).

### Object Persistence

In a normal program, objects live in RAM and disappear when the program exits. An OODBMS makes objects **persistent** — they are serialized to disk, indexed by OID, and can be reloaded with all their relationships intact across sessions.

### Schema = Class Hierarchy

Instead of a table schema (column names + types), the OODBMS schema *is* the class hierarchy itself. You define your classes once, and the database stores instances of them directly.

---

## OODBMS vs Relational Database

| Feature | RDBMS | OODBMS |
|---------|-------|--------|
| Data unit | Row in table | Object |
| Relationships | Foreign keys + JOINs | Direct OID references |
| Nested data | Multiple tables required | Native nested objects |
| Schema | Table columns | Class hierarchy |
| Query language | SQL | OQL |
| Methods / behavior | None | Built into objects |
| Best for | Structured tabular data | Complex, interconnected objects |

The core problem OODBMS solves is the **impedance mismatch** — the friction of translating OOP objects into flat rows and back every time you read or write. If your code is already object-oriented, an OODBMS lets you persist objects directly without that translation layer.

---

## When to Use an OODBMS

**Good fit:**

- Data with deep nesting (CAD/CAM models, scientific data, multimedia metadata)
- Applications with complex many-to-many relationships that would need dozens of JOINs
- Domains where behavior is as important as data (objects with meaningful methods)
- When your codebase is heavily OOP and you want to persist the domain model as-is

**Not the best fit:**

- Simple tabular data (users, products, orders) — a relational database is simpler and better-supported
- When you need broad tooling support (reporting tools, BI dashboards, SQL ecosystem)
- High-volume transactional systems where RDBMS maturity matters

---

## Real-World OODBMS Examples

| System | Notes |
|--------|-------|
| **db4o** | Lightweight, open source, Java / .NET |
| **ObjectDB** | Java, JPA-compatible |
| **Versant** | Enterprise-grade, Java / C++ |
| **GemStone/S** | One of the earliest OODBMS, Smalltalk-based |
| **InterSystems Caché** | Widely used in healthcare |

Today, pure OODBMS systems are less common in mainstream use. Many applications instead use **object-relational mappers (ORMs)** like SQLAlchemy or Hibernate to bridge OOP code with a relational database. However, OODBMS concepts directly influenced modern document databases like MongoDB, which store JSON-like documents (structured objects) rather than flat rows.

---

## Dive Deeper

This article covers the fundamentals. The rest of the series goes further:

- [OODBs 1: Advanced Techniques](/blogs/oodb-advanced-techniques) — polymorphic queries, lazy loading, long transactions, schema evolution, pointer swizzling, and object clustering
- [OODBs 2: Querying with OQL](/blogs/oodb-querying) — path navigation, method calls, collection queries, and how OQL differs from SQL
- [OODBs 3: Indexing and Caching](/blogs/oodb-indexing-caching) — attribute, path, collection and extent indexes; object buffer pool, client-side cache, dirty tracking, and prefetching
