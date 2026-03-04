---
title: "OODBs 1: Advanced Techniques"
date: "2026-03-04"
tags:
  - databases
  - OODBs
  - advanced
topic: OODBs
---

## Polymorphic Queries and Extents

An **extent** is the complete set of all stored instances of a class — including every subclass. OODBMS systems maintain extents automatically.

When you query `Animal`, you get every stored `Dog`, `Cat`, and any other subclass. The query is **polymorphic** by default:

```sql
-- Returns ALL animals: dogs, cats, and any subclass
SELECT a FROM Animal a WHERE a.age > 2

-- Returns ONLY dogs (shallow extent)
SELECT d FROM Dog d WHERE d.breed = 'Labrador'
```

This has no direct equivalent in SQL — you'd need a UNION across multiple tables to get the same result.

---

## Lazy vs Eager Loading

When you load an object, its references to nested objects aren't always fetched immediately. OODBMS systems offer two strategies:

- **Eager loading** — the full object graph is loaded upfront. Good when you know you'll need everything.
- **Lazy loading** — referenced objects are fetched only when you first access them. More efficient when you only need part of the graph.

```python
person = db.load(person_oid)
print(person.name)           # loaded immediately
print(person.address.city)   # address fetched from disk NOW, on first touch
```

Most OODBMS systems default to lazy loading, with options to declare eager fetch paths for hot traversals.

---

## Long Transactions

Relational databases expect short, millisecond-level transactions. OODBMS systems were designed for **long transactions** — sessions lasting hours or days, common in CAD and design workflows:

1. **Check out** a set of objects — lock them for local editing
2. Work in memory for an extended session (no held database lock)
3. **Check in** the modified objects — the database validates and commits

This avoids holding locks for long periods while still guaranteeing consistency. Some systems implement this as *optimistic locking with versioning*: two users can check out the same object, but only the first to check in wins — the second gets a merge conflict.

---

## Schema Evolution

What happens when your class definition changes — you add a field, rename one, or remove one — while thousands of old objects are already stored with the old schema?

| Strategy | How it works |
|----------|--------------|
| **Lazy migration** | Old objects convert to the new schema on first access |
| **Eager migration** | All objects are migrated upfront when the schema changes |
| **Default values** | New fields on old objects return a default until re-saved |
| **Schema versioning** | Multiple schema versions coexist; each object carries its schema version |

*Example:* You add `email: str` to `Person`. With lazy migration, old `Person` objects return `email = ""` automatically until they are explicitly updated.

---

## Pointer Swizzling

When an object is loaded from disk, its OID references (disk addresses) must be converted to actual in-memory pointers so they can be followed cheaply at runtime. This conversion is called **pointer swizzling**.

- **On-load swizzling** — all OIDs are resolved to memory pointers when the object loads. Traversal afterwards is as fast as a regular pointer dereference.
- **On-demand swizzling** — OIDs are converted only when a reference is actually followed (combines with lazy loading).

This is invisible to the developer but explains why object graph traversal in a well-tuned OODBMS can be significantly faster than an equivalent JOIN query — once swizzled, following a reference costs one memory indirection, not a database lookup.

---

## Object Clustering

**Clustering** means physically storing related objects close together on disk, so loading one object automatically pulls its neighbors into the cache.

*Example:* Store each `Order` and its `OrderLine` items on the same disk page. Loading the `Order` makes the lines essentially free to access.

Without clustering, traversing a deep object graph triggers many random disk reads — one per object. With good clustering, it collapses to a few sequential reads.

---

## Path Indexes

Relational databases index columns. OODBMS systems can index **property paths** — including paths through nested objects:

```sql
-- Can use a path index on Person.address.city
SELECT p FROM Person p WHERE p.address.city = 'Hanoi'
```

A path index on `Person.address.city` maps city name → list of `Person` OIDs directly, skipping the need to load every `Person` and dereference its `address` during a scan. Path indexes are the OODBMS equivalent of a covering index in SQL.
