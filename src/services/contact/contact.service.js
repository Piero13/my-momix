import {
  supabase,
} from "@/lib";

export async function createContactMessage({
  name,
  email,
  subject,
  message,
}) {
  const payload = {
    name:
      name.trim(),

    email:
      email.trim(),

    subject,

    message:
      message.trim(),

    status:
      "new",
  };

  const {
    error,
  } = await supabase
    .from("contact_messages")
    .insert(payload);

  if (error) {
    throw error;
  }

  return true;
}