package com.something.service.serviceimpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.something.domain.Pack;
import com.something.repo.PackRepo;
import com.something.service.PackService;

@Service
public class PackServiceImpl implements PackService{
	@Autowired
	PackRepo packRepo;

	@Override
	public List<Pack> getAllPackges() {
		// TODO Auto-generated method stub
		return packRepo.findAll();
	}

	@Override
	public Pack findById(int id) {
		// TODO Auto-generated method stub
		return packRepo.getById(id);
	}

}
