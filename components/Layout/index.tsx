import Header from "@components/Header";
import { ChakraProvider } from "@chakra-ui/react";
import { DAppProvider } from "@usedapp/core";

export interface LayoutProps {
  children: React.ReactElement;
}
export default function Layout({ children }: LayoutProps) {
  return (
    <DAppProvider config={{ readOnlyChainId: 3 }}>
      <ChakraProvider>
        <Header></Header>
        {children}
      </ChakraProvider>
    </DAppProvider>
  );
}
