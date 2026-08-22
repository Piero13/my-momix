/**
 * Main administration layout.
 */

import {
  useEffect,
  useState,
} from "react";

import Offcanvas from "react-bootstrap/Offcanvas";

import {
  Outlet,
} from "react-router-dom";

import {
  AdminHeader,
  AdminSidebar,
} from "@/components/admin";

import { getPendingCommentsCount } from "@/services";

import {
  getNewContactMessagesCount,
} from "@/services/contactAdmin";

import styles from "./AdminLayout.module.scss";

export default function AdminLayout() {
  const [
    showSidebar,
    setShowSidebar,
  ] = useState(false);

  const [
    pendingCommentsCount,
    setPendingCommentsCount,
  ] = useState(0);

  const [
    pendingMessagesCount,
    setPendingMessagesCount,
  ] = useState(0);

  const handleOpenSidebar = () => {
    setShowSidebar(true);
  };

  const handleCloseSidebar = () => {
    setShowSidebar(false);
  };

  useEffect(() => {
    let isCancelled = false;

    const loadPendingCounts =
      async () => {
        try {
          const [
            commentsCount,
            messagesCount,
          ] = await Promise.all([
            getPendingCommentsCount(),
            getNewContactMessagesCount(),
          ]);

          if (isCancelled) {
            return;
          }

          setPendingCommentsCount(
            commentsCount
          );

          setPendingMessagesCount(
            messagesCount
          );
        } catch (error) {
          console.error(
            "Unable to load admin notification counts:",
            error
          );
        }
      };

    loadPendingCounts();

    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <div className={styles.layout}>
      <div className={styles.desktopSidebar}>
        <AdminSidebar
          pendingCommentsCount={
            pendingCommentsCount
          }
          pendingMessagesCount={
            pendingMessagesCount
          }
        />
      </div>

      <div className={styles.main}>
        <AdminHeader
          onMenuToggle={
            handleOpenSidebar
          }
        />

        <main
          id="admin-main-content"
          className={styles.content}
        >
          <Outlet />
        </main>
      </div>

      <Offcanvas
        show={showSidebar}
        placement="start"
        className={
          styles.mobileSidebar
        }
        aria-labelledby="admin-sidebar-title"
        onHide={
          handleCloseSidebar
        }
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title id="admin-sidebar-title">
            Navigation
          </Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body>
          <AdminSidebar
            pendingCommentsCount={
              pendingCommentsCount
            }
            pendingMessagesCount={
              pendingMessagesCount
            }
            onNavigate={
              handleCloseSidebar
            }
          />
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}