import {
  supabase,
} from "@/lib";

import { CONTACT_MESSAGE_STATUS } from "@/constants/contact";

export async function getContactMessages() {
  const {
    data,
    error,
  } = await supabase
    .from("contact_messages")
    .select(`
      id,
      name,
      email,
      subject,
      message,
      status,
      created_at,
      updated_at
    `)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    throw error;
  }

  return data ?? [];
}

export async function getNewContactMessagesCount() {
  const {
    count,
    error,
  } = await supabase
    .from("contact_messages")
    .select("id", {
      count: "exact",
      head: true,
    })
    .eq("status", CONTACT_MESSAGE_STATUS.NEW);

  if (error) {
    throw error;
  }

  return count ?? 0;
}

export async function updateContactMessageStatus(
  messageId,
  status
) {
  const {
    error,
  } = await supabase
    .from("contact_messages")
    .update({
      status,
    })
    .eq("id", messageId);

  if (error) {
    throw error;
  }

  return true;
}

export async function deleteContactMessage(
  messageId
) {
  const {
    error,
  } = await supabase
    .from("contact_messages")
    .delete()
    .eq("id", messageId);

  if (error) {
    throw error;
  }

  return true;
}