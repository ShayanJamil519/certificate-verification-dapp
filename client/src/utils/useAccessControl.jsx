import { useEffect, useState } from "react";
import { ethers } from "ethers";
import CertificateVerification from "../CertificateVerification.json";
import { useAddress } from "@thirdweb-dev/react";

const useAccessControl = () => {
  const address = useAddress();
  const [isAdminConnected, setIsAdminConnected] = useState(false);
  const [deployerAddress, setDeployerAddress] = useState("");
  console.log({ deployerAddress });

  useEffect(() => {
    const getAdminandDeployerAddresses = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        CertificateVerification.address,
        CertificateVerification.abi,
        signer
      );

      const isAdminConnected = await contract.isAdmin(address);
      setIsAdminConnected(isAdminConnected);

      const deployerAddress = await contract.getDeployerAddress();
      setDeployerAddress(deployerAddress);
    };

    getAdminandDeployerAddresses();
  }, [address]);

  const checkAccess = () => {
    return address === deployerAddress || isAdminConnected === true;
  };

  return checkAccess();
};

export default useAccessControl;
