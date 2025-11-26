const API_URL: string | undefined = import.meta.env.VITE_APP_API_URL as
  | string
  | undefined;
if (!API_URL)
  throw new Error("API URL is required, are you missing a .env file?");
export const baseURL: string = `${API_URL}/animals`;

export const getAnimals = async (): Promise<Animal[]> => {
  const res = await fetch(baseURL);
  if (!res.ok) {
    const errorData = await res.json();
    if (!errorData.error) {
      throw new Error("An error occurred while fetching the animals");
    }
    throw new Error(errorData.error);
  }
  const data: Animal[] = await res.json();
  return data;
};

export const getSingleAnimal = async (id: string): Promise<Animal> => {
  const res = await fetch(`${baseURL}/${id}`);
  if (!res.ok) {
    const errorData = await res.json();
    if (!errorData.error) {
      throw new Error("An error occurred while fetching the animal");
    }
    throw new Error(errorData.error);
  }
  const data: Animal = await res.json();
  return data;
};

export const createAnimal = async (
  formData: Omit<Animal, "_id">
): Promise<Animal> => {
  const res = await fetch(baseURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  if (!res.ok) {
    const errorData = await res.json();
    if (!errorData.error) {
      throw new Error("An error occurred while creating the animal");
    }
    throw new Error(errorData.error);
  }
  const data: Animal = await res.json();
  return data;
};
