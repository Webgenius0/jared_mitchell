"use server";
import { updateTag } from "next/cache";

export async function revalidateByTag(tag: string) {
  updateTag(tag);
}
