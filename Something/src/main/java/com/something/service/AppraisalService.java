package com.something.service;

import java.util.List;

import com.something.domain.Appraisal;

public interface AppraisalService {
	public Appraisal save(Appraisal app);
	public List<Appraisal> findByKeyword(String keyword);
	public List<Appraisal> getAllAppraisal();
	public Appraisal getById(long id);
}
