package com.something.domain;

import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TestData {
	@Id
    private String content1;
    private String content2;
    private String content3;
    private String content4;
    private String content5;
}
