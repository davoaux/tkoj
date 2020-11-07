const baseUrl = process.env.REACT_APP_BASE_URL;

export default async function getNotes() {
  const response = await fetch(`${baseUrl}notes`);
  const notes = await response.json();
  return notes;
}
