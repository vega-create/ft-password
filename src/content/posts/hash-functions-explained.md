---
title: "Hash Functions Explained: MD5, SHA-256, and Bcrypt"
description: "Understand how hash functions work and why they matter for password security and data integrity."
publishDate: "2026-02-03"
category: "Development"
tags: ["hash", "md5", "sha256", "bcrypt"]
---

Hash functions are fundamental to computer security, data integrity, and password storage. Understanding how they work helps you make better decisions about which algorithms to use and when.

## What Is a Hash Function?

A hash function takes input of any size and produces a fixed-size output (called a hash, digest, or checksum). Good hash functions have several important properties: the same input always produces the same output, small changes in input produce completely different outputs, it is computationally infeasible to reverse the process, and it is extremely unlikely that two different inputs produce the same output.

## Common Hash Algorithms

### MD5 (Message Digest 5)

MD5 produces a 128-bit (32-character hex) hash. It was widely used for file integrity verification and password hashing. However, MD5 is now considered cryptographically broken — researchers have demonstrated practical collision attacks where two different inputs produce the same hash.

MD5 should not be used for security purposes. It remains useful for non-security checksums like verifying file downloads.

### SHA-256 (Secure Hash Algorithm)

SHA-256 is part of the SHA-2 family and produces a 256-bit (64-character hex) hash. It is widely used in TLS certificates, blockchain technology, and data integrity verification. SHA-256 remains secure and is recommended for most hashing needs.

### Bcrypt

Bcrypt is specifically designed for password hashing. Unlike MD5 and SHA-256, bcrypt is intentionally slow, which makes brute-force attacks much more expensive. It also includes a built-in salt (random data added to the password before hashing) and an adjustable work factor that can be increased as hardware gets faster.

## Hashing vs Encryption

Hashing is a one-way process. You cannot reverse a hash to get the original input. Encryption is a two-way process where encrypted data can be decrypted back to the original with the correct key.

Passwords should always be hashed, never encrypted. If an attacker gains access to encrypted passwords and the encryption key, they can read every password. With properly hashed passwords, the attacker must crack each hash individually.

## Password Hashing Best Practices

Always use bcrypt, scrypt, or Argon2 for password hashing. Never use MD5 or SHA-256 alone for passwords. Always use a unique salt per password. Set the work factor as high as your server can handle without impacting user experience.