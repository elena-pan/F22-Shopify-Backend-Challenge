
# Inventory - Shopify Backend Challenge

[![Run on Repl.it](https://repl.it/badge/github/elena-pan/F22-Shopify-Backend-Challenge)](https://F22-Shopify-Backend-Challenge.elenapan1.repl.co)

An API that keeps track of an inventory of items. Users can get, add, edit, and delete inventory items. A frontend that connects to the backend is also included for demonstration purposes. This project was created for the [Shopify Fall 2022 Backend Intern Challenge](https://docs.google.com/document/d/1PoxpoaJymXmFB3iCMhGL6js-ibht7GO_DkCF2elCySU/edit).

[Features](#features) \
[Project Structure](#project-structure) \

## Features

#### Routes
* GET  /api/inventory
  * Returns a list of all items in the inventory

* GET  /api/inventory/:id
  * Gets an inventory item by ID

* GET  /api/inventory/stocked
  * Returns a list of all items in the inventory that have stock (are not zero)

* POST  /api/inventory
  * Adds a new type of item to the inventory.

* PUT  /api/inventory
  * Updates an inventory item.

* DELETE  /api/inventory/:id
  * Deletes an inventory item by its id. 

* POST  /api/shipment
  * Makes a shipment of inventory items, updating the inventory, if there are enough items in stock.

#### SQL Database
* The development server uses a SQLite3 database, with Knex.js as a query builder and Objection.js as the ORM
* The database is seeded with some starter items.

#### Technology Stack
* REST API server: Express.js (Node.js framework)
* Database: SQLite3, Knex.js, Objection.js
* Front-end: React

## Project Structure

```
├── db                        -- Database files
    ├── models                -- Objection data models
    ├── migrations            -- Data migration files
    ├── seeds                 -- Data seeding files
    │   ├── development
├── routes                    -- API routes
    ├── api
├── client                    -- Frontend client folder

```
