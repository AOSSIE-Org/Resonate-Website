# OpenForge AI — Automated Fix

## Issue
SQL Injection via unsanitized user input

## Type
vulnerability

## Suggested Fix
Use parameterized queries with pg's $1 placeholder syntax

## Affected Files
- src/db/queries.ts
- src/routes/user.ts

## Applied By
OpenForge AI autonomous agent
Generated: 2026-05-27T14:08:41.113Z
