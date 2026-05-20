import { eq } from "drizzle-orm";
import { db } from "../database/db.js";
import { products } from "../database/schema.js";

function parseId(idParam) {
  const id = Number(idParam);
  if (!Number.isInteger(id) || id <= 0) {
    return null;
  }
  return id;
}

function validateProduct(body) {
  const errors = [];
  const { name, description, price, imageUrl } = body;

  if (!name || typeof name !== "string" || name.trim() === "") {
    errors.push("name é obrigatório e deve ser um texto válido");
  }

  const parsedPrice = Number(price);
  if (
    price === undefined ||
    price === null ||
    Number.isNaN(parsedPrice) ||
    parsedPrice < 0
  ) {
    errors.push("price é obrigatório e deve ser um número maior ou igual a zero");
  }

  if (description !== undefined && description !== null && typeof description !== "string") {
    errors.push("description deve ser um texto");
  }

  if (imageUrl !== undefined && imageUrl !== null && typeof imageUrl !== "string") {
    errors.push("imageUrl deve ser um texto");
  }

  if (errors.length > 0) {
    return { errors };
  }

  return {
    data: {
      name: name.trim(),
      description: description?.trim() || null,
      price: parsedPrice.toFixed(2),
      imageUrl: imageUrl?.trim() || null,
    },
  };
}

export async function listProducts(req, res) {
  try {
    const allProducts = await db.select().from(products);
    return res.status(200).json(allProducts);
  } catch (error) {
    console.error("Erro ao listar produtos:", error);
    return res.status(500).json({ error: "Erro interno ao listar produtos" });
  }
}

export async function getProductById(req, res) {
  const id = parseId(req.params.id);
  if (!id) {
    return res.status(400).json({ error: "ID inválido" });
  }

  try {
    const [product] = await db
      .select()
      .from(products)
      .where(eq(products.id, id));

    if (!product) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }

    return res.status(200).json(product);
  } catch (error) {
    console.error("Erro ao buscar produto:", error);
    return res.status(500).json({ error: "Erro interno ao buscar produto" });
  }
}

export async function createProduct(req, res) {
  const validation = validateProduct(req.body);

  if (validation.errors) {
    return res.status(400).json({ errors: validation.errors });
  }

  try {
    const [product] = await db
      .insert(products)
      .values(validation.data)
      .returning();

    return res.status(201).json(product);
  } catch (error) {
    console.error("Erro ao criar produto:", error);
    return res.status(500).json({ error: "Erro interno ao criar produto" });
  }
}

export async function updateProduct(req, res) {
  const id = parseId(req.params.id);
  if (!id) {
    return res.status(400).json({ error: "ID inválido" });
  }

  const validation = validateProduct(req.body);

  if (validation.errors) {
    return res.status(400).json({ errors: validation.errors });
  }

  try {
    const [product] = await db
      .update(products)
      .set(validation.data)
      .where(eq(products.id, id))
      .returning();

    if (!product) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }

    return res.status(200).json(product);
  } catch (error) {
    console.error("Erro ao atualizar produto:", error);
    return res.status(500).json({ error: "Erro interno ao atualizar produto" });
  }
}

export async function deleteProduct(req, res) {
  const id = parseId(req.params.id);
  if (!id) {
    return res.status(400).json({ error: "ID inválido" });
  }

  try {
    const [product] = await db
      .delete(products)
      .where(eq(products.id, id))
      .returning();

    if (!product) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }

    return res.status(200).json({
      message: "Produto removido com sucesso",
      product,
    });
  } catch (error) {
    console.error("Erro ao remover produto:", error);
    return res.status(500).json({ error: "Erro interno ao remover produto" });
  }
}
