/**
 * Administration sidebar navigation.
 */

import { FiLogOut, FiExternalLink, FiUser } from "react-icons/fi";
import { NavLink, useNavigate } from "react-router-dom";

import { AppButton } from "@/components/ui";
import { ADMIN_NAVIGATION_ITEMS, ROUTES } from "@/constants";
import { useAuth } from "@/hooks";
import { classNames } from "@/utils";

import styles from "./AdminSidebar.module.scss";

export default function AdminSidebar({
  pendingCommentsCount = 0,
  pendingMessagesCount = 0,
  onNavigate,
}) {
  const { user, signOut, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleNavigate = () => {
    onNavigate?.();
  };

  const handleSignOut = async () => {
    try {
      await signOut();

      onNavigate?.();

      navigate(ROUTES.HOME, {
        replace: true,
      });
    } catch (error) {
      console.error(
        "Unable to sign out from administration:",
        error
      );
    }
  };

  const getBadgeCount = (badgeKey) => {
    switch (badgeKey) {
      case "pendingComments":
        return pendingCommentsCount;

      case "pendingMessages":
        return pendingMessagesCount;

      default:
        return 0;
    }
  };

  const getBadgeAriaLabel = (
    badgeKey,
    badgeCount
  ) => {
    if (badgeKey === "pendingComments") {
      return `${badgeCount} commentaire${
        badgeCount > 1 ? "s" : ""
      } à modérer`;
    }

    if (badgeKey === "pendingMessages") {
      return `${badgeCount} message${
        badgeCount > 1 ? "s" : ""
      } en attente`;
    }

    return `${badgeCount} notification${
      badgeCount > 1 ? "s" : ""
    }`;
  };

  return (
    <aside
      className={styles.sidebar}
      aria-label="Navigation de l’administration"
    >
      <div className={styles.brand}>
        <NavLink
          to={ROUTES.DASHBOARD}
          className={styles.brandLink}
          onClick={handleNavigate}
        >
          <span className={styles.brandName}>
            MyMomix
          </span>

          <span className={styles.brandLabel}>
            Administration
          </span>
        </NavLink>
      </div>

      <div className={styles.user}>
        <span
          className={styles.userIcon}
          aria-hidden="true"
        >
          <FiUser />
        </span>

        <div className={styles.userContent}>
          <span className={styles.userLabel}>
            Administrateur
          </span>

          <span className={styles.userEmail}>
            {user?.email ?? "Compte connecté"}
          </span>
        </div>
      </div>      

      <nav className={styles.navigation}>
        <ul className={styles.list}>
          {ADMIN_NAVIGATION_ITEMS.map(
            ({
              key,
              label,
              path,
              icon: Icon,
              badgeKey,
            }) => {
              const badgeCount = getBadgeCount(badgeKey);

              return (
                <li key={key}>
                  <NavLink
                    to={path}
                    className={({ isActive }) =>
                      classNames(
                        styles.link,
                        isActive && styles.active
                      )
                    }
                    onClick={handleNavigate}
                  >
                    <Icon
                      className={styles.linkIcon}
                      aria-hidden="true"
                    />

                    <span className={styles.linkLabel}>
                      {label}
                    </span>

                    {badgeCount > 0 ? (
                      <span
                        className={styles.badge}
                        aria-label={
                          getBadgeAriaLabel(
                            badgeKey,
                            badgeCount
                          )
                        }
                      >
                        {badgeCount > 99
                          ? "99+"
                          : badgeCount}
                      </span>
                    ) : null}
                  </NavLink>
                </li>
              );
            }
          )}
        </ul>
      </nav>

      <div className={styles.footer}>
        <AppButton
          as={NavLink}
          to={ROUTES.HOME}
          variant="outline-primary"
          icon={<FiExternalLink />}
          className={styles.footerButton}
          target="_blank"
          rel="noreferrer"
          onClick={handleNavigate}
        >
          Voir le site
        </AppButton>

        <AppButton
          variant="outline-danger"
          icon={<FiLogOut />}
          className={styles.footerButton}
          disabled={isLoading}
          onClick={handleSignOut}
        >
          Déconnexion
        </AppButton>
      </div>
    </aside>
  );
}