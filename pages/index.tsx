import { useState } from "react";
import type { NextPage } from "next";
import { useAccount, useBalance } from "wagmi";
import { Button, Layout, Loader, WalletOptionsModal } from "../components";
import Dash from "../components/Dash"
import Map from '../components/Map'
const Home: NextPage = () => {
  const [showWalletOptions, setShowWalletOptions] = useState(false);
  const [{ data: accountData, loading: accountLoading }] = useAccount();
  const [{ data: balanceData, loading: balanceLoading }] = useBalance({
    addressOrName: accountData?.address,
    watch: true,
  });

  const loading = (accountLoading || balanceLoading) && !balanceData;

  const renderContent = () => {
    if (loading) return <Loader size={8} />;
    if (balanceData) {
      return (
        <>         

          <h1 className="mb-8 text-4xl font-bold">My Nodes</h1>
          <div className="container-fluid pt-5 mt-5 pb-5">

  
        </div>

          <div className="inline-flex place-items-center">
 
            <h6 className="ml-2 text-2xl">{`Balance  ${Number(
              balanceData?.formatted
            ).toFixed(4)} Ξ`}</h6>
          </div>
        </>
      );
    }

    return (
      <>
        <h1 className="mb-8 text-4xl font-bold">
           Shadow Node Command Center
        </h1>
        <Map></Map>
      </>
    );
  };

  return (
    <>
      <Layout
        showWalletOptions={showWalletOptions}
        setShowWalletOptions={setShowWalletOptions}
      >
        <div className="grid h-screen place-items-center">
          <div className="grid place-items-center">{renderContent()}</div>
        </div>
      </Layout>
    </>
  );
};

export default Home;