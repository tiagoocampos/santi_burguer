import {
    pgTable,
    serial,
    varchar,
    text,
    numeric,
    timestamp,
    integer,
  } from "drizzle-orm/pg-core";
  
  export const products = pgTable("products", {
    id: serial("id").primaryKey(),
  
    name: varchar("name", { length: 255 }).notNull(),
  
    description: text("description"),
  
    price: numeric("price", {
      precision: 10,
      scale: 2,
    }).notNull(),
  
    imageUrl: text("image_url"),
  
    createdAt: timestamp("created_at").defaultNow(),
  });
  
  export const orders = pgTable("orders", {
    id: serial("id").primaryKey(),
  
    customerName: varchar("customer_name", {
      length: 255,
    }).notNull(),
  
    customerPhone: varchar("customer_phone", {
      length: 20,
    }),
  
    customerAddress: text("customer_address").notNull(),
  
    total: numeric("total", {
      precision: 10,
      scale: 2,
    }).notNull(),
  
    status: varchar("status", {
      length: 50,
    }).default("pending"),
  
    createdAt: timestamp("created_at").defaultNow(),
  });
  
  export const orderItems = pgTable("order_items", {
    id: serial("id").primaryKey(),
  
    orderId: integer("order_id").notNull(),
  
    productId: integer("product_id").notNull(),
  
    quantity: integer("quantity").notNull(),
  
    price: numeric("price", {
      precision: 10,
      scale: 2,
    }).notNull(),
  });