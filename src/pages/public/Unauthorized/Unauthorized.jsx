import { FiLock, FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import {
  AppButton,
  EmptyState,
  PageContainer,
  Section,
} from "@/components/ui";

import { ROUTES } from "@/constants";
import { useAuth } from "@/hooks/auth";

import styles from "./Unauthorized.module.scss";

export default function Unauthorized() {
  const { signOut, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();

      navigate(ROUTES.LOGIN, {
        replace: true,
      });
    } catch (error) {
      console.error(
        "Unable to sign out unauthorized user:",
        error
      );
    }
  };

  return (
    <Section
      className={styles.section}
      spacing="large"
      labelledBy="unauthorized-title"
    >
      <PageContainer>
        <EmptyState
          icon={FiLock}
          title="Accès refusé"
          description="Votre compte est authentifié, mais il ne possède pas les autorisations nécessaires pour accéder à l’administration."
          action={
            <AppButton
              icon={<FiLogOut />}
              disabled={isLoading}
              onClick={handleSignOut}
            >
              Se déconnecter
            </AppButton>
          }
        />
      </PageContainer>
    </Section>
  );
}