package com.something.service;

import java.util.List;

import com.something.domain.Pack;

public interface PackService {
	public List<Pack> getAllPackges();
	public Pack findById(int id);
}
