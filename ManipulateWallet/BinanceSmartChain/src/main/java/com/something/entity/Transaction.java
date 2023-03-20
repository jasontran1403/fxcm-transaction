package com.something.entity;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Transaction {
	private String hash;
    private String from;
    private String to;
    private long timeStamp;
    private BigDecimal value;
    private BigDecimal gasPrice;
    private BigDecimal gasUsed;
    private int tokenDecimal;
    private String tokenSymbol;
    private String contractAddress;

}
