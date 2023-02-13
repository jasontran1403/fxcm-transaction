package com.something.domain;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@IdClass(Affiliate.class)
public class Affiliate implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private String uuid;
	private String root;
	@Id
	private String placement;
	@Id
	private String side;
	private boolean status = false;
}
