import ConnectWallet from "@components/ConnectWallet";
import React from "react";
import styles from "./styles.module.css";
import { useDisclosure } from "@chakra-ui/react";
import AccountModal from "@components/AccountModal";

export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <nav className={styles.nav}>
        <ConnectWallet handleOpenModal={onOpen} />
        <AccountModal isOpen={isOpen} onClose={onClose} />
    </nav>
  );
}
