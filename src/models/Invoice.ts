export class Invoice {
  public id: string
  public amount: any
  public last_payment_date: string
  public name: string
  public email: string

  constructor(transaction: any) {
    this.id = transaction.id
    this.name = transaction.payer_name.given_name + " " + transaction.payer_name.surname
    this.email = transaction.payer_email
    this.amount =
      "€" +
        parseFloat(transaction.amount_with_breakdown?.gross_amount?.value).toFixed(2) || 0
    this.last_payment_date = new Date(transaction.time).toLocaleDateString()
  }

  flat() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      amount: this.amount,
      date: this.date,
      status: this.status,
    }
  }
}
