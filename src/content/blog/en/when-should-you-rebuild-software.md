---
language: en
translationKey: when-should-you-rebuild-software
slug: when-should-you-rebuild-software
title: When should you rebuild software?
description: How to choose between removing, improving and rebuilding when existing software appears to stand in the way of change.
author:
  name: Tim Twiest
  url: https://timtwiest.nl
pubDate: 2026-10-02
tags:
  - software architecture
  - software development
  - consulting
draft: false
---

Starting again can feel easier than continuing with existing software. The new
version will have a cleaner architecture, modern technology and none of the old
decisions holding it back. At least, that is the promise.

A **rewrite**, rebuilding an entire system, does not automatically remove the
hardest part: understanding what the software needs to do in practice. That
knowledge is often spread across code, data, connected systems and people who
remember the exceptions.

Before discussing new technology, something else needs to be clear: _why is this
system difficult to change, and how much do we actually need to replace?_

## "The software is old" is not a diagnosis

Age alone tells us little. Ten-year-old software can be reliable and easy to
change. A one-year-old application can already be stuck because its boundaries
are unclear and its parts depend heavily on each other.

Make the problem concrete instead. For example:

- a small change consistently affects several parts;
- releases take a long time or often have to be rolled back;
- defects are difficult to find and keep returning;
- only a few people understand an important process;
- the frontend cannot change without modifying the backend;
- data has no clear owner, or different sources contradict each other.

These are different problems. They do not automatically require the same
solution. A slow user interface is not fixed by replacing a database. An unclear
business process does not become clearer when the same behaviour is rebuilt on a
new technical foundation.

## Find where change actually gets stuck

Software architecture proves its value when components can change safely and
predictably.

Look at the entire path from idea to production:

1. How long does it take before a change is clear enough to build?
2. Which components and teams depend on it?
3. How easily can the behaviour be tested automatically?
4. How often does a release cause an incident?
5. How quickly can the system recover from a failure?

These questions separate a technical problem from a problem in decision-making,
ownership or the release process. A new system will not help if it inherits the
same uncertainty.

## Remove, stabilise, isolate or replace

There are several sensible options between doing nothing and rewriting
everything.

**Remove.** Unused features, duplicate data flows and obsolete integrations do
not need to move into a new solution. Less behaviour means less code to
understand, test and operate.

**Stabilise.** Sometimes you first need to see what is happening. Logging records
events, monitoring watches known signals and tracing follows one request through
multiple components. Together they make a system's internal state understandable
from its output. The technical term for this is _observability_.

**Isolate.** A difficult component can be placed behind a clear boundary. The
rest of the system then uses an agreed contract, such as an API. An API lets
systems exchange data according to defined rules. Other components no longer
need to know its internal implementation. This reduces the degree to which a
change in one component forces changes elsewhere. The technical term for that
dependency is **coupling**.

**Replace selectively.** If one component causes most of the problems, it can
often be replaced separately while the rest continues to operate.

This sequence produces information sooner than a complete rewrite. Every step
reveals whether the real problem is smaller, larger or different from expected.

## An example from frontend to database

Imagine an employee changing a customer's address. One screen reports that the
change was saved, but the invoicing system still uses the old address. Behind the
screens, two technical routes send the change to separate copies of the same
customer data. Those routes belong to the backend: the part of the software that
processes data and business rules. A nightly process tries to reconcile the
differences and may even make the old address authoritative again.

A new frontend may improve the screen, but it will not resolve the uncertainty
about the source data. A new backend will not help either if both routes continue
to exist.

A focused approach begins with one authoritative data source: the place that
determines what is correct for a particular piece of data. In software
architecture, this is called a **source of truth**. The backend then provides one
clear route for changes. The frontend only presents a change as successful after
the backend has confirmed it. Automated tests subsequently verify that the
frontend and backend continue to use the same agreements. Such checks are known
as contract tests.

This does not replace the whole application. It first addresses the architectural
cause: unclear data ownership and multiple routes for the same action.

## When a complete rewrite can make sense

Rebuilding everything is sometimes the best choice. For example, when:

- a necessary business model cannot be implemented reliably in the current
  structure;
- the technology in use can no longer be supported securely;
- critical components cannot be replaced separately;
- the cost and risk of incremental repair are demonstrably higher;
- the existing behaviour is documented and tested well enough to decide
  deliberately what must be rebuilt.

That final point matters in particular. Without knowledge of current behaviour,
a rewrite becomes a discovery project with a deadline. The old code remains
necessary for longer than planned while the new system has to absorb more and
more exceptions.

Define in advance what makes the new version successful. Not just "the same
features with new technology", but measurable results such as shorter lead time,
fewer incidents or one reliable, authoritative source for important data.

## Replace while the system keeps running

One large transition at a single moment increases risk. It is often safer to
place new behaviour alongside the existing system one step at a time. New
components then take over increasing numbers of requests and responsibilities
until the old part can be switched off. This approach is known as the **strangler
pattern**.

With an old customer portal, for example, only the search function might be sent
to a new component first. Once that works reliably, viewing a customer profile
can follow, and only then editing its data. Each step can be verified separately
and rolled back when necessary.

That requires more than a technical design. Every step needs:

- a clear boundary between old and new;
- a way to verify that both sides produce the same result;
- visibility into failures and differences;
- a way back if the new route does not work correctly;
- a specific moment at which the old component is removed.

Without that final item, temporary duplication becomes permanent. A migration is
only complete when the old route, data flow and associated operational burden
have genuinely disappeared.

## A practical decision

Answer at least these questions before starting a rewrite:

1. Which observable problem are we trying to solve?
2. Where does it actually originate: frontend, backend, data or process?
3. What can be removed or isolated first?
4. Which existing behaviour must demonstrably remain intact?
5. How will we measure whether the change is better?
6. How will the business continue to operate during the transition?
7. When can we permanently switch off the old component?

Without these answers, rebuilding is primarily a leap into an unknown situation.
With clear answers, a rewrite can be a controlled choice instead of a hopeful
reset.

For us, that is the core of good architecture: software that remains
understandable and changeable without putting the entire system at risk every
time something changes.

That is where Venturian Ecom helps. We investigate where change gets stuck and
then work on the architecture, backend, frontend, data or integrations causing
it. We leave what works well in place. We improve or replace what gets in the
way.

Considering a rewrite? Do not start with the new technology. First write down
where the current system is holding you back and who notices it in practice.
That is where a useful conversation begins.
