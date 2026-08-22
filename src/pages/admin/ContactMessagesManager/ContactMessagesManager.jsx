import {
    useEffect,
    useMemo,
    useState,
} from "react";

import toast from "react-hot-toast";

import {
    FiMail,
} from "react-icons/fi";

import {
    AdminDataTable,
    ContactMessageModal,
    AdminIconAction,
    AdminConfirmModal,
} from "@/components/admin";

import {
    EmptyState,
    Section,
    PageContainer,
    SectionHeader,
} from "@/components/ui";

import { LoadingScreen } from "@/components/feedback";

import {
    CONTACT_MESSAGE_STATUS,
} from "@/constants/contact";

import {
    getContactMessages,
    updateContactMessageStatus,
    deleteContactMessage,
} from "@/services/contactAdmin";

import styles from "./ContactMessagesManager.module.scss";

export default function ContactMessagesManager() {
    const [
        messages,
        setMessages,
    ] = useState([]);

    const [
        isLoading,
        setIsLoading,
    ] = useState(true);

    const [
        error,
        setError,
    ] = useState(null);

    const [
        selectedMessage,
        setSelectedMessage,
    ] = useState(null)

    const [
        messageToDelete,
        setMessageToDelete,
    ] = useState(null);

    useEffect(() => {
        let isCancelled = false;

        const loadMessages =
            async () => {
                try {
                setIsLoading(true);
                setError(null);

                const data =
                    await getContactMessages();

                if (!isCancelled) {
                    setMessages(data);
                }
                } catch (error) {
                console.error(
                    "Unable to load contact messages:",
                    error
                );

                if (!isCancelled) {
                    setError(error);
                }
                } finally {
                if (!isCancelled) {
                    setIsLoading(false);
                }
                }
            };

        loadMessages();

        return () => {
            isCancelled = true;
        };
    }, []);

    const columns = useMemo(
        () => [
            {
                key: "name",
                label: "Nom",
            },
            {
                key: "email",
                label: "Email",
            },
            {
                key: "subject",
                label: "Sujet",
            },
            {
                key: "status",
                label: "Statut",
                render: (message) => {
                    const labels = {
                        [CONTACT_MESSAGE_STATUS.NEW]:
                        "Nouveau",

                        [CONTACT_MESSAGE_STATUS.READ]:
                        "Lu",

                        [CONTACT_MESSAGE_STATUS.ARCHIVED]:
                        "Archivé",
                    };

                    return (
                        <span
                            className={[
                                styles.status,
                                styles[
                                `status-${message.status}`
                                ],
                            ]
                                .filter(Boolean)
                                .join(" ")}
                        >
                            {
                                labels[
                                message.status
                                ] ??
                                message.status
                            }
                        </span>
                    );
                },
            },
            {
                key: "created_at",
                label: "Reçu le",
                render: (message) =>
                    new Intl.DateTimeFormat(
                        "fr-FR",
                        {
                        dateStyle:
                            "short",
                        timeStyle:
                            "short",
                        }
                    ).format(
                        new Date(
                        message.created_at
                        )
                    ),
            },
            {
                key: "actions",
                label: "",
                render: (message) => (
                    <AdminIconAction
                    variant="primary"
                    onClick={() =>
                        handleOpenMessage(
                        message
                        )
                    }
                    icon={FiMail}
                    />
                    
                ),
            },
        ],
        []
    );

    const handleOpenMessage =
        async (message) => {
            setSelectedMessage(message);

            if (
                message.status !==
                CONTACT_MESSAGE_STATUS.NEW
            ) {
                return;
            }

            try {
                await updateContactMessageStatus(
                    message.id,
                    CONTACT_MESSAGE_STATUS.READ
                );

            setMessages((current) =>
                current.map((item) =>
                item.id === message.id
                    ? {
                        ...item,
                        status:
                        CONTACT_MESSAGE_STATUS.READ,
                    }
                    : item
                )
            );

            setSelectedMessage(
                (current) =>
                current
                    ? {
                        ...current,
                        status:
                        CONTACT_MESSAGE_STATUS.READ,
                    }
                    : current
            );
            } catch (error) {
            console.error(
                "Unable to mark contact message as read:",
                error
            );
            }
        };

    const handleArchiveMessage =
        async (messageId) => {
            try {
            await updateContactMessageStatus(
                messageId,
                CONTACT_MESSAGE_STATUS.ARCHIVED
            );

            setMessages((current) =>
                current.map((message) =>
                message.id === messageId
                    ? {
                        ...message,
                        status:
                        CONTACT_MESSAGE_STATUS.ARCHIVED,
                    }
                    : message
                )
            );

            setSelectedMessage(
                (current) =>
                current?.id === messageId
                    ? {
                        ...current,
                        status:
                        CONTACT_MESSAGE_STATUS.ARCHIVED,
                    }
                    : current
            );

            toast.success(
                "Message archivé."
            );
            } catch (error) {
            console.error(
                "Unable to archive contact message:",
                error
            );

            toast.error(
                "Impossible d’archiver le message."
            );
            }
        };

    const handleRestoreMessage =
        async (messageId) => {
            try {
            await updateContactMessageStatus(
                messageId,
                CONTACT_MESSAGE_STATUS.READ
            );

            setMessages((current) =>
                current.map((message) =>
                message.id === messageId
                    ? {
                        ...message,
                        status:
                        CONTACT_MESSAGE_STATUS.READ,
                    }
                    : message
                )
            );

            setSelectedMessage(
                (current) =>
                current?.id === messageId
                    ? {
                        ...current,
                        status:
                        CONTACT_MESSAGE_STATUS.READ,
                    }
                    : current
            );

            toast.success(
                "Message restauré."
            );
            } catch (error) {
            console.error(
                "Unable to restore contact message:",
                error
            );

            toast.error(
                "Impossible de restaurer le message."
            );
            }
        };

    const handleDeleteMessage =
        async () => {
            if (!messageToDelete) {
            return;
            }

            try {
            await deleteContactMessage(
                messageToDelete.id
            );

            setMessages((current) =>
                current.filter(
                (message) =>
                    message.id !==
                    messageToDelete.id
                )
            );

            if (
                selectedMessage?.id ===
                messageToDelete.id
            ) {
                setSelectedMessage(null);
            }

            setMessageToDelete(null);

            toast.success(
                "Message supprimé."
            );
            } catch (error) {
            console.error(
                "Unable to delete contact message:",
                error
            );

            toast.error(
                "Impossible de supprimer le message."
            );
            }
        };

    if (isLoading) {
        return <LoadingScreen />;
    }

    return (
        <Section
            spacing="large"
            labelledBy="contact-messages-title"
        >
            <PageContainer>
                <SectionHeader
                    headingId="contact-messages-title"
                    eyebrow="Administration"
                    title="Messages de contact"
                    description="Consultez et gérez les messages envoyés depuis le formulaire de contact."
                />

                {error ? (
                <EmptyState
                    icon={FiMail}
                    title="Impossible de charger les messages"
                    description="Une erreur est survenue lors du chargement des messages."
                />
                ) : messages.length === 0 ? (
                <EmptyState
                    icon={FiMail}
                    title="Aucun message"
                    description="Les messages envoyés depuis la page Contact apparaîtront ici."
                />
                ) : (
                <div className={styles.tableWrapper}>
                    <AdminDataTable
                    columns={columns}
                    data={messages}
                    getRowKey={(message) =>
                        message.id
                    }
                    />
                </div>
                )}
            </PageContainer>

            <ContactMessageModal
                show={Boolean(selectedMessage)}
                message={selectedMessage}
                onClose={() =>
                    setSelectedMessage(null)
                }
                onArchive={
                    handleArchiveMessage
                }
                onRestore={
                    handleRestoreMessage
                }
                onDelete={(message) =>
                    setMessageToDelete(message)
                }
            />

            <AdminConfirmModal
                show={
                    Boolean(messageToDelete)
                }
                title="Supprimer ce message ?"
                description="Cette action est définitive."
                confirmLabel="Supprimer"
                cancelLabel="Annuler"
                variant="danger"
                onCancel={() =>
                    setMessageToDelete(null)
                }
                onConfirm={
                    handleDeleteMessage
                }
            />
        </Section>
    );
}