const API_URL: string | undefined = import.meta.env
  .VITE_APP_TRAVEL_JOURNAL_API_URL as string | undefined;
if (!API_URL)
  throw new Error("API URL is required, are you missing a .env file?");
export const baseURL: string = `${API_URL}/messages`;

export const getMessages = async (): Promise<Message[]> => {
  const res = await fetch(baseURL);
  if (!res.ok) {
    const errorData = await res.json();
    if (!errorData.error) {
      throw new Error("An error occurred while fetching the messages");
    }
    throw new Error(errorData.error);
  }
  const data: Message[] = await res.json();
  return data;
};

export const getSingleMessage = async (id: string): Promise<Message> => {
  const res = await fetch(`${baseURL}/${id}`);
  if (!res.ok) {
    const errorData = await res.json();
    if (!errorData.error) {
      throw new Error("An error occurred while fetching the message");
    }
    throw new Error(errorData.error);
  }
  const data: Message = await res.json();
  return data;
};

export const createMessage = async (
  formData: Omit<Message, "_id">
): Promise<Message> => {
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
      throw new Error("An error occurred while creating the message");
    }
    throw new Error(errorData.error);
  }
  const data: Message = await res.json();
  return data;
};
