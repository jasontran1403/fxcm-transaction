package com.something.service;

import java.util.List;

import com.something.domain.HistoryWallet;

public interface HistoryWalletService {
	public HistoryWallet findById(int id);
	public HistoryWallet update(HistoryWallet hw);
	public List<HistoryWallet> findCommissionHistoryByUsername(String username);
	public List<HistoryWallet> findSwapHistoryByUsername(String username);
	public List<HistoryWallet> findDepositHistoryByUsername(String username);
	public List<HistoryWallet> findWithdrawHistoryByUsername(String username);
	public List<HistoryWallet> findTransferHistoryByUsername(String username);
}
