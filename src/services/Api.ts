const API_URL = "https://rotainclusiva.onrender.com";

export async function getAcessibilidades() {
  const response = await fetch(`${API_URL}/acessibilidades`);

  if (!response.ok) {
    throw new Error("Erro ao buscar acessibilidades");
  }

  return response.json();
}

export async function createAcessibilidade(data: any) {
  const response = await fetch(`${API_URL}/acessibilidades`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Erro ao criar acessibilidade");
  }

  return response.json();
}

export async function updateAcessibilidade(data: any) {
  const response = await fetch(`${API_URL}/acessibilidades`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Erro ao atualizar acessibilidade");
  }

  return response.json();
}

export async function deleteAcessibilidade(id: number) {
  const response = await fetch(`${API_URL}/acessibilidades/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Erro ao deletar acessibilidade");
  }
}