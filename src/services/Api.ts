import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
export const api = axios.create({
  baseURL: API_URL,
})

export async function calcularTempoCarona(id: number) {
  const response = await fetch(`${API_URL}/caronas/${id}/calcular-tempo`);

  if (!response.ok) {
    throw new Error("Erro ao calcular tempo da carona");
  }

  return response.json();
}
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

export async function getCaronas() {
  const response = await fetch(`${API_URL}/caronas`);

  if (!response.ok) {
    throw new Error("Erro ao buscar caronas");
  }

  return response.json();
}

export async function createCarona(data: any) {
  const response = await fetch(`${API_URL}/caronas`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Erro ao criar carona");
  }

  return response.json();
}

export async function updateCarona(id: number, data: any) {
  const response = await fetch(`${API_URL}/caronas/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Erro ao atualizar carona");
  }

  return response.json();
}

export async function deleteCarona(id: number) {
  const response = await fetch(`${API_URL}/caronas/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Erro ao deletar carona");
  }
}