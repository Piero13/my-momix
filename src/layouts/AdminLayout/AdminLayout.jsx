/**
 * Main administration layout.
 */

import { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Outlet } from "react-router-dom";

import {
  AdminHeader,
  AdminSidebar,
} from "@/components/admin";

import styles from "./AdminLayout.module.scss";

export default function AdminLayout() {
  const [showSidebar, setShowSidebar] = useState(false);

  const handleOpenSidebar = () => {
    setShowSidebar(true);
  };

  const handleCloseSidebar = () => {
    setShowSidebar(false);
  };

  return (
    <div className={styles.layout}>
      <div className={styles.desktopSidebar}>
        <AdminSidebar
          pendingCommentsCount={0}
        />
      </div>

      <div className={styles.main}>
        <AdminHeader
          onMenuToggle={handleOpenSidebar}
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
        className={styles.mobileSidebar}
        aria-labelledby="admin-sidebar-title"
        onHide={handleCloseSidebar}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title id="admin-sidebar-title">
            Navigation
          </Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body>
          <AdminSidebar
            pendingCommentsCount={0}
            onNavigate={handleCloseSidebar}
          />
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}