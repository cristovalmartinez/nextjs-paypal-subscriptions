export class Subscription {
  public id: string
  public status: string
  public plan_id: string
  public start_time: string
  public quantity: string
  public balance: string
  public shipping_amount: { currency_code: string; value: string }
  public last_payment_date: string
  public last_payment_amount: string
  public next_payment_date: string
  public payer_id: string
  public payer_description: string
  public payer_email: string
  public payer_name: string
  public payer_address: string
  public pay_to_name: string
  public pay_to_address: string

  constructor(subscription: any) {
    this.id = subscription.id
    this.status = subscription.status
    this.quantity = subscription.quantity
    this.balance =
      subscription.billing_info.outstanding_balance.value === "0.00"
        ? "€0"
        : "€" +
          parseFloat(subscription.billing_info.outstanding_balance.value)
            .toFixed(2)
            .toString()
    this.start_time = new Date(subscription.start_time).toLocaleDateString()
    this.plan_id = subscription.plan_id
    this.last_payment_date = new Date(
      subscription.billing_info.last_payment.time
    ).toLocaleDateString()
    this.last_payment_amount =
      "€" +
      parseFloat(subscription.billing_info.last_payment.amount.value)
        .toFixed(2)
        .toString()
    this.next_payment_date = new Date(
      subscription.billing_info.next_billing_time
    ).toLocaleDateString()
    this.shipping_amount = subscription.payer_email
    this.payer_id = subscription.subscriber.payer_id
    this.payer_description = "test description"
    this.payer_name =
      subscription.subscriber.name.given_name + " " + subscription.subscriber.name.surname
    this.payer_email = subscription.subscriber.email_address
    this.payer_address = subscription.subscriber.shipping_address.address.address_line_1
    this.pay_to_name = "My Company"
    this.pay_to_address = "1234 Main St, Anytown, USA"
  }

  flat() {
    return {
      id: this.id,
      status: this.status,
      quantity: this.quantity,
      balance: this.balance,
      start_time: this.start_time,
      plan_id: this.plan_id,
      last_payment_date: this.last_payment_date,
      last_payment_amount: this.last_payment_amount,
      next_payment_date: this.next_payment_date,
      shipping_amount: this.shipping_amount,
      payer_id: this.payer_id,
      payer_description: this.payer_description,
      payer_name: this.payer_name,
      payer_email: this.payer_email,
      payer_address: this.payer_address,
      pay_to_name: this.pay_to_name,
      pay_to_address: this.pay_to_address,
    }
  }
}
