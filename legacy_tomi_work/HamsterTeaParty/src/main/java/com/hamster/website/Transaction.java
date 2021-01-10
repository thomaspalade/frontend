package com.hamster.website;

public class Transaction {
    private String CardHolder;

    private String cardNo;

    private String expiry;

    private String cvv;

    private Integer amount;

    public Transaction(String cardHolder, String cardNo, String expiry, String cvv, Integer amount) {
        CardHolder = cardHolder;
        this.cardNo = cardNo;
        this.expiry = expiry;
        this.cvv = cvv;
        this.amount = amount;
    }

    @Override
    public String toString() {
        return "Transaction{" +
                "CardHolder='" + CardHolder + '\'' +
                ", cardNo='" + cardNo + '\'' +
                ", expiry='" + expiry + '\'' +
                ", cvv='" + cvv + '\'' +
                ", amount=" + amount +
                '}';
    }

    public String getCardNo() {
        return cardNo;
    }

    public void setCardNo(String cardNo) {
        this.cardNo = cardNo;
    }

    public String getExpiry() {
        return expiry;
    }

    public void setExpiry(String expiry) {
        this.expiry = expiry;
    }

    public String getCvv() {
        return cvv;
    }

    public void setCvv(String cvv) {
        this.cvv = cvv;
    }

    public String getCardHolder() {
        return CardHolder;
    }

    public void setCardHolder(String cardHolder) {
        CardHolder = cardHolder;
    }

    public Integer getAmount() {
        return amount;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }
}
