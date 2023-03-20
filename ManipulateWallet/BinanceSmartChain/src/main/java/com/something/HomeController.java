package com.something;

import java.io.IOException;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.something.entity.Transaction;
import com.something.entity.TransactionInformation;
import com.something.utils.GenerateWallet;
import com.something.utils.TransactionHistory;
import com.something.utils.TransactionStatus;
import com.something.utils.Transfer;

@RestController
public class HomeController {

	@GetMapping("/api/generateWallet")
	public ResponseEntity<String> generateWallet() throws Exception {
		GenerateWallet.generateWallet();
		return ResponseEntity.ok().body("OK la");
	}
	
	@GetMapping("/api/transaction/status/hash={hash}")
	public ResponseEntity<String> transactionStatus(@PathVariable("hash") String hash) throws IOException {
		TransactionStatus.checkTransactionStatus(hash);
		return ResponseEntity.ok().body("OK la");
	}

	@PostMapping("/api/sendBNB")
	public ResponseEntity<String> sendBNB(@RequestBody TransactionInformation transInfo) throws Exception {
		String txHash = Transfer.sendBNB(transInfo.getPrivateKey(), transInfo.getToAddressWallet(),
				transInfo.getAmount());
		return ResponseEntity.ok().body(txHash);
	}

	@PostMapping("/api/sendBUSD")
	public ResponseEntity<String> sendBUSD(@RequestBody TransactionInformation transInfo) throws Exception {
		String txHash = Transfer.sendBUSD(transInfo.getPrivateKey(), transInfo.getToAddressWallet(),
				transInfo.getAmount());
		return ResponseEntity.ok().body(txHash);
	}

	@PostMapping("/api/sendUSDTBEP20")
	public ResponseEntity<String> sendUSDTBEP20(@RequestBody TransactionInformation transInfo) throws Exception {
		String txHash = Transfer.sendUSDTBEP20(transInfo.getPrivateKey(), transInfo.getToAddressWallet(),
				transInfo.getAmount());
		return ResponseEntity.ok().body(txHash);
	}

	@GetMapping("/api/fetchTransactionHistoryBNB/wallet={walletAddress}&time={time}")
	public ResponseEntity<List<Transaction>> fetchTransactionHistory(
			@PathVariable("walletAddress") String walletAddress, @PathVariable("time") long time)
			throws Exception {
		List<Transaction> transactions = TransactionHistory.fetchTransactionsBNB(walletAddress, time);
		return ResponseEntity.ok().body(transactions);
	}

	@GetMapping("/api/fetchTransactionHistoryBUSD/wallet={walletAddress}&time={time}")
	public ResponseEntity<List<Transaction>> fetchTransactionHistoryBUSD(
			@PathVariable("walletAddress") String walletAddress, @PathVariable("time") long time) throws Exception {
		List<Transaction> transactions = TransactionHistory.fetchTransactionsBUSD(walletAddress, time);
		return ResponseEntity.ok().body(transactions);
	}

	@GetMapping("/api/fetchTransactionHistoryUSDTBEP20/wallet={walletAddress}&time={time}")
	public ResponseEntity<List<Transaction>> fetchTransactionHistoryUSDTBEP20(
			@PathVariable("walletAddress") String walletAddress, @PathVariable("time") long time) throws Exception {
		List<Transaction> transactions = TransactionHistory.fetchTransactionsUSDTBEP20(walletAddress, time);
		return ResponseEntity.ok().body(transactions);
	}

}
