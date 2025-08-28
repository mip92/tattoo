import { GetProductQuery, GetProductQueryVariables } from "@/generated/graphql";

// Функция для серверных GraphQL запросов
export async function serverQuery<T = any>(
  query: string,
  variables?: Record<string, any>
): Promise<T> {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_GRAPHQL_URL || "http://localhost:4000/graphql",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
          variables,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.errors) {
      throw new Error(`GraphQL errors: ${JSON.stringify(data.errors)}`);
    }

    return data.data;
  } catch (error) {
    console.error("Server GraphQL error:", error);
    throw error;
  }
}

// GraphQL запрос для получения продукта
export const GET_PRODUCT_QUERY = `
  query GetProduct($id: Int!) {
    product(id: $id) {
      id
      name
      brandId
      createdAt
      type
      updatedAt
      brand {
        id
        name
      }
    }
  }
`;

// Тип для ответа сервера
export type ServerProductResponse = GetProductQuery;
