import fs from "fs/promises";
import path from "path";

export async function saveFile(file: File, folder: string) {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadDir = path.join(process.cwd(), "public", folder);
  await fs.mkdir(uploadDir, { recursive: true });

  const filename = `${Date.now()}-${file.name}`;
  const filepath = path.join(uploadDir, filename);

  await fs.writeFile(filepath, buffer);

  return `/${folder}/${filename}`; // URL
}

export async function deleteFile(url?: string | null) {
  if (!url) return;

  const filepath = path.join(process.cwd(), "public", url);
  try {
    await fs.unlink(filepath);
  } catch {
    // file not found → ignore
  }
}
