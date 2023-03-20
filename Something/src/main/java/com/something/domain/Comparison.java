package com.something.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Comparison implements Serializable{
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="Id")
	private Integer id;

	@Column(name = "Address")
    private String address;
	
	@Column(name = "Refference")
    private String refference;
    
    @Column(name = "Createdate")
    private String createDate;

    @Column(name = "Legal")
    private String legal;
    
    @Column(name = "Type")
    private String type;

    @Column(name = "Acreage")
    private double acreage;
    
    @Column(name = "NtsAcr")
    private double ntsacr;
    
    @Column(name = "ClnAcr")
    private double clnacr;

    @Column(name = "VplgAcr")
    private double vplgacr;
    
    @Column(name = "Width")
    private double width;
    
    @Column(name = "Height")
    private double height;
    
    @Column(name = "Shape")
    private String shape;
    
    @Column(name = "Position")
    private String position;
    
    @Column(name = "Traffic")
    private String traffic;
    
    @Column(name = "Other")
    private String other;
    
    @Column(name = "Ctxd")
    private String ctxd;
    
    @Column(name = "PriceSale")
    private double priceSale;
    
    @Column(name = "PriceDeal")
    private double priceDeal;
    
    @Column(name = "PricePurpose")
    private double pricePurpose;
    
    @Column(name = "PriceBoundary")
    private double priceBoundary;
    
    @Column(name = "PriceLand")
    private double priceLand;
    
    @Column(name = "UnitPrice")
    private double unitPrice;

	@ManyToOne
	@JoinColumn(name="AppraisalId")
	private Appraisal appraisal;
}
