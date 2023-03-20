package com.something.utils;

import org.bouncycastle.util.encoders.Hex;
import org.web3j.crypto.ECKeyPair;
import org.web3j.crypto.Keys;

public class GenerateWallet {
	public static void generateWallet() throws Exception {
		ECKeyPair keyPair = Keys.createEcKeyPair();
        byte[] privateKeyBytes = keyPair.getPrivateKey().toByteArray();
        byte[] publicKeyBytes = keyPair.getPublicKey().toByteArray();
        
        String privateKey = Hex.toHexString(privateKeyBytes);
        String publicKey = Hex.toHexString(publicKeyBytes);
        String address = Keys.toChecksumAddress(Keys.getAddress(keyPair.getPublicKey()));
        
        System.out.println("Private key: " + privateKey);
        System.out.println("Public key: " + publicKey);
        System.out.println("Address: " + address);
	}

}
