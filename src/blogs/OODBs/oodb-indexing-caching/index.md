---
title: "OODBs 3: Indexing and Caching"
date: "2026-03-04"
tags:
  - databases
  - OODBs
  - indexing
  - caching
  - performance
topic: DBMS
---

## Types of Indexes

OODBs support several index types, going beyond what relational databases offer.

**Attribute index** — the simplest form. A B-tree on a single field, identical in concept to a SQL index.

```sql
-- Attribute index on Dog.breed
SELECT d FROM Dog d WHERE d.breed = 'Labrador'  -- O(log n) lookup
```

**Path index** — indexes a *chain of properties* through nested objects. Unique to OODBs.

```sql
-- Path index on Person.address.city
SELECT p FROM Person p WHERE p.address.city = 'Hanoi'
-- Without index: scan every Person, dereference address, check city — O(n)
-- With index:    direct OID lookup — O(log n)
```

**Collection index** — indexes the *elements inside* a collection attribute, so you can query into lists or sets efficiently.

```sql
-- Collection index on Order.items.product_id
SELECT o FROM Order o WHERE o.items.product_id = 42
```

**Extent index (class hierarchy index)** — spans a class and all its subclasses, so polymorphic queries run without scanning every subclass separately.

| Index type | What it covers | Typical use case |
|------------|----------------|-----------------|
| **Attribute** | Single field value | Equality / range queries |
| **Path** | Nested property chain | Queries navigating the object graph |
| **Collection** | Elements in a list or set | Querying inside collections |
| **Extent** | Class + all subclasses | Polymorphic queries |
| **Composite** | Multiple fields together | Multi-condition queries |

---

## Caching

OODBs use a multi-layer cache architecture quite different from RDBMS buffer pools.

**Object buffer pool** — the server keeps recently-used objects in a memory pool. On a cache hit, the object is returned from memory. On a miss, it is read from disk, deserialized, and added to the pool — the OODBMS equivalent of the RDBMS page cache.

**Client-side object cache** — in client-server OODBMS architectures (Versant, GemStone), the *client process* maintains its own in-process cache of loaded objects. Repeated accesses to the same object within a transaction cost nothing — no round-trip to the server.

```
Client process
└── Client cache (in RAM)
      ├── person #001  (loaded, clean)
      ├── address #008 (loaded, clean)
      └── order  #015  (loaded, DIRTY ← modified locally)
                          ↓ commit flushes dirty objects only
Server
└── Object buffer pool (RAM) → disk
```

**Dirty tracking** — the runtime marks every object that has been modified since it was loaded. On commit, only dirty objects are written back to disk. Clean objects are simply dropped from the cache — no unnecessary I/O.

**Pinning** — you can explicitly mark a hot object as *pinned* so it is never evicted by the cache eviction policy (typically LRU). Useful for frequently-accessed root objects or configuration singletons.

**Prefetching** — some systems analyze traversal patterns and proactively load objects you are likely to need next, hiding the latency of lazy loading. This is configured as a *fetch group*: a named set of related paths to load together.

```java
// db4o example: declare that loading a Person should also prefetch its address
ObjectContainer db = ...;
db.ext().configure().objectClass(Person.class)
    .objectField("address").cascadeOnActivate(true);
```

---

## Index vs Cache: When Each Helps

| Scenario | Use index | Use cache |
|----------|-----------|-----------|
| Filter by a field value (`WHERE breed = 'X'`) | ✓ | — |
| Navigate a deep path (`p.address.city`) | ✓ path index | — |
| Re-access the same object many times | — | ✓ |
| Traverse a large object graph in one session | — | ✓ clustering + pool |
| Polymorphic query across subclasses | ✓ extent index | — |
| Hotspot objects accessed on every request | — | ✓ pinning |
