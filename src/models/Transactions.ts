export class Transaction {
  public id: string
  public amount: any
  public date: string
  public status: string
  public name: string
  public email: string
  public address: any

  constructor(transaction: any) {
    this.id = transaction.id
    this.name = transaction.payer_name.given_name + " " + transaction.payer_name.surname
    this.email = transaction.payer_email
    this.amount =
      "€" +
        parseFloat(transaction.amount_with_breakdown?.gross_amount?.value).toFixed(2) || 0
    this.date = new Date(transaction.time).toLocaleDateString()
    this.status = transaction.status
    this.address = transaction.address
  }

  flat() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      amount: this.amount,
      date: this.date,
      status: this.status,
      address: this.address,
    }
  }
}
