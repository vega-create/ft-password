---
title: "UUID Guide for Developers: When and How to Use Them"
description: "Learn about UUID versions, when to use UUIDs vs auto-increment IDs, and best practices."
publishDate: "2026-02-03"
category: "Development"
tags: ["uuid", "database", "api"]
---

UUIDs (Universally Unique Identifiers) are 128-bit identifiers designed to be unique across all systems without coordination. They are essential for distributed systems, APIs, and modern database design.

## What Is a UUID?

A UUID is a 128-bit number typically displayed as 32 hexadecimal digits in five groups separated by hyphens: 550e8400-e29b-41d4-a716-446655440000. The format is 8-4-4-4-12 characters.

## UUID Versions

### Version 1 (Time-based)

Generated from the current timestamp and the MAC address of the computer. These are sequential and can reveal when and where they were created. Not recommended for security-sensitive applications.

### Version 4 (Random)

Generated entirely from random numbers. This is the most commonly used version because it provides no information about the generator and has an extremely low collision probability. Our UUID generator creates v4 UUIDs.

### Version 7 (Time-ordered)

A newer version that combines timestamp with randomness. UUIDs are roughly sortable by creation time while maintaining uniqueness. Increasingly popular for database primary keys because they maintain insertion order.

## UUID vs Auto-Increment IDs

### When to Use UUIDs

UUIDs excel in distributed systems where multiple servers create records independently, public-facing APIs where sequential IDs could leak information, systems that merge data from multiple sources, and microservice architectures.

### When to Use Auto-Increment

Auto-increment IDs are simpler and more storage-efficient. They work well for single-database applications, internal systems, and cases where ordered IDs are helpful for debugging.

## Best Practices

Store UUIDs as binary (16 bytes) rather than strings (36 characters) in databases for better performance. Use UUID v4 for general-purpose unique identifiers. Consider UUID v7 for database primary keys where time-ordering is beneficial. Never rely on UUIDs for security since they are identifiers, not secrets.